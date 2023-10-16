<template>
  <div class="b-register-step">
    <slot name="images"></slot>
    <div class="b-register-step__top-part">
      <div class="b-register-step__title" v-if="title">
        {{ title }}
      </div>
      <div
        class="b-register-step__subtitle"
        v-if="subTitle"
        v-html="subTitle"
      ></div>
      <div class="b-register-step__progress-line" v-if="stepperLines?.exist">
        <div class="b-register-step__sections">
          <div
            v-for="item of stepperLines?.count"
            :key="item"
            :style="{
              width: `${one_step_percent}%`,
            }"
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
          {{ returnButton?.text }}
        </div>
        <GreenBtn
          :text="nextButton?.text"
          :width="nextButton.width ? nextButton.width : 155"
          :height="40"
          v-if="nextButton?.exist"
          :icon-right="nextButton?.icon"
          :disabled="nextButton?.disabled"
          :is-icon-and-text-apart="true"
          @click-function="$emit('next')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import WhiteBtn from '@sharedComponents/button/WhiteBtn.vue';

export default {
  components: {
    GreenBtn,
    WhiteBtn,
  },
  props: {
    stepperLines: {
      type: Object,
      default: () => {},
    },
    returnButton: {
      type: Object,
      default: () => {},
    },
    nextButton: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const one_step_percent = computed(
      () => 100 / props.stepperLines?.count - 1
    );
    return {
      one_step_percent,
    };
  },
};
</script>
<style lang="scss" scoped>
$color-cddde0: #cddde0;
$color-578d95: #578d95;
// SCSS variables for hex colors
$color-efeff6: #efeff6;
$color-1ab2ad: #1ab2ad;

.b-register-step__subtitle {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: $--b-main-black-color;
  margin-top: 16px;
}
.b-register-step {
  padding: 44px 24px 24px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: $--b-main-white-color;
  border-radius: 28px 28px 0px 0px;
  position: relative;
  overflow: hidden;
  @include mobile {
    padding: 30px 16px;
  }
  @include tablet {
    border-radius: 8px;
  }
  .b-register-step__top-part {
    .b-register-step__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: $--b-main-black-color;
    }
    .b-register-step__progress-line {
      margin-top: 16px;
      margin-bottom: 28px;
      .b-register-step__sections {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .b-register-step__section {
          width: 49%;
          height: 4px;
          background: #cddde0;
          border-radius: 2px;
          &.active {
            background: #578d95;
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

    @media (max-width: 992px) {
      align-items: center;
    }

    @include mobile {
      align-items: flex-start;
      margin-top: 40px;
    }

    > div {
      width: 100%;
    }
    .b-register-step__back-btn {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: $--b-main-gray-color;
      cursor: pointer;
    }
  }

  // .b-register-step__bottom-side {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   @include inter(12px, 500, $--b-main-gray-color);
  //   line-height: 20px;
  //   margin-top: 20px;

  //   @include beforeDesktop {
  //     margin-top: 0px;
  //   }
  //   @include mobile {
  //     display: none;
  //   }
  // }
}
</style>
