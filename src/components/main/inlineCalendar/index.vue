<template>
  <slot name="title"></slot>
  <div ref="root" class="inline-calendar">
    <ul
      v-dragscroll.x
      @dragscrollmove="disableDateSelection"
      @dragscrollend="enableDateSelection"
      class="inline-calendar__dates"
    >
      <the-observer
        v-if="showFirstObserver"
        class="inline-calendar__date date-item"
        @intersect="getPrevDatesInRange(minDate, daysRange, true)"
        :options="prevObserverOptions"
      />

      <slot v-if="showButtons" name="prev-button"> </slot>

      <div class="dates-wrapper" ref="datesWrapper" :style="dateItemsStyles">
        <li
          v-for="(date, index) in datesReadable"
          :key="`date-item_${index}`"
          class="inline-calendar__date date-item"
          :class="{
            active: date.isActive,
            'in-range': date.isInRange,
            today: date.isToday,
            disabled: date.isDisabled,
          }"
          @click="dateClickHandler(date.date)"
        >
          <slot name="scheduled-events" :date="date"> </slot>

          <p v-if="showYear" class="date-item__year">{{ date.year }}</p>

          <p v-if="showMonth" class="date-item__month">{{ date.month }}</p>

          <h2 class="date-item__day">{{ date.day }}</h2>
          <p v-if="showWeekday" class="date-item__weekday">
            {{ date.weekday }}
          </p>
        </li>
      </div>
      <slot v-if="showButtons" name="next-button"> </slot>

      <the-observer
        v-if="showLastObserver"
        class="inline-calendar__date date-item"
        @intersect="getNextDatesInRange(maxDate, daysRange, true)"
        :options="nextObserverOptions"
      />
    </ul>
  </div>
</template>

<script>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';
import { dragscroll } from 'vue-dragscroll';
import checkSameDay from '../../../utils/checkSameDay';
import checkIsWeekend from '../../../utils/checkDateInRange';
import checkIsInRange from '../../../utils/checkDateInRange';
import TheObserver from './TheObserver.vue';
export default {
  name: 'VueInlineCalendar',
  props: {
    selectedDate: {
      type: Date,
      default: null,
    },
    selectedRange: {
      type: Object,
      default: null,
      validator: (value) => {
        return (
          Object.prototype.hasOwnProperty.call(value, 'startDate') &&
          Object.prototype.hasOwnProperty.call(value, 'endDate') &&
          value.startDate instanceof Date &&
          value.endDate instanceof Date
        );
      },
    },
    daysRange: {
      type: Number,
      default: 7,
    },
    itemWidth: {
      type: Number,
      default: 80,
    },
    itemsGap: {
      type: Number,
      default: 10,
    },
    locale: {
      type: String,
      default: 'en-US',
    },
    scrollSpeed: {
      type: Number,
      default: 4,
    },
    disableWeekends: {
      type: Boolean,
      default: false,
    },
    specMinDate: {
      type: Date,
      default: null,
    },
    showButtons: {
      type: Boolean,
      default: false,
    },
    specMaxDate: {
      type: Date,
      default: null,
    },
    disablePastDays: {
      type: Boolean,
      default: false,
    },
    disableNextDays: {
      type: Boolean,
      default: false,
    },
    isRange: {
      type: Boolean,
      default: false,
    },
    showYear: {
      type: Boolean,
      default: true,
    },
    showMonth: {
      type: Boolean,
      default: true,
    },
    showWeekday: {
      type: Boolean,
      default: true,
    },
    enableMousewheelScroll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:selectedDate', 'update:selectedRange'],
  components: {
    TheObserver,
  },
  directives: {
    dragscroll,
  },
  setup(props, { emit }) {
    const root = ref(null);
    const datesWrapper = ref(null);
    const activeDate = ref(props.selectedDate);
    const dates = ref([]);
    const canSelectDate = ref(true);
    const minDate = ref(null);
    const maxDate = ref(null);
    const datesRange = reactive({
      startDate: props.selectedRange?.startDate || null,
      endDate: props.selectedRange?.endDate || null,
    });
    const showFirstObserver = ref(true);
    const showLastObserver = ref(true);
    const windowWidth = ref(window.innerWidth);
    const prevObserverOptions = computed(() => ({
      threshold: 0,
      root: root.value,
      rootMargin: `0px 0px 0px ${props.itemWidth}px`,
    }));
    const nextObserverOptions = computed(() => ({
      threshold: 0,
      root: root.value,
      rootMargin: `0px ${props.itemWidth}px 0px 0px`,
    }));
    const datesReadable = computed(() => {
      return dates.value.map((date) => {
        return {
          date,
          month: new Date(date).toLocaleDateString(props.locale, {
            month: 'short',
          }),
          year: new Date(date).getFullYear(),
          weekday: new Date(date).toLocaleDateString(props.locale, {
            weekday: 'short',
          }),
          day: new Date(date).getDate(),
          isToday: checkSameDay(date, new Date()),
          isWeekend: checkIsWeekend(date),
          isActive:
            (activeDate.value && checkSameDay(date, activeDate.value)) ||
            (datesRange.startDate &&
              checkSameDay(date, datesRange.startDate)) ||
            (datesRange.endDate && checkSameDay(date, datesRange.endDate)),
          ...(props.isRange && {
            isInRange: checkIsInRange(
              date,
              datesRange.startDate,
              datesRange.endDate
            ),
          }),
          isDisabled:
            (props.disableWeekends && checkIsWeekend(date)) ||
            (props.disablePastDays &&
              date < new Date() &&
              !checkSameDay(date, new Date())) ||
            (props.disableNextDays &&
              date > new Date() &&
              !checkSameDay(date, new Date())),
        };
      });
    });
    const dateItemsStyles = computed(() => ({
      gridAutoColumns: `${props.itemWidth}px`,
      gridColumnGap: `${props.itemsGap}px`,
    }));
    onMounted(() => {
      // adding calendar scroll on mousewheel
      const datesWrapperEl = datesWrapper.value;
      if (props.enableMousewheelScroll) {
        datesWrapperEl.addEventListener('wheel', (e) => {
          e.preventDefault();
          datesWrapperEl.scrollBy({
            left:
              (e.deltaY < 0 ? -props.itemWidth : props.itemWidth) *
              props.scrollSpeed,
            behavior: 'smooth',
          });
        });
      }
      // getting initial list of dates
      fillCalendar();
      nextTick(() => {
        const todayItem = root.value.querySelector('.date-item.today');
        todayItem.scrollIntoView({
          inline: 'start',
        });
      });
    });
    onBeforeUnmount(() => {
      if (props.enableMousewheelScroll) {
        const datesWrapperEl = datesWrapper.value;
        datesWrapperEl.replaceWith(datesWrapperEl.cloneNode(true));
      }
    });
    const fillCalendar = () => {
      if (dates.value.length) {
        dates.value = [];
      }
      const rangeInitial = Math.ceil(
        windowWidth.value / ((props.itemWidth - props.itemsGap) * 2)
      );
      getNextDatesInRange(new Date(), rangeInitial, false);
      getPrevDatesInRange(new Date(), rangeInitial, true);
    };
    const getPrevDatesInRange = (startDate, days, excludeFirstDate = false) => {
      const date = new Date(startDate.getTime());
      if (excludeFirstDate) {
        date.setDate(date.getDate() - 1);
      }
      const dateCopy = new Date(date.getTime());
      let beginningDate = new Date(dateCopy.setDate(dateCopy.getDate() - days));
      let datesArr = [];
      while (date > beginningDate) {
        datesArr.unshift(new Date(date));
        date.setDate(date.getDate() - 1);
        if (props.specMinDate) {
          datesArr = datesArr.filter(
            (d) => d > props.specMinDate || checkSameDay(d, props.specMinDate)
          );
          showFirstObserver.value = datesArr.length >= days;
        }
      }
      dates.value = dates.value.length
        ? [...datesArr, ...dates.value]
        : datesArr;
      minDate.value = dates.value[0];
      // keeping scroll position on adding elements to the beginning of the list
      const datesWrapperEl = datesWrapper.value;
      const currScrollPos = datesWrapperEl.scrollLeft;
      const oldScroll = datesWrapperEl.scrollWidth - datesWrapperEl.clientWidth;
      nextTick(() => {
        const newScroll =
          datesWrapperEl.scrollWidth - datesWrapperEl.clientWidth;
        datesWrapperEl.scrollLeft = currScrollPos + (newScroll - oldScroll);
      });
    };
    const getNextDatesInRange = (startDate, days, excludeFirstDate = false) => {
      const date = new Date(startDate.getTime());
      if (excludeFirstDate) {
        date.setDate(date.getDate() + 1);
      }
      const dateCopy = new Date(date.getTime());
      const endDate = new Date(dateCopy.setDate(dateCopy.getDate() + days));
      let datesArr = [];
      while (date < endDate) {
        datesArr.push(new Date(date));
        date.setDate(date.getDate() + 1);
        if (props.specMaxDate) {
          datesArr = datesArr.filter(
            (d) => d < props.specMaxDate || checkSameDay(d, props.specMaxDate)
          );
          showLastObserver.value = datesArr.length >= days;
        }
      }
      dates.value = dates?.value.length
        ? [...dates.value, ...datesArr]
        : datesArr;
      maxDate.value = dates.value[dates.value.length - 1];
    };
    const dateClickHandler = (date) => {
      if (props.isRange) {
        datesRange.startDate ? setEndDate(date) : setStartDate(date);
        return;
      }
      setActiveDate(date);
    };
    const setActiveDate = (date) => {
      if (!canSelectDate.value) {
        return false;
      }
      activeDate.value = date;
      emit('update:selectedDate', date);
    };
    const setStartDate = (date) => {
      if (!canSelectDate.value) {
        return false;
      }
      datesRange.startDate = date;
    };
    const setEndDate = (date) => {
      if (!canSelectDate.value) {
        return;
      }
      if (datesRange.startDate === date || datesRange.endDate === date) {
        datesRange.startDate = date;
        datesRange.endDate = null;
        return;
      }
      datesRange.endDate = date;
      if (datesRange.startDate > datesRange.endDate) {
        [datesRange.startDate, datesRange.endDate] = [
          datesRange.endDate,
          datesRange.startDate,
        ];
      }
      emit('update:selectedRange', datesRange);
    };
    const enableDateSelection = () => {
      setTimeout(() => {
        canSelectDate.value = true;
      }, 0);
    };
    const disableDateSelection = (e) => {
      if (e.detail.deltaX === -1 || Object.is(e.detail.deltaX, -0)) {
        return;
      }
      canSelectDate.value = false;
    };
    const onResize = () => {
      windowWidth.value = window.innerWidth;
    };
    const validateMinMaxDates = () => {
      if (minDate.value > maxDate.value) {
        console.error('Invalid props');
      }
      return true;
    };
    const validateInitialValues = () => {
      if (props.isRange && props.selectedDate?.value) {
        console.error('You should use initialRange property with isRange');
        return;
      }
      if (
        !props.isRange &&
        props.selectedRange?.startDate &&
        props.selectedRange?.endDate
      ) {
        console.error('You should use initialDate property with default mode');
      }
    };
    watch(
      props,
      () => {
        validateMinMaxDates();
        validateInitialValues();
      },
      { immediate: true }
    );
    watch(windowWidth, (newVal, oldVal) => {
      if (oldVal > newVal) {
        return;
      }
      fillCalendar();
    });
    return {
      root,
      datesWrapper,
      activeDate,
      dates,
      datesRange,
      minDate,
      maxDate,
      canSelectDate,
      showFirstObserver,
      showLastObserver,
      datesReadable,
      dateItemsStyles,
      prevObserverOptions,
      nextObserverOptions,
      getPrevDatesInRange,
      getNextDatesInRange,
      enableDateSelection,
      disableDateSelection,
      dateClickHandler,
    };
  },
};
</script>
<style lang="scss" scoped>
.inline-calendar {
  display: flex;
  margin-bottom: 8px;
  padding: 0 10px;
  background: #F9F9FC;

  &__dates {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: scroll;
    white-space: nowrap;
    gap: 20px;

    .dates-wrapper {
      display: grid;
      grid-auto-flow: column;
      margin-left: -10px;
      margin-right: -10px;
      padding: 8px 10px;
      list-style-type: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &__date {
    padding: 14px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #0094ff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
    flex-direction: column-reverse;
    height: 76px;
    border: none;
    background: transparent;

    &.today {
      background: transparent;
      .date-item__weekday {
        @include inter(12px, 500);
        line-height: 14px;
        text-align: center;
      }

      .date-item__day {
        @include inter(14px, 400);
        line-height: 20px;
        text-align: center;
        margin: 0px;
        margin-bottom: 10px;
        margin-top: 5px;
      }
    }
    &.in-range {
      color: #fff;
      border-color: rgba(#0094ff, 0.6) !important;
      background-color: rgba(#0094ff, 0.6) !important;
    }
    &.active {
      background: #1d817e !important;
      border: 1px solid #ffffff !important;
      box-shadow: 1px 2px 5px 1px rgba(56, 56, 251, 0.08) !important;
      border-radius: 16px !important;

      .date-item__weekday {
        @include inter(12px, 500, #f0f0f4);
        line-height: 20px;
        text-align: center;
      }

      .date-item__day {
        @include inter(14px, 500, $--b-main-green-color);
        line-height: 20px;
        background: $--b-main-white-color;
        border-radius: 4px;
        padding: 0px 4px;
        text-align: center;
      }
    }
    &.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}
.date-item {
  &__month,
  &__weekday {
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    text-transform: capitalize;
  }
  &__month {
    margin: 0 0 8px;
  }
  &__weekday {
    font-weight: 500;
  }
  &__day {
    @include inter(14px, 400);
    line-height: 20px;
    text-align: center;
    margin: 0px;
    margin-bottom: 10px;
    margin-top: 5px;
  }
  &__year {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 500;
    line-height: 14px;
    text-align: right;
  }
}
</style>
