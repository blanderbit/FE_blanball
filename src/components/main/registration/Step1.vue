<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :title="stepConfig.title"
    :stepperLines="stepConfig.stepperLines"
  >
    <template #images>
      <img
        src="@images/ball-colored.svg"
        alt="ball-big"
        class="b-register-step__ball-big"
      />
      <img
        src="@images/ball-colored.svg"
        alt="ball-small"
        class="b-register-step__ball-small"
      />
    </template>
    <template #content>
      <div class="b-register-step__input">
        <MainInput
          :outside-title="true"
          :swipeTitle="false"
          :title="$t('register.name')"
          :placeholder="$t('register.Olexandra')"
          :title-width="0"
          :height="40"
          name="profile.name"
        />
      </div>
      <div class="b-register-step__input mb-2">
        <MainInput
          :outside-title="true"
          :swipeTitle="false"
          :title="$t('register.last_name')"
          :placeholder="$t('register.Bilozerska')"
          :title-width="0"
          :height="40"
          name="profile.last_name"
        />
      </div>
      <div class="b-register-step__small-title">
        {{ $t('register.gender') }}
        <span class="b-marked-message">{{
          $t('register.gender-just-one-time')
        }}</span>
      </div>
      <div class="b-register-step__gender-block mb-3">
        <div class="radio-btn-wrapper">
          <radio-button
            name="gender"
            :title="$t('register.men')"
            value="Man"
            :url="icons.MaleIcon"
          ></radio-button>
          <radio-button
            name="gender"
            :title="$t('register.women')"
            value="Woman"
            :url="icons.FemaleIcon"
          ></radio-button>
        </div>
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import MainInput from '@sharedComponents/input/MainInput.vue';
import StepWrapper from './StepWrapper.vue';
import radioButton from '@sharedComponents/radioButton/RadioButton.vue';

import MaleIcon from '@images/male-icon.svg';
import FemaleIcon from '@images/female-icon.svg';
import arrowRight from '@images/arrow-right-white.svg';

export default {
  name: 'Step1',
  components: {
    GreenBtn,
    MainInput,
    StepWrapper,
    radioButton,
  },
  setup() {
    const { t } = useI18n();
    const icons = computed(() => {
      return {
        MaleIcon,
        FemaleIcon,
      };
    });
    const stepConfig = computed(() => {
      return {
        title: t('register.title'),
        returnButton: {
          exist: true,
          text: t('register.return'),
        },
        nextButton: {
          exist: true,
          text: t('register.next'),
          icon: arrowRight,
        },
        stepperLines: {
          count: 2,
          active: 1,
          exist: true,
        },
      };
    });
    return {
      stepConfig,
      icons,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f4f4f4: #f4f4f4;
$color-efeff6: #efeff6;

:deep(.b-register-step__title) {
  @include mobile {
    text-align: center;
    margin-top: 15px;
  }
}

.b-register-step__input {
  width: 384px;
  margin-top: 12px;
  @media (max-width: 992px) {
    width: 100%;
  }
}

.b-register-step__ball-big {
  position: absolute;
  width: 80px;
  top: -30px;
  left: -30px;
  display: none;
  @include mobile {
    display: block;
  }
}
.b-register-step__ball-small {
  position: absolute;
  top: 0;
  right: 0;
  display: none;
  @include mobile {
    display: block;
  }
}
.b-register-step__small-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: $--b-main-black-color;
}
.b-register-step__gender-block {
  margin-top: 12px;
  .radio-btn-wrapper {
    $color1: $color-f4f4f4;
    $color2: $--b-main-green-color;
    display: flex;
    align-items: center;
  }
}

:deep {
  .b-radio-label {
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
  }
}

.b-marked-message {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: $--b-main-gray-color;
  background: $color-efeff6;
  border-radius: 4px;
  padding: 0px 2px;
}
</style>
