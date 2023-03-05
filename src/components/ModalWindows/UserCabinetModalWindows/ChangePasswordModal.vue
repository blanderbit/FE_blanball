<template>
  <Loading :is-loading="loading"/>
  <Transition>
    <ModalWindow>
      <template #title>
        {{ $t('modals.change_password.title') }}
      </template>
      <template #title-icon>
        <img src="../../../assets/img/key.svg" alt="" />
      </template>
      <template #change-password>
        <Form v-slot="data" @submit="disableSubmit" :validation-schema="schema">
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_password.current-pass')"
              :title-width="0"
              :type="'password'"
              :outside-title="true"
              name="old_password"
            />
          </div>
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_password.new-pass')"
              :title-width="0"
              :type="'password'"
              :outside-title="true"
              name="new_password"
            />
          </div>

          <div v-if="modalChangeStep === 2">
            <Counter
              :start-time="30"
              :counter-text="$t('modals.change_password.sms-code')"
              :email="userEmail"
              @resend-code-action="sendCode(data)"
            />
          </div>

          <div v-show="modalChangeStep === 2" class="sms-code-block">
            <CodeInput
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

import * as yup from 'yup';

import ModalWindow from '../ModalWindow.vue';
import Counter from '../../Counter.vue';
import CodeInput from '../../forms/CodeInput.vue';
import InputComponent from '../../forms/InputComponent.vue';
import Loading from '../../../workers/loading-worker/Loading.vue';

import { API } from '../../../workers/api-worker/api.worker';

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
    CodeInput,
    InputComponent,
    Counter,
    Loading,
  },
  setup(_, { emit }) {
    const { t } = useI18n();
    const loading = ref(false)
    const toast = useToast();
    const modalChangeStep = ref(1);

    const schema = computed(() => {
      if (modalChangeStep.value === 1) {
        return yup.object({
          old_password: yup
            .string()
            .required('errors.required')
            .min(8, 'errors.min8')
            .max(68, 'errors.max68'),
          new_password: yup
            .string()
            .required('errors.required')
            .min(8, 'errors.min8')
            .max(68, 'errors.max68')
            .when('old_password', (password, field) =>
              password
                ? field
                    .required('errors.required')
                    .oneOf([yup.ref('old_password')], 'errors.same-password')
                : field
            ),
        });
      }
      if (modalChangeStep.value === 2) {
        return yup.object({
          verify_code: yup
            .string()
            .required('errors.required')
            .min(5, 'errors.min5'),
        });
      }
    });

    function closeModal() {
      modalChangeStep.value = 1;
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
      loading.value = true;
      try {
        if (modalChangeStep.value === 1) {
          await sendCode(data);
        } else {
          await changePassword(data);
        }
        modalChangeStep.value++;
        loading.value = false;
      } catch {
        loading.value = false;
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
      loading,
      modalChangeStep,
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
