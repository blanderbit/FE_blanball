<template>
  <div class="first-step">
    <Dropdown
      :outside-title="true"
      :main-title="$t('events.event-type')"
      :options="typeOfEventDropdown"
      :width="320"
      :height="40"
      @new-value="$emit('dropdown-form-value', 'title', $event)"
    />
    <div class="title">{{ $t('events.gender') }}</div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <input 
          id="radio-1" 
          v-model="secondLabel"
          name="radio" 
          type="radio"
          :value="$t('events.men')"
          checked
          >
        <label for="radio-1" class="radio-label">
          <img src="../../assets/img/male-icon.svg" alt="">
          {{ $t('events.men') }}
        </label>
      </div>
      <div class="radio">
        <input 
          id="radio-2" 
          v-model="secondLabel"
          name="radio" 
          type="radio"
          :value="$t('events.women')"
        >
        <label for="radio-2" class="radio-label">
          <img src="../../assets/img/female-icon.svg" alt="">
          {{ $t('events.women') }}
        </label>
      </div>
    </div>
    <Dropdown
      :outside-title="true"
      :main-title="$t('events.sport-type')"
      :options="typeOfSportDropdown"
      :width="320"
      :height="40"
      @new-value="$emit('dropdown-form-value', 'labels', $event, 0)"
    />
    <div class="time-and-date">
      <div class="input">
        <InputComponent
          :outside-title="true"
          :title="$t('events.date')"
          :placeholder="'02.09.2022'"
          :title-width="0"
          :has-icon="true"
          :icon="[
            '../../assets/img/calendar.svg'
          ]"
          @new-value="this.$emit('setEventData', 'date', $event)"
        />
      </div>
      <div class="input">
        <InputComponent
          :outside-title="true"
          :title="$t('events.time')"
          :placeholder="'17:00'"
          :title-width="0"
          :has-icon="true"
          :icon="[
            '../../assets/img/watch.svg'
          ]"
          @new-value="this.$emit('setEventData', 'time', $event)"
        />
      </div>
    </div>
    <div class="input-location">
      <InputComponent
        :placeholder="$t('events.place')"
        :title-width="0"
        :has-icon="true"
        :icon="[
          '../../assets/img/location-point.svg'
        ]"
        @new-value="this.$emit('setEventData', 'place', $event)"
      />
    </div>
    <div class="event-map">
      <img src="../../assets/img/map-manage-event.svg" alt="">
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

import Dropdown from '../forms/Dropdown.vue'
import InputComponent from '../forms/InputComponent.vue'

export default {
  components: {
    Dropdown,
    InputComponent
  },
  props: {
    typeOfEventDropdown: {
      type: Array,
      default: () => []
    },
    typeOfSportDropdown: {
      type: Array,
      default: () => []
    }
  },
  emit: ['setEventData'],
  setup(props, {emit}) {
    const secondLabel = ref(null)

    watch(secondLabel, (newVal, oldVal) => {
      if (!(newVal === oldVal)) {
        emit('setEventData', 'labels', newVal, 1)
      }
    })

    return {
      secondLabel
    }
  }
}
</script>

<style lang="scss" scoped>
  .first-step {
    .time-and-date {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .input {
        width: 154px;
        height: 40px;
        margin-top: 16px;
      }
    }
    .input-location {
      width: 100%;
      height: 40px;
      margin-top: 16px;
    }
    .title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #262541;
      margin-bottom: 8px;
    }
    .radio-btn-wrapper {
      $color1: #f4f4f4;
      $color2: #148783;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .radio {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        background: #FFFFFF;
        border: 1px solid #DFDEED;
        border-radius: 6px;
        min-width: 154px;
        input[type="radio"] {
          position: absolute;
          opacity: 0;
          + .radio-label {
            display: flex;
            align-items: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            text-transform: capitalize;
            color: #262541;
            img {
              margin-right: 4px;
            }
            &:after {
              content: '';
              border-radius: 100%;
              border: 1px solid #262541;
              display: inline-block;
              width: 13px;
              height: 13px;
              position: relative;
              top: 0px;
              margin-left: 12px; 
              vertical-align: top;
              cursor: pointer;
              text-align: center;
              transition: all 250ms ease;
            }
          }
          &:checked {
            + .radio-label {
              &:after {
                border: 1px solid $color2;
                background-color: $color2;
                box-shadow: inset 0 0 0 3px $color1;
              }
            }
          }
          &:focus {
            + .radio-label {
              &:before {
                outline: none;
                border-color: $color2;
              }
            }
          }
          &:disabled {
            + .radio-label {
              &:before {
                box-shadow: inset 0 0 0 4px $color1;
                border-color: darken($color1, 25%);
                background: darken($color1, 25%);
              }
            }
          }
          + .radio-label {
            &:empty {
              &:before {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    .event-map {
      margin-top: 16px;
    }
  }
</style>