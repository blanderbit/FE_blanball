<template>
  <div
    :class="[
      'c-user-card',
      { active: isActive },
      type,
      `c-scheduler-user-${userData.id}`,
    ]"
    @click="$emit('clickByUserToActivate', userData)"
  >
    <div class="c-user-content">
      <UserAvatar
        :link="userData.profile.avatar_url"
        :full-name="`${userData.profile.last_name} ${userData.profile.name}`"
        @clickByAvatar="$emit('clickByUserToActivate', userData)"
      />
      <div class="c-user__main-info">
        <div class="c-user__full-name">
          {{ userData.profile.last_name }}
          {{ userData.profile.name }}
        </div>
        <div class="c-user__gaming-position">
          <span>Сьогодні: 4 події</span>
        </div>
      </div>
    </div>
    <div v-if="isActive && type === 'friend'" class="c-invite-user-to-event">
      <GreenBtn
        class="c-invite-button"
        :height="32"
        :text="$t('player_page.invite')"
        @click-function="goToTheCreateEvent"
      />

      <div class="c-close-button">
        <img
          @click.stop="$emit('clickByUserToDiactivate')"
          src="../../../assets/img/default-arrow-top.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';
import GreenBtn from '../../shared/button/GreenBtn.vue';

export default {
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
    isActive: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'me',
      validator: (value) => {
        return ['me', 'friend'].includes(value);
      },
    },
  },
  emits: ['clickByUserToActivate', 'clickByUserToDiactivate'],
  components: {
    UserAvatar,
    GreenBtn,
  },
};
</script>

<style lang="scss" scoped>
$color-f0f0f4: #f0f0f4;
$color-8a8aa8: #8a8aa8;
.c-user-card {
  cursor: pointer;
  margin: 6px 0px;
  width: 240px;

  &.friend {
    box-shadow: 1px 2px 5px 1px rgba(56, 56, 251, 0.08);
    border-radius: 6px;
    padding: 8px 12px;

    &.active {
      background: $color-f0f0f4 !important;
      box-shadow: none;
    }
  }

  &.me {
    &.active {
      transition: all 0.3s;
      padding: 8px;
      background: $color-f0f0f4;
      border-left: 4px solid $--b-main-green-color;
      position: relative;
      border-radius: 6px;
    }
  }

  .c-user-content {
    display: flex;
    align-items: center;

    .c-user__main-info {
      margin-left: 12px;
      .c-user__full-name {
        @include inter(14px, 600);
        line-height: 20px;
      }

      .c-user__gaming-position {
        @include inter(12px, 500, $color-8a8aa8);
        line-height: 20px;
      }
    }
  }

  .c-invite-user-to-event {
    padding-bottom: 8px;
    @include beforeDesktop {
      display: none;
    }
    .c-invite-button {
      margin-top: 12px;
      margin-bottom: 16px;
    }
    .c-close-button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
