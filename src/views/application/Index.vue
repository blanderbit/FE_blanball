<template>
  <div @contextmenu.prevent class="main-wrapper">
    <NewVersionModal
      v-if="isNewVersionModalActive"
      @closeModal="closeNewVersionModal"
    />
    <VerifyEmailModal
      v-if="isVerifyModalActive"
      :user-email="userStore.user.email"
      @close-modal="isVerifyModalActive = false"
      @email-verified="emailVerified"
    />

    <sidebar />
    <div class="main-block">
      <div
        v-if="isHeaderOnThisPageVisible"
        class="header-block"
        id="header"
        ref="header"
      >
        <div class="b_header_validate-email-block-wrapper">
          <div
            v-if="!userStore.user.is_verified"
            class="b_header_validate-email-block"
          >
            <span class="b_header_text">
              {{ $t('header.approve-your-email') }}: {{ userStore.user.email }}
            </span>
            <span
              class="b_header_verify-btn"
              @click="isVerifyModalActive = true"
            >
              {{ $t('register.accept') }}
            </span>
          </div>
        </div>
        <div class="container">
          <main-header
            :isSchedulerOpened="isSchedulerOpened"
            @menu-icon-click="openMobileMenu"
            @openCloseScheduler="openCloseScheduler"
          />
        </div>
      </div>
      <div :class="{ container: isContainerOnThisPage }">
        <div class="main-body-inner">
          <router-view />
          <!-- <Transition name="hint-fade">
            <Hint
              v-if="currentVisibleHint.name"
              :hintData="currentVisibleHint"
              @closeHint="closeCurrentHint"
            />
          </Transition> -->
        </div>
      </div>
    </div>

    <ActionModal
      v-if="isActionModalOpened"
      :modalData="ActionModalConfig"
      @closeModal="closeEventActiondModal"
    />

    <ModalFeedback
      :isActive="isCreateReviewModalActive"
      :eventData="endedEventData"
      :animationActive="modalFeedBackAnimation"
      :selectedEmojies="selectedEmojies"
      @emojiSelection="emojiSelection"
      @close-modal="closeEventReviewModal"
      @createEventReview="createEventReview"
    />

    <Transition name="scheduler">
      <KeepAlive>
        <Scheduler
          v-if="isSchedulerOpened"
          :marginTop="schedulerTopSideMargin"
          @closeWindow="isSchedulerOpened = false"
        >
          <template #LeftSidebar="{ isFriendsVisible, friendsBlockSwitcher }">
            <LeftSidebar
              v-if="isSchedulerSidebarVisible"
              :is-friends-visible="isFriendsVisible"
              @friendsBlockSwitcher="friendsBlockSwitcher"
            />
          </template>
          <template
            #TopFriendsBlock="{
              isFriendsVisible,
              minUsers,
              usersNumber,
              friendsBlockSwitcher,
            }"
          >
            <TopLineFriends
              :isFriendsVisible="isFriendsVisible"
              :minUsers="minUsers"
              :usersNumber="usersNumber"
              :friendsBlockSwitcher="friendsBlockSwitcher"
            />
          </template>
        </Scheduler>
      </KeepAlive>
    </Transition>
  </div>
</template>

<script setup>
import { v4 as uuid } from 'uuid';

import Sidebar from '@mainComponents/sidebar/Sidebar.vue';
import mainHeader from '@mainComponents/header/MainHeader.vue';
import Notification from '@mainComponents/notifications/Notification.vue';
import VerifyEmailModal from '@mainComponents/profile/modals/VerifyEmailModal.vue';
import ModalFeedback from '@mainComponents/manageEvent/modals/createFeedBackModal/index.vue';
import ActionModal from '@mainComponents/events/modals/ActionModal.vue';
import Scheduler from '@mainComponents/scheduler/index.vue';
import LeftSidebar from '@mainComponents/scheduler/LeftSidebar.vue';
import TopLineFriends from '@mainComponents/scheduler/TopLineFriends.vue';
import NewVersionModal from '@mainComponents/versions/modals/NewVersionModal.vue';

import { AuthWebSocketWorkerInstance } from '@workers/web-socket-worker';
import { ChatSocketWorkerInstance } from '@workers/web-socket-worker';
import { accessToken } from '@workers/token-worker';
import { notificationButtonHandlerMessage } from '@workers/utils-worker';
import { useUserDataStore } from '@stores/userData';
import { useHeaderHeightStore } from '@stores/headerHeight';
import { MessageActionTypes } from '@workers/web-socket-worker/message.action.types';

import { VersionDetectorWorker } from '@workers/version-detector-worker';
import { useWindowWidth } from '@workers/window-size-worker/widthScreen';

import EventUpdatedIcon from '@images/event-updated-modal-icon.svg';
import EventCreatedIcon from '@images/event-creted-modal-icon.svg';

import notification_audio from '@/assets/audio/notification-audio.mp3';

const isVerifyModalActive = ref(false);
const header = ref();
const isCreateReviewModalActive = ref(false);
const endedEventData = ref({});
const selectedEmojies = ref([]);
const modalFeedBackAnimation = ref(false);
const isNewVersionModalActive = ref(false);
const isActionModalOpened = ref(false);
const ActionModalConfig = ref({});
const { t } = useI18n();
const activePushNotifications = ref([]);
const router = useRouter();
const toast = useToast();
const userStore = useUserDataStore();
const headerHeightStore = useHeaderHeightStore();
const audio = new Audio(notification_audio);
let timeout;
const avaliableHints = ref([]);
const currentVisibleHint = ref({});

const { isMobileDevice, isTabletDevice } = useWindowWidth();
const { width: headerWidth, height: headerHeight } = useElementSize(header);

const isHeaderOnThisPageVisible = computed(() => {
  return !router.currentRoute.value.meta.noPageHeader;
});

const isContainerOnThisPage = computed(() => {
  return !router.currentRoute.value.meta.noPageContainer;
});

const isSchedulerSidebarVisible = computed(() => {
  return !isMobileDevice.value && !isTabletDevice.value;
});

const schedulerTopSideMargin = computed(() => {
  return isMobileDevice.value || isTabletDevice.value ? headerHeightStore.headerHeight : 80;
});

const closeEventActiondModal = () => {
  isActionModalOpened.value = false;
};
const openEventActionModal = () => {
  isActionModalOpened.value = true;
};

const closeEventReviewModal = () => {
  isCreateReviewModalActive.value = false;
  modalFeedBackAnimation.value = false;
};
const openMobileMenu = () => {
  EventBusInstance.emit('OpenMobileMenu');
};

const emailVerified = () => {
  API.UserService.getMyProfile().then((res) => {
    userStore.$patch({
      user: res.data,
    });
  });
  setHeaderHeight();
  EventBusInstance.emit('emailVerified');
};

const openEventReviewModal = () => {
  if (isCreateReviewModalActive.value) {
    modalFeedBackAnimation.value = true;
    setTimeout(() => {
      modalFeedBackAnimation.value = false;
    }, 500);
  }
  isCreateReviewModalActive.value = true;
};

const onOpenEventReviewModal = async (mockData) => {
  const respone = await API.EventService.getOneEvent(data.data.event.id);
  endedEventData.value = respone.data;
  openEventReviewModal();
};

const onEventCreated = () => {
  ActionModalConfig.value = {
    title: t('modals.event_created.title'),
    description: t('modals.event_created.main-text'),
    image: EventCreatedIcon,
  };
  openEventActionModal();
};

const onEventUpdated = () => {
  ActionModalConfig.value = {
    title: t('modals.event_updated.title'),
    description: t('modals.event_updated.main-text'),
    image: EventUpdatedIcon,
  };
  openEventActionModal();
};

const emojiSelection = (emoji) => {
  for (let i = 0; i < selectedEmojies.value.length; i++) {
    if (selectedEmojies.value[i].step === emoji.step) {
      selectedEmojies.value[i] = emoji;
      return;
    }
  }
  selectedEmojies.value.push(emoji);
};

const handlerAction = async (button, notificationInstance) => {
  clearTimeout(timeout);
  await notificationButtonHandlerMessage({
    button,
    notificationInstance,
    router,
  });
};

const createEventReview = async (comment) => {
  const grade = Math.round(
    selectedEmojies.value.reduce(
      (accumulator, currentValue) => accumulator + currentValue.id,
      0
    ) / 3
  );
  API.ReviewService.createEventReview({
    event: endedEventData.value.id,
    stars: grade,
    text: comment,
  });
};

const toggleToastProgress = (notificationInstance, toastId, active) => {
  const toastDataOptions = getToastOptions(notificationInstance, toastId);
  toastDataOptions.componentOptions.props.active = active;

  toast.update(toastId, {
    content: toastDataOptions.componentOptions,
    options: toastDataOptions.options,
  });
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
        instanceData: notificationInstance,
        notificationType: 'notification-push',
      },
      listeners: {
        handlerAction: async (item) => {
          toggleToastProgress(notificationInstance, toastId, true);
          await handlerAction(item, notificationInstance);
          toggleToastProgress(notificationInstance, toastId, false);
          toast.dismiss(toastId);
          removePushFormActiveNotifications(
            notificationInstance.notification_id
          );
          EventBusInstance.emit(
            'hanlderToRemoveNewNotificationsInSidebar',
            notificationInstance.notification_id
          );
        },
        handlerClose: async () => {
          if (close) {
            toggleToastProgress(notificationInstance, toastId, true);
            await handlerAction(close, notificationInstance);
            toggleToastProgress(notificationInstance, toastId, false);
          }
          toast.dismiss(toastId);
          removePushFormActiveNotifications(
            notificationInstance.notification_id
          );
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
  };
};

const onRemovePushNotificationAfterSidebarAction = (notificationInstance) => {
  if (notificationInstance?.remove_all) {
    dismissAllToasts();
    return;
  }

  const { notification_id, notification_ids } = notificationInstance || {};

  const idsToDismiss = notification_ids || [notification_id];

  activePushNotifications.value
    .filter((notification) =>
      idsToDismiss.includes(notification.notificationId)
    )
    .forEach((notification) => {
      toast.dismiss(notification.toastId);
      removePushFormActiveNotifications(notification.notificationId);
    });
};

function dismissAllToasts() {
  activePushNotifications.value.forEach((notification) => {
    toast.dismiss(notification.toastId);
  });
  activePushNotifications.value = [];
}

function addPushToActiveNotifications(pushData) {
  activePushNotifications.value.push(pushData);
}

function removePushFormActiveNotifications(notificationId) {
  const index = activePushNotifications.value.findIndex(
    (notification) => notification.notificationId === notificationId
  );

  if (index > -1) {
    activePushNotifications.value.splice(index, 1);
  }
}

function openCloseScheduler() {
  isSchedulerOpened.value = !isSchedulerOpened.value;
}

const createToastFromInstanceType = (notificationInstance) => {
  const toastDataOptions = getToastOptions(notificationInstance, uuid());

  const toastId = toast(
    toastDataOptions.componentOptions,
    toastDataOptions.options
  );

  addPushToActiveNotifications({
    toastId: toastId,
    notificationId: notificationInstance.notification_id,
  });

  if (notificationInstance.timeForClose) {
    timeout = setTimeout(() => {
      toast.dismiss(toastId);
    }, notificationInstance.timeForClose);
  }
};

const handleNewMessage = (instanceType) => {
  if (instanceType.pushNotification) {
    createToastFromInstanceType(instanceType);
    audio.play();
  }
};

AuthWebSocketWorkerInstance.registerCallback(handleNewMessage).connect({
  token: accessToken.getToken(),
});

ChatSocketWorkerInstance.connect({
  token: accessToken.getToken(),
});

const VersionHandling = {
  handleDifferentVersion: () => {
    isNewVersionModalActive.value = true;
  },
  closeVersionModal: () => (isNewVersionModalActive.value = false),
};

VersionDetectorWorker(VersionHandling.handleDifferentVersion);

function closeNewVersionModal() {
  VersionHandling.closeVersionModal();
}

function setHeaderHeightCssVar() {
  const doc = document.documentElement;
  doc.style.setProperty('--header-height', headerHeight.value + 'px');
}

function setHeaderHeight() {
  headerHeightStore.$patch({
    headerHeight: headerHeight.value,
  });
}

const closeScheduler = () => {
  isSchedulerOpened.value = false;
};

const createHints = (data) => {
  avaliableHints.value = data.hints;
};

EventBusInstance.on('createHints', createHints);
EventBusInstance.on('closeScheduler', closeScheduler);
EventBusInstance.on('openEventReviewModal', onOpenEventReviewModal);
EventBusInstance.on('EventCreated', onEventCreated);
EventBusInstance.on('EventUpdated', onEventUpdated);
EventBusInstance.on(
  'removePushNotificationAfterSidebarAction',
  onRemovePushNotificationAfterSidebarAction
);

onMounted(() => {
  setHeaderHeight();
  setHeaderHeightCssVar();
});

onBeforeUnmount(() => {
  EventBusInstance.off('openEventReviewModal');
  EventBusInstance.off('removePushNotificationAfterSidebarAction');
  EventBusInstance.off('EventCreated');
  EventBusInstance.off('EventUpdated');
  EventBusInstance.off('closeScheduler', closeScheduler);
  EventBusInstance.off('createHints', createHints);
  AuthWebSocketWorkerInstance.destroyCallback(handleNewMessage).disconnect();
  ChatSocketWorkerInstance.disconnect();
});

watch(
  () => headerHeight.value,
  () => {
    setHeaderHeight();
    setHeaderHeightCssVar();
  }
);

watch(
  () => avaliableHints.value,
  () => {
    if (avaliableHints.value.length) {
      currentVisibleHint.value = avaliableHints.value.at(0);
    }
  }
);

const isSchedulerOpened = ref(false);
</script>

<style lang="scss">
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

.header-block {
  @include allDevicesBeforeDesktop {
    background: $--b-main-white-color;
    position: relative;
    z-index: 501;
  }
}

.main-wrapper {
  display: grid;
  grid-template-columns: 64px 1fr;
  @include calc-height;
  @include allDevicesBeforeDesktop {
    grid-template-columns: 1fr;
  }

  .b_header_validate-email-block-wrapper {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10px);

    @include allDevicesBeforeDesktop {
      position: relative;
    }

    @include mobileDevice {
      padding: 0px 16px;
    }
  }

  .b_header_validate-email-block {
    padding: 6px 8px;
    background: $color-272643;
    border-radius: 6px;
    text-align: center;

    @include mobileDevice {
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
    .main-body-inner {
      @include calc-height;
    }
  }
}

.scheduler-enter-active,
.scheduler-leave-active {
  transition: opacity 0.4s ease;
}

.scheduler-enter-from,
.scheduler-leave-to {
  opacity: 0;
}

.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: opacity 0.4s ease;
}

.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
}
</style>
