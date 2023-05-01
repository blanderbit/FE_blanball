<template>
  <filter-block>
    <ModalFilters
      v-if="isModalFiltersActive"
      v-model:dropdown-position="transformedFilters.profile__position"
      v-model:range-slider="transformedFilters.profile__age"
      v-model:gender="transformedFilters.profile__gender"
      :elementsCount="elementsCount"
      @closeModal="isModalFiltersActive = false"
      @setModalWindowFilters="setModalFilters"
      @clearFilters="$emit('clearFilters')"
    />
    <div class="b-main-search__wrapper">
      <slot name="tabs"></slot>
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
              <dropdown
                :check-value-immediate="true"
                :options="gender"
                :placeholder="$t('users.gender')"
                :height="32"
                display-name="name"
                :backgroundColor="'#fff'"
                display-value="value"
                v-model="transformedFilters.profile__gender"
                name="gender"
              />
            </div>
          </div>
          <div class="b-main-search__right-block">
            <div class="b-main-search__search-input-desktop">
              <MainInput
                :title-width="0"
                :placeholder="$t('users.users-search')"
                inputMode="search"
                :height="32"
                :icon="icons.search"
                :backgroundColor="'#fff'"
                name="search"
                v-model="transformedFilters.search"
              />
            </div>
            <clear-filters @clear="clearFilters"></clear-filters>
            <button-details-filters
              v-model:active="activeFilters"
            ></button-details-filters>
          </div>
        </div>
        <div class="b-main-search__second-line" v-if="activeFilters">
          <div class="b-main-search__left-side">
            <div class="b-users-filters__age-filter-wrap">
              <RangeFilter
                v-model:age-range="transformedFilters.profile__age"
              />
            </div>
            <div class="b-main-search__dropdown-wrapper-cities">
              <dropdown
                :check-value-immediate="true"
                :options="positions"
                :placeholder="$t('users.gaming-position')"
                :height="32"
                :backgroundColor="'#fff'"
                display-name="name"
                display-value="value"
                v-model="transformedFilters.profile__position"
                name="position"
              />
            </div>
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
              <MainInput
                :title-width="0"
                :placeholder="$t('users.users-search')"
                inputMode="search"
                :height="32"
                :backgroundColor="'#fff'"
                :icon="icons.search"
                name="search"
                v-model="transformedFilters.search"
              />
            </div>
            <MainInput
              v-if="isMobileSearchOpened"
              :title-width="0"
              :placeholder="$t('users.users-search')"
              inputMode="search"
              :height="32"
              :backgroundColor="'#fff'"
              :icon="icons.cross"
              name="search"
              v-model="transformedFilters.search"
              @icon-click="closeMobileSearch"
            />
            <MainInput
              class="b-main-search__search-input-tablet"
              :title-width="0"
              :placeholder="$t('users.users-search')"
              inputMode="search"
              :height="36"
              :backgroundColor="'#fff'"
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
                  {{ $t('users.filters') }}
                </div>
                <span class="b-found-count">
                  {{ $t('users.found-users', { count: elementsCount }) }}
                </span>
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

import dropdown from '../../shared/dropdown/Dropdown.vue';
import FilterBlock from '../FilterBlock.vue';
import MainInput from '../../shared/input/MainInput.vue';
import ButtonDetailsFilters from '../components/ButtonDetailsFilters.vue';
import ClearFilters from '../components/ClearFilters.vue';
import ModalFilters from '../ModalUsersFilters.vue';
import RangeFilter from '../components/RangeFilter.vue';

import { TransformedFiltersWorker } from './transformed.filters.worker';
import useWindowWidth from '../../../utils/widthScreen';

import CONSTANTS from '../../../consts';

import SearchIcon from '../../../assets/img/search.svg';
import arrowsUpIcon from '../../../assets/img/sort-arrows.svg';
import arrowsDownIcon from '../../../assets/img/sort-arrows-down.svg';
import crossIcon from '../../../assets/img/cross.svg';

export default {
  name: 'EventsFilters',
  components: {
    dropdown,
    MainInput,
    ButtonDetailsFilters,
    ClearFilters,
    RangeFilter,
    FilterBlock,
    ModalFilters,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        profile__gender: '',
        profile__age_min: '',
        profile__age_max: '',
        is_online: null,
        search: '',
        profile__position: '',
        ordering: '',
        dist: '',
        point: [],
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
    const { isMobile, isTablet, onResize } = useWindowWidth();
    const icons = computed(() => {
      return {
        search: SearchIcon,
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
    const positions = computed(() => CONSTANTS.profile.position);

    const { activeFilters, updateRealData, transformedFilters } =
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
          };
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
          };
        },
        ifSecondLineWasUsed() {
          return true
        },
      });

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

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    function clearFilters() {
      emit('clearFilters');
    }

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
      clearFilters,
      openMobileSearch,
      ordering,
      filterStatus,
      gender,
      activeFilters,
      transformedFilters,
      positions,
      isMobileSearchOpened,
      icons,
      sortingBtnData,
      isModalFiltersActive,
    };
  },
};
</script>

<style scoped lang="scss">
@import '../../../assets/styles/search-event.block.scss';

:deep(.b-main-search__second-line) {
  margin-top: 15px !important;
}

:deep(.b-main-search__wrapper) {
  margin-top: 0px;
}
</style>
