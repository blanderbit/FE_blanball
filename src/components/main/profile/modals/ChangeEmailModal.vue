<template>
  <Transition>
    <ModalWindow>
      <template #title>
        {{ $t('modals.change_login.title') }}
      </template>
      <template #title-icon>
        <img src="../../../../assets/img/envelop.svg" alt="" />
      </template>
      <template #change-login>
        <div v-if="currentStep === 1" class="input__wrapper">
          <MainInput
            :title="$t('modals.change_login.current-email')"
            :swipeTitle="false"
            :placeholder="userEmail"
            :outside-title="true"
            :title-width="0"
            :is-disabled="true"
          />
        </div>
        <Form v-slot="data" :validation-schema="schema" @submit="disableSubmit">
          <div class="input__wrapper">
            <MainInput
              :title="
                currentStep === 1
                  ? $t('modals.change_login.new-email')
                  : $t('modals.change_login.email')
              "
              :placeholder="'example@panda.com'"
              inputMode="email"
              :swipeTitle="false"
              :outside-title="true"
              :title-width="0"
              :is-disabled="currentStep === 1 ? false : true"
              name="email"
            />
            <span class="error-message">{{ errorMessage }}</span>
          </div>
          <div v-if="currentStep === 2" class="description-text">
            <Counter
              :start-time="30"
              :counter-text="$t('modals.change_login.code-message')"
              :email="userEmail"
              @resend-code-action="sendCode(data.values.email)"
            />
          </div>
          <div v-if="currentStep === 2" class="code-input-field">
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
            <div class="cancle-btn" @click="cancelClick">
              {{ cancelBtnTitle }}
            </div>
            <div class="save-btn" @click="nextStep(data)">
              {{ saveBtnTitle }}
            </div>
          </div>
        </Form>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref } from 'vue';
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
  name: 'ChangeEmailModal',
  components: {
    ModalWindow,
    MainInput,
    Counter,
    inputCode,
    Form,
  },
  props: {
    userEmail: {
      type: String,
      default: '',
    },
  },
  emits: ['closeModal', 'f'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const currentStep = ref(1);

    const cancelBtnTitle = computed(() => {
      return currentStep.value === 1
        ? t('buttons.cancel-editing')
        : t('buttons.return');
    });
    const saveBtnTitle = computed(() => {
      return currentStep.value === 1
        ? t('buttons.get-code')
        : t('buttons.approve');
    });

    const schema = computed(() => {
      return SCHEMAS.changeEmail.schema(currentStep.value);
    });

    function closeModal() {
      emit('closeModal', 'email');
    }

    function cancelClick() {
      if (currentStep.value === 1) {
        closeModal();
      } else {
        currentStep.value--;
      }
    }

    async function sendCode(email) {
      await API.UserService.changeUserEmail({ email: email });
    }

    async function nextStep(data) {
      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }
      startSpinner();
      try {
        if (currentStep.value === 1) {
          await sendCode(data.values.email);
        } else {
          await changeEmail(data);
        }
        currentStep.value++;
      } catch {
      } finally {
        finishSpinner();
      }
    }

    async function changeEmail(data) {
      await API.UserService.sendApproveCode({
        verify_code: data.values.verify_code,
      });
      emit('email');
      closeModal();
    }

    return {
      schema,
      currentStep,
      saveBtnTitle,
      cancelBtnTitle,
      sendCode,
      nextStep,
      cancelClick,
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    };
  },
};
</script>
<style></style>
