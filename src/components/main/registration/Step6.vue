<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :title="stepConfig.title"
    :subTitle="stepConfig.subTitle"
    :stepperLines="stepConfig.stepperLines"
  >
  </step-wrapper>
</template>

<script>
 


import StepWrapper from './StepWrapper.vue';

import arrowRight from '@images/arrow-right-white.svg';

export default {
  name: 'Step6',
  components: {
    StepWrapper,
  },
  setup() {
    const { t } = useI18n();
    const stepConfig = computed(() => {
      return {
        title: t('register.fill-profile'),
        subTitle: t('register.app-description3'),
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
