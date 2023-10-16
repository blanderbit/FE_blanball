<template>
  <div
    :class="['b-chat-card', { pinned: isChatPinned }, { active: isChatActive }]"
    @click="chatCardClick"
    @click.right.prevent="openContextMenu"
  >
    <div class="b-chat-card-left-side">
      <div class="b-chat-avatar">
        <UserAvatar :link="chatData.image" :full-name="chatName" />
      </div>
      <div class="b-chat-main-info">
        <div class="b-chat-name elipsis">{{ chatName }}</div>
        <div class="b-chat-last-message-text elipsis">
          {{ chatLastMessageText }}
        </div>
      </div>
    </div>
    <div class="b-chat-card-right-side">
      <div class="b-right-side-top-block">
        <div v-if="isChatEventGroup" class="b-chat-event-group-type">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="icon / ball" clip-path="url(#clip0_7914_28687)">
              <path
                id="Vector (Stroke)"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.85709 7.45646L3.11518 6.18037L2.76493 4.73925C2.26487 5.5405 1.94364 6.46485 1.85709 7.45646ZM2.62147 3.26342C1.5086 4.52627 0.833496 6.18413 0.833496 7.99967C0.833496 11.9577 4.04212 15.1663 8.00016 15.1663C11.9582 15.1663 15.1668 11.9577 15.1668 7.99967C15.1668 6.18439 14.4919 4.52673 13.3793 3.26396C13.3763 3.26044 13.3732 3.25696 13.3701 3.25352C12.057 1.769 10.1379 0.833008 8.00016 0.833008C5.86216 0.833008 3.94283 1.76922 2.62975 3.25405C2.62695 3.25714 2.62419 3.26026 2.62147 3.26342ZM3.54914 3.73162L4.09608 5.98203L5.40898 6.59757L7.50016 5.07824V3.59002L5.67733 2.28545C4.86796 2.6148 4.1443 3.1111 3.54914 3.73162ZM6.90009 1.93084L8.00016 2.71815L9.10025 1.93085C8.74328 1.86657 8.37564 1.83301 8.00016 1.83301C7.62469 1.83301 7.25705 1.86656 6.90009 1.93084ZM10.323 2.28546L8.50016 3.59003V5.07824L10.5914 6.59757L11.9042 5.98204L12.4512 3.73163C11.856 3.11112 11.1324 2.61481 10.323 2.28546ZM13.2354 4.73926L12.8851 6.18037L14.1432 7.45647C14.0567 6.46486 13.7355 5.5405 13.2354 4.73926ZM14.1092 8.84631L12.2256 6.9358L10.9449 7.53629L10.122 10.0689L10.9009 11.1384L13.4628 10.8636C13.7875 10.2456 14.0104 9.56573 14.1092 8.84631ZM12.738 11.9471L10.9746 12.1362L10.0086 13.8319C11.0838 13.4617 12.0246 12.8025 12.738 11.9471ZM8.6888 14.1283L10.0725 11.6995L9.31323 10.6571H6.68715L5.92787 11.6996L7.31152 14.1283C7.53761 14.1534 7.76738 14.1663 8.00016 14.1663C8.23295 14.1663 8.46272 14.1534 8.6888 14.1283ZM5.99176 13.8319L5.02573 12.1362L3.26227 11.9471C3.97573 12.8025 4.91649 13.4617 5.99176 13.8319ZM2.53747 10.8636L5.09947 11.1384L5.87839 10.0689L5.05549 7.53629L3.77468 6.9358L1.89113 8.8463C1.98992 9.56573 2.21279 10.2456 2.53747 10.8636ZM6.05181 7.36659L6.79603 9.65707H9.20436L9.94858 7.3666L8.00017 5.95104L6.05181 7.36659Z"
                fill="#148783"
              />
            </g>
            <defs>
              <clipPath id="clip0_7914_28687">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span>{{ $t('chat.event_group_chat') }}</span>
        </div>
        <div class="b-chat-last-message-time-created">
          {{ chatLastMessageTimeCreated }}
        </div>
      </div>
      <div
        :class="[
          'b-right-side-bottom-block',
          { 'no-not-read-messages': !chatData.unread_messages_count },
        ]"
      >
        <span
          v-if="chatData.unread_messages_count"
          class="b-chat-not-read-messages-count"
          >{{ chatData.unread_messages_count }}</span
        >
        <svg
          class="b-chat-pinned-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.4581 1.4277C10.3593 1.3289 10.2237 1.27595 10.0841 1.28167C9.94447 1.28739 9.81363 1.35125 9.72325 1.4578L6.7782 4.92937L4.51626 4.69512C4.36648 4.67961 4.21768 4.73243 4.1112 4.83891L2.97983 5.97028C2.88606 6.06404 2.83338 6.19122 2.83338 6.32383C2.83338 6.45644 2.88606 6.58362 2.97983 6.67738L5.79782 9.49538L1.64645 13.6468C1.45118 13.842 1.45118 14.1586 1.64645 14.3539C1.84171 14.5491 2.15829 14.5491 2.35355 14.3539L6.50493 10.2025L9.10811 12.8057C9.20188 12.8994 9.32906 12.9521 9.46168 12.9521C9.59429 12.9521 9.72146 12.8994 9.81523 12.8057L10.9466 11.6743C11.053 11.5678 11.1059 11.419 11.0903 11.2692L10.8561 9.00732L14.3278 6.06234C14.4343 5.97195 14.4982 5.84111 14.5039 5.70151C14.5096 5.56191 14.4567 5.42629 14.3579 5.32749L10.4581 1.4277ZM6.50493 10.2025L6.68689 10.0205C6.88215 9.82527 6.88215 9.50869 6.68689 9.31342C6.49162 9.11816 6.17504 9.11816 5.97978 9.31342L5.79782 9.49538L6.50493 10.2025ZM7.37022 5.77733L10.1347 2.51856L13.267 5.65083L10.0082 8.41529C9.88233 8.52202 9.81726 8.68396 9.83426 8.84808L10.0711 11.1355L9.46166 11.745L4.04049 6.32383L4.65 5.71432L6.93743 5.95121C7.10155 5.96821 7.26348 5.90314 7.37022 5.77733Z"
            fill="#262541"
          />
          <path
            d="M6.68689 10.0205C6.88215 9.82527 6.88215 9.50869 6.68689 9.31342C6.49162 9.11816 6.17504 9.11816 5.97978 9.31342L5.79782 9.49538L6.50493 10.2025L6.68689 10.0205Z"
            fill="#262541"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import { detectServiceChatMessageTextByType } from './utils/detectServiceChatMessageTextByType';

import { notifionsFormatTime } from '@utils/notificationsFormatTime';

import UserAvatar from '@/components/shared/userAvatar/UserAvatar.vue';

import { ROUTES } from '@/routes/router.const';
import { CONSTS } from '@/consts';

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
  emits: ['openContextMenu', 'closeMobileMenu'],
  setup(props, { emit }) {
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
        if (chatData.last_message.service) {
          return detectServiceChatMessageTextByType(chatData.last_message, t);
        }
        return chatData.last_message.text;
      }
      return t('chat.chat_lists.there_werent_messages_yet');
    });

    const isChatPinned = computed(() => {
      return chatData?.pinned;
    });

    const isChatEventGroup = computed(() => {
      return [CONSTS.chat.CHAT_TYPES.EVENT_GROUP].includes(chatData.type);
    });

    const isChatActive = computed(() => {
      return Number(route.query.active_chat_room) === chatData.id;
    });

    const chatLastMessageTimeCreated = computed(() => {
      if (chatData.last_message) {
        return dayjs()
          .locale('uk')
          .to(dayjs(chatData.last_message.time_created));
      }
    });

    function openContextMenu(e) {
      emit('openContextMenu', {
        yPosition: e.clientY,
        xPosition: e.clientX,
        itemData: chatData
      });
    }

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
      emit('closeMobileMenu');
    }

    return {
      chatData,
      chatName,
      isChatActive,
      chatLastMessageText,
      chatLastMessageTimeCreated,
      isChatPinned,
      isChatEventGroup,
      chatCardClick,
      openContextMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.elipsis {
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.b-chat-card {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dcdce2;
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
    .b-right-side-top-block {
      display: flex;
      align-items: center;
      gap: 12px;

      .b-chat-event-group-type {
        border-radius: 6px;
        display: flex;
        height: 24px;
        padding: 6px 8px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        border: 1px solid $--b-main-green-color;
        min-width: max-content;
        span {
          color: $--b-main-green-color;
          font-family: Inter;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;

          @include tabletAndMobile {
            display: none;
          }
        }
      }
      .b-chat-last-message-time-created {
        @include inter(13px, 400);
        line-height: 20px;
        width: max-content;
      }
    }

    .b-right-side-bottom-block {
      display: flex;
      align-items: center;
      margin-top: 8px;
      gap: 4px;

      &.no-not-read-messages {
        * {
          margin-left: auto;
        }
      }

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
        @include inter(12px, 400, $--b-main-white-color);
        line-height: 16px;
      }
    }
  }

  &.active {
    border-radius: 8px;
    border: 1px solid var(--border-border-secondary, #f2f2f5);
    background: var(--bg-accent, #1d817e);

    .b-chat-name {
      color: $--b-main-white-color !important;
    }

    .b-chat-last-message-time-created,
    .b-chat-last-message-text {
      color: #f0f0f4 !important;
    }

    .b-chat-not-read-messages-count {
      background: $--b-main-white-color !important;
      color: $--b-main-green-color !important;
    }

    .b-chat-event-group-type {
      border: 1px solid $--b-main-white-color !important;

      span {
        color: $--b-main-white-color !important;
      }
    }

    path {
      fill: $--b-main-white-color !important;
    }
  }
}
</style>
