<template>
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
    <div ref="CHAT_TOP_SIDE_BLOCK" class="b-chat-top-side">
      <ChatTopBlock
        :chatData="chatData"
        :selectedMessages="chatSelectedMessagesList"
        @searchChatMessages=""
        @manageChat="showManageChatContextMenu"
        @editChat="showEditChatModal"
      />
    </div>
    <div class="b-chat-page-main-side">
      <ChatMessagesList
        ref="CHAT_MESSAGES_LIST_BLOCK"
        :chatData="chatData"
        :heightStyle="messagesListBlockStyle"
      />
      <div ref="CHAT_BOTTOM_SIDE_BLOCK" class="b-main-side-bottom-block">
        <Transition name="chat-warning">
          <ChatWarning v-if="isChatWarningVisible" @close="closeChatWarning" />
        </Transition>
        <RequestForChat v-if="isChatRequestVisible" />
        <SendMessageBlock
          v-else
          :disabled="chatData.disabled"
          :chatData="chatData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

import { useElementSize } from '@vueuse/core';

import SendMessageBlock from '../../../components/main/chat/SendMessageBlock.vue';
import RequestForChat from '../../../components/main/chat/RequestForChat.vue';
import ChatWarning from '../../../components/main/chat/ChatWarning.vue';
import ChatTopBlock from '../../../components/main/chat/ChatTopBlock.vue';
import EditChatModal from '../../../components/main/chat/modals/EditChatModal.vue';
import ChatMessagesList from '../../../components/main/chat/ChatMessagesList.vue';
import ContextMenu from '../../../components/shared/modals/ContextModal.vue';
import SubmitModal from '../../../components/shared/modals/SubmitModal.vue';

import { accessToken } from '../../../workers/token-worker';
import { ChatSocketWorkerInstance } from '../../../workers/web-socket-worker';
import { calcHeight } from '../../../workers/window-size-worker/calcHeight';
import { useWindowWidth } from '../../../workers/window-size-worker/widthScreen';
import { ChatWebSocketTypes } from '../../../workers/web-socket-worker/message-types/chat/web.socket.types';
import { API } from '../../../workers/api-worker/api.worker';
import { ChatEventBus } from '../../../workers/event-bus-worker';

import { useChatDataStore } from '../../../stores/chatData';

import { CONSTS } from '../../../consts';

const CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX = 20 + 0;

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
  },
  setup() {
    const chatData = ref({
      id: 772,
      name: 'dffddfdfdf fdfddffd',
      isChatRequest: false,
      isGroup: false,
      disabled: false,
      link: 'helloflamingo.linkactive',
    });
    const chatDataStore = useChatDataStore();

    const { t } = useI18n();
    const toast = useToast();

    const isEditChatModalOpened = ref(false);
    const isChatWarningClosed = ref(false);
    const isSubmitModalOpened = ref(false);

    const submitModalConfig = ref({});

    const isContextMenuOpened = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const currentContextMenuItems = ref(null);

    const CHAT_TOP_SIDE_BLOCK = ref();
    const CHAT_BOTTOM_SIDE_BLOCK = ref();
    const CHAT_MESSAGES_LIST_BLOCK = ref();

    const { height: CHAT_TOP_SIDE_BLOCK_HEIGHT } =
      useElementSize(CHAT_TOP_SIDE_BLOCK);
    const { height: CHAT_BOTTOM_SIDE_BLOCK_HEIGHT } = useElementSize(
      CHAT_BOTTOM_SIDE_BLOCK
    );
    const { calculatedHeight: chatPageHeight } = calcHeight([
      CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX,
    ]);
    const { isMobileSmall } = useWindowWidth();

    const editChatModalTransitionName = computed(() => {
      return isMobileSmall.value ? 'edit-chat-modal-slide' : null;
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
      if (chatData.value.disabled && chatData.value.isGroup) {
        return !isChatWarningClosed.value;
      }
    });

    const isChatRequestVisible = computed(() => {
      return !chatData.value.isGroup && chatData.value.isChatRequest;
    });

    function updateChatData() {
      toast.success(t('chat.toasts.chat_updated_success'));
    }

    function showEditChatModal() {
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
      }
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

    function contextMenuItemClick(action) {
      const {
        ENABLE_PUSH_NOTIFICATIONS,
        DISABLE_PUSH_NOTIFICATIONS,
        DELETE_CHAT,
        MANAGE_GROUP,
        SEARCH_MESSAGES,
      } = mockData.value.CHAT_MAIN_CONTEXT_MENU_ACTIONS;

      console.log(action);

      switch (action) {
        case ENABLE_PUSH_NOTIFICATIONS:
          break;
        case DISABLE_PUSH_NOTIFICATIONS:
          break;
        case DELETE_CHAT:
          break;
        case MANAGE_GROUP:
          showEditChatModal();
          break;
        case SEARCH_MESSAGES:
          break;
      }
    }

    function showSubmitModal() {
      isSubmitModalOpened.value = true;
    }

    function closeSubmitModal() {
      isSubmitModalOpened.value = false;
    }

    function getInfoAboutMeInChat() {
      API.ChatService.getInfoAboutMeInChat(chatData.value.id);
    }

    function getInfoAboutMeInChatMessageHandler(instanceType) {
      chatDataStore.$patch({
        infoAboutMe: instanceType.getUserInfoData(),
      });
    }

    ChatSocketWorkerInstance.connect({
      token: accessToken.getToken(),
    });

    ChatSocketWorkerInstance.registerCallback(
      getInfoAboutMeInChatMessageHandler,
      ChatWebSocketTypes.GetInfoAboutMeInChat
    );

    onBeforeUnmount(() => {
      ChatSocketWorkerInstance.disconnect();
      ChatSocketWorkerInstance.destroyCallback(
        getInfoAboutMeInChatMessageHandler
      );
    });

    getInfoAboutMeInChat();

    return {
      chatData,
      CHAT_TOP_SIDE_BLOCK,
      isChatWarningVisible,
      CHAT_BOTTOM_SIDE_BLOCK,
      CHAT_MESSAGES_LIST_BLOCK,
      messagesListBlockStyle,
      isContextMenuOpened,
      currentContextMenuItems,
      isEditChatModalOpened,
      chatSelectedMessagesList,
      mockData,
      isChatRequestVisible,
      contextMenuX,
      contextMenuY,
      isSubmitModalOpened,
      submitModalConfig,
      editChatModalTransitionName,
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
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-page {
  height: fit-content;
  background-image: url('../../../assets/img/chat/chat-background.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: calc(100% - 464px);
  margin-right: 0px;
  margin-left: auto;
  overflow: hidden;

  @include mobile {
    background: #efeff6;
  }
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

    @include mobile {
      padding: 0px 8px 20px 8px;
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
