<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">Створення облікового запису</div>
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
          :title="`Ваше повне ім'я`"
          :placeholder="'Олександра Білозерська'"
          :title-width="0"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
          :outside-title="true"
          :title="`Ваш номер телефону`"
          :placeholder="'+38 0ХХ ХХХ ХХ ХХ'"
          :title-width="0"
        />
      </div>
    </div>
    <div class="b-register-step__buttons">
      <GreenBtn
        :text="'Далі'"
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
import { computed } from 'vue'

import GreenBtn from '../GreenBtn.vue'
import InputComponent from '../InputComponent.vue'

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
    return {
      arrow_right,
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
  }
}
</style>