<template>
  <div class="b-chat-user">
    <div class="b-user-data">
      <userAvatar
        :link="userMainDataProfile.avatar_url"
        :avatarType="'small-square'"
        :full-name="userFullName"
      />
      <div class="b-user-info">
        <div class="b-user-full-name">{{ userFullName }}</div>
        <div
          :class="['b-user-online-status', { online: userMainData.is_online }]"
        >
          Був онлайн – 11:20
        </div>
      </div>
    </div>
    <div class="b-user-chat-role">{{ userChatRole }}</div>
    <img
      class="b-manage-user-button"
      src="../../../assets/img/chat/manage-chat-user-button.svg"
      alt=""
    />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import userAvatar from '../../shared/userAvatar/UserAvatar.vue';

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
  setup(props) {
    const { t } = useI18n();

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

    return {
      isUserChatAuthor,
      isUserChatAdmin,
      userMainData,
      userMainDataProfile,
      userFullName,
      userChatRole,
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

    .b-user-chat-role {
      display: none;
    }

    .b-manage-user-button {
      display: block;
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
        @include inter(12px, 400, $--b-main-gray-color);
        line-height: 20px;

        &.online {
          @include inter(12px, 400, $--b-main-green-color);
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
