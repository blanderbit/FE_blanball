<template>
  <div class="b-range-filter__slider-wrapper">
    <div class="b-range-filter__slider-title">
      {{ $t('users.age-area') }}
    </div>
    <div class="b-range-filter__left-side">
      <div class="b-range-filter__slider">
        <slider
          class="filter-style"
          :min="6"
          :max="80"
          v-model="rangeValue"
          :tooltips="false"
          @change="onSliderDrag"
        ></slider>
      </div>
    </div>
    <div class="b-range-filter__right-side">{{ minAge }} - {{ maxAge }}</div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Slider from '@vueform/slider'
export default {
  components: {
    Slider,
  },
  emits: ['update:ageRange'],
  props: {
    ageRange: {
      type: Array,
      default: () => [6, 80],
    },
  },
  setup(props, { emit }) {
    const minAge = ref(null)
    const maxAge = ref(null)
    const rangeValue = ref(null)
    rangeValue.value = props.ageRange
    minAge.value = props.ageRange[0]
    maxAge.value = props.ageRange[1]
    watch(
      () => props.ageRange,
      (newVal) => {
        rangeValue.value = newVal
        minAge.value = newVal[0]
        maxAge.value = newVal[1]
      }
    )
    function onSliderDrag(event) {
      minAge.value = event[0]
      maxAge.value = event[1]
      emit('update:ageRange', event)
    }
    return {
      onSliderDrag,
      minAge,
      maxAge,
      rangeValue,
    }
  },
}
</script>

<style scoped lang="scss">
$color-148783: #148783;
$color-1ab2ad: #1ab2ad;
$color-e9fcfb: #e9fcfb;
$color-262541: #262541;
$color-f9f9fc: #f9f9fc;
$color-ffffff: #ffffff;
$color-dfdeed: #dfdeed;
$color-575775: #575775;
.filter-style {
  --slider-connect-bg: $color-148783;
  --slider-height: 2px;
  --slider-handle-border: 4px solid $color-1ab2ad;
  --slider-handle-shadow: 0.5px 0.5px 2px 1px $color-e9fcfb;
}
.b-range-filter__slider-wrapper {
  display: flex;
  position: relative;
  .b-range-filter__slider-title {
    position: absolute;
    top: -12px;
    left: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: $color-262541;
    padding: 0px 4px;
    background: $color-f9f9fc;
    border-radius: 4px;
    z-index: 1;
  }
  .b-range-filter__left-side {
    background: $color-ffffff;
    padding: 0 12px;
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid $color-dfdeed;
    border-radius: 6px 0 0 6px;
    .b-range-filter__slider {
      width: 100%;
    }
  }
  .b-range-filter__right-side {
    border-top: 1px solid $color-dfdeed;
    border-right: 1px solid $color-dfdeed;
    border-bottom: 1px solid $color-dfdeed;
    background: $color-ffffff;
    padding: 6px 12px;
    border-radius: 0 6px 6px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: $color-575775;
    min-width: 76px;
  }
}
</style>