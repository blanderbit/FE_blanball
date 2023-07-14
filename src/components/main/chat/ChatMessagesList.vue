<template>
  <ContextMenu
    v-if="isContextMenuOpened"
    :clientX="contextMenuX"
    :clientY="contextMenuY"
    :modalItems="chatMessageContextMenuItems"
    :background="false"
    @close-modal="closeContextMenu"
    @itemClick="contextMenuItemClick"
  />

  <div
    :class="[
      'b-chat-messages__list',
      { 'no-messages': !paginationElements.length },
    ]"
    @keydown.up="smoothScrollUp"
    @keydown.down="smoothScrollDown"
  >
    <SmartList
      :list="paginationElements"
      ref="refList"
      v-model:scrollbar-existing="blockScrollToTopIfExist"
    >
      <template #smartListItem="slotProps">
        <div :key="slotProps.index">
          <ChatMessage
            v-if="!slotProps.smartListItem.service"
            :messageData="slotProps.smartListItem"
            :selected="selectedMessages.includes(slotProps.smartListItem.id)"
            :selectableMode="isMessagesSelectableMode"
            :isChatDisabed="chatData.disabled"
            @chatMessageRightClick="showContextMenu"
            @messageWrapperClick="messageWrapperClick"
          />

          <ChatServiceMessage
            v-else
            :userData="slotProps.smartListItem.sender"
          />
        </div>
      </template>
      <template #after>
        <InfiniteLoading
          :identifier="triggerForRestart"
          :showCompleteSlot="!paginationElements.length"
          ref="scrollbar"
          @infinite="loadDataPaginationData(paginationPage + 1, $event)"
        >
          <template #complete>
            <NoChatMessages v-if="!paginationElements.length" />
          </template>
        </InfiniteLoading>
      </template>
    </SmartList>
  </div>
</template>

<script>
import { ref, computed, onBeforeUnmount } from 'vue';

import { v4 as uuid } from 'uuid';

import InfiniteLoading from '../infiniteLoading/InfiniteLoading.vue';
import SmartList from '../../shared/smartList/SmartList.vue';
import ContextMenu from '../../shared/modals/ContextModal.vue';
import ChatMessage from './ChatMessage.vue';
import ChatServiceMessage from './ChatServiceMessage.vue';
import NoChatMessages from './NoChatMessages.vue';

import { ChatEventBus } from '../../../workers/event-bus-worker';
import { WebSocketPaginationWorker } from '../../../workers/pagination-worker';
import {
  AuthWebSocketWorkerInstance,
  ChatSocketWorkerInstance,
} from '../../../workers/web-socket-worker';
import { API } from '../../../workers/api-worker/api.worker';
import { ChatWebSocketTypes } from '../../../workers/web-socket-worker/message-types/chat/web.socket.types';

import { useUserDataStore } from '../../../stores/userData';

import { CONSTS } from '../../../consts';

const MESSAGES_SCROLL_SPEED = 10;
const MESSAGES_SCROLL_ANIMATION_DURATION = 50;

export default {
  components: {
    InfiniteLoading,
    ChatMessage,
    SmartList,
    ContextMenu,
    ChatServiceMessage,
    NoChatMessages,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { expose }) {
    const refList = ref();
    const triggerForRestart = ref(false);

    const blockScrollToTopIfExist = ref(false);

    const isContextMenuOpened = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const messageOnWhatOpenedContextMenuData = ref({});

    const userStore = useUserDataStore();

    const selectedMessages = ref([]);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const mockData = computed(() => {
      return {
        chatMessageContextMenuItems:
          CONSTS.chat.chatMessageContextMenuItems(true),
        CHAT_MESSAGE_CONTEXT_MENU_ACTIONS:
          CONSTS.chat.CHAT_MESSAGE_CONTEXT_MENU_ACTIONS,
        chatMessagesList: CONSTS.chat.chatMessagesList,
        CHAT_MESSAGE_TYPES: CONSTS.chat.CHAT_MESSAGE_TYPES,
        CHAT_MAX_SELECTED_MESSAGES_COUNT:
          CONSTS.chat.CHAT_MAX_SELECTED_MESSAGES_COUNT,
      };
    });

    const isMessagesSelectableMode = computed(() => {
      return selectedMessages.value.length;
    });

    const chatMessageContextMenuItems = computed(() => {
      return mockData.value.chatMessageContextMenuItems;
    });

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationLoad,
    } = WebSocketPaginationWorker({
      paginationDataRequest: (page) =>
        API.ChatService.getChatMessages({
          chat_id: props.chatData.id,
          page: page,
        }),
      dataTransformation: handlingIncomeMessagesData,
      messageType: ChatWebSocketTypes.GetChatMessagesList,
    });

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    function handlingIncomeMessagesData(message) {
      if (!message.service) {
        const isMessageMine = message?.sender.id === userStore.user.id;
        let isNextMessageFromTheSameSender = false;

        const showAvatar = props.chatData.isGroup
          ? !isMessageMine && !isNextMessageFromTheSameSender
          : false;

        return {
          ...message,
          isMine: isMessageMine,
          showAvatar,
          isNextMessageFromTheSameSender,
        };
      }
      return {
        ...message,
      };
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

    function contextMenuItemClick(action) {
      const { DELETE, SELECT, FORWARD, REPLY, EDIT } =
        mockData.value.CHAT_MESSAGE_CONTEXT_MENU_ACTIONS;

      switch (action) {
        case DELETE:
          deleteChatMessages([messageOnWhatOpenedContextMenuData.value.id]);
          break;
        case SELECT:
          selectMessage(messageOnWhatOpenedContextMenuData.value.id);
          break;
        case FORWARD:
          break;
        case REPLY:
          replyToMessage(messageOnWhatOpenedContextMenuData.value);
          break;
        case EDIT:
          showEditMessageBoard(messageOnWhatOpenedContextMenuData.value);
          break;
      }
    }

    function smoothScrollUp() {
      const currentPosition = window.pageYOffset;
      const targetPosition = currentPosition - MESSAGES_SCROLL_SPEED;

      smoothScrollTo(targetPosition);
    }

    function smoothScrollDown() {
      const currentPosition = window.pageYOffset;
      const targetPosition = currentPosition + MESSAGES_SCROLL_SPEED;

      smoothScrollTo(targetPosition);
    }

    function smoothScrollTo(targetPosition) {
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollY = easeInOutCubic(
          timeElapsed,
          startPosition,
          distance,
          MESSAGES_SCROLL_ANIMATION_DURATION
        );
        window.scrollTo(0, scrollY);
        if (timeElapsed < MESSAGES_SCROLL_ANIMATION_DURATION) {
          window.requestAnimationFrame(animation);
        }
      }

      window.requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d;
      return c * t * t * t + b;
    }

    function replyToMessage(messageData) {
      ChatEventBus.emit('replyToChatMessage', messageData);
    }

    function showEditMessageBoard(messageData) {
      ChatEventBus.emit('editChatMessage', messageData);
    }

    function selectMessage(messageId) {
      if (
        selectedMessages.value.length <
        mockData.value.CHAT_MAX_SELECTED_MESSAGES_COUNT
      ) {
        selectedMessages.value.push(messageId);
      }
    }

    function deselectChatMessages() {
      selectedMessages.value = [];
    }

    function unSelectMessasge(messageId) {
      selectedMessages.value = selectedMessages.value.reduce((acc, message) => {
        if (message !== messageId) {
          acc.push(message);
        }
        return acc;
      }, []);
    }

    function isMessageSelected(messageId) {
      return selectedMessages.value.includes(messageId);
    }

    function messageWrapperClick(messageId) {
      if (isMessageSelected(messageId)) {
        unSelectMessasge(messageId);
      } else if (
        !isMessageSelected(messageId) &&
        selectedMessages.value.length > 0
      ) {
        selectMessage(messageId);
      }
    }

    function createChatMessageMessageHandler(instanceType) {
      instanceType.createNewMessageInChat(
        { paginationElements },
        handlingIncomeMessagesData
      );
    }

    function deleteChatMessages(messagesIds) {
      API.ChatService.deleteChatMessages({
        chat_id: props.chatData.id,
        message_ids: messagesIds,
      }).then(deselectChatMessages());
    }

    function editChatMessageMessageHandler(instanceType) {
      instanceType.editMessage(paginationElements);
    }

    function deleteChatMessagesMessageHandler(instanceType) {
      instanceType.deleteMessage(paginationElements);
    }

    ChatEventBus.on('deselectChatMessages', () => deselectChatMessages());
    ChatEventBus.on('bulkDeleteChatMessages', () =>
      deleteChatMessages(selectedMessages.value)
    );

    AuthWebSocketWorkerInstance.registerCallback(
      createChatMessageMessageHandler,
      ChatWebSocketTypes.CreateMessage
    );

    ChatSocketWorkerInstance.registerCallback(
      editChatMessageMessageHandler,
      ChatWebSocketTypes.EditMessage
    );

    ChatSocketWorkerInstance.registerCallback(
      deleteChatMessagesMessageHandler,
      ChatWebSocketTypes.DeleteMesssages
    );

    onBeforeUnmount(() => {
      AuthWebSocketWorkerInstance.destroyCallback(
        createChatMessageMessageHandler
      );
      ChatSocketWorkerInstance.destroyCallback(editChatMessageMessageHandler);
      ChatSocketWorkerInstance.destroyCallback(
        deleteChatMessagesMessageHandler
      );
      ChatEventBus.off('deselectChatMessages');
      ChatEventBus.off('bulkDeleteChatMessages');
    });

    expose({
      selectedMessages,
    });

    return {
      refList,
      paginationElements,
      triggerForRestart,
      blockScrollToTopIfExist,
      messageOnWhatOpenedContextMenuData,
      selectedMessages,
      contextMenuX,
      contextMenuY,
      isContextMenuOpened,
      chatMessageContextMenuItems,
      isMessagesSelectableMode,
      paginationPage,
      selectedMessages,
      restartInfiniteScroll,
      loadDataPaginationData,
      showContextMenu,
      messageWrapperClick,
      closeContextMenu,
      contextMenuItemClick,
      smoothScrollDown,
      smoothScrollUp,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-messages__list {
  &.no-messages {
    height: 100%;
  }
}
</style>
