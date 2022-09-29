<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">
        Давайте знайомитись!     
      </div>
      <div class="b-register-step__progress-line">
        <div class="b-register-step__sections">
          <div
            v-for="item of 3"
            :key="item"
            :class="[
              'b-register-step__section', 
              { active: item === 1 }
              ]"
          ></div>
        </div>
      </div>
      <div class="b-register-step__small-title">
        Коли ви народилися?
      </div>
      <div class="b-register-step__date-block">
        <div class="b-register-step__dropdown">
          <Dropdown 
            :outside-title="true"
            :main-title="'День'"
            :options="mockData.days"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown 
            :outside-title="true"
            :main-title="'Місяць'"
            :options="mockData.months"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown 
            :outside-title="true"
            :main-title="'Рік'"
            :options="mockData.years"
          />
        </div>
      </div>
      <div class="b-register-step__small-title">
        Ви ідентифікуєте себе як ... ?
      </div>
      <div class="b-register-step__gender-block">
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input 
              id="radio-1" 
              name="gender" 
              type="radio"
              value="Чоловіки"
              checked
             >
            <label for="radio-1" class="radio-label">
              Чоловіки
              <img src="../../assets/img/male-icon.svg" alt="">
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-2" 
              name="gender" 
              type="radio"
              value="Жінки"
            >
            <label for="radio-2" class="radio-label">
              Жінки
              <img src="../../assets/img/female-icon.svg" alt="">
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="b-register-step__buttons">
      <div 
        class="b-register-step__back-btn"
        @click="$emit('decrementStep')"
      >
        Повернутися назад
      </div>
      <GreenBtn
        :text="'Далі'"
        :width="156"
        :height="40"
        :icon-right="arrow_right"
        :is-icon-and-text-apart="true"
        @click-function="$emit('incrementStep')"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import GreenBtn from '../GreenBtn.vue'
import Dropdown from '../Dropdown.vue'

import arrowRight from '../../assets/img/arrow-right-white.svg'

import CONSTANTS from '../../consts/index'

export default {
  name: 'Step4',
  components: {
    GreenBtn,
    Dropdown
  },
  setup() {
    const arrow_right = computed(() => {
      return arrowRight
    })
    const mockData = computed(() => {
      return {
        days: CONSTANTS.register.days,
        months: CONSTANTS.register.months,
        years: CONSTANTS.register.years
      }
    })
    const genderRadio = ref('')

    return {
      arrow_right,
      mockData,
      genderRadio
    }
  },
}
</script>

<style lang="scss" scoped>
.b-register-step {
  padding: 44px 24px 72px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 576px) {
    padding: 44px 0px 72px 0px;
  }
  .b-register-step__top-part {
    .b-register-step__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: #262541;
      @media (max-width: 576px) {
        text-align: center;
      }
    }
    .b-register-step__progress-line {
      margin-top: 16px;
      margin-bottom: 28px;
      .b-register-step__sections {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 576px) {
          width: 266px;
          margin: 0 auto;
        }
        .b-register-step__section {
          width: 33%;
          height: 4px;
          background: #efeff6;
          border-radius: 2px;
          &.active {
            background: #1ab2ad;
          }
        }
      }
    }
  }
  .b-register-step__small-title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #262541;
  }
  .b-register-step__date-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .b-register-step__dropdown {
      width: 120px;
      @media (min-width: 576px) and (max-width: 992px) {
        width: 133px;
      }
      @media (max-width: 576px) {
        width: 104px;
      }
    }
  }
  .b-register-step__gender-block {
    margin-top: 12px;
    .radio-btn-wrapper {
      $color1: #f4f4f4;
      $color2: #148783;
      display: flex;
      align-items: center;
      .radio {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        background: #FFFFFF;
        border: 1px solid #DFDEED;
        border-radius: 6px;
        margin-right: 12px;
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
            justify-content: space-between;
            width: 120px;
            img {
              margin-right: 4px;
            }
            &::before {
              content: '';
              border-radius: 100%;
              border: 1px solid #262541;
              display: inline-block;
              width: 13px;
              height: 13px;
              position: relative;
              top: 0px;
              vertical-align: top;
              cursor: pointer;
              text-align: center;
              transition: all 250ms ease;
            }
          }
          &:checked {
            + .radio-label {
              &:before {
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
  }
  .b-register-step__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .b-register-step__back-btn {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #575775;
      cursor: pointer;
    }
  }
}
</style>