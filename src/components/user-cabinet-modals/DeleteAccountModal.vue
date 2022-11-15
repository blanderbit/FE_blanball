<template>
  <Transition>
    <ModalWindow
      :title-color="'#C10B0B'"
      @close-modal="closeModal"
    >
      <template #title>
        {{ $t('modals.delete_acc.title') }}
      </template>
      <template #title-icon>
        <img src="../../assets/img/warning.svg" alt="" />
      </template>
      <template #delete-account>
        <div
          v-if="modalDeleteAcc.first" 
          class="first-screen"
        >
          <div class="description-text">
            {{ $t('modals.delete_acc.text') }}
          </div>
          <div class="btns-block">
            <div 
              class="cancle-delete-acc" 
              @click="closeModal"
            >
              {{ $t('buttons.cancel-deleting') }}
            </div>
            <div 
              class="delete-acc" 
              @click="sendCodeForDeleteAcc"
            >
              {{ $t('buttons.delete-account') }}
            </div>
          </div>
        </div>
        <div 
          v-if="modalDeleteAcc.second" 
          class="second-screen"
        >
          <div class="description-title-second">
            {{ $t('modals.delete_acc.title-second') }}
          </div>
          <div class="description-text">
            {{ $t('modals.delete_acc.text-second') }}
            {{userEmail}}
            {{ $t('modals.delete_acc.during-seconds') }}
          </div>
          <Form v-slot="data" :validation-schema="schema">
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
              <div 
                class="cancle-delete-acc" 
                @click="closeModal"
              >
                {{ $t('buttons.cancel-deleting') }}
              </div>
              <div class="delete-acc" @click="deleteAcc(data)">
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from 'vee-validate'
import * as yup from "yup"

import ModalWindow from '../../components/ModalWindow.vue'
import CodeInput from '../../components/CodeInput.vue'

import { API } from "../../workers/api-worker/api.worker"

import { ROUTES } from "../../router"

export default {
  name: 'DeleteAccountModal',
  components: {
    ModalWindow,
    CodeInput,
    Form
  },
  props: {
    userEmail: {
      type: String,
      default: ''
    }
  },
  emits: ['closeModal'],
  setup(props, context) {
    const router = useRouter()
    const modalDeleteAcc = ref({
      first: true,
      second: false,
    })
    const schema = computed(() => {
      return yup.object({
        verify_code: yup.string().required().min(5),
      })
    })

    function closeModal() {
      modalDeleteAcc.value = {
        first: true,
        second: false,
      }
      context.emit('closeModal', 'delete_acc')
    }

    function sendCodeForDeleteAcc() {
      modalDeleteAcc.value = {
        first: false,
        second: true,
      },
      API.UserService.deleteMyProfile()
    }

    function deleteAcc(formData) {
      console.log(formData.controlledValues)
      API.UserService.sendApproveCode(formData.controlledValues)
        .then(() => {
          localStorage.removeItem('token')
          router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute)
        })
        .catch((e) => {
          console.log('Delete account error', e)
        })
    }

    return {
      sendCodeForDeleteAcc,
      closeModal,
      deleteAcc,
      modalDeleteAcc,
      schema
    }
  }
}
</script>

<style lang="scss" scoped>

</style>