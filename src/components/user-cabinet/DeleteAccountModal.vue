<template>
  <Transition>
    <ModalWindow
      :title-color="'#C10B0B'"
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
            <Counter 
              :start-time="30"
              :counter-text="$t('modals.delete_acc.text-second')"
              :email="userEmail"
              @resend-code-action="sendCodeForDeleteAcc" 
            />
          </div>
          <Form v-slot="data" :validation-schema="schema" @submit="disableSubmit">
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
import { Form } from '@system.it.flumx.com/vee-validate'
import * as yup from "yup"

import ModalWindow from '../../components/ModalWindow.vue'
import Counter from '../../components/Counter.vue'
import CodeInput from '../../components/forms/CodeInput.vue'

import { API } from "../../workers/api-worker/api.worker"
import { ROUTES } from "../../router/router.const";

export default {
  name: 'DeleteAccountModal',
  components: {
    ModalWindow,
    CodeInput,
    Form,
    Counter
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
        verify_code: yup.string().required('errors.required').min(5, 'errors.min5'),
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
      };
      API.UserService.deleteMyProfile()
    }

    function deleteAcc(formData) {
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
      schema,
      disableSubmit: (e) => {
        e.stopPropagation()
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>