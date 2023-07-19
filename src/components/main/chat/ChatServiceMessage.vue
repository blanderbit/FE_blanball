<template>
  <div class="b-chat-service-message">
    <span>{{ serviceMessageText }}</span>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { CONSTS } from '@consts/index';

export default {
  props: {
    messageData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { messageData } = props;

    const serviceMessageText = computed(() => {
      const CHAT_MESSAGE_TYPES = CONSTS.chat.CHAT_MESSAGE_TYPES;

      switch (messageData.type) {
        case CHAT_MESSAGE_TYPES.USER_JOINED_TO_CHAT: {
          return t('chat.service_messages.user_joined_to_chat', {
            userFullName: `${messageData.sender.profile.last_name} ${messageData.sender.profile.name}`,
          });
        }
        case CHAT_MESSAGE_TYPES.GROUP_CHAT_CREATED: {
          return t('chat.service_messages.group_chat_created');
        }
      }
    });

    return {
      serviceMessageText,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-service-message {
  border-radius: 8px;
  background: var(--bg-dark-blur, rgba(9, 9, 16, 0.8));
  padding: 4px 12px;
  backdrop-filter: blur(1px);
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  margin-top: 8px;

  span {
    @include inter(14px, 400, $--b-main-white-color);
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
