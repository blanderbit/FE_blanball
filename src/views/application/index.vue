<template>
  <div class="main-wrapper">
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
        v-if="modals.review.active"
        @close-modal="toggleModal"
    />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { v4 as uuid } from "uuid";

import Sidebar from './../../components/Sidebar.vue'
import MainHeader from './../../components/MainHeader.vue'
import MobileMenu from '../../components/MobileMenu.vue'
import Notification from '../../components/Notification.vue'
import ModalFeedback from '../../components/ModalFeedback/index.vue'

import message_audio from '../../assets/message_audio.mp3'

import { AuthWebSocketWorkerInstance } from './../../workers/web-socket-worker'
import { TokenWorker } from '../../workers/token-worker'
import { notificationButtonHandlerMessage } from "../../workers/utils-worker";

import { MessageActionTypes } from '../../workers/web-socket-worker/message.action.types'

const isMobMenuActive = ref(false);
const modals = ref({
    review: {
        data: {},
        active: false
    }
});

const router = useRouter();
const toast = useToast();
const audio = new Audio(message_audio);
let timeout;

const handlerAction = async (item, notificationInstance) => {
  clearTimeout(timeout);
  await notificationButtonHandlerMessage({
    item,
    notificationInstance,
    router
  })
};

const toggleToastProgress = (notificationInstance, toastId, active) => {
  const toastDataOptions = getToastOptions(notificationInstance, toastId);
  toastDataOptions.componentOptions.props.active = active;

  toast.update(toastId, {
    content: toastDataOptions.componentOptions,
    options: toastDataOptions.options,
  })
};

const getToastOptions = (notificationInstance, toastId) => {
  const close = notificationInstance.actions.find(
    (item) => item.type === MessageActionTypes.Close
  );
  notificationInstance.actions = notificationInstance.actions.filter(
    (item) => item.type !== MessageActionTypes.Close
  );
  return {
    componentOptions: {
      component: Notification,
      props: {
        notificationInstance,
        notificationType: 'notification-push'
      },
      listeners: {
        handlerAction: async (item) => {
          toggleToastProgress(notificationInstance, toastId, true);
          await handlerAction(item, notificationInstance);
          toggleToastProgress(notificationInstance, toastId, false);
          toast.dismiss(toastId)
        },
        handlerClose: async () => {
          if (close) {
            toggleToastProgress(notificationInstance, toastId, true);
            await handlerAction(close, notificationInstance);
            toggleToastProgress(notificationInstance, toastId, false);
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
    },
  }
};

const createToastFromInstanceType = (notificationInstance) => {
  const toastDataOptions = getToastOptions(
    notificationInstance,
    uuid()
  );

  const toastId = toast(
    toastDataOptions.componentOptions,
    toastDataOptions.options
  );

  if (notificationInstance.timeForClose) {
    timeout = setTimeout(() => {
      toast.dismiss(toastId)
    }, notificationInstance.timeForClose )
  }
};

const handleNewMessage = (instanceType) => {
  if (instanceType.pushNotification) {
    createToastFromInstanceType(instanceType);
    audio.play()
  };
};

AuthWebSocketWorkerInstance
  .registerCallback(handleNewMessage)
  .connect({
    token: TokenWorker.getToken()
  });

onBeforeUnmount(() => {
  AuthWebSocketWorkerInstance
    .destroyCallback(handleNewMessage)
    .disconnect()
});

</script>

<style lang="scss">

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


