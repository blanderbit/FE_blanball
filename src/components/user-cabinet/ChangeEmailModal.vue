<template>
  <Transition>
    <ModalWindow>
      <template #title>
        {{ $t('modals.change_login.title') }}
      </template>
      <template #title-icon>
        <img src="../../assets/img/envelop.svg" alt="" />
      </template>
      <template #change-login>
        <div v-if="modalSteps.first" class="inut-wrapper">
          <InputComponent
            :title="$t('modals.change_login.current-email')"
            :placeholder="userEmail"
            :outside-title="true"
            :title-width="0"
            :is-disabled="true"
          />
        </div>
        <Form v-slot="data" :validation-schema="schema" @submit="disableSubmit">
          <div class="inut-wrapper">
            <InputComponent
              :title="
                modalSteps.first
                  ? $t('modals.change_login.new-email')
                  : $t('modals.change_login.email')
              "
              :placeholder="'example@panda.com'"
              :outside-title="true"
              :title-width="0"
              :is-disabled="modalSteps.first ? false : true"
              name="email"
            />
          </div>
          <div v-if="modalSteps.second" class="description-text">
            <Counter
              :start-time="30"
              :counter-text="$t('modals.change_login.code-message')"
              :email="userEmail"
              @resend-code-action="sendEmailAgain"
            />
          </div>
          <div v-show="modalSteps.second" class="code-input-field">
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
            <div class="cancle-btn" @click="cancelClick">
              {{ cancelBtnTitle }}
            </div>
            <div class="save-btn" @click="saveClick(data)">
              {{ saveBtnTitle }}
            </div>
          </div>
        </Form>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref } from 'vue'
import { Form } from '@system.it.flumx.com/vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

import ModalWindow from '../../components/ModalWindow.vue'
import Counter from '../../components/Counter.vue'
import CodeInput from '../../components/forms/CodeInput.vue'
import InputComponent from '../../components/forms/InputComponent.vue'

import { API } from '../../workers/api-worker/api.worker'

export default {
  name: 'ChangeEmailModal',
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
  emits: ['closeModal', 'email'],
  setup(props, context) {
    const { t } = useI18n()
    const modalSteps = ref({
      first: true,
      second: false,
    })
    const repeatEmail = ref('')

    const schema = computed(() => {
      return yup.object({
        verify_code: yup
          .string()
          .required('errors.required')
          .min(5, 'errors.min5'),
        email: yup.string().required('errors.required'),
      })
    })

    const cancelBtnTitle = computed(() => {
      return modalSteps.value.first
        ? t('buttons.cancel-editing')
        : t('buttons.return')
    })

    const saveBtnTitle = computed(() => {
      return modalSteps.value.first
        ? t('buttons.save-changes')
        : t('buttons.approve')
    })

    function setSteps(first, second) {
      modalSteps.value = {
        first,
        second,
      }
    }
    function cancelClick() {
      if (modalSteps.value.first) {
        closeModal()
      } else {
        setSteps(true, false)
      }
    }
    function saveClick(data) {
      let payload
      if (modalSteps.value.first) {
        setSteps(false, true)
        payload = { email: data.controlledValues.email }
        repeatEmail.value = payload
        sendCodeForChangingEmail(payload)
      } else {
        payload = { verify_code: data.controlledValues.verify_code }
        API.UserService.sendApproveCode(payload).then(() => {
          closeModal()
          context.emit('email')
        })
      }
    }
    function sendEmailAgain() {
      sendCodeForChangingEmail(repeatEmail.value)
    }
    function sendCodeForChangingEmail(val) {
      API.UserService.changeUserEmail(val)
    }
    function closeModal() {
      setSteps(true, false)
      context.emit('closeModal', 'email')
    }
    function sendCodeForChangeEmail() {}

    return {
      closeModal,
      cancelClick,
      saveClick,
      sendCodeForChangeEmail,
      sendEmailAgain,
      modalSteps,
      schema,
      cancelBtnTitle,
      saveBtnTitle,
      disableSubmit: (e) => {
        e.stopPropagation()
        e.preventDefault()
      },
    }
  },
}
</script>

<style></style>
