<template>
  <Teleport to="body">
    <ContextMenu
      v-if="isContextMenuOpened"
      :clientX="contextMenuX"
      :clientY="contextMenuY"
      :modalItems="chatUserContextMenuItems"
      backgroundColor="transperent"
      @close-modal="closeContextMenu"
      @itemClick="contextMenuItemClick"
    />
  </Teleport>

  <div class="b-chat-users__list">
    <SmartList
      :list="paginationElements"
      ref="refList"
      v-model:scrollbar-existing="blockScrollToTopIfExist"
    >
      <template #smartListItem="slotProps">
        <ChatUser
          :key="slotProps.index"
          :userData="slotProps.smartListItem"
          :currentUserChatPermissions="currentUserChatPermissions"
          @showContextMenu="showContextMenu"
        />
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
import { ref, computed, onBeforeUnmount } from 'vue';

import { v4 as uuid } from 'uuid';

import InfiniteLoading from '../infiniteLoading/InfiniteLoading.vue';
import SmartList from '../../shared/smartList/SmartList.vue';
import ContextMenu from '../../shared/modals/ContextModal.vue';
import ChatUser from './ChatUser.vue';

import { WebSocketPaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';
import { ChatWebSocketTypes } from '../../../workers/web-socket-worker/message-types/chat/web.socket.types';
import { ChatSocketWorkerInstance } from '../../../workers/web-socket-worker';

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
    const userOnWhatOpenedContextMenuData = ref(null);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const mockData = computed(() => {
      return {
        chatUserContextMenuItems: CONSTS.chat.chatUserContextMenuItems(
          userOnWhatOpenedContextMenuData.value.admin
        ),
        CHAT_MESSAGE_CONTEXT_MENU_ACTIONS:
          CONSTS.chat.CHAT_MESSAGE_CONTEXT_MENU_ACTIONS,
      };
    });

    const chatUserContextMenuItems = computed(() => {
      return mockData.value.chatUserContextMenuItems;
    });

    const currentUserChatPermissions = computed(() => {
      return paginationHeplFullData.value?.request_user_permissions;
    });

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationClearData,
      paginationHeplFullData,
      paginationLoad,
    } = WebSocketPaginationWorker({
      paginationDataRequest: (page) =>
        API.ChatService.getChatUsers({
          chat_id: props.chatData.id,
          page: page,
        }),
      dataTransformation: handlingIncomeMessagesData,
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

    function showContextMenu(e, userData) {
      contextMenuX.value = e.clientX;
      contextMenuY.value = e.clientY;
      userOnWhatOpenedContextMenuData.value = userData;
      isContextMenuOpened.value = true;
    }

    function closeContextMenu() {
      contextMenuX.value = null;
      contextMenuY.value = null;
      userOnWhatOpenedContextMenuData.value = {};
      isContextMenuOpened.value = false;
    }

    function contextMenuItemClick(action) {
      const { DELETE, SELECT, FORWARD, REPLY } =
        mockData.value.CHAT_MESSAGE_CONTEXT_MENU_ACTIONS;

      switch (action) {
        case DELETE:
          break;
        case SELECT:
          selectMessage(userOnWhatOpenedContextMenuData.value.id);
          break;
        case FORWARD:
          break;
        case REPLY:
          replyToMessage(userOnWhatOpenedContextMenuData.value);
          break;
      }
    }

    function setOrUnsetChatAdmin(instanceType) {
      instanceType.setOrUnsetAdmin(paginationElements);
    }

    ChatSocketWorkerInstance.registerCallback(
      setOrUnsetChatAdmin,
      ChatWebSocketTypes.SetOrUnsetChatAdmin
    );

    onBeforeUnmount(() => {
      ChatSocketWorkerInstance.destroyCallback(setOrUnsetChatAdmin);
    });

    return {
      refList,
      paginationElements,
      triggerForRestart,
      blockScrollToTopIfExist,
      contextMenuX,
      contextMenuY,
      isContextMenuOpened,
      chatUserContextMenuItems,
      currentUserChatPermissions,
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
