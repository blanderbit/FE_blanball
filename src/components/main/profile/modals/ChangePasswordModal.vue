<template>
  <Transition>
    <ModalWindow>
      <template #title>
        {{ $t('modals.change_password.title') }}
      </template>
      <template #title-icon>
        <img src="../../../../assets/img/key.svg" alt="" />
      </template>
      <template #change-password>
        <Form v-slot="data" @submit="disableSubmit" :validation-schema="schema">
          <div class="input__wrapper">
            <MainInput
              :title="$t('modals.change_password.current-pass')"
              :swipeTitle="false"
              :title-width="0"
              :type="'password'"
              :outside-title="true"
              name="old_password"
            />
          </div>
          <div class="input__wrapper">
            <MainInput
              :title="$t('modals.change_password.new-pass')"
              :swipeTitle="false"
              :title-width="0"
              :type="'password'"
              :outside-title="true"
              name="new_password"
            />
          </div>

          <div v-if="currentStep === 2">
            <Counter
              :start-time="30"
              :counter-text="$t('modals.change_password.sms-code')"
              :email="userEmail"
              @resend-code-action="sendCode(data)"
            />
          </div>

          <div v-if="currentStep === 2" class="sms-code-block">
            <inputCode
              :fields="5"
              :fieldWidth="48"
              :fieldHeight="40"
              :required="true"
              name="verify_code"
              @complete="completed = true"
            />
          </div>
          <div class="btns-block">
            <div class="cancle-btn" @click="closeModal">
              {{ $t('buttons.cancel-editing') }}
            </div>
            <div class="save-btn" @click="nextStep(data)">
              {{ $t('buttons.save-changes') }}
            </div>
          </div>
        </Form>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

import { Form } from '@system.it.flumx.com/vee-validate';

import ModalWindow from '../../../shared/modals/ModalWindow.vue';
import Counter from '../../../shared/counter/Counter.vue';
import inputCode from '../../../shared/inputCode/InputCode.vue';
import MainInput from '../../../shared/input/MainInput.vue';

import { API } from '../../../../workers/api-worker/api.worker';
import {
  startSpinner,
  finishSpinner,
} from '../../../../workers/loading-worker/loading.worker';

import SCHEMAS from '../../../../validators/schemas';

export default {
  name: 'ChangePasswordModal',
  props: {
    userEmail: {
      type: String,
      default: '',
    },
  },
  components: {
    Form,
    ModalWindow,
    inputCode,
    MainInput,
    Counter,
  },
  setup(_, { emit }) {
    const { t } = useI18n();
    const toast = useToast();
    const currentStep = ref(1);

    const schema = computed(() => {
      return SCHEMAS.changePassword.schema(currentStep.value);
    });

    function closeModal() {
      currentStep.value = 1;
      emit('closeModal', 'change_password');
    }

    async function sendCode(data) {
      await API.UserService.changePassword(data.values);
    }

    async function nextStep(data) {
      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }
      startSpinner();
      try {
        if (currentStep.value === 1) {
          await sendCode(data);
        } else {
          await changePassword(data);
        }
        currentStep.value++;
      } catch {
      } finally {
        finishSpinner();
      }
    }

    async function changePassword(data) {
      await API.UserService.sendApproveCode({
        verify_code: data.values.verify_code,
      });
      closeModal();
      toast.success(t('notifications.password-reset'));
    }

    return {
      closeModal,
      changePassword,
      sendCode,
      nextStep,
      currentStep,
      schema,
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
