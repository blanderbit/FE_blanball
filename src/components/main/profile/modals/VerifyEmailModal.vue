<template>
  <loader :is-loading="loading" />
  <Transition>
    <ModalWindow>
      <template #title>
        {{ $t('modals.verify_email.title') }}
      </template>
      <template #title-icon>
        <img src="../../../../assets/img/envelop.svg" alt="" />
      </template>
      <template #verify-email>
        <Form v-slot="data" :validation-schema="schema">
          <div class="input__wrapper">
            <MainInput
              :title="$t('modals.change_login.email')"
              inputMode="email"
              :swipeTitle="false"
              :placeholder="userEmail"
              :outside-title="true"
              :title-width="0"
              :is-disabled="true"
              name="email"
            />
          </div>
          <div class="description-text">
            <Counter
              :start-time="30"
              :counter-text="$t('modals.change_login.code-message')"
              :email="userEmail"
              @resend-code-action="sendCode"
            />
          </div>
          <div class="code-input-field">
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
              {{ $t('buttons.return') }}
            </div>
            <div class="save-btn" @click="saveClick(data)">
              {{ $t('buttons.approve') }}
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
import loader from '../../../shared/loader/Loader.vue';

import { API } from '../../../../workers/api-worker/api.worker';

import SCHEMAS from '../../../../validators/schemas';

export default {
  name: 'VerifyEmailModal',
  components: {
    ModalWindow,
    MainInput,
    Counter,
    inputCode,
    Form,
    loader,
  },
  props: {
    userEmail: {
      type: String,
      default: '',
    },
  },
  emits: ['closeModal', 'emailVerified'],
  setup(_, { emit }) {
    const toast = useToast();
    const loading = ref(false);
    const { t } = useI18n();

    const schema = computed(() => {
      return SCHEMAS.verifyEmail.schema;
    });

    function closeModal() {
      emit('closeModal');
    }

    async function sendCode() {
      loading.value = true;
      await API.AuthorizationService.VerifyEmail();
      loading.value = false;
    }

    async function saveClick(data) {
      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }

      loading.value = true;
      try {
        await API.AuthorizationService.VerifyCode({
          verify_code: data.values.verify_code,
        });
        emit('emailVerified')
        closeModal();
        loading.value = false;
        toast.success(t('notifications.email-verified'));
      } catch {
        loading.value = false;
      }
    }

    sendCode();

    return {
      schema,
      loading,
      saveClick,
      closeModal,
      sendCode,
    };
  },
};
</script>

<style></style>
