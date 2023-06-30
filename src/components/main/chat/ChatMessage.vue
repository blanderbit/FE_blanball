<template>
  <div class="b-chat-message-wrapper">
    <UserAvatar
      v-if="messageData.showAvatar"
      :link="messageData.sender.profile.avatar_url"
      :full-name="`${messageData.sender.profile.last_name} ${messageData.sender.profile.name}`"
    />
    <div
      :class="[
        'b-chat-message',
        { my: isMessageMine },
        { another: !isMessageMine },
      ]"
      @click.right="chatMessageRightClick"
      @touchstart="startMessageHold"
      @touchend="endMessageHold"
    >
      <div class="b-chat-message-text">
        {{ messageData.text }}
      </div>

      <div class="b-like-message-button">
        <img src="../../../assets/img/chat/like-button.svg" alt="" />
      </div>
      <div class="b-chat-message-time">{{ messageTime }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import dayjs from 'dayjs';

import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';

export default {
  props: {
    messageData: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserAvatar,
  },
  emits: ['chatMessageRightClick'],
  setup(props, { emit }) {
    const messageTime = computed(() => {
      return dayjs(props.time_created).format('HH:mm');
    });

    const isMessageMine = computed(() => {
      if (props.messageData.isMine == null) {
        return false;
      }
      return props.messageData.isMine;
    });

    let touchTimeOut;

    function startMessageHold(e) {
      const touch = e.touches[0];
      const touchPosition = { clientX: touch.pageX, clientY: touch.pageY };
      touchTimeOut = setTimeout(() => {
        chatMessageRightClick(touchPosition, props.messageData);
      }, 500);
    }

    function endMessageHold() {
      clearTimeout(touchTimeOut);
    }

    function chatMessageRightClick(e) {
      emit('chatMessageRightClick', e, props.messageData);
    }

    return {
      messageTime,
      isMessageMine,
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
  gap: 6px;
  align-items: flex-end;
}
.b-chat-message {
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  padding: 12px;
  width: fit-content;
  height: fit-content;
  position: relative;
  margin-top: 8px;
  max-width: 60%;

  &:hover {
    .b-like-message-button {
      display: flex;
    }
  }

  @include tablet {
    max-width: 70%;
  }

  @include mobile {
    max-width: 80%;
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

  .b-chat-message-time {
    text-align: right;
  }

  .b-chat-message-text {
    margin-bottom: 8px;
    text-align: left;
    overflow-wrap: break-word;
  }

  &.my {
    border-radius: 12px 12px 0px 12px;
    background: $--b-main-white-color;
    text-align: right;
    margin-right: 0px;
    margin-left: auto;

    .b-chat-message-text {
      @include inter(16px, 400, $--b-main-black-color);
      line-height: 24px;
    }

    .b-chat-message-time {
      @include inter(12px, 400, $--b-main-gray-color);
      line-height: 20px;
    }

    .b-like-message-button {
    }
  }
  &.another {
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
  }
}
</style>
