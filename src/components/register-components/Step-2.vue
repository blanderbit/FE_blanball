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
            :title="$t('register.email')"
            :placeholder="'example@email.com'"
            :title-width="0"
            :height="40"
            name="email"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
            placeholder="********"
            :title="$t('register.create-password')"
            :title-width="0"
            :type="'password'"
            :height="40"
            :outside-title="true"
            name="password"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
            placeholder="********"
            :title-width="0"
            :title="$t('register.repeat-password')"
            :type="'password'"
            :height="40"
            :outside-title="true"
            name="re_password"
        />
      </div>
      <div class="b-register-step__input">
        <InputComponent
            :outside-title="true"
            :title="$t('register.phone-number')"
            :placeholder="stepConfig.UkraineMask"
            :title-width="0"
            :height="40"
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

import InputComponent from '../forms/InputComponent.vue'

import tickWhite from '../../assets/img/tick-white.svg'
import StepWrapper from './StepWrapper.vue'
import { useI18n } from 'vue-i18n'
export default {
  name: 'Step2',
  components: {
    InputComponent,
    StepWrapper
  },
  setup() {
    const tick = computed(() => {
      return tickWhite
    }) // TODO

    const { t } = useI18n();

    const stepConfig = computed(() => {
      return {
        UkraineMask: '+38 (0##) ### ## ##',
        title: t('register.create-account'),
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
          active: 2
        }
      }
    });
    return {
      tick,
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