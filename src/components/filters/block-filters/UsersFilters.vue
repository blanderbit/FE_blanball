<template>
  <filter-block>
    <ModalFilters
      v-if="isModalFiltersActive"
      v-model:dropdown-position="transformedFilters.profile__position"
      v-model:range-slider="transformedFilters.profile__age"
      v-model:gender="transformedFilters.profile__gender"
      @close-modal="isModalFiltersActive = false"
      @set-modal-window-filters="setModalFilters"
      @clearFilters="$emit('clearFilters')"
    />
    <div class="b-users-filters">
      <div class="b-users-filters__first-line">
        <div class="b-users-filters__left-part d-flex">
          <div class="b-users-filters__dropdown-sorting">
            <dropdown
              :check-value-immediate="true"
              :options="ordering"
              :placeholder="$t('users.sorting')"
              :height="32"
              display-name="name"
              display-value="value"
              v-model="transformedFilters.ordering"
              name="sorting"
            >
            </dropdown>
          </div>
          <div class="b-users-filters__dropdown-position">
            <dropdown
              :check-value-immediate="true"
              :options="positions"
              :placeholder="$t('users.position')"
              :height="32"
              display-name="name"
              display-value="value"
              v-model="transformedFilters.profile__position"
              name="position"
            >
            </dropdown>
          </div>
          <div class="b-users-filters__dropdown-gender">
            <dropdown
              :check-value-immediate="true"
              :options="gender"
              :placeholder="$t('users.gender')"
              :height="32"
              display-name="name"
              display-value="value"
              v-model="transformedFilters.profile__gender"
              name="gender"
            >
            </dropdown>
          </div>
        </div>
        <div class="b-users-filters__right-part d-flex">
          <div class="b-users-filters__input">
            <input-component
              :placeholder="$t('users.users-search')"
              :height="32"
              :title-width="0"
              :icon="icons.search"
              v-model="transformedFilters.search"
              name="search"
            ></input-component>
          </div>
          <clear-filters @clear="$emit('clearFilters')"></clear-filters>
          <button-details-filters
            v-model:active="activeFilters"
          ></button-details-filters>
        </div>
      </div>
      <div class="b-users-filters__second-line" v-if="activeFilters">
        <div class="b-users-filters__age-filter-wrapp">
          <RangeFilter v-model:age-range="transformedFilters.profile__age" />
        </div>
        <!-- <checkbox v-model:checked="transformedFilters.is_online"></checkbox> -->
        <!--<modal-position-map></modal-position-map>-->
      </div>
      <div class="b-users-filters__mob-line">
        <div class="b-users-filters__sorting">
          <dropdown
            :check-value-immediate="true"
            :options="ordering"
            :height="32"
            :placeholder="$t('users.sorting')"
            display-name="name"
            display-value="value"
            v-model="transformedFilters.ordering"
            name="sorting"
          >
          </dropdown>
        </div>
        <div class="b-users-filters__fitering">
          <div
            class="b-users-filters__icon"
            @click="isModalFiltersActive = true"
          >
            <img src="../../../assets/img/set-filter.svg" alt="" />
          </div>
          <div class="b-users-filters__text-block">
            <div class="b-users-filters__title">
              {{ $t('users.filters') }}
            </div>
            <div class="b-users-filters__text">
              {{ $t('users.found') }}
              15
              {{ $t('users.advertisments') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </filter-block>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

import RangeFilter from '../../filters/components/RangeFilter.vue'
import Dropdown from '../../forms/Dropdown.vue'
import FilterBlock from '../FilterBlock.vue'
import InputComponent from '../../forms/InputComponent.vue'
import Checkbox from '../../forms/Checkbox.vue'
import ButtonDetailsFilters from '../components/ButtonDetailsFilters.vue'
import ClearFilters from '../components/ClearFilters.vue'
import ModalPositionMap from '../../maps/ModalPositionMap.vue'
import ModalFilters from '../ModalUsersFilters.vue'

import { TransformedFiltersWorker } from './transformed.filters.worker'
import useWindowWidth from '../../../utils/widthScreen'

import CONSTANTS from '../../../consts'

import SearchIcon from '../../../assets/img/search.svg'
import ArrowTopIcon from '../../../assets/img/arrow-top.svg'
import ArrowDownIcon from '../../../assets/img/arrow-down2.svg'


export default {
  name: 'UsersFilters',
  components: {
    Checkbox,
    Dropdown,
    InputComponent,
    ButtonDetailsFilters,
    ClearFilters,
    ModalPositionMap,
    FilterBlock,
    RangeFilter,
    ModalFilters,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        profile__gender: '',
        profile__age_min: 6,
        profile__age_max: 80,
        is_online: null,
        search: '',
        profile__position: '',
        ordering: '',
        dist: '',
        point: [],
      }),
    },
  },
  emits: ['update:value', 'clearFilters'],
  setup(props, { emit }) {
    const { isMobile, isTablet, onResize } = useWindowWidth()
    const isModalFiltersActive = ref(false)
    const calendar = ref({
      inputMask: 'YYYY-MM-DD',
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD', // Uses 'iso' if missing
      },
    })

    const icons = computed(() => {
      return {
        search: SearchIcon,
        arrowDown: ArrowDownIcon,
        arrowTop: ArrowTopIcon,
      }
    })
    const positions = computed(() => CONSTANTS.profile.position)
    const gender = computed(() => CONSTANTS.users_page.gender)
    const ordering = computed(() => [
      {
        value: 'id',
        name: 'айди',
        iconSrc: icons.value.arrowTop,
      },
      {
        value: 'profile__age',
        name: 'возраст',
        iconSrc: icons.value.arrowTop,
      },
      {
        value: 'raiting',
        name: 'рейтинг',
        iconSrc: icons.value.arrowTop,
      },
      {
        value: '-id',
        name: 'айди',
        iconSrc: icons.value.arrowDown,
      },
      {
        value: '-profile__age',
        name: 'возраст',
        iconSrc: icons.value.arrowDown,
      },
      {
        value: '-raiting',
        name: 'рейтинг',
        iconSrc: icons.value.arrowDown,
      },
    ])

    const { activeFilters, transformedFilters, updateRealData } =
      TransformedFiltersWorker({
        props,
        emit,
        isMobile,
        isTablet,
        setupTransformedCallback() {
          return {
            profile__gender: props.modelValue.profile__gender.value,
            profile__position: props.modelValue.profile__position.value,
            profile__age: [
              props.modelValue.profile__age_min.value ||
                props.modelValue.profile__age_min.default,
              props.modelValue.profile__age_max.value ||
                props.modelValue.profile__age_max.default,
            ],
            ordering: props.modelValue.ordering.value,
            search: props.modelValue.search.value,
            place: {
              dist: props.modelValue?.dist?.value,
              point: props.modelValue?.point?.value,
            },
            is_online: props.modelValue.is_online.value,
          }
        },
        updateRealDataFromTransformed(transformedFilters) {
          return {
            profile__gender: transformedFilters.profile__gender,
            profile__age_min: transformedFilters.profile__age[0],
            profile__age_max: transformedFilters.profile__age[1],
            is_online: transformedFilters.is_online,
            profile__position: transformedFilters.profile__position,
            search: transformedFilters.search,
            ordering: transformedFilters.ordering,
            dist: transformedFilters.place.dist,
            point: transformedFilters.place.point,
          }
        },
        ifSecondLineWasUsed() {
          if (
            props.modelValue.profile__age_min.value ||
            props.modelValue.profile__age_max.value
          ) {
            return !(
              props.modelValue.profile__age_min.value ===
                props.modelValue.profile__age_min.default &&
              props.modelValue.profile__age_max.value ===
                props.modelValue.profile__age_max.default
            )
          } else {
            return false
          }
        },
      })

    onMounted(() => {
      window.addEventListener('resize', onResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize)
    })

    function setModalFilters() {
      updateRealData()
    }

    return {
      setModalFilters,
      ordering,
      gender,
      positions,
      activeFilters,
      transformedFilters,
      icons,
      isModalFiltersActive,
      calendar,
    }
  },
}
</script>

<style scoped lang="scss">

// SCSS variables for hex colors
 $color-fafafa: #fafafa;

.b-users-filters {
  * {
    z-index: 10;
  }
  &__first-line {
    display: flex;
    justify-content: space-between;
    @media (max-width: 992px) {
      display: none;
    }
    .b-users-filters__left-part {
      .b-users-filters__dropdown-sorting,
      .b-users-filters__dropdown-position,
      .b-users-filters__dropdown-gender {
        width: 132px;
        height: 32px;
        margin-right: 20px;
      }
    }
    .b-users-filters__right-part {
      .b-users-filters__input {
        margin-right: 8px;
      }
    }
  }
  &__second-line {
    margin-top: 30px;
    @include tabletAndMobile {
      display: none;
    }
    .b-users-filters__age-filter-wrapp {
      width: 300px;
    }
  }
  &__mob-line {
    display: none;
    justify-content: space-between;
    @include tablet {
      justify-content: flex-start;
    }
    @media (max-width: 992px) {
      display: flex;
    }
    .b-users-filters__sorting {
      width: 160px;
    }
    .b-users-filters__fitering {
      display: flex;
      width: 180px;

      @include tablet {
        margin-left: 50px;
      }

      .b-users-filters__icon {
        width: 36px;
        min-width: 36px;
        height: 36px;
        background: $color-fafafa;
        border-radius: 6px;
        margin-right: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .b-users-filters__text-block {
        .b-users-filters__title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: $--b-main-black-color;
        }
        .b-users-filters__text {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: $--b-main-gray-color;
        }
      }
    }
  }
}
</style>
