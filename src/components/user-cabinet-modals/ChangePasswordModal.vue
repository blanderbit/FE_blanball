<template>
  <Transition>
    <ModalWindow
      @close-modal="closeModal"
    >
      <template #title>
        {{ $t('modals.change_password.title') }}
      </template>
      <template #title-icon>
        <img src="../../../assets/img/key.svg" alt="" />
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
            />
          </div>
          <p 
            v-if="modalChangeStep === 2"
            class="sms-text"
          >
            {{ $t('modals.change_password.sms-code') }}
            {{ userEmail }}
            {{ $t('modals.change_password.during') }}
            30
            {{ $t('modals.change_password.seconds') }}
          </p>
          <div
            v-if="modalChangeStep === 2"
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import * as yup from "yup"

import ModalWindow from '../../components/ModalWindow.vue'
import CodeInput from '../../components/CodeInput.vue'
import InputComponent from '../../components/InputComponent.vue'


import { API } from "../../workers/api-worker/api.worker"

import { ROUTES } from "../../router"

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
  setup() {
    const modalChangeStep = ref(1)
    const schema = computed(() => {
      return yup.object({
        verify_code: yup.string().required().min(5),
      })
    })

    function closeModal() {
      modalChangeStep.value = 1
      context.emit('closeModal', 'change_password')
    }

    function changePassword(formData) {
      console.log(formData)
      if (modalChangeStep.value === 1) {
        console.log('inside changePass')
        modalChangeStep.value = 2
      } else {
        console.log('api goo')
      }
    }

    return {
      closeModal,
      changePassword,
      modalChangeStep,
      schema
    }
  }
}
</script>

<style lang="scss" scoped>

</style>