<template>
  <div v-if="!isFriendsVisible" class="c-friends-block">
    <div class="c-user-pic-wrapper">
      <div v-for="(user, idx) in minUsers" :key="idx" class="c-user-pic">
        <img :src="user.img" alt="" />
      </div>
    </div>
    <div
      v-if="usersNumber > 4"
      class="c-friends-number"
      @click="friendsBlockSwitcher"
    >
      <span>+{{ usersNumber - 4 }} друзів</span>
      <img src="../../../assets/img/scheduler/dbl-arrow.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopLineFriends',
  props: {
    isFriendsVisible: {
      type: Boolean,
      default: true,
    },
    minUsers: {
      type: Array,
      default: () => [],
    },
    usersNumber: {
      type: Number,
      default: 0,
    },
    friendsBlockSwitcher: {
      type: Function,
    },
  },
};
</script>

<style scoped lang="scss">
$color-dfdeed: #dfdeed;
.c-friends-block {
  display: flex;
  align-items: center;
  .c-user-pic-wrapper {
    margin-right: 12px;
    display: flex;
    align-items: center;
    .c-user-pic {
      border-radius: 50%;
      border: 2px solid #dfdeed;
      &:not(:first-child) {
        margin-left: -10px;
      }
      img {
        width: 32px;
        display: block;
      }
    }
  }
  .c-friends-number {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: $--b-main-gray-color;
    cursor: pointer;

    span {
      padding-bottom: 2px;
      border-bottom: 1px dashed $--b-main-gray-color;
      margin-right: 18px;
    }
  }
  .c-open-sidebar-with-friends {
    cursor: pointer;
  }
}
</style>
