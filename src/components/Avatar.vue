<template>
  <div class="b-avatar-wrapper" :style="border ? avatarBorder : null">
    <object
      class="b-avatar"
      :class="[`b-avatar-${avatarType}`]"
      :data="avatarType === 'circle' ? link : null"
      onerror="this.style.display='none'"
      :style="{
        backgroundImage: `url(${link})`,
      }"
      v-if="link"
      @click.stop="$emit('clickByAvatar')"
      data="avatar.jpg"
      type="image/jpeg"
    ></object>
    <div
      class="b-avatar b-avatar-words d-flex justify-content-center align-items-center"
      :class="[`b-avatar-${avatarType}`]"
      @click.stop="$emit('clickByAvatar')"
      v-else
    >
      {{ shortFullName }}
    </div>
    <div
      v-if="online"
      :class="[`b-avatar-online__indicator-${avatarType}`]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    link: {
      type: String,
    },
    fullName: {
      type: String,
    },
    avatarType: {
      type: String,
      default: 'circle', // square
    },
    border: {
      type: Boolean,
      default: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['clickByAvatar'],
  computed: {
    shortFullName() {
      if (!this.fullName) return;
      return this.fullName
        .split(' ')
        .map((item) => item?.[0]?.toUpperCase())
        .join('');
    },
    avatarBorder() {
      return 'border: 2px dashed #dfdeed; border-radius: 100px; padding: 4px; display: flex; align-items: center;';
    },
  },
};
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
$color-1ccd62: #1ccd62;
$--b-main-white-color: $--b-main-white-color;

// SCSS variables for hex colors
$color-c8ebe7: #c8ebe7;

.b-avatar {
  position: relative;

  &-wrapper {
    position: relative;
  }

  &-small-circle {
    width: 36px;
    height: 36px;
    border-radius: 100px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border: 1.5px solid #EFEFF6;
  }

  &-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  &-big-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    z-index: 2;

    &.b-avatar-words {
      font-size: 54px;
    }
  }

  &-square {
    width: 100%;
    height: 164px;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  &-small-square {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    &.b-avatar-words {
      font-size: 15px;
    }
  }

  &-words {
    color: $--b-main-green-color;
    font-family: 'Exo 2';
    font-style: normal;
    font-size: 18px;
    font-weight: 700;
    background: $color-c8ebe7;
  }
}

.b-avatar-online__indicator {
  &-small-square {
    background: $color-1ccd62;
    border-radius: 6px;
    border: 1.5px solid $--b-main-white-color;
    width: 8px;
    height: 8px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &-circle {
    background: $color-1ccd62;
    border-radius: 6px;
    border: 1.5px solid $--b-main-white-color;
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0px;
    bottom: 2px;
  }
}
</style>
