<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">
        {{$t('register.get-acquainted')}}   
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
        {{$t('register.birth-date')}}
      </div>
      <div class="b-register-step__date-block">
        <div class="b-register-step__dropdown">
          <Dropdown 
            :main-title="$t('register.day')"
            :options="mockData.days"
            display-name="value"
            display-value="id"
            name="day"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown 
            :main-title="$t('register.month')"
            :options="mockData.months"
            display-name="value"
            display-value="id"
            name="month"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown 
            :main-title="$t('register.year')"
            :options="mockData.years"
            display-name="value"
            display-value="value"
            name="year"
          />
        </div>
      </div>
      <div class="b-register-step__small-title">
        {{$t('register.you-identified-as')}}
      </div>
      <div class="b-register-step__gender-block">
        <div class="radio-btn-wrapper">
          <radio-button
            name="gender"
            :title="$t('register.men')"
            value="Man"
            url="../../assets/img/male-icon.svg"
          ></radio-button>
          <radio-button
              name="gender"
              :title="$t('register.women')"
              value="Woman"
              url="../../assets/img/female-icon.svg"
          ></radio-button>
        </div>
      </div>
    </div>
    <div class="b-register-step__buttons">
      <div 
        class="b-register-step__back-btn"
        @click="$emit('decrementStep')"
      >
      {{$t('register.return')}}
      </div>
      <GreenBtn
        :text="$t('register.next')"
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
import Dropdown from '../forms/Dropdown.vue'
import RadioButton from '../forms/RadioButton.vue'

import arrowRight from '../../assets/img/arrow-right-white.svg'

import CONSTANTS from '../../consts/index'

export default {
  name: 'Step4',
  components: {
    GreenBtn,
    Dropdown,
    RadioButton
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
  background: #ffffff;
  border-radius: 28px 28px 0px 0px;
  @media (max-width: 576px) {
    padding: 44px 16px 72px 16px;
  }
  @media (min-width: 576px) {
    border-radius: 8px;
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
    margin-top: 12px;
  }
  .b-register-step__date-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    .b-register-step__dropdown {
      margin-right: 10px;
      width: 120px;
      @media (min-width: 576px) and (max-width: 992px) {
        width: 133px;
      }
      @media (max-width: 576px) {
        width: 32.5%;
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