<template>
  <div
    :class="['b-chat-user', { manageButton: showManageButtonOnHover }]"
    @mouseenter="startHoverUser"
    @mouseleave="endHoverUser"
  >
    <div class="b-user-data">
      <userAvatar
        :link="userMainDataProfile.avatar_url"
        :avatarType="'small-square'"
        :full-name="userFullName"
      />
      <div class="b-user-info">
        <div class="b-user-full-name">{{ userFullName }}</div>
        <div class="b-user-online-status">
          <span v-if="userMainData.is_online" class="online">{{
            $t('chat.online')
          }}</span>
          <span v-else class="offline">Був онлайн – 11:20</span>
        </div>
      </div>
    </div>
    <div class="b-user-chat-role">{{ userChatRole }}</div>
    <img
      class="b-manage-user-button"
      src="@images/chat/manage-chat-user-button.svg"
      alt=""
      @click="showContextMenu"
    />
  </div>
</template>

<script>
 


import userAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';

import { useUserDataStore } from '@/stores/userData';
import { useChatDataStore } from '@/stores/chatData';

export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  components: {
    userAvatar,
  },
  emits: ['showContextMenu'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const userStore = useUserDataStore();
    const chatDataStore = useChatDataStore();
    const showManageButtonOnHover = ref(false);

    const { userData } = props;

    const isUserChatAuthor = computed(() => {
      return userData.author;
    });
    const isUserChatAdmin = computed(() => {
      return userData.admin;
    });

    const userMainData = computed(() => {
      return userData.user_data;
    });

    const userMainDataProfile = computed(() => {
      return userData.user_data.profile;
    });

    const userFullName = computed(() => {
      return `${userMainDataProfile.value.last_name} ${userMainDataProfile.value.name}`;
    });

    const userChatRole = computed(() => {
      if (isUserChatAuthor.value) {
        return t('chat.roles.author');
      }
      if (isUserChatAdmin.value) {
        return t('chat.roles.admin');
      }
    });

    function startHoverUser() {
      const isHoveredSelfUser = userData.id === userStore.user.id;
      const isHoveredChatAuthor = userData.author;

      if (chatDataStore.infoAboutMe?.author) {
        return (showManageButtonOnHover.value = !isHoveredSelfUser);
      } else if (chatDataStore.infoAboutMe?.admin) {
        return (showManageButtonOnHover.value =
          !isHoveredChatAuthor.value && !isHoveredSelfUser);
      }
    }

    function endHoverUser() {
      showManageButtonOnHover.value = false;
    }

    function showContextMenu(e) {
      emit('showContextMenu', e, userData);
    }

    return {
      isUserChatAuthor,
      isUserChatAdmin,
      userMainData,
      userMainDataProfile,
      userFullName,
      userChatRole,
      showManageButtonOnHover,
      startHoverUser,
      endHoverUser,
      showContextMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-user {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 6px;
  padding: 2px 4px;
  transition: all 0.2s linear;

  &:hover {
    background: #e6e6eb;
  }

  &.manageButton {
    &:hover {
      .b-user-chat-role {
        display: none;
      }

      .b-manage-user-button {
        display: block;
      }
    }
  }

  .b-user-data {
    display: flex;
    align-items: center;
    gap: 8px;

    .b-user-info {
      .b-user-full-name {
        @include inter(14px, 600);
        line-height: 20px;
      }

      .b-user-online-status {
        .online {
          @include inter(12px, 400, $--b-main-green-color);
          line-height: 20px;
        }
        .offline {
          @include inter(12px, 400, $--b-main-gray-color);
          line-height: 20px;
        }
      }
    }
  }
  .b-user-chat-role {
    @include inter(12px, 400, $--b-main-green-color);
    line-height: 20px;
  }

  .b-manage-user-button {
    display: none;
  }
}
</style>
