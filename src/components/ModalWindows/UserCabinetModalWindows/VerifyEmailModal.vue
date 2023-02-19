<template>
  <Transition>
    <ModalWindow>
      <template #title>
        {{ $t('modals.verify_email.title') }}
      </template>
      <template #title-icon>
        <img src="../../assets/img/envelop.svg" alt="" />
      </template>
      <template #verify-email>
        <Form v-slot="data" :validation-schema="schema">
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_login.email')"
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
              @resend-code-action="sendEmailAgain"
            />
          </div>
          <div class="code-input-field">
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
            <div class="cancle-btn" @click="$emit('closeModal')">
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
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

import { Form } from '@system.it.flumx.com/vee-validate'

import * as yup from 'yup'

import ModalWindow from '../ModalWindow.vue'
import Counter from '../../Counter.vue'
import CodeInput from '../../forms/CodeInput.vue'
import InputComponent from '../../forms/InputComponent.vue'

import { API } from '../../../workers/api-worker/api.worker'

export default {
  name: 'VerifyEmailModal',
  components: {
    ModalWindow,
    InputComponent,
    Counter,
    CodeInput,
    Form,
  },
  props: {
    userEmail: {
      type: String,
      default: '',
    },
  },
  emits: ['closeModal', 'emailVerified'],
  setup(props, context) {
    const toast = useToast()
    const { t } = useI18n()

    const schema = computed(() => {
      return yup.object({
        verify_code: yup
          .string()
          .required('errors.required')
          .min(5, 'errors.min5'),
        email: yup.string().required('errors.required'),
      })
    })

    API.AuthorizationService.VerifyEmail().catch((e) =>
      console.log('some mistake happened', e)
    )

    function saveClick(data) {
      const payload = { verify_code: data.controlledValues?.verify_code }
      API.AuthorizationService.VerifyCode(payload)
        .then(() => {
          context.emit('closeModal')
          context.emit('emailVerified')
          toast.success(t('notifications.email-verified'))
        })
        .catch(() => {
          toast.error(t('notifications.some-mistake'))
          console.log('some mistake happened')
        })
    }
    function sendEmailAgain() {
      API.AuthorizationService.VerifyEmail()
    }

    return {
      saveClick,
      sendEmailAgain,
      schema,
    }
  },
}
</script>

<style></style>
