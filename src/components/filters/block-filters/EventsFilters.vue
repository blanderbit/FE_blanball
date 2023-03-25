<template>
  <filter-block>
    <ModalFilters
      v-if="isModalFiltersActive"
      v-model:dropdown-game-type="transformedFilters.type"
      v-model:gender="transformedFilters.gender"
      v-model:search="transformedFilters.search"
      v-model:status="transformedFilters.status"
      v-model:location="transformedFilters.location"
      v-model:date-and-time="transformedFilters.date_and_time"
      @close-modal="isModalFiltersActive = false"
      @set-modal-window-filters="setModalFilters"
      :elementsCount="elementsCount"
      @clearFilters="$emit('clearFilters')"
    />
    <div class="b-main-search__wrapper">
      <div class="b-main-search__search-block">
        <div class="b-main-search__first-line">
          <div class="b-main-search__left-block">
            <div
              class="b-main-search__soring-button"
              @click="sortingButtonClick"
            >
              <img :src="sortingBtnData.icon" alt="" />
              <span class="b-main-search__soring-title">
                {{ sortingBtnData.title }}
              </span>
            </div>
            <div class="b-main-search__dropdown-wrapper-tournament">
              <Dropdown
                :check-value-immediate="true"
                :placeholder="$t('events.game-type')"
                :options="sportTypeDropdown"
                :height="32"
                display-value="value"
                display-name="name"
                v-model="transformedFilters.type"
              />
            </div>
          </div>
          <div class="b-main-search__right-block">
            <div class="b-main-search__search-input-desktop">
              <InputComponent
                :title-width="0"
                :placeholder="$t('events.search-events')"
                :height="32"
                :icon="times"
                name="search"
                v-model="transformedFilters.search"
              />
            </div>
            <clear-filters @clear="$emit('clearFilters')"></clear-filters>
            <button-details-filters
              v-model:active="activeFilters"
            ></button-details-filters>
          </div>
        </div>
        <div class="b-main-search__second-line" v-if="activeFilters">
          <div class="b-main-search__left-side">
            <div class="b-main-search__calendar">
              <img src="../../../assets/img/calendar.svg" alt="" />
              <v-date-picker
                locale="ukr"
                :model-config="calendar.modelConfig"
                v-model="transformedFilters.date_and_time"
                is-range
              >
                <template v-slot="options">
                  <div class="flex justify-center items-center">
                    <input
                      :value="options.inputValue.start"
                      v-on="options.inputEvents.start"
                      class="input-left border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                    />
                    -
                    <input
                      :value="options.inputValue.end"
                      v-on="options.inputEvents.end"
                      class="input-right border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                    />
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="b-main-search__dropdown-wrapper-cities">
              <Dropdown
                :check-value-immediate="true"
                :placeholder="$t('events.gender')"
                :options="gender"
                :height="32"
                display-value="value"
                display-name="name"
                v-model="transformedFilters.gender"
              />
            </div>
          </div>
          <div class="b-main-search__right-side">
            <ModalPositionMap
              v-model="transformedFilters.location"
            ></ModalPositionMap>
          </div>
        </div>
      </div>
      <div class="b-main-search__search-block-mob">
        <div class="b-main-search__filters-block">
          <div v-if="!isMobileSearchOpened" class="b-main-search__left-part">
            <div
              class="b-main-search__soring-button"
              @click="sortingButtonClick"
            >
              <img :src="sortingBtnData.icon" alt="" />
              <span class="b-main-search__soring-title">
                {{ sortingBtnData.title }}
              </span>
            </div>
          </div>
          <div class="b-main-search__right-part d-flex align-items-center">
            <div class="b-main-search__search-input me-2">
              <InputComponent
                :title-width="0"
                :placeholder="$t('events.search-events')"
                :height="32"
                :icon="icons.search"
                name="search"
                v-model="transformedFilters.search"
              />
            </div>
            <InputComponent
              v-if="isMobileSearchOpened"
              :title-width="0"
              :placeholder="$t('events.search-events')"
              :height="32"
              :icon="icons.cross"
              name="search"
              v-model="transformedFilters.search"
              @icon-click="closeMobileSearch"
            />
            <InputComponent
              class="b-main-search__search-input-tablet"
              :title-width="0"
              :placeholder="$t('events.search-events')"
              :height="36"
              :icon="icons.search"
              name="search"
              v-model="transformedFilters.search"
            />
            <div
              v-if="!isMobileSearchOpened"
              class="b-main-search__search-icon-mobile"
              @click="openMobileSearch"
            >
              <img :src="icons.search" alt="" />
            </div>
            <div
              class="b-main-search__filtering-block sort-item d-flex align-items-center"
              @click="isModalFiltersActive = true"
            >
              <div
                class="b-main-search__icon d-flex align-items-center justify-content-center"
              >
                <img src="../../../assets/img/set-filter.svg" alt="" />
              </div>
              <div v-if="filterStatus" class="b-main-search-icon-status"></div>
              <div class="b-main-search__text-block">
                <div class="b-main-search__title">
                  {{ $t('events.filters') }}
                </div>
                <span class="b-found-count"
                  >{{ $t('users.found') }} {{ elementsCount }}
                  {{ $t('users.advertisments') }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </filter-block>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

import Slider from '@vueform/slider';

import Dropdown from '../../Forms/Dropdown.vue';
import FilterBlock from '../FilterBlock.vue';
import InputComponent from '../../Forms/InputComponent.vue';
import ButtonDetailsFilters from '../components/ButtonDetailsFilters.vue';
import ClearFilters from '../components/ClearFilters.vue';
import ModalPositionMap from '../../Maps/ModalPositionMap.vue';
import ModalFilters from '../ModalEventsFilters.vue';

import { TransformedFiltersWorker } from './transformed.filters.worker';
import useWindowWidth from '../../../utils/widthScreen';
import useTodaysDate from '../../../utils/todaysDate';

import CONSTANTS from '../../../consts';

import MaleIcon from '../../../assets/img/female-icon.svg';
import FemaleIcon from '../../../assets/img/male-icon.svg';
import UnisexIcon from '../../../assets/img/unisex.svg';
import SearchIcon from '../../../assets/img/search.svg';
import arrowsUpIcon from '../../../assets/img/sort-arrows.svg';
import arrowsDownIcon from '../../../assets/img/sort-arrows-down.svg';
import crossIcon from '../../../assets/img/cross.svg';

export default {
  name: 'EventsFilters',
  components: {
    Dropdown,
    InputComponent,
    Slider,
    ButtonDetailsFilters,
    ClearFilters,
    ModalPositionMap,
    FilterBlock,
    ModalFilters,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        gender: '',
        type: '',
        duration: null,
        date_and_time_before: '',
        date_and_time_after: '',
        need_ball: null,
        search: '',
        status: '',
        ordering: '',
        dist: '',
        point: '',
      }),
    },
    elementsCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:value', 'clearFilters'],
  setup(props, { emit }) {
    const isModalFiltersActive = ref(false);
    const route = useRoute();
    const isMobileSearchOpened = ref(false);
    const todaysDate = useTodaysDate();
    const { isMobile, isTablet, onResize } = useWindowWidth();
    const icons = computed(() => {
      return {
        female: FemaleIcon,
        male: MaleIcon,
        unisex: UnisexIcon,
        search: SearchIcon,
        arrowUp: arrowsUpIcon,
        arrowDown: arrowsDownIcon,
        cross: crossIcon,
      };
    });
    const ordering = computed(() => [{ value: 'id' }, { value: '-id' }]);
    const sortingBtnData = computed(() => {
      return transformedFilters.value.ordering === ordering.value[0].value
        ? { title: 'Cпочатку нові', icon: arrowsUpIcon }
        : { title: 'Cпочатку старі', icon: arrowsDownIcon };
    });
    const gender = computed(() => CONSTANTS.users_page.gender);

    const { activeFilters, updateRealData, transformedFilters } =
      TransformedFiltersWorker({
        props,
        emit,
        isMobile,
        isTablet,
        setupTransformedCallback() {
          const [lng, lat] = props.modelValue?.point?.value?.split?.(',') || [];
          return {
            gender: props.modelValue?.gender?.value,
            type: props.modelValue?.type?.value,
            need_ball: props.modelValue?.need_ball?.value,
            duration: props.modelValue?.duration?.value,
            date_and_time: {
              start: props.modelValue?.date_and_time_after?.value,
              end: props.modelValue?.date_and_time_before?.value,
            },
            ordering: props.modelValue?.ordering?.value,
            search: props.modelValue?.search?.value,
            location: {
              dist: props.modelValue?.dist?.value,
              lat: lat && parseFloat(lat),
              lng: lng && parseFloat(lng),
              place: props.modelValue?.place?.value,
            },
            status: props.modelValue?.status?.value,
          };
        },
        updateRealDataFromTransformed(transformedFilters) {
          return {
            gender: transformedFilters.gender,
            type: transformedFilters.type,
            need_ball: transformedFilters.need_ball,
            duration: transformedFilters.duration,
            date_and_time_before: transformedFilters.date_and_time?.end,
            date_and_time_after: transformedFilters.date_and_time?.start,
            status: transformedFilters.status,
            search: transformedFilters.search,
            ordering: transformedFilters.ordering,
            dist: transformedFilters.location?.dist,
            point:
              transformedFilters.location.lng && transformedFilters.location.lat
                ? `${transformedFilters.location.lng},${transformedFilters.location.lat}`
                : null,
            place: transformedFilters.location.place,
          };
        },
        ifSecondLineWasUsed() {
          return !!(
            props.modelValue.date_and_time_after.value !== todaysDate ||
            props.modelValue.date_and_time_before.value !== todaysDate ||
            props.modelValue.status.value ||
            props.modelValue.place.value
          );
        },
      });

    const sportTypeDropdown = CONSTANTS.event_page.sport_type_dropdown;
    const genderDropdown = CONSTANTS.event_page.gender_dropdown;
    const statusDropdown = CONSTANTS.event_page.status_ropdown;

    const filterStatus = computed(() => {
      return !!(
        route.query.gender ||
        route.query.type ||
        route.query.point ||
        route.query.dist ||
        route.query.date_and_time_before ||
        route.query.date_and_time_after
      );
    });

    const calendar = ref({
      inputMask: 'YYYY-MM-DD',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    });

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    function sortingButtonClick() {
      transformedFilters.value.ordering =
        transformedFilters.value.ordering === 'id' ? '-id' : 'id';
    }
    function setModalFilters() {
      updateRealData();
    }

    function openMobileSearch() {
      isMobileSearchOpened.value = true;
    }

    function closeMobileSearch() {
      isMobileSearchOpened.value = false;
    }

    return {
      sortingButtonClick,
      setModalFilters,
      closeMobileSearch,
      openMobileSearch,
      ordering,
      filterStatus,
      gender,
      activeFilters,
      transformedFilters,
      sportTypeDropdown,
      isMobileSearchOpened,
      genderDropdown,
      statusDropdown,
      calendar,
      icons,
      sortingBtnData,
      isModalFiltersActive,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../../assets/styles/search-event.block.scss';
</style>
