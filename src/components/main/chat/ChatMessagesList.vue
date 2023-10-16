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
    :class="[
      'b-chat-messages__list',
      { 'no-messages': !paginationElements.length },
    ]"
    ref="CHAT_MESSAGES_LIST_ROOT_ELEMENT_REF"
    :style="heightStyle"
    @keydown.up="
      smoothScrollUp(MESSAGES_SCROLL_SPEED, MESSAGES_SCROLL_ANIMATION_DURATION)
    "
    @keydown.down="
      smoothScrollDown(
        MESSAGES_SCROLL_SPEED,
        MESSAGES_SCROLL_ANIMATION_DURATION
      )
    "
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
</template>

<script>
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

import { ChatWebSocketTypes } from '@workers/web-socket-worker/message-types/chat/web.socket.types';
import { smoothScrollUp, smoothScrollDown } from './utils/smoothScroll';

import { useUserDataStore } from '@stores/userData';



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
    const CHAT_MESSAGES_LIST_ROOT_ELEMENT_REF = ref(null);
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

    const beforeConcatToCheckIsTheNextMessageFromTheSameSender = (
      list,
      newList
    ) => {
      const oldListLastElement = list.at(-1);
      const newListFirstElement = newList.at(0);
      if (oldListLastElement && newListFirstElement) {
        Object.assign(
          oldListLastElement,
          setShowSenderMessageAvatarAndIsTheNextMessageFromTheSameAuthor(
            oldListLastElement,
            newListFirstElement
          )
        );
      }

      return newList;
    };

    function setShowSenderMessageAvatarAndIsTheNextMessageFromTheSameAuthor(
      firstMessage,
      secondMessage
    ) {
      const isMine =
        !firstMessage.service && firstMessage?.sender?.id === userStore.user.id;
      const isNextMessageFromTheSameSender =
        !firstMessage.service &&
        firstMessage?.sender?.id === secondMessage?.sender?.id;
      const showAvatar = true
        ? !isMine && !isNextMessageFromTheSameSender
        : false;

      return {
        isNextMessageFromTheSameSender,
        showAvatar,
        isMine,
      };
    }

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
      beforeConcat: beforeConcatToCheckIsTheNextMessageFromTheSameSender,
      messageType: ChatWebSocketTypes.GetChatMessagesList,
    });

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    function handlingIncomeMessagesData(message, index, messages) {
      if (!message.service) {
        let nextMessage = {};

        if (messages) {
          nextMessage = messages[index + 1];
        }

        return {
          ...message,
          ...setShowSenderMessageAvatarAndIsTheNextMessageFromTheSameAuthor(
            message,
            nextMessage
          ),
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

    function replyToMessage(messageData) {
      EventBusInstance.emit('replyToChatMessage', messageData);
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
        EventBusInstance.emit('editChatMessage', messageData);
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

    const chatMessagesListHeightValue = computed(() => {
      return parseInt(props.heightStyle);
    });

    const messagesIdsToRead = ref([]);

    const grabMessagesToReadOnScroll = () => {
      const messages =
        MESSAGES_LIST_RECYCLE_SCROLLER_WRAPPER_ELEMENT.value.element.__vnode.ctx
          .data.pool;
      const minMessagePosition = 0;
      const maxMessagePosition = chatMessagesListHeightValue.value;

      messages.forEach((message) => {
        if (
          message.position >= minMessagePosition &&
          message.position <= maxMessagePosition
        ) {
          const isMessageMine = message.item.item.isMine;
          const isMessageAlreadyReadByMe = message.item.item.read_by.includes(
            userStore.user.id
          );
          const isMesasgeAlreadyInTheListToRead =
            messagesIdsToRead.value.includes(message.item.id);

          const isMessageAbleToRead =
            !isMessageMine &&
            !isMessageAlreadyReadByMe &&
            !isMesasgeAlreadyInTheListToRead;

          if (isMessageAbleToRead) {
            messagesIdsToRead.value.push(message.item.id);
          }
        }
      });
    };

    onMounted(() => {
      MESSAGES_LIST_RECYCLE_SCROLLER_WRAPPER_ELEMENT.value = {
        element: CHAT_MESSAGES_LIST_ROOT_ELEMENT_REF.value.querySelector(
          RECYCLE_SCROLLER_WRAPPER_ELEMENT_SELECTOR
        ),
      };
    });

    const onBulkDeleteChatMessagesEvent = () => {
      deleteChatMessages(selectedMessages.value);
    };

    EventBusInstance.on('deselectChatMessages', deselectChatMessages);
    EventBusInstance.on(
      'bulkDeleteChatMessages',
      onBulkDeleteChatMessagesEvent
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
      EventBusInstance.off('deselectChatMessages', deselectChatMessages);
      EventBusInstance.off('bulkDeleteChatMessages', onBulkDeleteChatMessagesEvent);
    });

    watch(
      () => props.chatData.id,
      () => {
        if (props.chatData.id) {
          startNewMessagesLoading();
          paginationClearData();
          loadDataPaginationData(1, null);
          finishNewMessagesLoading();
          restartInfiniteScroll();
        }
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
      actionModalConfig,
      CHAT_MESSAGES_LIST_ROOT_ELEMENT_REF,
      MESSAGES_LIST_VERTICAL_GAP_PX,
      paginationIsNextPage,
      MESSAGES_SCROLL_SPEED,
      MESSAGES_SCROLL_ANIMATION_DURATION,
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
      grabMessagesToReadOnScroll,
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
