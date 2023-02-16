<template>
  <div class="main-wrapper">
    <VerifyEmailModal
      v-if="isVerifyModalActive"
      :user-email="userEmail"
      @close-modal="isVerifyModalActive = false"
      @email-verified="isUserVerified = true"
    />

    <div v-if="!isUserVerified" class="b_header_validate-email-block">
      <span class="b_header_text">
        {{ $t('header.approve-your-email') }}: {{ userEmail }}
      </span>
      <span class="b_header_verify-btn" @click="isVerifyModalActive = true">
        {{ $t('header.approve-email') }}
      </span>
    </div>
    <mobile-menu
      :isMenuActive="isMobMenuActive"
      @close-menu="isMobMenuActive = false"
    />
    <sidebar />
    <div class="main-block">
      <div class="container">
        <div class="main-body-inner">
          <main-header @menu-icon-click="isMobMenuActive = true" />
          <router-view />
        </div>
      </div>
    </div>
    <ModalFeedback
        :isActive="isCreateReviewModalActive"
        :eventData="endedEventData"
        :animationActive="modalFeedBackAnimation"
        :selectedEmojies="selectedEmojies"
        @emojiSelection="emojiSelection"
        @close-modal="closeEventReviewModal"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { v4 as uuid } from 'uuid'

import Sidebar from './../../components/Sidebar.vue'
import MainHeader from './../../components/MainHeader.vue'
import MobileMenu from '../../components/MobileMenu.vue'
import Notification from '../../components/Notification.vue'
import VerifyEmailModal from '../../components/user-cabinet/VerifyEmailModal.vue'
import ModalFeedback from '../../components/ModalFeedback/index.vue'

import { AuthWebSocketWorkerInstance } from './../../workers/web-socket-worker'
import { TokenWorker } from '../../workers/token-worker'
import { notificationButtonHandlerMessage } from "../../workers/utils-worker";
import { useUserDataStore } from '@/stores/userData'
import { NotificationsBus } from '../../workers/event-bus-worker' 
import { MessageActionTypes } from '../../workers/web-socket-worker/message.action.types'
import { API } from '../../workers/api-worker/api.worker'

import message_audio from '../../assets/audio/message_audio.mp3'


const isVerifyModalActive = ref(false);
const userEmail = ref('');
const isUserVerified = ref(true);
const isMobMenuActive = ref(false);
const isCreateReviewModalActive = ref(false)
const endedEventData = ref({})
const selectedEmojies = ref([])
const modalFeedBackAnimation = ref(false)

const closeEventReviewModal = () => {
  isCreateReviewModalActive.value = false
  modalFeedBackAnimation.value = false
}

const openEventReviewModal = () => {
  if (isCreateReviewModalActive.value) {
    modalFeedBackAnimation.value = true
    setTimeout(() => {modalFeedBackAnimation.value = false}, 500)
  }
  isCreateReviewModalActive.value = true
}

NotificationsBus.on('openEventReviewModal', async (data) => {
  const respone = await API.EventService.getOneEvent(data.data.event.id)
  endedEventData.value = respone.data
  openEventReviewModal()
});


const emojiSelection = (emoji) => {
  for (let i = 0; i < selectedEmojies.value.length; i++) {
    if (selectedEmojies.value[i].step === emoji.step) {
      // Update the existing object
      selectedEmojies.value[i] = emoji;
      return
    }
  }
  selectedEmojies.value.push(emoji);
}


const router = useRouter();
const toast = useToast();
const store = useUserDataStore()
const audio = new Audio(message_audio)
let timeout

isUserVerified.value = store.user?.is_verified
userEmail.value = store.user?.email || ''

const handlerAction = async (button, notificationInstance) => {
  clearTimeout(timeout);
  await notificationButtonHandlerMessage({
    button,
    notificationInstance,
    router,
  })
}

const toggleToastProgress = (notificationInstance, toastId, active) => {
  const toastDataOptions = getToastOptions(notificationInstance, toastId)
  toastDataOptions.componentOptions.props.active = active

  toast.update(toastId, {
    content: toastDataOptions.componentOptions,
    options: toastDataOptions.options,
  })
}

const getToastOptions = (notificationInstance, toastId) => {
  const close = notificationInstance.actions.find(
    (item) => item.type === MessageActionTypes.Close
  )
  notificationInstance.actions = notificationInstance.actions.filter(
    (item) => item.type !== MessageActionTypes.Close
  )
  return {
    componentOptions: {
      component: Notification,
      props: {
        notificationInstance,
        notificationType: 'notification-push',
      },
      listeners: {
        handlerAction: async (item) => {
          toggleToastProgress(notificationInstance, toastId, true)
          await handlerAction(item, notificationInstance)
          toggleToastProgress(notificationInstance, toastId, false)
          toast.dismiss(toastId)
        },
        handlerClose: async () => {
          if (close) {
            toggleToastProgress(notificationInstance, toastId, true)
            await handlerAction(close, notificationInstance)
            toggleToastProgress(notificationInstance, toastId, false)
          }

          toast.dismiss(toastId)
        },
      },
    },
    options: {
      id: toastId,
      timeout: false,
      position: 'top-right',
      closeOnClick: false,
      draggable: false, // есть ошибка абдейта, если обновляем то драгбл не пропадает
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: 'button',
      icon: false,
      rtl: false,
      toastClassName: [notificationInstance.getPushNotificationTheme()],
      userEmail,
    },
  }
}

const createToastFromInstanceType = (notificationInstance) => {
  const toastDataOptions = getToastOptions(notificationInstance, uuid())

  const toastId = toast(
    toastDataOptions.componentOptions,
    toastDataOptions.options
  )

  if (notificationInstance.timeForClose) {
    timeout = setTimeout(() => {
      toast.dismiss(toastId)
    }, notificationInstance.timeForClose)
  }
}

const handleNewMessage = (instanceType) => {
  if (instanceType.pushNotification) {
    createToastFromInstanceType(instanceType)
    audio.play()
  }
}

AuthWebSocketWorkerInstance.registerCallback(handleNewMessage).connect({
  token: TokenWorker.getToken(),
})

onBeforeUnmount(() => {
  AuthWebSocketWorkerInstance.destroyCallback(handleNewMessage).disconnect()
})
</script>

<style lang="scss">
html {
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-wrapper {
  display: grid;
  grid-template-columns: 64px 1fr;
  height: 100vh;
  // overflow: hidden;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  .b_header_validate-email-block {
    padding: 6px 8px;
    background: #272643;
    border-radius: 6px;
    position: absolute;
    left: 50%;
    z-index: 3;
    transform: translate(-50%, 10px);
    text-align: center;
    .b_header_text {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #ffffff;
    }
    .b_header_verify-btn {
      padding: 2px 8px;
      background: #454461;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 24px;
      text-align: center;
      color: #ffffff;
      display: inline-block;
      cursor: pointer;
      margin-left: 12px;
    }
  }
  .main-block {
    height: 100%;
    // overflow: hidden;
    .main-body-inner {
      display: grid;
      grid-template-rows: 90px 1fr;
      height: 100vh;
    }
  }
}
</style>
