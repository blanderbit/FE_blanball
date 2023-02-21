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
        <img src="../../assets/img/info-icon.svg" alt="" />
        {{ $t('register.honest-game') }}
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import StepWrapper from './StepWrapper.vue'

import arrowRight from '../../assets/img/arrow-right-white.svg'

export default {
  name: 'Step5',
  components: {
    StepWrapper,
  },
  setup() {
    const { t } = useI18n()
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
      }
    })
    return {
      stepConfig,
    }
  },
}
</script>
<style lang="scss" scoped>
.b-register-step__info-block {
  padding: 6px 6px 6px 38px;
  background: #f7f7fe;
  border: 1px solid #dfdeed;
  border-radius: 6px;
  margin-top: 28px;
  position: relative;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #262541;
  img {
    position: absolute;
    top: 7px;
    left: 7px;
  }
}
</style>
