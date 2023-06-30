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
        @manageChat=""
        @editChat="showEditChatModal"
      />
    </div>
    <div class="b-chat-page-main-side">
      <div class="b-main-side-messages-block" :style="messagesListBlockStyle">
        <ChatMessagesList @chatMessageRightClick="showChatMessageContextMenu" />
      </div>
      <div ref="CHAT_BOTTOM_SIDE_BLOCK" class="b-main-side-bottom-block">
        <Transition name="chat-warning">
          <ChatWarning v-if="isChatWarningVisible" @close="closeChatWarning" />
        </Transition>
        <SendMessageBlock />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeMount } from 'vue';

import { useElementSize } from '@vueuse/core';

import SendMessageBlock from '../../../components/main/chat/SendMessageBlock.vue';
import RequestForChat from '../../../components/main/chat/RequestForChat.vue';
import ChatWarning from '../../../components/main/chat/ChatWarning.vue';
import ChatTopBlock from '../../../components/main/chat/ChatTopBlock.vue';
import EditChatModal from '../../../components/main/chat/modals/EditChatModal.vue';
import ChatMessagesList from '../../../components/main/chat/ChatMessagesList.vue';
import ContextMenu from '../../../components/shared/modals/ContextMenuModal.vue';

import { PaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';
import { calcHeight } from '../../../utils/calcHeight';
import { useWindowWidth } from '../../../utils/widthScreen';
import { BlanballEventBus } from '../../../workers/event-bus-worker';
import { useSideBarStore } from '../../../stores/sideBar';

import { CONSTS } from '../../../consts';

const CHAT_PAGE_TOP_AND_BOTTOM_PADDINGS_PX = 40;

export default {
  components: {
    ChatTopBlock,
    SendMessageBlock,
    ChatWarning,
    EditChatModal,
    ChatMessagesList,
    ContextMenu,
  },
  setup() {
    const chatData = ref({
      name: 'dffddfdfdf fdfddffd',
      disabled: true,
    });
    const isEditChatModalOpened = ref(false);
    const isChatWarningClosed = ref(false);
    const isContextMenuOpened = ref(false);
    const messageOnWhatOpenedContextMenuData = ref({});

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
      if (chatData.value.disabled) {
        return !isChatWarningClosed.value;
      }
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

    function showContextMenu(e, messageData) {
      contextMenuX.value = e.clientX;
      contextMenuY.value = e.clientY;
      messageOnWhatOpenedContextMenuData.value = messageData;
      isContextMenuOpened.value = true;
    }

    function closeContextMenu() {
      contextMenuX.value = null;
      contextMenuY.value = null;
      messageOnWhatOpenedContextMenuData.value = {};
      isContextMenuOpened.value = false;
    }

    function showChatMessageContextMenu(e) {
      showContextMenu(e);
    }

    onBeforeMount(() => {
      BlanballEventBus.emit('OpenSideBar');
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
      contextMenuX,
      contextMenuY,
      showEditChatModal,
      closeEditChatModal,
      closeChatWarning,
      showChatMessageContextMenu,
      closeContextMenu,
      showContextMenu,
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;

    @include mobile {
      padding: 20px 8px;
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
