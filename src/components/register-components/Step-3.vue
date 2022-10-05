<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">
        Вітаємо вас на спортивній платформі Blanball      
      </div>
      <div class="b-register-step__subtitle">
        Розкажіть нам трохи про себе, щоби ми могли підлаштувати ваш профіль для зручної взаємодіїз усіма користувачами додатку
      </div>
    </div>
    <div class="b-register-step__buttons">
      <div 
        class="b-register-step__back-btn"
        @click="$emit('decrementStep')"
      >
        Нагадати пізніше
      </div>
      <GreenBtn
        :text="'Налаштувати'"
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
import { computed } from 'vue'

import GreenBtn from '../GreenBtn.vue'

import arrowRight from '../../assets/img/arrow-right-white.svg'

export default {
  name: 'Step3',
  components: {
    GreenBtn,
  },
  setup() {
    const arrow_right = computed(() => {
      return arrowRight
    })

    return {
      arrow_right
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
    .b-register-step__subtitle {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #262541;
      margin-top: 16px;
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