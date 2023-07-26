<template>
  <div
    :class="['b-chat-card', { pinned: isChatPinned }]"
    @click="chatCardClick"
  >
    <div class="b-chat-card-left-side">
      <div class="b-chat-avatar">
        <UserAvatar :link="instanceData.image" :full-name="chatName" />
      </div>
      <div class="b-chat-main-info">
        <div class="b-chat-name">{{ chatName }}</div>
        <div class="b-chat-last-message-text">{{ chatLastMessageText }}</div>
      </div>
    </div>
    <div class="b-chat-card-right-side">
      <div class="b-chat-last-message-time-created">
        {{ chatLastMessageTimeCreated }}
      </div>
      <div class="b-right-side-bottom-block">
        <span class="b-chat-not-read-messages-count">{{
          instanceData.unread_messages_count
        }}</span>
        <img
          v-if="isChatPinned"
          src="@images/chat/chat-pinned-icon.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';

import { detectServiceChatMessageTextByType } from './utils/detectServiceChatMessageTextByType';

import { notifionsFormatTime } from '@utils/notificationsFormatTime';

import UserAvatar from '@/components/shared/userAvatar/UserAvatar.vue';

import { ROUTES } from '@/routes/router.const';

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
    notifionsFormatTime();
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();

    const { instanceData: chatData } = props;

    const chatName = computed(() => {
      return chatData.name;
    });

    const chatLastMessageText = computed(() => {
      if (chatData.last_message) {
        return detectServiceChatMessageTextByType(chatData.last_message, t);
      }
      return t('chat.chat_lists.there_werent_messages_yet');
    });

    const isChatPinned = computed(() => {
      return chatData?.pined;
    });

    const chatLastMessageTimeCreated = computed(() => {
      if (chatData.last_message) {
        return dayjs()
          .locale('uk')
          .to(dayjs(chatData.last_message.time_created));
      }
    });

    function chatCardClick() {
      if (
        !route.query.active_chat_room ||
        Number(route.query.active_chat_room) !== chatData.id
      ) {
        router.push({
          path: ROUTES.APPLICATION.CHATS.absolute,
          query: { active_chat_room: chatData.id },
        });
      }
    }

    return {
      chatName,
      chatLastMessageText,
      chatLastMessageTimeCreated,
      isChatPinned,
      chatCardClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-card {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #dcdce2;
  background: #fafaff;
  padding: 16px;
  cursor: pointer;

  &.pinned {
    border-radius: 8px;
    border: 1px solid #fafaff;
    background: #f0f0f5;
  }

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

  .b-chat-card-right-side {
    .b-chat-last-message-time-created {
      @include inter(13px, 400);
      line-height: 20px;
    }

    .b-right-side-bottom-block {
      display: flex;
      align-items: center;
      margin-top: 8px;
      gap: 4px;

      .b-chat-not-read-messages-count {
        width: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 4px;
        border-radius: 100px;
        background: $--b-main-green-color;
        margin-left: auto;
        min-width: 16px;
        @include inter(12px, 400, #fff);
        line-height: 16px;
      }
    }
  }
}
</style>
