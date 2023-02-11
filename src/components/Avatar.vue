<template>
  <object class="b-avatar"
    :class="[`b-avatar-${avatarType}`]"
    :data="avatarType === 'circle' ? link : null"
    onerror="this.style.display='none'"
    :style="{
      backgroundImage: `url(${link})`,
    }"
    v-if="link"
    @click.stop="$emit('clickByAvatar')" data="avatar.jpg" type="image/jpeg">
    <img src="default.jpg" />
  </object>
  <div
    class="b-avatar b-avatar-words d-flex justify-content-center align-items-center"
    :class="[`b-avatar-${avatarType}`]"
    @click.stop="$emit('clickByAvatar')"
    v-else
  >
    {{ shortFullName }}
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
  },
  emits: ['clickByAvatar'],
  computed: {
    shortFullName() {
      if (!this.fullName) return
      return this.fullName
        .split(' ')
        .map((item) => item?.[0]?.toUpperCase())
        .join('')
    },
  },
}
</script>

<style scoped lang="scss">
.b-avatar {
  &-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  &-square {
    width: 100%;
    height: 164px;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  &-words {
      color: #148783;
      min-width: 100%;
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      background: #C8EBE7;
  }

  img {
    height: 100%;
  }
}
</style>
