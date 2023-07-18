<template>
  <Teleport to="body">
    <ContextMenu
      v-if="isContextMenuOpened"
      :clientX="contextMenuX"
      :clientY="contextMenuY"
      :modalItems="chatUserContextMenuItems"
      :background=false
      @close-modal="closeContextMenu"
      @itemClick="contextMenuItemClick"
    />
    <ActionModal
      v-if="isActionModalOpened"
      :modalData="actionModalConfig"
      @closeModal="closeActionModal"
    />
  </Teleport>

  <div class="b-chat-users__count">
    <span>{{ $t('chat.members') }}</span>
    <span>{{ currentUsersCountAndLimitOfUsers }}</span>
  </div>
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
import { useI18n } from 'vue-i18n';

import { v4 as uuid } from 'uuid';

import InfiniteLoading from '@mainComponents/infiniteLoading/InfiniteLoading.vue';
import SmartList from '@sharedComponents/smartList/SmartList.vue';
import ContextMenu from '@sharedComponents/modals/ContextModal.vue';
import ActionModal from '@mainComponents/events/modals/ActionModal.vue';
import ChatUser from './ChatUser.vue';

import { WebSocketPaginationWorker } from '@workers/pagination-worker';
import { API } from '@workers/api-worker/api.worker';
import { ChatWebSocketTypes } from '@workers/web-socket-worker/message-types/chat/web.socket.types';
import { ChatSocketWorkerInstance } from '@workers/web-socket-worker';
import { CHAT_DETAILS_TYPE_ENUM_ERRORS } from '@workers/web-socket-worker/message-types/chat/web.socket.errors';
import { useChatDataStore } from '@/stores/chatData';

import { CONSTS } from '@consts';

import LimitOfAdminsIcon from '@images/chat/limit-of-admins-reached.svg';

export default {
  components: {
    InfiniteLoading,
    ChatUser,
    SmartList,
    ContextMenu,
    ActionModal,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const chatDataStore = useChatDataStore();
    const refList = ref();
    const triggerForRestart = ref(false);

    const blockScrollToTopIfExist = ref(false);

    const isActionModalOpened = ref(false);

    const isContextMenuOpened = ref(false);
    const contextMenuX = ref(null);
    const contextMenuY = ref(null);
    const userOnWhatOpenedContextMenuData = ref(null);

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const actionModalConfig = computed(() => {
      return {
        title: t('chat.admins_limit_reached_modal.title'),
        description: t('chat.admins_limit_reached_modal.main_text'),
        image: LimitOfAdminsIcon,
      };
    });

    const mockData = computed(() => {
      return {
        chatUserContextMenuItems: CONSTS.chat.chatUserContextMenuItems(
          userOnWhatOpenedContextMenuData.value.admin
        ),
        CHAT_USER_CONTEXT_MENU_ACTIONS:
          CONSTS.chat.CHAT_USER_CONTEXT_MENU_ACTIONS,
      };
    });

    const chatUserContextMenuItems = computed(() => {
      return mockData.value.chatUserContextMenuItems;
    });

    const chatUsersCountLimit = computed(() => {
      return paginationHeplFullData.value?.chat_users_count_limit;
    });

    const currentUsersCountAndLimitOfUsers = computed(() => {
      if (paginationTotalCount.value && chatUsersCountLimit.value) {
        return `${paginationTotalCount.value} / ${chatUsersCountLimit.value}`;
      }
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

    function showActionModal() {
      isActionModalOpened.value = true;
    }

    function closeActionModal() {
      isActionModalOpened.value = false;
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
      const { SET_ADMIN, UNSET_ADMIN, DELETE } =
        mockData.value.CHAT_USER_CONTEXT_MENU_ACTIONS;

      switch (action) {
        case DELETE:
          removeUserFromChat();
          break;
        case SET_ADMIN:
          setOrUnsetAmdin(action);
          break;
        case UNSET_ADMIN:
          setOrUnsetAmdin(action);
          break;
      }
    }

    function setOrUnsetAmdin(action) {
      const actions = {
        set_admin: 'set',
        unset_admin: 'unset',
      };
      API.ChatService.setOrUnsetAdmin({
        action: actions[action],
        chat_id: props.chatData.id,
        user_id: userOnWhatOpenedContextMenuData.value.id,
      });
    }

    function removeUserFromChat() {
      API.ChatService.removeUserFromChat({
        chat_id: props.chatData.id,
        user_id: userOnWhatOpenedContextMenuData.value.id,
      });
    }

    function setOrUnsetChatAdminMessageHandler(instanceType) {
      instanceType.setOrUnsetAdmin(paginationElements);
      instanceType.onError(
        CHAT_DETAILS_TYPE_ENUM_ERRORS.LIMIT_OF_ADMINS_3_REACHED,
        showActionModal
      );
    }

    function removeUserFromChatMessageHandler(instanceType) {
      instanceType.removeUserFromChat(paginationElements);
    }

    ChatSocketWorkerInstance.registerCallback(
      setOrUnsetChatAdminMessageHandler,
      ChatWebSocketTypes.SetOrUnsetChatAdmin
    );

    ChatSocketWorkerInstance.registerCallback(
      removeUserFromChatMessageHandler,
      ChatWebSocketTypes.RemoveUserFromChat
    );

    onBeforeUnmount(() => {
      ChatSocketWorkerInstance.destroyCallback(
        setOrUnsetChatAdminMessageHandler
      );
      ChatSocketWorkerInstance.destroyCallback(
        removeUserFromChatMessageHandler
      );
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
      paginationPage,
      actionModalConfig,
      isActionModalOpened,
      chatUsersCountLimit,
      currentUsersCountAndLimitOfUsers,
      restartInfiniteScroll,
      closeActionModal,
      loadDataPaginationData,
      showContextMenu,
      closeContextMenu,
      contextMenuItemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-users__count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include inter(12px, 400, $--b-main-gray-color);
  line-height: 20px;
  margin-bottom: 10px;
}
</style>
