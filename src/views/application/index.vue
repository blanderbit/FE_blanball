<template>
  <div class="main-wrapper">
    <mobile-menu
      :isMenuActive="isMobMenuActive"
      @close-menu="isMobMenuActive = false"
    />
    <sidebar />
    <div class="main-block">
      <div class="container">
        <main-header @menu-icon-click="isMobMenuActive = true" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './../../components/Sidebar.vue'
import MainHeader from './../../components/MainHeader.vue'
import MobileMenu from '../../components/MobileMenu.vue'
import Notification from '../../components/Notification.vue'
import { useToast } from 'vue-toastification'
import {
  MessageActionDataTypes,
  MessageActionTypes,
} from '../../workers/web-socket-worker/message.action.types'
import { useRouter } from 'vue-router'
import { WebSocketWorkerInstance } from './../../workers/web-socket-worker'
import { TokenWorker } from '../../workers/token-worker'

const isMobMenuActive = ref(false)

const router = useRouter()
const toast = useToast()
let timeout

const createUniqueId = () => 'id' + Math.random().toString(16).slice(2)

const handlerAction = async (item, notificationInstance) => {
  clearTimeout(timeout)
  if (item.actionType === MessageActionDataTypes.Url) {
    router.push(item.action)
  }

  if (item.actionType === MessageActionDataTypes.UrlCallback) {
    router.push(item.action(router))
  }

  if (item.actionType === MessageActionDataTypes.Callback) {
    await item.action(notificationInstance)
  }

  if (
    [
      MessageActionTypes.Action,
      MessageActionTypes.ActionClose,
      MessageActionTypes.Close,
    ].includes(item.type)
  ) {
    notificationInstance.readAfterActiveActionCallBack(notificationInstance)
  }
}

const toggleToastProgress = (notificationInstance, toastId, active) => {
  const toastDataOptions = getToastOptions(notificationInstance, toastId)
  toastDataOptions.componentOptions.props.active = active
  // toastDataOptions.options.draggable = !active;

  toast.update(toastId, {
    content: toastDataOptions.componentOptions,
    options: toastDataOptions.options,
  })
}

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
        notificationType: 'push'
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
    },
  }
}

const createToastFromInstanceType = (notificationInstance) => {
  const toastDataOptions = getToastOptions(
    notificationInstance,
    createUniqueId()
  )

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

WebSocketWorkerInstance.registerCallback((instanceType) => {
  if (instanceType.pushNotification) {
    createToastFromInstanceType(instanceType)
  }
}).connect(TokenWorker.getToken())
</script>

<style lang="scss">
@import 'bootstrap/dist/css/bootstrap-grid.min.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-wrapper {
  display: grid;
  grid-template-columns: 64px 1fr;
  height: 100vh;
  overflow: hidden;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  .main-block {
    height: 100%;
    // overflow: hidden;
  }
}
</style>


