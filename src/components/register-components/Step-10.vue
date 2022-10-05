<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">
        Заповніть профіль та розпочніть пошук команди
      </div>
      <div class="b-register-step__subtitle">
        Blanball — це застосунок, покликаний спростити пошук команд для гри у футбол і так далі тому подібне. Тут треба буде написати нашо взагалі воно є та чим може бути корисне.
      </div>
    </div>
    <div class="b-register-step__buttons">
      <div 
        class="b-register-step__back-btn" 
        @click="finishOnBoarding"
      >
        Пропустити
      </div>
      <GreenBtn
        :text="'Продовжити'"
        :width="156"
        :height="40"
        :icon-right="arrow"
        :is-icon-and-text-apart="true"
        @click-function="finishOnBoarding"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import GreenBtn from '../GreenBtn.vue'

import arrowIcon from '../../assets/img/arrow-right-white.svg'

import { ROUTES } from '../../router'

export default {
  name: 'Step10',
  components: {
    GreenBtn,
  },
  setup() {
    const arrow = computed(() => {
      return arrowIcon
    })
    const router = useRouter()

    function finishOnBoarding() {
      router.push(ROUTES.APPLICATION.HOME.absolute)
    }

    return {
      arrow,
      finishOnBoarding
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
      margin-bottom: 24px;
      @media (max-width: 576px) {
        text-align: center;
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