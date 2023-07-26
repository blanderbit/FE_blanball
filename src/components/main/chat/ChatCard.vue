<template>
  <div class="b-chat-card">
    <div class="b-chat-card-left-side">
      <div class="b-chat-avatar">
        <UserAvatar :link="instanceData.image" :full-name="chatName" />
      </div>
      <div class="b-chat-main-info">
        <div class="b-chat-name">{{ chatName }}</div>
        <div class="b-chat-last-message-text">{{ chatLastMessageText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import UserAvatar from '@/components/shared/userAvatar/UserAvatar.vue';

export default {
  props: {
    instanceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    UserAvatar,
  },
  setup(props) {
    const { t } = useI18n();

    const chatName = computed(() => {
      return props.instanceData.name;
    });

    const chatLastMessageText = computed(() => {
      if (props.instanceData.last_message) {
        return props.instanceData.last_message;
      }
      return t('chat.chat_lists.there_werent_messages_yet');
    });

    return {
      chatName,
      chatLastMessageText,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-border-primary, #dcdce2);
  background: var(--surface-surface-secondary, #fafaff);
  padding: 16px;

  .b-chat-card-left-side {
    display: flex;
    align-items: center;
    gap: 12px;

    .b-chat-main-info {
      .b-chat-name {
        @include inter(14px, 600);
        line-height: 20px;
      }

      .b-chat-last-message-text {
        @include inter(14px, 400);
        line-height: 20px;
        margin-top: 4px;
      }
    }
  }
}
</style>
