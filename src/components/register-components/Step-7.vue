<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :subTitle="stepConfig.subTitle"
    :title="stepConfig.title"
    :stepperLines="stepConfig.stepperLines"
  >
  </step-wrapper>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import StepWrapper from './StepWrapper.vue';

import arrowRight from '../../assets/img/arrow-right-white.svg';

export default {
  name: 'Step6',

  components: {
    StepWrapper,
  },
  setup() {
    const { t } = useI18n();

    const stepConfig = computed(() => {
      return {
        title: t('register.create-account'),
        subTitle: t('register.tell-about-yourself'),
        nextButton: {
          exist: true,
          text: t('register.adjust'),
          width: 180,
          icon: arrowRight,
        },
        returnButton: {
          exist: true,
          text: t('register.skip-and-go-to-events'),
        },
      };
    });

    return {
      stepConfig,
    };
  },
};
</script>

<style lang="scss" scoped></style>
