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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import StepWrapper from './StepWrapper.vue'

export default {
  name: 'Step3',
  components: {
    StepWrapper,
  },
  setup() {
    const { t } = useI18n()
    const stepConfig = computed(() => {
      return {
        title: t('register.welcome'),
        subTitle: t('register.app-description'),
        returnButton: {
          exist: true,
          text: t('register.skip'),
        },
        nextButton: {
          exist: true,
          text: t('register.continue'),
        },
      }
    })
    return {
      stepConfig,
    }
  },
}
</script>
