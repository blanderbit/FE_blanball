<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :title="stepConfig.title"
    :subTitle="stepConfig.subTitle"
    :stepperLines="stepConfig.stepperLines"
  >
    <template #content>
      <div class="b-register-step__info-block">
        <img src="@images/info-icon.svg" alt="" />
        {{ $t('register.honest-game') }}
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import StepWrapper from './StepWrapper.vue';

import arrowRight from '@images/arrow-right-white.svg';

export default {
  name: 'Step5',
  components: {
    StepWrapper,
  },
  setup() {
    const { t } = useI18n();
    const stepConfig = computed(() => {
      return {
        title: t('register.affect-on-rates'),
        subTitle: t('register.you-can-leave-feedback'),
        returnButton: {
          exist: true,
          text: t('register.skip'),
        },
        nextButton: {
          exist: true,
          text: t('register.continue'),
          icon: arrowRight,
        },
      };
    });
    return {
      stepConfig,
    };
  },
};
</script>
<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f7f7fe: #f7f7fe;
$color-dfdeed: #dfdeed;

.b-register-step__info-block {
  padding: 6px 6px 6px 38px;
  background: $color-f7f7fe;
  border: 1px solid $color-dfdeed;
  border-radius: 6px;
  margin-top: 28px;
  position: relative;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: $--b-main-black-color;
  img {
    position: absolute;
    top: 7px;
    left: 7px;
  }
}
</style>
