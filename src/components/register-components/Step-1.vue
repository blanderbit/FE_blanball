<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :title="stepConfig.title"
    :stepperLines="stepConfig.stepperLines"
  >
    <template #images>
      <img
          src="../../assets/img/ball-colored.svg"
          alt="ball-big"
          class="b-register-step__ball-big"
      />
      <img
          src="../../assets/img/ball-colored.svg"
          alt="ball-small"
          class="b-register-step__ball-small"
      />
    </template>
    <template #content>
      <div class="b-register-step__input">
        <InputComponent
            :outside-title="true"
            :title="$t('register.name')"
            :placeholder="'Олександра'"
            :title-width="0"
            name="profile.name"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
            :outside-title="true"
            :title="$t('register.last_name')"
            :placeholder="'Білозерська'"
            :title-width="0"
            name="profile.last_name"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
            :outside-title="true"
            :title="$t('register.phone-number')"
            :placeholder="'+38 (0ХХ) ХХХ ХХ ХХ'"
            :title-width="0"
            name="phone"
        >
          <template #input="slotProps">
            <input
                :type="slotProps.type"
                :placeholder="slotProps.placeholder"
                v-on="slotProps.on"
                :value="slotProps.value"
                :style="slotProps.style"
                :disabled="slotProps.disabled"
                v-maska="stepConfig.UkraineMask"
            />
          </template>
        </InputComponent>
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import GreenBtn from '../GreenBtn.vue'
import InputComponent from '../forms/InputComponent.vue'
import StepWrapper from './StepWrapper.vue'

import arrowRight from '../../assets/img/arrow-right-white.svg'

export default {
  name: 'Step1',
  components: {
    GreenBtn,
    InputComponent,
    StepWrapper
  },
  setup() {
    const { t } = useI18n();

    const arrow_right = computed(() => arrowRight);
    const UkraineMasks = computed(() => '+38 (0##) ### ## ##');
    const stepConfig = computed(() => {
      return {
        UkraineMask: '+38 (0##) ### ## ##',
        title: t('register.title'),
        returnButton: {
          exist: true,
          text: t('register.return')
        },
        nextButton: {
          exist: true,
          text: t('register.next')
        },
        stepperLines: {
          count: 2,
          active: 1
        }
      }
    });
    return {
      arrow_right,
      UkraineMasks,
      stepConfig
    }
  },
}
</script>

<style lang="scss" scoped>
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
    @media (min-width: 576px) {
      display: none;
    }
  }
  .b-register-step__ball-small {
    position: absolute;
    top: 0;
    right: 0;
    @media (min-width: 576px) {
      display: none;
    }
  }
</style>