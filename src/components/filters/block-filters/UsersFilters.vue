<template>
  <filter-block>
    <div class="b-users-filters">
      <div class="b-users-filters__first-line d-flex justify-content-between">
        <div class="b-users-filters__left-part d-flex">
          <dropdown
              main-title="ordering"
              :options="ordering"
              display-name="value"
              display-value="value"
              v-model="transformedFilters.ordering"
              name="year"
          >
          </dropdown>
          <dropdown
              main-title="positions"
              :options="positions"
              display-name="value"
              display-value="value"
              v-model="transformedFilters.profile__position"
              name="year"
          >
          </dropdown>
          <dropdown
              main-title="$t('register.year')"
              :options="gender"
              display-name="value"
              display-value="value"
              v-model="transformedFilters.profile__gender"
              name="year">
          </dropdown>

        </div>
        <div class="b-users-filters__right-part d-flex">
          <input-component
              placeholder="search"
              :title-width="0"
              v-model="transformedFilters.search"
              name="search"
          ></input-component>
          <clear-filters @clear="$emit('clearFilters')"></clear-filters>
          <button-details-filters v-model:active="activeFilters"></button-details-filters>
        </div>
      </div>
      <div class="b-users-filters__second-line" v-if="activeFilters">
        <slider :min="6" :max="80" v-model="transformedFilters.profile__age"></slider>
        <checkbox v-model:checked="transformedFilters.is_online"></checkbox>
        <!--<modal-position-map></modal-position-map>-->

      </div>
    </div>
  </filter-block>
</template>

<script>


  import { computed, reactive, watch, ref } from 'vue'

  import Dropdown from '../../forms/Dropdown.vue'
  import FilterBlock from '../FilterBlock.vue'
  import InputComponent from '../../forms/InputComponent.vue'
  import Checkbox from '../../forms/Checkbox.vue'
  import ButtonDetailsFilters from '../components/ButtonDetailsFilters.vue'
  import ClearFilters from '../components/ClearFilters.vue'
  import ModalPositionMap from '../../maps/ModalPositionMap.vue'
  import Slider from '@vueform/slider'
  import {cloneDeep, isEqual} from 'lodash'
  import { TransformedFiltersWorker } from "./transformed.filters.worker";
  import CONSTANTS from "../../../consts";
  export default {
    name: "UsersFilters",
    components: {
      Checkbox,
      Dropdown,
      InputComponent,
      Slider,
      ButtonDetailsFilters,
      ClearFilters,
      ModalPositionMap,
      FilterBlock
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
          point: []
        })
      }
    },
    emits: ['update:value', 'clearFilters'],
    setup(props, {emit}) {
      const positions = computed(() => CONSTANTS.profile.position);
      const ordering = computed(() => [
        {value: 'id'},
        {value: 'profile__age'},
        {value: 'raiting'},
        {value: '-id'},
        {value: '-profile__age'},
        {value: '-raiting'},
      ]);
      const gender = computed(() => [
        {value: 'Man'},
        {value: 'Woman'}
      ]);

      const { activeFilters, transformedFilters } = TransformedFiltersWorker({
        props,
        emit,
        setupTransformedCallback() {
          return {
            profile__gender: props.modelValue.profile__gender.value,
            profile__position: props.modelValue.profile__position.value,
            profile__age: [
              props.modelValue.profile__age_min.value || props.modelValue.profile__age_min.default,
              props.modelValue.profile__age_max.value || props.modelValue.profile__age_max.default
            ],
            ordering: props.modelValue.ordering.value,
            search: props.modelValue.search.value,
            place: {dist: props.modelValue?.dist?.value, point: props.modelValue?.point?.value},
            is_online: props.modelValue.is_online.value
          }
        },
        updateRealDataFromTransformed(transformedFilters){
          return  {
            profile__gender: transformedFilters.profile__gender,
            profile__age_min: transformedFilters.profile__age[0],
            profile__age_max: transformedFilters.profile__age[1],
            is_online: transformedFilters.is_online,
            profile__position: transformedFilters.profile__position,
            search: transformedFilters.search,
            ordering: transformedFilters.ordering,
            dist: transformedFilters.place.dist,
            point: transformedFilters.place.point
          }
        }
      });

      return {
        ordering,
        gender,
        positions,
        activeFilters,
        transformedFilters
      }
    }
  }
</script>

<style scoped lang="scss">


  .b-users-filters {
    * {
      z-index: 10;
    }
  }
</style>