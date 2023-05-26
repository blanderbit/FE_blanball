<template>
  <div
    :class="[
      'c-user-card',
      { active: isActive },
      type,
      `c-scheduler-user-${userData.id}`,
    ]"
    @click="$emit('clickByUser', userData)"
  >
    <div class="c-user">
      <UserAvatar
        :link="userData.profile.avatar_url"
        :full-name="`${userData.profile.last_name} ${userData.profile.name}`"
        @clickByAvatar="$emit('clickByUser', userData)"
      />
    </div>
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
</template>

<script>
import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';

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
  emits: ['clickByUser'],
  components: {
    UserAvatar,
  },
};
</script>

<style lang="scss" scoped>
$color-f0f0f4: #f0f0f4;
$color-8a8aa8: #8a8aa8;
.c-user-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 6px 0px;
  width: 240px;

  &.friend {
    box-shadow: 1px 2px 5px 1px rgba(56, 56, 251, 0.08);
    border-radius: 6px;
    padding: 8px 12px;

    &.active {
      background: $color-f0f0f4 !important;
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
</style>
