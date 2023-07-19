<template>
  <div class="b-chat-top-block">
    <div v-if="!selectedMessagesCount" class="b-chat-top-block-main-info">
      <div class="b-left-side">
        <img
          class="b-go-back-button-mobile"
          src="@images/chat/go-back-button.svg"
          alt=""
        />
        <div class="b-chat-info-block">
          <userAvatar
            class="b-chat-avatar"
            avatarType="rounded-square"
            :link="chatData.avatar"
            :full-name="chatData.name"
          />
          <div class="b-chat-name">
            {{ chatData.name }}
          </div>
        </div>
      </div>
      <div class="b-right-side">
        <img
          v-for="button in currentVisibleChatRightSideButtons"
          class="b-right-side-button"
          :src="button.img"
          @click="$emit(`${button.actionEmitName}`, $event)"
        />
      </div>
    </div>
    <div v-else class="b-chat-top-block-manage-selected-messages">
      <div class="b-selected-messages-count">
        <img @click="deselectChatMessages" src="@images/cross.svg" alt="" />
        <span
          >{{ selectedMessagesCount }} /
          {{ mockData.CHAT_MAX_SELECTED_MESSAGES_COUNT }}</span
        >
      </div>
      <div class="b-selected-messages-actions">
        <div
          v-for="action in mockData.chatRightSideSelectedMessagesActions"
          class="b-selected-message-action"
          @click="chatRightSideSelectedMessagesActionClick(action.actionName)"
        >
          <img :src="action.img" alt="" />
          <span>{{ $t(action.text) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import UserAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';

import { useWindowWidth } from '@workers/window-size-worker/widthScreen';
import { ChatEventBus } from '@workers/event-bus-worker';
import { useChatDataStore } from '@/stores/chatData';
import ContextMenu from '@sharedComponents/modals/ContextModal.vue';

import { CONSTS } from '@consts';

export default {
  components: {
    UserAvatar,
    ContextMenu,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
    selectedMessages: {
      type: Array,
      default: [],
    },
  },
  emits: ['searchChatMessages', 'manageChat', 'editChat'],
  setup(props) {
    const chatDataStore = useChatDataStore();

    const { detectedDevice, DEVICE_TYPES } = useWindowWidth();
    const mockData = computed(() => {
      return {
        chatToptSideRightBlockButtons:
          CONSTS.chat.chatToptSideRightBlockButtons,
        chatToptSideRightBlockButtonsButtonsMobile:
          CONSTS.chat.chatToptSideRightBlockButtonsButtonsMobile,
        chatRightSideSelectedMessagesActions:
          CONSTS.chat.chatRightSideSelectedMessagesActions,
        CHAT_RIGHT_SIDE_SELECTED_MESSAGES_ACTIONS_NAMES:
          CONSTS.chat.CHAT_RIGHT_SIDE_SELECTED_MESSAGES_ACTIONS_NAMES,
        CHAT_MAX_SELECTED_MESSAGES_COUNT:
          CONSTS.chat.CHAT_MAX_SELECTED_MESSAGES_COUNT,
      };
    });

    const isChatRightSideButtonsVisible = computed(() => {
      if (chatDataStore.infoAboutMe.removed === undefined) {
        return false;
      }
      return !chatDataStore.infoAboutMe.removed;
    });

    const currentVisibleChatRightSideButtons = computed(() => {
      if (isChatRightSideButtonsVisible.value) {
        switch (detectedDevice.value) {
          case DEVICE_TYPES.MOBILE_SMALL: {
            return mockData.value.chatToptSideRightBlockButtonsButtonsMobile;
          }
          default:
            return mockData.value.chatToptSideRightBlockButtons;
        }
      }
    });

    const selectedMessagesCount = computed(() => {
      return props.selectedMessages.length;
    });

    function deselectChatMessages() {
      ChatEventBus.emit('deselectChatMessages');
    }

    function bulkDeleteChatMessages() {
      ChatEventBus.emit('bulkDeleteChatMessages');
    }

    function chatRightSideSelectedMessagesActionClick(actionName) {
      const { DELETE, FORWARD } =
        mockData.value.CHAT_RIGHT_SIDE_SELECTED_MESSAGES_ACTIONS_NAMES;

      switch (actionName) {
        case DELETE:
          bulkDeleteChatMessages();
          break;
        case FORWARD:
          break;
      }
    }

    return {
      currentVisibleChatRightSideButtons,
      selectedMessagesCount,
      isChatRightSideButtonsVisible,
      mockData,
      deselectChatMessages,
      bulkDeleteChatMessages,
      chatRightSideSelectedMessagesActionClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-top-block {
  background: #f9f9fc;
  box-shadow: 2px 2px 10px 0px rgba(56, 56, 251, 0.1);
  padding: 16px 24px;

  @include mobile {
    padding: 12px 16px;
    background: $--b-main-white-color;
  }

  .b-chat-top-block-main-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    height: 52px;

    @include mobile {
      height: 40px;
    }

    .b-left-side {
      display: flex;
      align-items: center;

      @include mobile {
        width: 100%;
      }

      .b-chat-info-block {
        display: flex;
        align-items: center;
        gap: 12px;
        width: fit-content;

        @include mobile {
          width: 100%;
          flex-direction: row-reverse;
          justify-content: space-between;
        }

        .b-chat-avatar {
          @include mobile {
            &:deep(.b-avatar) {
              width: 40px;
              height: 40px;

              &.b-avatar-words {
                font-size: 20px;
              }
            }
          }
        }

        .b-chat-name {
          @include exo(18px, 700, $--b-main-black-color);
          max-width: 80%;
          line-height: 24px;
          max-width: 75%;
          width: 100%;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .b-go-back-button-mobile {
        display: none;
        cursor: pointer;
        margin-right: 16px;
        @include beforeDesktop {
          display: block;
        }
      }
    }

    .b-right-side {
      display: flex;
      align-items: center;
      gap: 12px;

      .b-right-side-button {
        cursor: pointer;
      }
    }
  }

  .b-chat-top-block-manage-selected-messages {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;

    @include mobile {
      height: 40px;
    }
    .b-selected-messages-count {
      display: flex;
      align-items: center;
      gap: 16px;

      img {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
      span {
        @include inter(12px, 500, $--b-main-white-color);
        border-radius: 6px;
        background: $--b-main-gray-color;
        padding: 0px 4px;
        line-height: 20px;
      }
    }

    .b-selected-messages-actions {
      display: flex;
      align-items: center;
      gap: 16px;

      .b-selected-message-action {
        @include inter(14px, 400, $--b-main-gray-color);
        display: flex;
        align-items: center;
        gap: 8px;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
