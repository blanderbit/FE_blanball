<template>
  <filter-block>
    <div class="b-main-search__wrapper">
      <div class="b-main-search__search-block">
        <div class="b-main-search__first-line">
          <div class="b-main-search__left-block">
            <!--<div class="b-main-search__old-new-filter">-->
              <!--<img src="../../../assets/img/sort-arrows.svg" alt="" />-->
              <!--{{$t('events.new-first')}}-->
            <!--</div>-->
            <div class="b-main-search__dropdown-wrapper-game">
              <Dropdown
                  :main-title="$t('events.gender')"
                  :placeholder="$t('events.gender')"
                  :options="gender"
                  display-value="value"
                  v-model="transformedFilters.gender"
              />
            </div>
            <div class="b-main-search__dropdown-wrapper-tournament">
              <Dropdown
                  :main-title="$t('events.game-type')"
                  :placeholder="$t('events.game-type')"
                  :options="sportTypeDropdown"
                  display-value="value"
                  v-model="transformedFilters.type"
              />
            </div>
          </div>
          <div class="b-main-search__right-block">
            <div class="b-main-search__search-input-desktop">
              <InputComponent
                  :title-width="0"
                  :placeholder="$t('events.search-events')"
                  :icon="searchIcon"
                  name="search"
                  v-model="transformedFilters.search"
              />
            </div>
            <div class="b-main-search__search-input-tablet">
              <img src="../../../assets/img/search.svg" alt="" />
            </div>
            <clear-filters @clear="$emit('clearFilters')"></clear-filters>
            <button-details-filters v-model:active="activeFilters"></button-details-filters>
          </div>
        </div>
        <div class="b-main-search__second-line" v-if="activeFilters">
          <div class="b-main-search__left-side">
            <div class="b-main-search__dropdown-wrapper-gender">
              <Dropdown
                  :options="ordering"
                  display-value="value"
                  v-model="transformedFilters.ordering"
              >
                <template #drop-icon>
                  <img src="../../../assets/img/male-icon.svg" alt="" />
                </template>
              </Dropdown>
            </div>
            <div class="b-main-search__calendar">
              <img src="../../../assets/img/calendar.svg" alt="" />
              <v-date-picker locale="ukr" :model-config="calendar.modelConfig" v-model="transformedFilters.date_and_time" is-range>
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="flex justify-center items-center">
                    <input
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                        class="
                      input-left
                      border
                      px-2
                      py-1
                      w-32
                      rounded
                      focus:outline-none focus:border-indigo-300
                    "
                    />
                    -
                    <input
                        :value="inputValue.end"
                        v-on="inputEvents.end"
                        class="
                      input-right
                      border
                      px-2
                      py-1
                      w-32
                      rounded
                      focus:outline-none focus:border-indigo-300
                    "
                    />
                  </div>
                </template>
              </v-date-picker>
            </div>
            <div class="b-main-search__dropdown-wrapper-cities">
              <Dropdown
                  :options="statusDropdown"
                  display-value="value"
                  v-model="transformedFilters.status"
              >
              </Dropdown>
            </div>
          </div>
          <!--<div class="b-main-search__right-side">-->
            <!--<div class="b-main-search__free-pay-games">-->
              <!--<div-->
                  <!--:class="[-->
                <!--'b-main-search__grey-block',-->
                <!--plan === 'free' ? 'right' : 'left',-->
              <!--]"-->
              <!--&gt;</div>-->
              <!--<div class="b-main-search__all" @click="changePlanSearch('all')">-->
                <!--{{ $t('events.all') }}-->
              <!--</div>-->
              <!--<div class="b-main-search__free" @click="changePlanSearch('free')">-->
                <!--{{ $t('events.free') }}-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="b-main-search__search-block-mob">
        <div class="b-main-search__filters-block">
          <div class="b-main-search__sorting-block sort-item">
            <div class="b-main-search__icon">
              <img src="../../../assets/img/sort-arrows.svg" alt="" />
            </div>
            <div class="b-main-search__text">
              <div class="b-main-search__title">{{ $t('events.sorting') }}</div>
              <div class="b-main-search__terms">{{ $t('events.first-new') }}</div>
            </div>
          </div>
          <div class="b-main-search__filtering-block sort-item">
            <div class="b-main-search__icon">
              <img src="../../../assets/img/set-filter.svg" alt="" />
            </div>
            <div class="b-main-search__text">
              <div class="b-main-search__title">{{ $t('events.filters') }}</div>
              <div class="b-main-search__terms">
                {{ $t('events.found') }} 15 {{ $t('events.advertisments') }}
              </div>
            </div>
          </div>
          <div class="b-main-search__calendar-block sort-item">
            <div class="b-main-search__icon">
              <img src="../../../assets/img/calendar.svg" alt="" />
            </div>
            <div class="b-main-search__text">
              <div class="b-main-search__title">
                {{ $t('events.chose-date') }}
              </div>
              <div class="b-main-search__terms">19, 23 черв. 2022</div>
            </div>
          </div>
        </div>
        <div class="b-main-search__dates-block">
          <div class="b-main-search__months">
            <div class="b-main-search__wrapper">
              <div class="b-main-search__arrow arrow-left">
                <img src="../../../assets/img/arrow-left.svg" alt="" />
              </div>
              <div class="b-main-search__main-part">
                {{ $t('events.months.June') }} 2022
              </div>
              <div class="b-main-search__arrow arrow-right">
                <img src="../../../assets/img/arrow-right.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </filter-block>
</template>

<script>


  import { computed, reactive, watch, ref } from 'vue'

  import Dropdown from '../../forms/Dropdown.vue'
  import FilterBlock from '../FilterBlock.vue'
  import InputComponent from '../../forms/InputComponent.vue'
  import ButtonDetailsFilters from '../components/ButtonDetailsFilters.vue'
  import ClearFilters from '../components/ClearFilters.vue'
  import ModalPositionMap from '../../maps/ModalPositionMap.vue'
  import Slider from '@vueform/slider'
  import {cloneDeep, isEqual} from 'lodash'
  import { TransformedFiltersWorker } from "./transformed.filters.worker";
  import CONSTANTS from "../../../consts";
  import dayjs from 'dayjs'
  import dayjsUkrLocale from 'dayjs/locale/uk'
  export default {
    name: "UsersFilters",
    components: {
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
          point: []
        })
      }
    },
    emits: ['update:value', 'clearFilters'],
    setup(props, {emit}) {
      const ordering = computed(() => [
        {value: 'id'},
        {value: '-id'},
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
            gender: props.modelValue.gender.value,
            type: props.modelValue.type.value,
            need_ball: props.modelValue.need_ball.value,
            duration: props.modelValue.duration.value,
            date_and_time: {
              start: props.modelValue.date_and_time_after.value,
              end: props.modelValue.date_and_time_before.value
            },
            ordering: props.modelValue.ordering.value,
            search: props.modelValue.search.value,
            place: {
              dist: props.modelValue?.dist?.value,
              point: props.modelValue?.point?.value
            },
            status: props.modelValue.status.value
          }
        },
        updateRealDataFromTransformed(transformedFilters){
          return  {
            gender: transformedFilters.gender,
            type: transformedFilters.type,
            need_ball: transformedFilters.need_ball,
            duration: transformedFilters.duration,
            date_and_time_before: transformedFilters.date_and_time.end,
            date_and_time_after: transformedFilters.date_and_time.start,
            status: transformedFilters.status,
            search: transformedFilters.search,
            ordering: transformedFilters.ordering,
            dist: transformedFilters.place.dist,
            point: transformedFilters.place.point
          }
        }
      });

      const sportTypeDropdown = CONSTANTS.event_page.sport_type_dropdown;
      const genderDropdown = CONSTANTS.event_page.gender_dropdown;
      const statusDropdown = [
        {value: 'Planned'},
        {value: 'Active'},
        {value: 'Finished'}
      ];

      const  calendar = ref( {
        inputMask: 'YYYY-MM-DD',
        modelConfig: {
          type: 'string',
          mask: 'YYYY-MM-DD', // Uses 'iso' if missing
        },
      })
      return {
        ordering,
        gender,
        activeFilters,
        transformedFilters,
        sportTypeDropdown,
        genderDropdown,
        statusDropdown,
        calendar
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../assets/search-event-block-styles/index.scss';
</style>
