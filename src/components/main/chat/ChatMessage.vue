<template>
  <div
    :class="[
      'b-chat-message-wrapper',
      { my: isMessageMine },
      { another: !isMessageMine },
      { selected: selected },
      { selectableMode: selectableMode },
      {
        isNextMessageFromTheSameSender: isNextMessageFromTheSameSender,
      },
    ]"
    @click="$emit('messageWrapperClick', messageData.id)"
  >
    <UserAvatar
      v-if="isMessageAvatarVisible"
      :link="senderMessageData.avatar"
      :full-name="senderMessageData.fullName"
    />
    <img
      v-if="selectableMode && selected"
      class="b-chat-message-selected-icon"
      src="@images/chat/selected-message-icon.svg"
      alt=""
    />
    <img
      v-else-if="selectableMode && !selected"
      class="b-chat-message-selected-icon"
      src="@images/chat/select-message-button.svg"
      alt=""
    />

    <div
      class="b-chat-message"
      @click.right="chatMessageRightClick"
      @touchstart.passive="startMessageHold"
      @touchend.passive="endMessageHold"
    >
      <div v-html="highlightedMessageText" class="b-chat-message-text"></div>
      {{ isMessageAvatarVisible }}
      <!-- <div class="b-like-message-button">
        <img src="@images/chat/like-button.svg" alt="" />
      </div> -->
      <div class="b-chat-message-bottom-side">
        <div v-if="isMessageEdited" class="b-chat-message-time">
          {{ $t('chat.message_edited') }}
        </div>
        <div class="b-chat-message-time">{{ messageTime }}</div>
        <img v-if="isMessageMine" :src="messageReadIcon" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import dayjs from 'dayjs';

import UserAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';

import GreenMessageTail from '@images/chat/message-green-tail.svg';
import WhiteMessageTail from '@images/chat/message-white-tail.svg';

import MessageReadIcon from '@images/chat/message-read.svg';
import MessageNotReadIcon from '@images/chat/message-not-read.svg';

const SHOW_MESSAGE_CONTEXT_MEHU_ON_MOBILE_DEVICE_TIMEOUT_MS = 1000;

export default {
  props: {
    messageData: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    isChatDisabed: {
      type: Boolean,
      default: false,
    },
    selectableMode: {
      type: Boolean,
      default: false,
    },
    searchMessagesValue: {
      type: String,
      default: '',
    },
  },
  components: {
    UserAvatar,
  },
  emits: ['chatMessageRightClick', 'messageWrapperClick'],
  setup(props, { emit }) {
    const { messageData, isChatDisabed, searchMessagesValue } = props;

    const messageTime = computed(() => {
      return dayjs(props.time_created).format('HH:mm');
    });

    const isMessageMine = computed(() => {
      return messageData.isMine;
    });

    const isNextMessageFromTheSameSender = computed(() => {
      return messageData.isNextMessageFromTheSameSender;
    });

    const isMessageAvatarVisible = computed(() => {
      return messageData.showAvatar;
    });

    const isMessageEdited = computed(() => {
      return messageData.edited;
    });

    const messageTail = computed(() => {
      return isMessageMine.value ? WhiteMessageTail : GreenMessageTail;
    });

    const messageReadIcon = computed(() => {
      return isMessageRead.value ? MessageReadIcon : MessageNotReadIcon;
    });

    const isMessageRead = computed(() => {
      return messageData.read_by.length > 0;
    });

    const senderMessageData = computed(() => {
      return {
        avatar: messageData.sender.profile.avatar_url,
        fullName: `${messageData.sender.profile.last_name} ${messageData.sender.profile.name}`,
      };
    });

    let touchTimeOut;

    function startMessageHold(e) {
      const touch = e.touches[0];
      const touchPosition = { clientX: touch.pageX, clientY: touch.pageY };
      touchTimeOut = setTimeout(() => {
        chatMessageRightClick(touchPosition, props.messageData);
      }, SHOW_MESSAGE_CONTEXT_MEHU_ON_MOBILE_DEVICE_TIMEOUT_MS);
    }

    function endMessageHold() {
      clearTimeout(touchTimeOut);
    }

    function chatMessageRightClick(e) {
      if (!props.selected && !isChatDisabed) {
        emit('chatMessageRightClick', e, props.messageData);
      }
    }

    const highlightWords = (text, textToHighlight) => {
      const regex = new RegExp(textToHighlight, 'gi');
      return text.replace(
        regex,
        (match) => `<span class="search-highlight">${match}</span>`
      );
    };

    const highlightedMessageText = computed(() => {
      if (searchMessagesValue) {
        return highlightWords(messageData.text, searchMessagesValue);
      }
      return messageData.text;
    });

    return {
      messageTime,
      isMessageMine,
      isMessageEdited,
      isMessageAvatarVisible,
      senderMessageData,
      messageTail,
      isNextMessageFromTheSameSender,
      messageReadIcon,
      highlightedMessageText,
      startMessageHold,
      endMessageHold,
      chatMessageRightClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-message-wrapper {
  display: flex;
  align-items: flex-end;
  align-items: center;
  gap: 12px;
  .b-chat-message-tail {
    @include mobile {
      width: 10px;
      height: fit-content;
    }
  }

  &.selectableMode {
    cursor: pointer;
    padding: 0px 8px;
  }

  &.selected {
    border-radius: var(--radius-s, 6px);
    background: var(--surface-surface-selected-blur, rgba(34, 134, 143, 0.15));
    backdrop-filter: blur(1px);
    padding: 8px;
  }

  &.my {
    .b-chat-message-tail {
      order: 2;
    }
    .b-chat-message-selected-icon {
      order: 3;
    }

    .b-chat-message {
      border-radius: 12px 12px 0px 12px;
      background: $--b-main-white-color;
      text-align: right;
      margin-right: 0px;
      margin-left: auto;

      .b-chat-message-text {
        @include inter(16px, 400, $--b-main-black-color);
        line-height: 24px;

        :deep {
          .search-highlight {
            @include inter(16px, 400, $--b-main-green-color);
            padding: 2px;
            border-radius: 6px;
            background: rgba(34, 134, 143, 0.15);
          }
        }
      }

      .b-chat-message-time {
        @include inter(12px, 400, $--b-main-gray-color);
        line-height: 20px;
      }
      .b-like-message-button {
      }

      .b-chat-message-bottom-side {
        display: flex;
        align-items: center;
        margin-left: auto;
        justify-content: right;
        gap: 6px;

        img {
          margin-top: -3px;
        }
      }
    }
  }
  &.another {
    .b-chat-message {
      border-radius: 12px 12px 12px 0px;
      background: $--b-main-green-color;

      .b-chat-message-text {
        @include inter(16px, 400, $--b-main-white-color);
        line-height: 24px;
      }

      .b-chat-message-time {
        @include inter(12px, 400, $--b-main-white-color);
        line-height: 20px;
      }

      .b-chat-message-time {
        text-align: right;
      }
    }

    &.isNextMessageFromTheSameSender {
      .b-chat-message {
        margin-left: 40px;
        border-radius: 12px;
      }
    }

    &.selected {
      .b-chat-message-tail {
        path {
          fill: #a0d0ce;
        }
      }
      .b-chat-message {
        background: #a0d0ce;
        box-shadow: 2px 2px 10px 0px rgba(56, 56, 251, 0.1);
      }
    }

    .b-chat-message-selected-icon {
      margin-left: 6px;
    }
  }

  .b-chat-message {
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    padding: 12px;
    width: fit-content;
    height: fit-content;
    position: relative;
    max-width: 60%;

    @include tablet {
      max-width: 70%;
    }

    @include mobile {
      max-width: 80%;
    }

    @media (min-width: 992px) and (max-width: 1200px) {
      max-width: 80% !important;
    }

    &:hover {
      .b-like-message-button {
        display: flex;
      }
    }

    .b-like-message-button {
      background: #fcfcfc;
      padding: 3px 8px 5px;
      border: 1px solid #dfdeed;
      border-radius: 100px;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: absolute;
      left: 0;
      bottom: -5px;
    }

    .b-chat-message-text {
      margin-bottom: 8px;
      text-align: left;
      overflow-wrap: break-word;
    }
  }
}
</style>
