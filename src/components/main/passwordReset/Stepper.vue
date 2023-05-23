<template>
  <Form v-slot="data" :validation-schema="schema" @submit="disableSubmit">
    <div class="b-reset-step">
      <div class="b-reset-step__top-part">
        <div class="b-reset-step__title">
          {{ $t('reset.renew-access') }}
        </div>
        <div class="b-reset-step__progress-line">
          <div class="b-reset-step__sections">
            <div
              v-for="item of 3"
              :key="item"
              :class="[
                'b-reset-step__section',
                {
                  active: item <= currentStep,
                },
              ]"
            ></div>
          </div>
        </div>
        <div class="b-reset-step__subtitle" v-if="currentStep === 1">
          {{ $t('reset.letter-code') }}
        </div>
        <div class="b-reset-step__subtitle" v-if="currentStep === 2">
          {{ $t('reset.write-code') }}
        </div>
        <div class="b-reset-step__input" v-if="currentStep === 1">
          <MainInput
            :outside-title="true"
            :title="$t('reset.post')"
            inputMode="email"
            :swipeTitle="false"
            :placeholder="'example@email.com'"
            v-model="userEmail"
            :title-width="0"
            name="email"
          />
        </div>
        <div class="b-reset-step__code-title mb-2" v-if="currentStep === 2">
          <Counter
            :start-time="30"
            :counter-text="$t('reset.message-30sec')"
            :email="userEmail"
            @resendCodeAction="resendResetVerifyCode()"
          />
        </div>
        <div class="b-reset-step__sms-code-block" v-if="currentStep === 2">
          <inputCode
            @complete="completed = true"
            :fields="5"
            :fieldWidth="70"
            :fieldHeight="40"
            :required="true"
            name="verify_code"
          />
        </div>
        <div class="b-reset-step__subtitle" v-if="currentStep === 3">
          {{ $t('reset.new-password') }}
        </div>
        <div class="b-reset-step__input" v-if="currentStep === 3">
          <MainInput
            :title="$t('reset.enter-new-password')"
            :title-width="0"
            :type="'password'"
            :swipeTitle="false"
            :outside-title="true"
            :placeholder="'********'"
            name="new_password"
          />
        </div>
        <div class="b-reset-step__input" v-if="currentStep === 3">
          <MainInput
            :title="$t('reset.repeat-new-password')"
            :title-width="0"
            :type="'password'"
            :swipeTitle="false"
            :outside-title="true"
            :placeholder="'********'"
            name="confirm_new_password"
          />
        </div>
      </div>
      <div class="b-reset-step__buttons">
        <div class="b-reset-step__cancel-button" @click="handleBackClick()">
          {{ $t('reset.cancel') }}
        </div>
        <GreenBtn
          :text="$t(nextButtonText)"
          :width="155"
          :height="40"
          @click-function="handleNextClick(data)"
        />
      </div>
    </div>
  </Form>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

import { Form } from '@system.it.flumx.com/vee-validate';

import GreenBtn from '../../shared/button/GreenBtn.vue';
import MainInput from '../../shared/input/MainInput.vue';
import inputCode from '../../shared/inputCode/InputCode.vue';
import Counter from '../../shared/counter/Counter.vue';

import { API } from '../../../workers/api-worker/api.worker';
import {
  finishSpinner,
  startSpinner,
} from '../../../workers/loading-worker/loading.worker';

import { ROUTES } from '../../../router/router.const';
import SCHEMAS from '../../../validators/schemas';

import eyeCross from '../../../assets/img/eye-crossed.svg';
import eyeOpen from '../../../assets/img/eye-opened.svg';

export default {
  name: 'Step1',
  components: {
    GreenBtn,
    MainInput,
    Form,
    inputCode,
    Counter,
  },
  setup() {
    const currentStep = ref(1);
    const userEmail = ref('');
    const state = ref({});
    const router = useRouter();
    const toast = useToast();
    const { t } = useI18n();

    const eyeCrossed = computed(() => {
      return eyeCross;
    });
    const eyeOpened = computed(() => {
      return eyeOpen;
    });

    const schema = computed(() => {
      return SCHEMAS.stepper.schema(currentStep.value);
    });

    const handleBackClick = () => {
      if (currentStep.value === 1) {
        return router.back();
      }
      currentStep.value = currentStep.value - 1;
    };

    const handleResetPasswordRequest = async (formData) => {
      const { valid } = await formData.validate();
      if (!valid) {
        return false;
      }
      startSpinner();
      await API.AuthorizationService.ResetPasswordRequest(
        formData.values
      ).finally(() => {
        finishSpinner();
      });
      currentStep.value = currentStep.value + 1;
    };

    const handleResetVerifyCode = async (formData) => {
      const { valid } = await formData.validate();
      if (!valid) {
        return false;
      }
      await API.AuthorizationService.VerifyCodeResetPassword({
        verify_code: formData.controlledValues.verify_code,
      });
      state.value = formData.controlledValues;
      currentStep.value = currentStep.value + 1;
    };

    const handleResetResetComplete = async (formData) => {
      const { valid } = await formData.validate();
      if (!valid) {
        return false;
      }
      startSpinner();
      await API.AuthorizationService.ResetComplete({
        new_password: formData.values.new_password,
        verify_code: state.value.verify_code,
      });
      toast.success(t('notifications.password-reset'));
      router.push(ROUTES.AUTHENTICATIONS.LOGIN);

      finishSpinner();
    };

    const resendResetVerifyCode = async () => {
      await API.AuthorizationService.ResetPasswordRequest({
        email: userEmail.value,
      });
    };

    const nextButtonText = computed(() => {
      switch (currentStep.value) {
        case 1:
          return 'reset.send-code';
        case 2:
          return 'reset.drop-password';
        case 3:
          return 'reset.save-changes';
      }
    });

    async function handleNextClick(formData) {
      switch (currentStep.value) {
        case 1:
          return await handleResetPasswordRequest(formData);
        case 2:
          return await handleResetVerifyCode(formData);
        case 3:
          return await handleResetResetComplete(formData);
      }
    }

    return {
      handleNextClick,
      handleBackClick,
      resendResetVerifyCode,
      schema,
      userEmail,
      nextButtonText,
      currentStep,
      eyeCrossed,
      eyeOpened,
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-cddde0: #cddde0;
$color-578d95: #578d95;
$color-efeff6: #efeff6;
$color-1ab2ad: #1ab2ad;
$color-dfdeed: #dfdeed;

form {
  height: 100%;
}
.b-reset-step {
  padding: 44px 24px;
  display: flex;
  height: 100%;
  flex-direction: column;
  @include mobile {
    padding: 44px 16px;
  }
  .b-reset-step__top-part {
    .b-reset-step__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: $--b-main-black-color;
      @include mobile {
        text-align: center;
      }
    }
    .b-reset-step__progress-line {
      margin-top: 16px;
      margin-bottom: 28px;
      .b-reset-step__sections {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .b-reset-step__section {
          width: 32.5%;
          height: 4px;
          background: $color-cddde0;
          border-radius: 2px;
          &.active {
            background: $color-578d95;
          }
        }
      }
    }
    .b-reset-step__subtitle {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: $--b-main-gray-color;
    }
    .b-reset-step__code-title {
      margin-top: 12px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      text-align: right;
      color: $--b-main-gray-color;
      text-align: left;
    }
    .b-reset-step__sms-code-block {
      display: flex;
      margin-bottom: 24px;
      justify-content: space-between;
      align-items: center;
      @include mobile {
        justify-content: center;
      }
      input {
        padding: 8px;
        width: 72px;
        background: $--b-main-white-color;
        border: 1px solid $color-dfdeed;
        border-radius: 6px;
        outline: none;
        text-align: center;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        @include mobile {
          margin-right: 6px;
        }
        /* Firefox */
        &[type='number'] {
          -moz-appearance: textfield;
        }
        @include mobile {
          width: 60px;
        }
      }
    }
  }
  .b-reset-step__input {
    width: 384px;
    margin-top: 12px;
    @media (max-width: 992px) {
      width: 100%;
    }
  }
  .b-reset-step__buttons {
    flex-grow: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .b-reset-step__cancel-button {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: $--b-main-gray-color;
      cursor: pointer;
    }
  }
}
:deep .code-input input {
  width: 20% !important;
}
</style>
