<template>
  <div class="b-register-step">
    <img
      src="../../assets/img/ball-colored.svg"
      alt="ball-big"
      class="b-register-step__ball-big"
    />
    <img
      src="../../assets/img/ball-colored.svg"
      alt="ball-small"
      class="b-register-step__ball-small"
    />
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">{{$t('register.title')}}</div>
      <div class="b-register-step__progress-line">
        <div class="b-register-step__sections">
          <div
            v-for="item of 2"
            :key="item"
            :class="[
              'b-register-step__section',
              {
                active: item === 1,
              },
            ]"
          ></div>
        </div>
      </div>
      <div class="b-register-step__input">
        <InputComponent
          :outside-title="true"
          :title="$t('register.name')"
          :placeholder="'Олександра'"
          :title-width="0"
          name="profile.name"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
          :outside-title="true"
          :title="$t('register.last_name')"
          :placeholder="'Білозерська'"
          :title-width="0"
          name="profile.last_name"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
          :outside-title="true"
          :title="$t('register.phone-number')"
          :placeholder="'+38 (0ХХ) ХХХ ХХ ХХ'"
          :title-width="0"
          name="phone"
        >
         <template #input="slotProps">
           <input
               :type="slotProps.type"
               :placeholder="slotProps.placeholder"
               v-on="slotProps.on"
               :value="slotProps.value"
               :style="slotProps.style"
               :disabled="slotProps.disabled"
               v-maska="UkraineMasks"
           />
         </template>

        </InputComponent>
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
        :width="155"
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
import InputComponent from '../forms/InputComponent.vue'

import arrowRight from '../../assets/img/arrow-right-white.svg'

export default {
  name: 'Step1',
  components: {
    GreenBtn,
    InputComponent,
  },
  setup() {
    const arrow_right = computed(() => {
      return arrowRight
    })
    const UkraineMasks = computed(() => '+38 (0##) ### ## ##');

    return {
      arrow_right,
      UkraineMasks
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
  position: relative;
  overflow: hidden;
  @media (max-width: 576px) {
    padding: 44px 16px 72px 16px;
  }
  @media (min-width: 576px) {
    border-radius: 8px;
  }
  .b-register-step__ball-big {
    position: absolute;
    width: 80px;
    top: -30px;
    left: -30px;
    @media (min-width: 576px) {
      display: none;
    }
  }
  .b-register-step__ball-small {
    position: absolute;
    top: 0;
    right: 0;
    @media (min-width: 576px) {
      display: none;
    }
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