<template>
  <div
    :class="['c-user-card', { active: isActive }]"
    @click="$emit('clickByUser', userData.id)"
  >
    <div class="c-user">
      <UserAvatar
        :link="userData.profile.avatar_url"
        :full-name="`${userData.profile.last_name} ${userData.profile.name}`"
        @clickByAvatar="$emit('clickByUser', userData.id)"
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
  },
  emits: ['clickByUser'],
  components: {
    UserAvatar,
  },
};
</script>

<style lang="scss" scoped>
.c-user-card {
  display: flex;
  align-items: center;
  cursor: pointer;

  &.active {
    transition: all 0.3s;
    padding: 8px;
    background: #F0F0F4;
    border-left: 4px solid $--b-main-green-color;
    position: relative;
    border-radius: 6px;
  }

  .c-user__main-info {
    margin-left: 12px;
    .c-user__full-name {
      @include inter(14px, 600);
      line-height: 20px;
    }

    .c-user__gaming-position {
      @include inter(12px, 500, #8a8aa8);
      line-height: 20px;
    }
  }
}
</style>
