<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">Локації</div>
      <div class="b-register-step__progress-line">
        <div class="b-register-step__sections">
          <div
            v-for="item of 3"
            :key="item"
            class="b-register-step__section active"
          ></div>
        </div>
      </div>
      <div class="b-register-step__subtitle">
        Допоможіть нам з’ясувати які райони будуть зручними для вас для участі в
        оффлайн заходах. Надалі ці локації будуть пріорітетними у пропозиціях.
      </div>
      <div class="b-register-step__small-title">Ваш населений пункт</div>
      <div class="b-register-step__dropdown">
        <Dropdown
          :outside-title="true"
          :main-title="'Місто'"
          :options="mockData.cities"
        />
      </div>
      <div class="b-register-step__dropdown">
        <Dropdown
          :outside-title="true"
          :main-title="'Місто'"
          :options="mockData.district"
        />
      </div>
      <div class="b-register-step__dropdown">
        <Dropdown
          :outside-title="true"
          :main-title="'Додати район'"
          :options="mockData.district"
          :outside-title-left="'Опціонально'"
        />
      </div>
    </div>
    <div class="b-register-step__buttons">
      <div class="b-register-step__back-btn" @click="$emit('decrementStep')">
        Повернутися назад
      </div>
      <GreenBtn
        :text="'Завершити'"
        :width="156"
        :height="40"
        :icon-right="tick"
        :is-icon-and-text-apart="true"
        @click-function="$emit('incrementStep')"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import GreenBtn from '../GreenBtn.vue'
import Dropdown from '../Dropdown.vue'

import tickIcon from '../../assets/img/tick-white.svg'

import CONSTANTS from '../../consts/index'

export default {
  name: 'Step6',
  components: {
    GreenBtn,
    Dropdown,
  },
  setup() {
    const mockData = computed(() => {
      return {
        cities: CONSTANTS.register.cities,
        district: CONSTANTS.register.district,
      }
    })
    const tick = computed(() => {
      return tickIcon
    })

    return {
      mockData,
      tick
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
    .b-register-step__subtitle {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #575775;
      margin-bottom: 20px;
    }
    .b-register-step__small-title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #262541;
    }
    .b-register-step__dropdown {
      width: 384px;
      height: 40px;
      @media (max-width: 992px) {
        width: 100%;
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