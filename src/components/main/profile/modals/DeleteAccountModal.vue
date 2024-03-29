<template>
  <Transition>
    <ModalWindow :title-color="'#C10B0B'">
      <template #title>
        {{ $t('modals.delete_acc.title') }}
      </template>
      <template #title-icon>
        <img src="../../../../assets/img/warning.svg" alt="" />
      </template>
      <template #delete-account>
        <div v-if="currentStep === 1" class="first-screen">
          <div class="description-text">
            {{ $t('modals.delete_acc.text') }}
          </div>
          <div class="btns-block">
            <div class="cancle-delete-acc" @click="closeModal">
              {{ $t('buttons.cancel-deleting') }}
            </div>
            <div class="delete-acc" @click="nextStep">
              {{ $t('buttons.delete-account') }}
            </div>
          </div>
        </div>
        <div v-if="currentStep === 2" class="second-screen">
          <div class="description-title-second">
            {{ $t('modals.delete_acc.title-second') }}
          </div>
          <div class="description-text">
            <Counter
              :start-time="30"
              :counter-text="$t('modals.delete_acc.text-second')"
              :email="userEmail"
              @resend-code-action="sendCode"
            />
          </div>
          <Form
            v-slot="data"
            :validation-schema="schema"
            @submit="disableSubmit"
          >
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
              <div class="cancle-delete-acc" @click="closeModal">
                {{ $t('buttons.cancel-deleting') }}
              </div>
              <div class="delete-acc" @click="nextStep(data)">
                {{ $t('buttons.delete-account') }}
              </div>
            </div>
          </Form>
        </div>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

import { Form } from '@system.it.flumx.com/vee-validate';

import ModalWindow from '../../../shared/modals/ModalWindow.vue';
import Counter from '../../../shared/counter/Counter.vue';
import inputCode from '../../../shared/inputCode/InputCode.vue';

import { API } from '../../../../workers/api-worker/api.worker';
import { resetUserDataAndRedirectToLogin } from '../../../../utils/logOut';
import {
  startSpinner,
  finishSpinner,
} from '../../../../workers/loading-worker/loading.worker';

import SCHEMAS from '../../../../validators/schemas';

export default {
  name: 'DeleteAccountModal',
  components: {
    ModalWindow,
    inputCode,
    Form,
    Counter,
  },
  props: {
    userEmail: {
      type: String,
      default: '',
    },
  },
  emits: ['closeModal'],
  setup(_, { emit }) {
    const router = useRouter();
    const { t } = useI18n();
    const toast = useToast();
    const currentStep = ref(1);

    const schema = computed(() => {
      return SCHEMAS.deleteAccount.schema(currentStep.value);
    });

    function closeModal() {
      emit('closeModal', 'delete_acc');
    }

    async function sendCode() {
      await API.UserService.deleteMyProfile();
    }

    async function nextStep(data) {
      if (currentStep.value === 2) {
        const { valid } = await data.validate();

        if (!valid) {
          return false;
        }
      }

      startSpinner();
      try {
        if (currentStep.value === 1) {
          await sendCode();
        } else {
          await deleteAcc(data);
        }
        currentStep.value++;
      } catch {
      } finally {
        finishSpinner();
      }
    }

    async function deleteAcc(data) {
      await API.UserService.sendApproveCode(data.values);
      toast.success(t('notifications.account-deleted'));
      resetUserDataAndRedirectToLogin();
      closeModal();
    }

    return {
      currentStep,
      schema,
      sendCode,
      closeModal,
      deleteAcc,
      nextStep,
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
