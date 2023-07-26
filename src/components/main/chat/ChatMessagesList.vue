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

  <ActionModal
    v-if="isActionModalOpened"
    :modalData="actionModalConfig"
    @closeModal="closeActionModal"
  />

  <div
    v-if="checkIsChatSelected(chatData)"
    :class="[
      'b-chat-messages__list',
      { 'no-messages': !paginationElements.length },
    ]"
    :style="heightStyle"
    @keydown.up="smoothScrollUp"
    @keydown.down="smoothScrollDown"
  >
    <SmartList
      :list="paginationElements"
      :itemsGap="MESSAGES_LIST_VERTICAL_GAP_PX"
      ref="refList"
      v-model:scrollbar-existing="blockScrollToTopIfExist"
      @scroll="grabMessagesToReadOnScroll"
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

          <ChatServiceMessage v-else :messageData="slotProps.smartListItem" />
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

  <NotSelectedChatCard v-else />
</template>

<script>
import { ref, computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { v4 as uuid } from 'uuid';
import { debounce } from 'lodash';

import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import SmartList from '@sharedComponents/smartList/SmartList.vue';
import ContextMenu from '@sharedComponents/modals/ContextModal.vue';
import ChatMessage from './ChatMessage.vue';
import ChatServiceMessage from './ChatServiceMessage.vue';
import NoChatMessages from './NoChatMessages.vue';
import ActionModal from '@mainComponents/events/modals/ActionModal.vue';
import NotSelectedChatCard from './NotSelectedChatCard.vue';

import { ChatEventBus } from '@workers/event-bus-worker';
import { WebSocketPaginationWorker } from '@workers/pagination-worker';
import {
  AuthWebSocketWorkerInstance,
  ChatSocketWorkerInstance,
} from '@workers/web-socket-worker';
import { API } from '@workers/api-worker/api.worker';
import { ChatWebSocketTypes } from '@workers/web-socket-worker/message-types/chat/web.socket.types';
import { checkIsChatSelected } from './utils/checkIsChatSelected';

import { useUserDataStore } from '@/stores/userData';

import { CONSTS } from '@consts';

// FIXME нужно заменить иконку на другую
import LimitOfAdminsIcon from '@images/chat/limit-of-admins-reached.svg';

const MESSAGES_SCROLL_SPEED = 10;
const MESSAGES_SCROLL_ANIMATION_DURATION = 50;
const MESSAGES_LIST_VERTICAL_GAP_PX = 8;
const RECYCLE_SCROLLER_WRAPPER_ELEMENT_SELECTOR =
  '.vue-recycle-scroller__item-wrapper';

export default {
  components: {
    InfiniteLoading,
    ChatMessage,
    SmartList,
    ContextMenu,
    ChatServiceMessage,
    NoChatMessages,
    NotSelectedChatCard,
    ActionModal,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
    heightStyle: {
      type: Object,
      default: null,
    },
  },
  setup(props, { expose }) {
    const { t } = useI18n();
    const refList = ref();
    const triggerForRestart = ref(false);
    const isActionModalOpened = ref(false);
    const newChatMessagesLoading = ref(false);

    const blockScrollToTopIfExist = ref(false);

    const MESSAGES_LIST_RECYCLE_SCROLLER_WRAPPER_ELEMENT = ref(null);
    const isContextMenuOpened = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const messageOnWhatOpenedContextMenuData = ref({});

    const userStore = useUserDataStore();

    const selectedMessages = ref([]);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const actionModalConfig = computed(() => {
      return {
        title: t('chat.cant_edit_message_after_10_minutes_modal.title'),
        description: t(
          'chat.cant_edit_message_after_10_minutes_modal.main_text'
        ),
        image: LimitOfAdminsIcon,
      };
    });

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
      paginationIsNextPage,
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

    function showActionModal() {
      isActionModalOpened.value = true;
    }

    function closeActionModal() {
      isActionModalOpened.value = false;
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

    function checkIfTenMinutesPassed(dateString) {
      const givenDate = new Date(dateString);
      const currentDate = new Date();
      const tenMinutesLater = new Date(givenDate.getTime() + 10 * 60000);

      return currentDate >= tenMinutesLater;
    }

    function showEditMessageBoard(messageData) {
      if (checkIfTenMinutesPassed(messageData.time_created)) {
        showActionModal();
      } else {
        ChatEventBus.emit('editChatMessage', messageData);
      }
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

    function createNewUserJoinedChatServiceMessageHandler(instanceType) {
      instanceType.createNewUserJoinedChatServiceMessage(paginationElements);
    }

    function startNewMessagesLoading() {
      newChatMessagesLoading.value = true;
    }

    function finishNewMessagesLoading() {
      newChatMessagesLoading.value = false;
    }

    ChatSocketWorkerInstance.registerCallback(
      createNewUserJoinedChatServiceMessageHandler,
      ChatWebSocketTypes.AddUserToChat
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

    const grabMessagesToReadOnScroll = debounce(() => {
      console.log(
        MESSAGES_LIST_RECYCLE_SCROLLER_WRAPPER_ELEMENT.value.element.__vnode.ctx
          .data.pool
      );
    }, 50);

    onMounted(() => {
      MESSAGES_LIST_RECYCLE_SCROLLER_WRAPPER_ELEMENT.value = {
        element: document.querySelector(
          RECYCLE_SCROLLER_WRAPPER_ELEMENT_SELECTOR
        ),
      };
    });

    ChatEventBus.on('deselectChatMessages', () => deselectChatMessages());
    ChatEventBus.on('bulkDeleteChatMessages', () =>
      deleteChatMessages(selectedMessages.value)
    );

    onBeforeUnmount(() => {
      AuthWebSocketWorkerInstance.destroyCallback(
        createChatMessageMessageHandler
      );
      ChatSocketWorkerInstance.destroyCallback(editChatMessageMessageHandler);
      ChatSocketWorkerInstance.destroyCallback(
        deleteChatMessagesMessageHandler
      );
      ChatSocketWorkerInstance.destroyCallback(
        createNewUserJoinedChatServiceMessageHandler
      );
      ChatEventBus.off('deselectChatMessages');
      ChatEventBus.off('bulkDeleteChatMessages');
    });

    watch(
      () => props.chatData.id,
      () => {
        startNewMessagesLoading();
        paginationClearData();
        loadDataPaginationData(1, null);
        finishNewMessagesLoading();
      },
      { immediate: true }
    );

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
      isActionModalOpened,
      grabMessagesToReadOnScroll,
      actionModalConfig,
      MESSAGES_LIST_VERTICAL_GAP_PX,
      paginationIsNextPage,
      checkIsChatSelected,
      restartInfiniteScroll,
      loadDataPaginationData,
      showContextMenu,
      messageWrapperClick,
      closeContextMenu,
      contextMenuItemClick,
      smoothScrollDown,
      smoothScrollUp,
      showActionModal,
      closeActionModal,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep {
  .loader::after {
    background: #efeff6;
  }
}
.b-chat-messages__list {
  overflow: scroll;
  &.no-messages {
    height: 100%;
  }
}
</style>
