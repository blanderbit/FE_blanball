<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">Створення облікового запису</div>
      <div class="b-register-step__progress-line">
        <div class="b-register-step__sections">
          <div
            v-for="item of 2"
            :key="item"
            class="b-register-step__section active"
          ></div>
        </div>
      </div>
      <div class="b-register-step__input">
        <InputComponent
          :outside-title="true"
          :title="`E-mail`"
          :placeholder="'elektron@mail.com'"
          :title-width="0"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent 
          :placeholder="'Придумайте пароль'" 
          :title-width="0"
          :type="['password', 'text']"
          :outside-title="true"
          :has-icon="true"
          :icon="[eyeCrossed, eyeOpened]"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent 
          :placeholder="'Повторіть пароль'" 
          :title-width="0"
          :type="['password', 'text']"
          :outside-title="true"
          :has-icon="true"
          :icon="[eyeCrossed, eyeOpened]"
        />
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
        :text="'Зареєструватися'"
        :width="179"
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

import GreenBtn from '../GreenBtn.vue'
import InputComponent from '../InputComponent.vue'

import tickWhite from '../../assets/img/tick-white.svg'
import eyeCross from '../../assets/img/eye-crossed.svg'
import eyeOpen from '../../assets/img/eye-opened.svg'

export default {
  name: 'Step2',
  components: {
    GreenBtn,
    InputComponent,
  },
  setup() {
    const tick = computed(() => {
      return tickWhite
    })
    const eyeCrossed = computed(() => {
      return eyeCross
    })
    const eyeOpened = computed(() => {
      return eyeOpen
    })

    return {
      tick,
      eyeCrossed,
      eyeOpened
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
          width: 49%;
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
  .b-register-step__input {
    width: 384px;
    height: 40px;
    margin-top: 12px;
    @media (max-width: 992px) {
      width: 100%;
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