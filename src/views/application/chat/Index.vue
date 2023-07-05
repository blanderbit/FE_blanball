<template>
  <div class="b-chat-page">
    <EditChatModal v-if="isEditChatModalOpened" />
    <ContextMenu
      v-if="isContextMenuOpened"
      :clientX="contextMenuX"
      :clientY="contextMenuY"
      :menu-text="mockData.chatMessageContextMenu"
      @close-modal="closeContextMenu"
      @itemClick="contextMenuItemClick"
    />
    <div ref="CHAT_TOP_SIDE_BLOCK" class="b-chat-top-side">
      <ChatTopBlock
        :chatData="chatData"
        @searchChatMessages=""
        @manageChat="showManageChatContextMenu"
        @editChat="showEditChatModal"
      />
    </div>
    <div class="b-chat-page-main-side">
      <div class="b-main-side-messages-block" :style="messagesListBlockStyle">
        <ChatMessagesList :chatData="chatData" />
      </div>
      <div ref="CHAT_BOTTOM_SIDE_BLOCK" class="b-main-side-bottom-block">
        <Transition name="chat-warning">
          <ChatWarning v-if="isChatWarningVisible" @close="closeChatWarning" />
        </Transition>
        <RequestForChat v-if="isChatRequestVisible" />
        <SendMessageBlock v-else :disabled="chatData.disabled" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

import { useElementSize } from '@vueuse/core';

import SendMessageBlock from '../../../components/main/chat/SendMessageBlock.vue';
import RequestForChat from '../../../components/main/chat/RequestForChat.vue';
import ChatWarning from '../../../components/main/chat/ChatWarning.vue';
import ChatTopBlock from '../../../components/main/chat/ChatTopBlock.vue';
import EditChatModal from '../../../components/main/chat/modals/EditChatModal.vue';
import ChatMessagesList from '../../../components/main/chat/ChatMessagesList.vue';
import ContextMenu from '../../../components/shared/modals/ContextMenuModal.vue';

import { accessToken } from '../../../workers/token-worker';
import { BlanballEventBus } from '../../../workers/event-bus-worker';
import { ChatSocketWorkerInstance } from '../../../workers/web-socket-worker';

import { useSideBarStore } from '../../../stores/sideBar';
import { calcHeight } from '../../../utils/calcHeight';
import { useWindowWidth } from '../../../utils/widthScreen';

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
  },
  setup() {
    const chatData = ref({
      name: 'dffddfdfdf fdfddffd',
      disabled: true,
      isChatRequest: false,
      isGroup: false,
      disabled: false,
    });
    const isEditChatModalOpened = ref(false);
    const isChatWarningClosed = ref(false);

    const isContextMenuOpened = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);

    const CHAT_TOP_SIDE_BLOCK = ref();
    const CHAT_BOTTOM_SIDE_BLOCK = ref();

    const { height: CHAT_TOP_SIDE_BLOCK_HEIGHT } =
      useElementSize(CHAT_TOP_SIDE_BLOCK);
    const { height: CHAT_BOTTOM_SIDE_BLOCK_HEIGHT } = useElementSize(
      CHAT_BOTTOM_SIDE_BLOCK
    );
    const { calculatedHeight: chatPageHeight } = calcHeight([
      CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX,
    ]);
    const { windowWidth, detectedDevice, DEVICE_TYPES } = useWindowWidth();

    const mockData = computed(() => {
      return {
        chatMessageContextMenu: CONSTS.chat.chatMessageContextMenuItems(true),
      };
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

    function showEditChatModal() {
      isEditChatModalOpened.value = true;
    }

    function closeEditChatModal() {
      isEditChatModalOpened.value = false;
    }

    function closeChatWarning() {
      isChatWarningClosed.value = true;
    }

    function showContextMenu(e) {
      contextMenuX.value = e.clientX;
      contextMenuY.value = e.clientY;
      isContextMenuOpened.value = true;
    }

    function closeContextMenu() {
      contextMenuX.value = null;
      contextMenuY.value = null;
      isContextMenuOpened.value = false;
    }

    function showManageChatContextMenu(e) {
      showContextMenu(e);
    }

    ChatSocketWorkerInstance.connect({
      token: accessToken.getToken(),
    });

    onBeforeMount(() => {
      BlanballEventBus.emit('OpenSideBar');
    });

    onBeforeUnmount(() => {
      ChatSocketWorkerInstance.disconnect();
    });

    return {
      chatData,
      CHAT_TOP_SIDE_BLOCK,
      isChatWarningVisible,
      CHAT_BOTTOM_SIDE_BLOCK,
      messagesListBlockStyle,
      isContextMenuOpened,
      isEditChatModalOpened,
      mockData,
      isChatRequestVisible,
      contextMenuX,
      contextMenuY,
      showEditChatModal,
      closeEditChatModal,
      closeChatWarning,
      closeContextMenu,
      showContextMenu,
      showManageChatContextMenu,
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

    .b-main-side-messages-block {
      overflow: scroll;
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
</style>
