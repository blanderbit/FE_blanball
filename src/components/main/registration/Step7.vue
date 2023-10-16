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
        title: t('register.set-up-profile'),
        subTitle: t('register.tell-about-yourself'),
        nextButton: {
          exist: true,
          text: t('register.configure'),
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
