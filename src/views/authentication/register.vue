<template>
  <div class="b-register">
    <div class="b-register__background-tab">
      <img :src="backgroundTab" alt="background image tablet" />
    </div>
    <div class="b-register__background-mob">
      <img :src="backgroundMob" alt="background image mobile" />
    </div>
    <div class="b-register__central-block">
      <div class="b-register__left-part">
        <Transition>
          <Step_1 
            v-if="currentStep === 1" 
            @increment-step="currentStep++" 
          />
        </Transition>
        <Transition>
          <Step_2
            v-if="currentStep === 2"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_3
            v-if="currentStep === 3"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_4
            v-if="currentStep === 4"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_5
            v-if="currentStep === 5"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_6
            v-if="currentStep === 6"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_7
            v-if="currentStep === 7"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_8
            v-if="currentStep === 8"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_9
            v-if="currentStep === 9"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
        <Transition>
          <Step_10
            v-if="currentStep === 10"
            @increment-step="currentStep++"
            @decrement-step="currentStep--"
          />
        </Transition>
      </div>
      <div class="b-register__right-part" :style="rightSideStyle">
        <div class="b-register__google-play-block">
          <img src="../../assets/img/google-play.svg" alt="" />
          <span>
            {{ $t('register.load-app') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import Step_1 from '../../components/register-components/Step-1.vue'
import Step_2 from '../../components/register-components/Step-2.vue'
import Step_3 from '../../components/register-components/Step-3.vue'
import Step_4 from '../../components/register-components/Step-4.vue'
import Step_5 from '../../components/register-components/Step-5.vue'
import Step_6 from '../../components/register-components/Step-6.vue'
import Step_7 from '../../components/register-components/Step-7.vue'
import Step_8 from '../../components/register-components/Step-8.vue'
import Step_9 from '../../components/register-components/Step-9.vue'
import Step_10 from '../../components/register-components/Step-10.vue'

import imageStep_1 from '../../assets/img/registration-back-1.svg'
import imageStep_2 from '../../assets/img/registration-back-2.svg'
import imageStep_3 from '../../assets/img/registration-back-3.svg'
import imageStep_4 from '../../assets/img/registration-back-4.svg'

import imageStepTab_1 from '../../assets/img/registration-back-tab1.svg'
import imageStepTab_2 from '../../assets/img/registration-back-tab2.svg'
import imageStepTab_3 from '../../assets/img/registration-back-tab3.svg'
import imageStepTab_4 from '../../assets/img/registration-back-tab4.svg'

import imageStepMob_1 from '../../assets/img/registration-back-mob1.svg'
import imageStepMob_2 from '../../assets/img/registration-back-mob2.svg'
import imageStepMob_3 from '../../assets/img/registration-back-mob3.svg'
import imageStepMob_4 from '../../assets/img/registration-back-mob4.svg'

export default {
  name: 'register',
  components: {
    Step_1,
    Step_2,
    Step_3,
    Step_4,
    Step_5,
    Step_6,
    Step_7,
    Step_8,
    Step_9,
    Step_10
  },
  setup() {
    const currentStep = ref(1)
    const rightSideStyle = computed(() => {
      switch (currentStep.value) {
        case 4: return { '--back-picture': `url(${imageStep_2})` }
          break;
        case 5: return { '--back-picture': `url(${imageStep_3})` }
          break;
        case 6: return { '--back-picture': `url(${imageStep_4})` }
          break;
        default: return { '--back-picture': `url(${imageStep_1})` }
      }
    })
    const backgroundTab = computed(() => {
      switch (currentStep.value) {
        case 4: return imageStepTab_2
          break;
        case 5: return imageStepTab_3
          break;
        case 6: return imageStepTab_4
          break;
        default: return imageStepTab_1
      }
    })
    const backgroundMob = computed(() => {
      switch (currentStep.value) {
        case 4: return imageStepMob_2
          break;
        case 5: return imageStepMob_3
          break;
        case 6: return imageStepMob_4
          break;
        default: return imageStepMob_1
      }
    })

    return {
      currentStep,
      rightSideStyle,
      backgroundTab,
      backgroundMob
    }
  },
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
.b-register {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 576px) and (max-width: 992px) {
    padding-top: 132px;
    overflow: hidden;
  }
  @media (max-width: 576px) {
    padding-top: 140px;
  }
  .b-register__background-tab {
    display: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    @media (min-width: 576px) and (max-width: 992px) {
      display: block;
    }
    img {
        width: 100%;
    }
  }
  .b-register__background-mob {
    display: none;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    @media (max-width: 576px) {
      display: block;
      width: 100%;
    }
    img {
      width: 100%;
    }
  }
  .b-register__central-block {
    height: 555px;
    width: 992px;
    display: flex;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    @media (min-width: 992px) and (max-width: 1200px) {
      width: 890px;
    }
    @media (min-width: 576px) and (max-width: 992px) {
      width: 464px;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 8px;
    }
    @media (max-width: 576px) {
      border-radius: 28px 28px 0px 0px;
      width: 100%;
    }
    .b-register__left-part {
      width: 432px;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
    .b-register__right-part {
      background-image: var(--back-picture);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      width: 560px;
      position: relative;
      @media (max-width: 992px) {
        display: none;
      }
      .b-register__google-play-block {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #575775;
        padding: 24px;
        img {
          margin-right: 12px;
        }
        span {
          width: 280px;
        }
      }
    }
  }
}
</style>