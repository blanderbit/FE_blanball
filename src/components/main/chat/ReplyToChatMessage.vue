<template>
  <div class="b-reply-to-chat-message">
    <div class="b-chat-message-main-data">
      <div class="b-chat-message-author">
        {{ chatMessageAuthorFullName }}
      </div>
      <div class="b-chat-message-text">
        {{ replyToMessageData.text }}
      </div>
    </div>
    <img
      class="b-cancel-reply-button"
      src="../../../assets/img/green-cross.svg"
      alt=""
      @click="$emit('cancelReply')"
    />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    replyToMessageData: {
      type: Object,
      required: true,
    },
  },
  emits: ['cancelReply'],
  setup(props) {
    const chatMessageAuthorFullName = computed(() => {
      return `${props.replyToMessageData.sender.profile.last_name} ${props.replyToMessageData.sender.profile.name}`;
    });

    return {
      chatMessageAuthorFullName,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-reply-to-chat-message {
  border-radius: 4px;
  background: var(--surface-surface-brand-secondary, #e3fbfa);
  padding: 4px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  width: 100%;

  &::before {
    content: '';
    border-radius: 4px;
    background: var(--text-color-brand, #148783);
    padding: 2px;
    height: 48px;
  }

  .b-cancel-reply-button {
    cursor: pointer;
    margin-right: 0px;
    margin-left: auto;
  }

  .b-chat-message-main-data {
    margin: 0px 8px;
    .b-chat-message-author {
      @include inter(12px, 600, $--b-main-green-color);
      line-height: 20px;
    }

    .b-chat-message-text {
      @include inter(14px, 400, $--b-main-black-color);
      line-height: 24px;
      word-break: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
