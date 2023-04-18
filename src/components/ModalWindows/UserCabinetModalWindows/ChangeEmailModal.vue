<template>
  <Loading :is-loading="loading" />
  <Transition>
    <ModalWindow>
      <template #title>
        {{ $t('modals.change_login.title') }}
      </template>
      <template #title-icon>
        <img src="../../../assets/img/envelop.svg" alt="" />
      </template>
      <template #change-login>
        <div v-if="currentStep === 1" class="input__wrapper">
          <mainInput
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
            <mainInput
              :title="
                currentStep === 1
                  ? $t('modals.change_login.new-email')
                  : $t('modals.change_login.email')
              "
              :placeholder="'example@panda.com'"
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
import { useToast } from 'vue-toastification';

import { Form } from '@system.it.flumx.com/vee-validate';

import ModalWindow from '../ModalWindow.vue';
import Counter from '../../shared/counter/counter.vue';
import inputCode from '../../shared/inputCode/inputCode.vue';
import mainInput from '../../shared/input/mainInput.vue';
import Loading from '../../../workers/loading-worker/Loading.vue';

import { API } from '../../../workers/api-worker/api.worker';

import SCHEMAS from '../../../validators/schemas';

export default {
  name: 'ChangeEmailModal',
  components: {
    ModalWindow,
    mainInput,
    Counter,
    Loading,
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
    const loading = ref(false);
    const currentStep = ref(1);

    const cancelBtnTitle = computed(() => {
      return currentStep.value === 1
        ? t('buttons.cancel-editing')
        : t('buttons.return');
    });
    const saveBtnTitle = computed(() => {
      return currentStep.value === 1
        ? t('buttons.save-changes')
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
      loading.value = true;
      try {
        if (currentStep.value === 1) {
          await sendCode(data.values.email);
        } else {
          await changeEmail(data);
        }
        currentStep.value++;
        loading.value = false;
      } catch {
        loading.value = false;
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
      loading,
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
