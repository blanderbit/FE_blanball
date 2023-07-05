<template>
  <ContextMenu
    v-if="isContextMenuOpened"
    :clientX="contextMenuX"
    :clientY="contextMenuY"
    :menu-text="chatMessageContextMenuItems"
    @close-modal="closeContextMenu"
    @itemClick="contextMenuItemClick"
  />

  <div class="b-chat-messages__list">
    <SmartList
      :list="paginationElements"
      ref="refList"
      v-model:scrollbar-existing="blockScrollToTopIfExist"
    >
      <template #smartListItem="slotProps">
        {{ slotProps.smartListItem.sender }}
        <ChatMessage
          v-if="isMessageTypeUserMessage(slotProps.smartListItem.type)"
          :key="slotProps.index"
          :messageData="slotProps.smartListItem"
          :selected="selectedMessages.includes(slotProps.smartListItem.id)"
          :isChatDisabed="chatData.disabled"
          @chatMessageRightClick="showContextMenu"
          @messageWrapperClick="messageWrapperClick"
        />

        <UserJoinedToTheChatMessage
          v-else-if="
            isMessageTypeUserJoinedToTheChat(slotProps.smartListItem.type)
          "
          :userData="slotProps.smartListItem.sender"
        />
      </template>
      <template #after>
        <InfiniteLoading
          :identifier="triggerForRestart"
          ref="scrollbar"
          @infinite="loadDataPaginationData(paginationPage + 1, $event)"
        >
          <template #complete>
            <NoScheduledEvents
              v-if="!paginationElements.length"
              :userData="userData"
            />
          </template>
        </InfiniteLoading>
      </template>
    </SmartList>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import { v4 as uuid } from 'uuid';

import InfiniteLoading from '../infiniteLoading/InfiniteLoading.vue';
import SmartList from '../../shared/smartList/SmartList.vue';
import ContextMenu from '../../shared/modals/ContextMenuModal.vue';
import ChatMessage from './ChatMessage.vue';
import UserJoinedToTheChatMessage from './UserJoinedToTheChatMessage.vue';

import { ChatEventBus } from '../../../workers/event-bus-worker';
import { WebSocketPaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';

import { useUserDataStore } from '../../../stores/userData';

import { CONSTS } from '../../../consts';

export default {
  components: {
    InfiniteLoading,
    ChatMessage,
    SmartList,
    ContextMenu,
    UserJoinedToTheChatMessage,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
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
      };
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
      paginationProcessResponse,
    } = WebSocketPaginationWorker({
      paginationDataRequest: (page) =>
        API.ChatService.getChatMessages({ id: 725, page: page }),
      dataTransformation: handlingIncomeMessagesData,
    });

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    function handlingIncomeMessagesData(message, index, messages) {
      if (isMessageTypeUserMessage(message.type)) {
        const isMessageMine = message?.sender.id === userStore.user.id;
        const nextMessage = messages[index + 1];

        let isNextMessageFromTheSameSender = false;

        if (isMessageTypeUserJoinedToTheChat(nextMessage?.type)) {
          isNextMessageFromTheSameSender = true;
        } else if (isMessageTypeUserMessage(nextMessage?.type)) {
          isNextMessageFromTheSameSender =
            nextMessage?.sender?.id == message.sender.id;
        }

        const showAvatar = props.chatData.isGroup
          ? !isMessageMine && (!nextMessage || !isNextMessageFromTheSameSender)
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
      const { DELETE, SELECT, FORWARD, REPLY } =
        mockData.value.CHAT_MESSAGE_CONTEXT_MENU_ACTIONS;

      switch (action) {
        case DELETE:
          break;
        case SELECT:
          selectMessage(messageOnWhatOpenedContextMenuData.value.id);
          break;
        case FORWARD:
          break;
        case REPLY:
          replyToMessage(messageOnWhatOpenedContextMenuData.value);
          break;
      }
    }

    function replyToMessage(messageData) {
      ChatEventBus.emit('replyToChatMessage', messageData);
    }

    function selectMessage(messageId) {
      selectedMessages.value.push(messageId);
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

    function isMessageTypeUserMessage(messageType) {
      return messageType == mockData.value.CHAT_MESSAGE_TYPES.USER_MESSAGE;
    }

    function isMessageTypeUserJoinedToTheChat(messageType) {
      return (
        messageType == mockData.value.CHAT_MESSAGE_TYPES.USER_JOINED_TO_CHAT
      );
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
      paginationPage,
      selectedMessages,
      restartInfiniteScroll,
      loadDataPaginationData,
      showContextMenu,
      messageWrapperClick,
      closeContextMenu,
      contextMenuItemClick,
      isMessageTypeUserJoinedToTheChat,
      isMessageTypeUserMessage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
