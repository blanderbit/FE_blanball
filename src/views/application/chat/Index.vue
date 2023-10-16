<template>
  <div class="b-chat-page-wrapper">
    <div class="b-chat-page">
      <Transition :name="editChatModalTransitionName">
        <EditChatModal
          v-if="isEditChatModalOpened"
          :chatData="chatData"
          @closeModal="closeEditChatModal"
          @updateChat="updateChatData"
        />
      </Transition>
      <SubmitModal
        v-if="isSubmitModalOpened"
        :config="submitModalConfig"
        @closeModal="closeSubmitModal"
        @closeEditChatModal="closeEditChatModal"
        @leaveGroup="closeSubmitModal"
      />
      <StartPesonalChatModal
        v-if="isStartPesonalChatModalVisible"
        @closeModal="closeStartPersonalChatModal"
      />
      <ContextMenu
        v-if="isContextMenuOpened"
        :clientX="contextMenuX"
        :clientY="contextMenuY"
        :modalItems="currentContextMenuItems"
        :background="false"
        @close-modal="closeContextMenu"
        @itemClick="contextMenuItemClick"
      />
      <div
        v-if="isAnyChatSelected"
        ref="CHAT_TOP_SIDE_BLOCK"
        class="b-chat-top-side"
      >
        <ChatTopBlock
          :chatData="chatData"
          :selectedMessages="chatSelectedMessagesList"
          :isChatEditing="isEditChatModalOpened"
          @searchChatMessages=""
          @manageChat="showManageChatContextMenu"
          @editChat="showEditChatModal"
          @goBackToCheChatsList="forceOpenChatsListSlideMenu"
        />
      </div>
      <div
        :class="[
          'b-chat-page-main-side',
          { 'no-selected-chat': !isAnyChatSelected },
        ]"
      >
        <ChatMessagesList
          v-if="isAnyChatSelected"
          ref="CHAT_MESSAGES_LIST_BLOCK"
          :chatData="chatData"
          :heightStyle="messagesListBlockStyle"
        />
        <NotSelectedChatCard v-else />
        <div
          v-if="isAnyChatSelected"
          ref="CHAT_BOTTOM_SIDE_BLOCK"
          class="b-main-side-bottom-block"
        >
          <Transition name="chat-warning">
            <ChatWarning
              v-if="isChatWarningVisible"
              @close="closeChatWarning"
            />
          </Transition>
          <RequestForChat v-if="isChatRequestVisible" :chatData="chatData" />
          <SendMessageBlock
            v-else
            :disabled="isSendMessagesDisabled"
            :chatData="chatData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>




import SendMessageBlock from '@mainComponents/chat/SendMessageBlock.vue';
import RequestForChat from '@mainComponents/chat/RequestForChat.vue';
import ChatWarning from '@mainComponents/chat/ChatWarning.vue';
import ChatTopBlock from '@mainComponents/chat/ChatTopBlock.vue';
import EditChatModal from '@mainComponents/chat/modals/EditChatModal.vue';
import ChatMessagesList from '@mainComponents/chat/ChatMessagesList.vue';
import ContextMenu from '@sharedComponents/modals/ContextModal.vue';
import SubmitModal from '@sharedComponents/modals/SubmitModal.vue';
import StartPesonalChatModal from '@mainComponents/chat/modals/StartPersonalChatModal.vue';
import NotSelectedChatCard from '@/components/main/chat/NotSelectedChatCard.vue';

import { ChatSocketWorkerInstance } from '@workers/web-socket-worker';
import { calcHeight } from '@workers/window-size-worker/calcHeight';
import { useWindowWidth } from '@workers/window-size-worker/widthScreen';
import { ChatWebSocketTypes } from '@workers/web-socket-worker/message-types/chat/web.socket.types';

import { checkIsChatSelected } from '@/components/main/chat/utils/checkIsChatSelected';
import { ChatEventBus } from '@workers/event-bus-worker';
import {
  startSpinner,
  finishSpinner,
} from '@/workers/loading-worker/loading.worker';

import { useChatDataStore } from '@/stores/chatData';
import { useUserDataStore } from '@/stores/userData';

import { CONSTS } from '@consts/index';
import { ROUTES } from '@/routes/router.const';
import { CHAT_DETAILS_TYPE_ENUM_ERRORS } from '@/workers/web-socket-worker/message-types/chat/web.socket.errors';

const CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX = 20 + 0;
const SIDEBAR_ELEMENT_SELECTOR = '.b_sidebar';
const SLIDE_MENU_ELEMENT_SELECTOR = '.b_slide_menu_main';
const LIGHT_SIDEBAR_CLASS_NAME = 'sidebar-light';

export default {
  components: {
    ChatTopBlock,
    SendMessageBlock,
    ChatWarning,
    EditChatModal,
    ChatMessagesList,
    ContextMenu,
    RequestForChat,
    SubmitModal,
    StartPesonalChatModal,
    NotSelectedChatCard,
  },
  setup() {
    const chatDataStore = useChatDataStore();
    const userStore = useUserDataStore();

    const chatData = ref(chatDataStore.chatData);

    const { t } = useI18n();
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();

    const isEditChatModalOpened = ref(false);
    const isChatWarningClosed = ref(false);
    const isSubmitModalOpened = ref(false);
    const isStartPesonalChatModalVisible = ref(true);

    const submitModalConfig = ref({});

    const isContextMenuOpened = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const currentContextMenuItems = ref(null);

    const CHAT_TOP_SIDE_BLOCK = ref();
    const CHAT_BOTTOM_SIDE_BLOCK = ref();
    const CHAT_MESSAGES_LIST_BLOCK = ref();
    const SIDEBAR_HTML_ELEMENT = ref();
    const SLIDE_MENU_HTML_ELEMENT = ref();

    const { height: CHAT_TOP_SIDE_BLOCK_HEIGHT } =
      useElementSize(CHAT_TOP_SIDE_BLOCK);
    const { height: CHAT_BOTTOM_SIDE_BLOCK_HEIGHT } = useElementSize(
      CHAT_BOTTOM_SIDE_BLOCK
    );
    const { calculatedHeight: chatPageHeight } = calcHeight([
      CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX,
    ]);
    const { isMobileSmall, detectedDevice, DEVICE_TYPES } = useWindowWidth();

    const editChatModalTransitionName = computed(() => {
      return isMobileSmall.value ? 'edit-chat-modal-slide' : null;
    });

    const isAnyChatSelected = computed(() => {
      return checkIsChatSelected(chatData.value);
    });

    const mockData = computed(() => {
      return {
        chatMainContextMenuItems: CONSTS.chat.chatMainContextMenuItems(
          chatDataStore.infoAboutMe?.push_notifications,
          chatData.value.isGroup,
          isMobileSmall.value
        ),
        CHAT_MAIN_CONTEXT_MENU_ACTIONS:
          CONSTS.chat.CHAT_MAIN_CONTEXT_MENU_ACTIONS,
      };
    });

    const isSendMessagesDisabled = computed(() => {
      return chatData.value.disabled || chatDataStore.infoAboutMe.removed;
    });

    const chatSelectedMessagesList = computed(() => {
      return CHAT_MESSAGES_LIST_BLOCK.value?.selectedMessages;
    });

    const messagesListBlockStyle = computed(() => {
      return {
        height: `${
          chatPageHeight.value -
          CHAT_BOTTOM_SIDE_BLOCK_HEIGHT.value -
          CHAT_TOP_SIDE_BLOCK_HEIGHT.value
        }px`,
      };
    });

    const isChatWarningVisible = computed(() => {
      if (
        chatDataStore.infoAboutMe.removed ||
        (chatData.value.disabled && chatData.value.isGroup)
      ) {
        return !isChatWarningClosed.value;
      }
    });

    const isChatRequestVisible = computed(() => {
      return !chatData.value.isGroup && chatData.value.isChatRequest;
    });

    async function updateChatData(newData) {
      await API.ChatService.editChat({
        chat_id: chatData.value.id,
        new_data: {
          name: newData.name,
        },
      });
      toast.success(t('chat.toasts.chat_updated_success'));
    }

    function highlightSidebarAndSlideMenu() {
      SIDEBAR_HTML_ELEMENT.value.classList.add(LIGHT_SIDEBAR_CLASS_NAME);
      SLIDE_MENU_HTML_ELEMENT.value.classList.add(LIGHT_SIDEBAR_CLASS_NAME);
    }

    function normalizeSidebarAndSlideMenu() {
      SIDEBAR_HTML_ELEMENT.value?.classList.remove(LIGHT_SIDEBAR_CLASS_NAME);
      SLIDE_MENU_HTML_ELEMENT.value?.classList.remove(LIGHT_SIDEBAR_CLASS_NAME);
    }

    function showEditChatModal() {
      highlightSidebarAndSlideMenu();
      isEditChatModalOpened.value = true;
    }

    function closeEditChatModal(options) {
      if (isSubmitModalOpened.value === false && !options.force) {
        submitModalConfig.value = {
          title: t('chat.submit_close_edit_chat_modal.title'),
          description: t('chat.submit_close_edit_chat_modal.description'),
          button_1: t('chat.submit_close_edit_chat_modal.button_1'),
          button_2: t('chat.submit_close_edit_chat_modal.button_2'),
          right_btn_action: 'closeEditChatModal',
          left_btn_action: 'closeModal',
          btn_with_1: 140,
          btn_with_2: 124,
        };
        showSubmitModal();
      } else {
        isEditChatModalOpened.value = false;
        closeSubmitModal();
        normalizeSidebarAndSlideMenu();
      }
    }

    function showLeaveGroupSubmitModal() {
      submitModalConfig.value = {
        title: t('chat.submit_leave_chat_group.title'),
        description: t('chat.submit_leave_chat_group.description', {
          groupName: chatData.value.name,
        }),
        button_1: t('chat.submit_leave_chat_group.button_1'),
        button_2: t('chat.submit_leave_chat_group.button_2'),
        right_btn_action: 'leaveGroup',
        left_btn_action: 'closeModal',
        btn_with_1: 116,
        btn_with_2: 150,
      };
      showSubmitModal();
    }

    function closeChatWarning() {
      isChatWarningClosed.value = true;
    }

    function showContextMenu(e, contextMenuItems) {
      currentContextMenuItems.value = contextMenuItems;
      contextMenuX.value = e.clientX;
      contextMenuY.value = e.clientY;
      isContextMenuOpened.value = true;
    }

    function closeContextMenu() {
      contextMenuX.value = null;
      contextMenuY.value = null;
      isContextMenuOpened.value = false;
      currentContextMenuItems.value = null;
    }

    function showManageChatContextMenu(e) {
      showContextMenu(e, mockData.value.chatMainContextMenuItems);
    }

    async function contextMenuItemClick(action) {
      const {
        ENABLE_PUSH_NOTIFICATIONS,
        DISABLE_PUSH_NOTIFICATIONS,
        DELETE_CHAT,
        LEAVE_GROUP,
        MANAGE_GROUP,
        SEARCH_MESSAGES,
      } = mockData.value.CHAT_MAIN_CONTEXT_MENU_ACTIONS;

      switch (action) {
        case ENABLE_PUSH_NOTIFICATIONS:
          offOrOnnChatPushNotifications(ENABLE_PUSH_NOTIFICATIONS);
          break;
        case DISABLE_PUSH_NOTIFICATIONS:
          offOrOnnChatPushNotifications(DISABLE_PUSH_NOTIFICATIONS);
          break;
        case DELETE_CHAT:
          showLeaveGroupSubmitModal();
          break;
        case MANAGE_GROUP:
          showEditChatModal();
          break;
        case SEARCH_MESSAGES:
          break;
        case LEAVE_GROUP:
          showLeaveGroupSubmitModal();
          break;
      }
    }

    function offOrOnnChatPushNotifications(action) {
      const actions = {
        enable_push_notifications: 'on',
        disable_push_notifications: 'off',
      };

      API.ChatService.offOrOnnChatPushNotifications({
        chat_id: chatData.value.id,
        action: actions[action],
      });
    }

    function showSubmitModal() {
      isSubmitModalOpened.value = true;
    }

    function closeSubmitModal() {
      isSubmitModalOpened.value = false;
    }

    function showStartPersonalChatModal() {
      isStartPesonalChatModalVisible.value = true;
    }

    function closeStartPersonalChatModal() {
      isStartPesonalChatModalVisible.value = false;
    }

    function getChatDetailData(chatId) {
      startSpinner();
      API.ChatService.getChatDetailData(chatId);
    }

    function patchChatDataStore(infoAboutMe, chatData) {
      chatDataStore.$patch({
        infoAboutMe: infoAboutMe,
        chatData: chatData,
      });
    }

    function chatNotFoundErrorHandler() {
      router.push(ROUTES.APPLICATION.CHATS.absolute);
    }

    function getChatDetailDataMessageHandler(instanceType) {
      patchChatDataStore(
        instanceType.getUserInfoData(),
        instanceType.getChatInfoData()
      );
      instanceType.onError(
        CHAT_DETAILS_TYPE_ENUM_ERRORS.CHAT_NOT_FOUND,
        chatNotFoundErrorHandler
      );

      finishSpinner();
    }

    function offOrOnPushNotificationsHandler(instanceType) {
      instanceType.offOrOnChatPushNotifications(chatDataStore);
    }

    function editChatMessageHandler(instanceType) {
      instanceType.editChat(chatData);
    }

    function setCurrentUserAsRemovedMessageHandler(instanceType) {
      console.log(instanceType, '-----------------------');
      instanceType.setCurrentUserAsRemoved(userStore.user.id, chatDataStore);
    }

    watch(
      () => route.query.active_chat_room,
      (newChatIdQuery) => {
        if (newChatIdQuery) {
          closeEditChatModal({ force: true });
          getChatDetailData(newChatIdQuery);
        }
      },
      { immediate: true }
    );

    watch(
      () => detectedDevice.value,
      (newDevice) => {
        switch (newDevice) {
          case DEVICE_TYPES.DESKTOP:
            forceOpenChatsListSlideMenu();
            break;
          case DEVICE_TYPES.BETWEEN_TABLET_AND_DESKTOP:
            forceOpenChatsListSlideMenu();
            break;
        }
      }
    );

    function forceOpenChatsListSlideMenu() {
      EventBusInstance.emit('activateSlideMenuByUniqName', 'chat.point');
    }

    onMounted(() => {
      SIDEBAR_HTML_ELEMENT.value = document.querySelector(
        SIDEBAR_ELEMENT_SELECTOR
      );
      SLIDE_MENU_HTML_ELEMENT.value = document.querySelector(
        SLIDE_MENU_ELEMENT_SELECTOR
      );
      forceOpenChatsListSlideMenu();
    });

    ChatSocketWorkerInstance.registerCallback(
      getChatDetailDataMessageHandler,
      ChatWebSocketTypes.GetChatDetailData
    );

    ChatSocketWorkerInstance.registerCallback(
      setCurrentUserAsRemovedMessageHandler,
      ChatWebSocketTypes.RemoveUserFromChat
    );

    ChatSocketWorkerInstance.registerCallback(
      editChatMessageHandler,
      ChatWebSocketTypes.EditChat
    );

    ChatSocketWorkerInstance.registerCallback(
      offOrOnPushNotificationsHandler,
      ChatWebSocketTypes.OffOrOnPushNotifications
    );

    onBeforeUnmount(() => {
      chatDataStore.$reset();
      ChatSocketWorkerInstance.destroyCallback(getChatDetailDataMessageHandler);
      ChatSocketWorkerInstance.destroyCallback(
        setCurrentUserAsRemovedMessageHandler
      );
      ChatSocketWorkerInstance.destroyCallback(editChatMessageHandler);
      ChatSocketWorkerInstance.destroyCallback(offOrOnPushNotificationsHandler);
      normalizeSidebarAndSlideMenu();
    });

    return {
      chatData,
      CHAT_TOP_SIDE_BLOCK,
      isChatWarningVisible,
      CHAT_BOTTOM_SIDE_BLOCK,
      CHAT_MESSAGES_LIST_BLOCK,
      messagesListBlockStyle,
      isStartPesonalChatModalVisible,
      isContextMenuOpened,
      currentContextMenuItems,
      isEditChatModalOpened,
      chatSelectedMessagesList,
      mockData,
      isChatRequestVisible,
      contextMenuX,
      contextMenuY,
      isSubmitModalOpened,
      chatDataStore,
      submitModalConfig,
      editChatModalTransitionName,
      isSendMessagesDisabled,
      isAnyChatSelected,
      checkIsChatSelected,
      showEditChatModal,
      closeEditChatModal,
      closeChatWarning,
      closeContextMenu,
      showContextMenu,
      showManageChatContextMenu,
      showSubmitModal,
      closeSubmitModal,
      updateChatData,
      contextMenuItemClick,
      closeStartPersonalChatModal,
      showStartPersonalChatModal,
      forceOpenChatsListSlideMenu,
    };
  },
};
</script>

<style lang="scss">
.b-chat-page-wrapper {
  background-image: url('@images/chat/chat-background.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @include mobile {
    background: #efeff6;
  }
}

.b-chat-page {
  height: fit-content;
  width: calc(100% - 464px);
  margin-right: 0px;
  margin-left: auto;
  overflow: hidden;

  @include beforeDesktop {
    width: 100%;
  }
  .b-chat-page-main-side {
    padding: 0px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;
    position: relative;

    @include mobile {
      padding: 0px 8px 20px 8px;
    }

    &.no-selected-chat {
      @include calc-height;
    }

    .b-main-side-bottom-block {
      width: 100%;
      margin-top: 10px;
    }
  }
}

.chat-warning-enter-active,
.chat-warning-leave-active {
  transition: opacity 0.4s ease;
}

.chat-warning-enter-from,
.chat-warning-leave-to {
  opacity: 0;
}

.edit-chat-modal-slide-enter-active,
.edit-chat-modal-slide-leave-active {
  transition: all 0.5s;
}

.edit-chat-modal-slide-enter-from,
.edit-chat-modal-slide-leave-to {
  transform: translateX(100%);
}
</style>
