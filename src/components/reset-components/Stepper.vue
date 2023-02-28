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
          <InputComponent
            :outside-title="true"
            :title="$t('reset.post')"
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
          <code-input
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
          <InputComponent
              :title="$t('reset.enter-new-password')"
              :title-width="0"
              :type="'password'"
              :outside-title="true"
              :placeholder="'********'"
              name="new_password"
          />
        </div>
        <div class="b-reset-step__input" v-if="currentStep === 3">
          <InputComponent
              :title="$t('reset.repeat-new-password')"
              :title-width="0"
              :type="'password'"
              :outside-title="true"
              :placeholder="'********'"
              name="confirm_new_password"
          />
        </div>
      </div>
      <div class="b-reset-step__buttons">
        <div
            class="b-reset-step__cancel-button"
            @click="handleBackClick()"
        >
          {{ $t('reset.cancel') }}
        </div>
        <GreenBtn
          :text="$t(nextButtonText)"
          :width="155"
          :loading="loading"
          :height="40"
          @click-function="handleNextClick(data)"
        />
      </div>
    </div>
  </Form>
</template>

<script>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useToast } from 'vue-toastification'

  import { Form } from '@system.it.flumx.com/vee-validate'

  import * as yup from "yup";

  import GreenBtn from '../GreenBtn.vue'
  import InputComponent from '../forms/InputComponent.vue'
  import CodeInput from "../forms/CodeInput.vue";
  import Counter from '../Counter.vue'

  import { API } from "../../workers/api-worker/api.worker";
  
  import { ROUTES } from "../../router/router.const";

  import eyeCross from '../../assets/img/eye-crossed.svg'
  import eyeOpen from '../../assets/img/eye-opened.svg'

  export default {
    name: 'Step1',
    components: {
      GreenBtn,
      InputComponent,
      Form,
      CodeInput,
      Counter,
    },
    setup() {
      const currentStep = ref(1);
      const loading = ref(false);
      const userEmail = ref('')
      const state = ref({});
      const router = useRouter();
      const toast = useToast();
      const { t } = useI18n()
      const eyeCrossed = computed(() => {
        return eyeCross
      });
      const eyeOpened = computed(() => {
        return eyeOpen
      });
      let schema = computed(() => {
        if (currentStep.value === 1) {
          return yup.object({
            email: yup.string().email('errors.email').required('errors.required'),
          });
        }
        if (currentStep.value === 2) {
          return yup.object({
            verify_code: yup.string().required('errors.required').min(5, 'errors.min5'),
          });
        }
        if (currentStep.value === 3) {
          return yup.object({
            new_password: yup
              .string()
              .required('errors.required')
              .min(8, 'errors.min8')
              .max(68, 'errors.max68'),
            confirm_new_password: yup
              .string()
              .required('errors.required')
              .min(8, 'errors.min8')
              .max(68, 'errors.max68')
              .oneOf([yup.ref('new_password'), null], 'errors.same-password')
          });
        }
        return yup.object({})
      });
      const handleBackClick = () => {
        if (currentStep.value === 1) {
          return router.back()
        }
        currentStep.value = currentStep.value - 1
      };
      const handleResetPasswordRequest = async (formData) => {
        const { valid } = await formData.validate();
        if (!valid) {
          return false
        }
        loading.value = true;
        await API.AuthorizationService.ResetPasswordRequest(formData.values).finally(
          () => {loading.value = false}
        )
        currentStep.value = currentStep.value + 1;
      };
      const handleResetVerifyCode = async (formData) => {
        const { valid } = await formData.validate();
        if (!valid) {
          return false
        }
        await API.AuthorizationService.VerifyCodeResetPassword({
          verify_code: formData.controlledValues.verify_code
        });
        state.value = formData.controlledValues;
        currentStep.value = currentStep.value + 1;
      };
      const handleResetResetComplete = async (formData) => {
        const { valid } = await formData.validate();
        if (!valid) {
          return false
        }
        loading.value = true;
        await API.AuthorizationService.ResetComplete({
          new_password: formData.values.new_password,
          verify_code: state.value.verify_code
        })
        toast.success(t('notifications.password-reset'))
        router.push(ROUTES.AUTHENTICATIONS.LOGIN);
  
        loading.value = false;
      };
      const resendResetVerifyCode = async () => {
        await API.AuthorizationService.ResetPasswordRequest({"email": userEmail.value});
      }


      const nextButtonText = computed(() => {
        switch (currentStep.value) {
          case 1:
          return 'reset.send-code'
          case 2:
            return 'reset.drop-password'
          case 3:
            return 'reset.save-changes'
        }
      })

    
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
        loading,
        schema,
        userEmail,
        nextButtonText,
        currentStep,
        eyeCrossed,
        eyeOpened,
        disableSubmit: (e) => {
          e.stopPropagation()
          e.preventDefault()
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixins/device.scss';

  form {
    height: 100%;
  }
  .b-reset-step {
    padding: 44px 24px;
    display: flex;
    height: 100%;
    flex-direction: column;
    /*justify-content: space-between;*/
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
          @include mobile{
            width: 266px;
            margin: 0 auto;
          }
          .b-reset-step__section {
            width: 33%;
            height: 4px;
            background: #efeff6;
            border-radius: 2px;
            &.active {
              background: #1ab2ad;
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
          border: 1px solid #dfdeed;
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
  ::v-deep .code-input input {
    width: 20%!important;
  }
</style>