<template>
  <div class="b-register-step">
    <slot name="images"></slot>
    <div class="b-register-step__top-part">
      <div class="b-register-step__title" v-if="title">
        {{title}}
      </div>
      <div class="b-register-step__subtitle" v-if="subTitle" v-html="subTitle"></div>
      <div class="b-register-step__progress-line" v-if="stepperLines?.exist">
        <div class="b-register-step__sections">
          <div
              v-for="item of stepperLines?.count"
              :key="item"
              :class="[
              'b-register-step__section',
              {
                active: item <= stepperLines?.active,
              },
            ]"
          ></div>
        </div>
      </div>
      <slot name="content"></slot>
    </div>
    <div class="b-register-step__buttons">
      <div class="d-flex justify-content-between align-items-center">
        <div
          class="b-register-step__back-btn"
          v-if="returnButton?.exist"
          @click="$emit('back')"
        >
          {{returnButton?.text}}
        </div>
        <GreenBtn
          :text="nextButton?.text"
          :width="155"
          :height="40"
          v-if="nextButton?.exist"
          :icon-right="arrow_right"
          :is-icon-and-text-apart="true"
          @click-function="$emit('next')"
        />
      </div>
    </div>
  </div>
</template>

<script>

  import {computed} from 'vue'
  import GreenBtn from '../GreenBtn.vue'

  import ArrowRight from '../../assets/img/arrow-right-white.svg'
  export default {
    name: 'StepWrapper',
    components: {
      GreenBtn,
    },
    props: {
      stepperLines: {
        type: Object,
        default: () => {}
      },
      returnButton: {
        type: Object,
        default: () => {}
      },
      nextButton: {
        type: Object,
        default: () => {}
      },
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      }
    },
    setup() {
      const arrow_right = computed(() => ArrowRight);
      return {
        arrow_right
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-register-step__subtitle {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #262541;
    margin-top: 16px;
  }
  .b-register-step {
    padding: 44px 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    border-radius: 28px 28px 0px 0px;
    position: relative;
    overflow: hidden;
    @media (max-width: 576px) {
      padding: 44px 16px;
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
      flex-grow: 2;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      >div {
        width: 100%;
      }
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