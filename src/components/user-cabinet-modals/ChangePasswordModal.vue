<template>
  <Transition>
    <ModalWindow
      @close-modal="closeModal"
    >
      <template #title>
        {{ $t('modals.change_password.title') }}
      </template>
      <template #title-icon>
        <img src="../../assets/img/key.svg" alt="" />
      </template>
      <template #change-password>
        <Form v-slot="data" :validation-schema="schema">
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_password.current-pass')"
              :title-width="0"
              :type="['password', 'text']"
              :outside-title="true"
              :has-icon="true"
              :icon="[eyeCrossed, eyeOpened]"
              name="old_password"
            />
          </div>
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_password.new-pass')"
              :title-width="0"
              :type="['password', 'text']"
              :outside-title="true"
              :has-icon="true"
              :icon="[eyeCrossed, eyeOpened]"
              name="new_password"
            />
          </div>
          <p 
            v-if="modalChangeStep === 2 && seconds > 0"
            class="sms-text"
          >
            {{ $t('modals.change_password.sms-code') }}
            {{ userEmail }}
            {{ $t('modals.change_password.during') }}
            {{seconds}}
            {{ $t('modals.change_password.seconds') }}
          </p>
          <p 
            v-if="modalChangeStep === 2 && seconds === 0"
            class="sms-text"
          >
            {{ $t('modals.change_password.sms-not-came') }}
            <span @click="resendCode(data)">
              {{ $t('modals.change_password.send-again') }}
            </span>
          </p>
          <div
            v-show="modalChangeStep === 2"
            class="sms-code-block"
          >
            <CodeInput
              :fields="5"
              :fieldWidth="48"
              :fieldHeight="40"
              :required="true"
              name="password_code"
              @complete="completed = true"
            />
          </div>
          <div 
            v-if="errorMessage.length > 0"
            class="error-message"
          >
            *{{ errorMessage }}
          </div>
          <div class="btns-block">
            <div class="cancle-btn" @click="closeModal">
              {{ $t('buttons.cancel-editing') }}
            </div>
            <div class="save-btn" @click="changePassword(data)">
              {{ $t('buttons.save-changes') }}
            </div>
          </div>
        </Form>
      </template>
    </ModalWindow>
  </Transition>
</template>

<script>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { Form } from '@system.it.flumx.com/vee-validate'
import * as yup from "yup"

import ModalWindow from '../../components/ModalWindow.vue'
import CodeInput from '../../components/CodeInput.vue'
import InputComponent from '../../components/InputComponent.vue'

import eyeCross from '../../assets/img/eye-crossed.svg'
import eyeOpen from '../../assets/img/eye-opened.svg'

import { API } from "../../workers/api-worker/api.worker"

export default {
  name: 'ChangePasswordModal',
  props: {
    userEmail: {
      type: String,
      default: ''
    }
  },
  components: {
    Form,
    ModalWindow,
    CodeInput,
    InputComponent
  },
  setup(props, context) {
    const modalChangeStep = ref(1)
    const errorMessage = ref('')
    const seconds = ref(30)
    const interval = ref(null)

    const schema = computed(() => {
      return yup.object({
        password_code: yup.string().required().min(5),
      })
    })
    const eyeCrossed = computed(() => eyeCross)
    const eyeOpened = computed(() => eyeOpen) 

    watch(modalChangeStep, () => {
      interval.value = setInterval(() => {
        if (seconds.value !== 0) {
          seconds.value--
        }
      }, 1000)
    })

    function closeModal() {
      modalChangeStep.value = 1
      context.emit('closeModal', 'change_password')
    }

    function resendCode(formData) {
      const newPassword = formData.controlledValues.new_password
      const oldPassword = formData.controlledValues.old_password
      const payload = {
        new_password: newPassword,
        old_password: oldPassword,
      }
      API.UserService.changePassword(payload)
      seconds.value = 30
    }

    function changePassword(formData) {
      const newPassword = formData.controlledValues.new_password
      const oldPassword = formData.controlledValues.old_password
      const passCode = formData.controlledValues.password_code

      if (modalChangeStep.value === 1 && newPassword && oldPassword) {
        modalChangeStep.value = 2
        const payload = {
          new_password: newPassword,
          old_password: oldPassword,
        }
        API.UserService.changePassword(payload)
      } 
      if (modalChangeStep.value === 2 && passCode) {
        const payload = {
          verify_code: passCode
        }
        API.UserService.sendApproveCode(payload)
        .then(() => {
          closeModal()
        })
        .catch(e => {
          console.log('change password error', e.data.error)
          errorMessage.value = 'Щось там на сэрвэри пишло не так'
        })
      }
    }

    onBeforeUnmount(() => {
      clearInterval(interval.value)
      seconds.value = 30
    })

    return {
      closeModal,
      changePassword,
      resendCode,
      modalChangeStep,
      schema,
      eyeCrossed,
      eyeOpened,
      errorMessage,
      seconds
    }
  }
}
</script>

<style lang="scss" scoped>

</style>