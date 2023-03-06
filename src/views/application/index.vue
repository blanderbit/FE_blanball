<template>
  <div class="main-wrapper">
    <VerifyEmailModal
      v-if="isVerifyModalActive"
      :user-email="userEmail"
      @close-modal="isVerifyModalActive = false"
      @email-verified="isUserVerified = true"
    />

    <div class="b_header_validate-email-block-wrapper">
      <div v-if="!isUserVerified" class="b_header_validate-email-block">
        <span class="b_header_text">
          {{ $t('header.approve-your-email') }}: {{ userEmail }}
        </span>
        <span class="b_header_verify-btn" @click="isVerifyModalActive = true">
          Підтвердити
        </span>
      </div>
    </div>
    <sidebar />
    <div class="main-block">
      <div class="container">
        <div class="main-body-inner">
          <main-header @menu-icon-click="openMobileMenu"/>
          <router-view />
        </div>
      </div>
    </div>

    <EventCreatedSuccessModal 
      v-if="isEventCreatedModalActive" 
      @closeModal="closeEventCreatedModal"/>

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
import { storeToRefs } from 'pinia'

import Sidebar from './../../components/Sidebar.vue'
import MainHeader from './../../components/MainHeader.vue'
import Notification from '../../components/Notification.vue'
import VerifyEmailModal from '../../components/ModalWindows/UserCabinetModalWindows/VerifyEmailModal.vue'
import ModalFeedback from '../../components/ModalWindows/ModalFeedbackModalWindow/index.vue'
import EventCreatedSuccessModal from '../../components/manage-event-components/EventCreatedSuccessModal.vue'

import { AuthWebSocketWorkerInstance } from './../../workers/web-socket-worker'
import { TokenWorker } from '../../workers/token-worker'
import { notificationButtonHandlerMessage } from "../../workers/utils-worker";
import { useUserDataStore } from '@/stores/userData'
import { NotificationsBus, BlanballEventBus } from '../../workers/event-bus-worker' 
import { MessageActionTypes } from '../../workers/web-socket-worker/message.action.types'
import { API } from '../../workers/api-worker/api.worker'

import message_audio from '../../assets/audio/message_audio.mp3'


const isVerifyModalActive = ref(false);
const userEmail = ref('');
const isUserVerified = ref(true);
const isCreateReviewModalActive = ref(false)
const endedEventData = ref({})
const selectedEmojies = ref([])
const modalFeedBackAnimation = ref(false)
const isEventCreatedModalActive = ref(false)


const closeEventCreatedModal = () => {
  isEventCreatedModalActive.value = false
}
const openEventCreatedModal = () => {
  isEventCreatedModalActive.value = true
}

const closeEventReviewModal = () => {
  isCreateReviewModalActive.value = false
  modalFeedBackAnimation.value = false
}
const openMobileMenu = () => {
  BlanballEventBus.emit('OpenMobileMenu')
}

const openEventReviewModal = () => {
  if (isCreateReviewModalActive.value) {
    modalFeedBackAnimation.value = true
    setTimeout(() => {
      modalFeedBackAnimation.value = false
    }, 500)
  }
  isCreateReviewModalActive.value = true
}

NotificationsBus.on('openEventReviewModal', async (data) => {
  const respone = await API.EventService.getOneEvent(data.data.event.id)
  endedEventData.value = respone.data
  openEventReviewModal()
});

BlanballEventBus.on('EventCreated', () => {
  openEventCreatedModal()
});

const emojiSelection = (emoji) => {
  for (let i = 0; i < selectedEmojies.value.length; i++) {
    if (selectedEmojies.value[i].step === emoji.step) {
      // Update the existing object
      selectedEmojies.value[i] = emoji
      return
    }
  }
  selectedEmojies.value.push(emoji)
}

const router = useRouter()
const toast = useToast()
const store = useUserDataStore()
const { user } = storeToRefs(store)
const audio = new Audio(message_audio)
let timeout

isUserVerified.value = user.value?.is_verified
userEmail.value = user.value?.email || ''

const handlerAction = async (button, notificationInstance) => {
  clearTimeout(timeout)
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
  NotificationsBus.off('openEventReviewModal');
  BlanballEventBus.off('EventCreated');
  AuthWebSocketWorkerInstance.destroyCallback(handleNewMessage).disconnect();
})
</script>

<style lang="scss">

// SCSS variables for hex colors
 $color-272643: #272643;
 $color-454461: #454461;


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

  .b_header_validate-email-block-wrapper {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10px);

    @media (max-width: 992px) {
      position: relative;
    }

    @include mobile {
      padding: 0px 16px;
    }
  }
  
  .b_header_validate-email-block {
    padding: 6px 8px;
    background: $color-272643;
    border-radius: 6px;
    text-align: center;

    @include mobile {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
    }

    .b_header_text {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: $--b-main-white-color;
      margin-right: 20px;
    }
    .b_header_verify-btn {
      padding: 2px 8px;
      background: $color-454461;
      border-radius: 4px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      color: $--b-main-white-color;
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
