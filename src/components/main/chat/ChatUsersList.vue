<template>
  <ContextMenu
    v-if="isContextMenuOpened"
    :clientX="contextMenuX"
    :clientY="contextMenuY"
    :modalItems="chatMessageContextMenuItems"
    backgroundColor="transperent"
    @close-modal="closeContextMenu"
    @itemClick="contextMenuItemClick"
  />

  <div class="b-chat-users__list">
    <SmartList
      :list="paginationElements"
      ref="refList"
      v-model:scrollbar-existing="blockScrollToTopIfExist"
    >
      <template #smartListItem="slotProps">
        <ChatUser :key="slotProps.index" :userData="slotProps.smartListItem" />
      </template>
      <template #after>
        <InfiniteLoading
          :identifier="triggerForRestart"
          :showCompleteSlot="false"
          ref="scrollbar"
          @infinite="loadDataPaginationData(paginationPage + 1, $event)"
        >
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
import ContextMenu from '../../shared/modals/ContextModal.vue';
import ChatUser from './ChatUser.vue';

import { WebSocketPaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';
import { ChatWebSocketTypes } from '../../../workers/web-socket-worker/message-types/chat/web.socket.types';

import { CONSTS } from '../../../consts';

export default {
  components: {
    InfiniteLoading,
    ChatUser,
    SmartList,
    ContextMenu,
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
    } = WebSocketPaginationWorker({
      paginationDataRequest: (page) =>
        API.ChatService.getChatUsers({
          chat_id: props.chatData.id,
          page: page,
        }),
      messageType: ChatWebSocketTypes.GetChatUsersList,
    });

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    function handlingIncomeMessagesData(user) {
      return {
        ...user,
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

    return {
      refList,
      paginationElements,
      triggerForRestart,
      blockScrollToTopIfExist,
      contextMenuX,
      contextMenuY,
      isContextMenuOpened,
      chatMessageContextMenuItems,
      paginationPage,
      restartInfiniteScroll,
      loadDataPaginationData,
      showContextMenu,
      closeContextMenu,
      contextMenuItemClick,
    };
  },
};
</script>

<style lang="scss" scoped></style>
