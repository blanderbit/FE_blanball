<template>
  <div class="b-avatar" v-if="link" @click.stop="$emit('clickByAvatar')">
    <img  :src="link"/>
  </div>
  <div class="b-avatar b-avatar-words d-flex justify-content-center align-items-center " @click.stop="$emit('clickByAvatar')" v-else>
    {{ shortFullName }}
  </div>
</template>

<script>
  export default {
    name: "Avatar",
    props: {
      link: {
        type: String
      },
      fullName: {
        type: String
      }
    },
    emits: ['clickByAvatar'],
    computed: {
      shortFullName() {
        if(!this.fullName) return;
        return this.fullName.split(' ').map(item => item?.[0]?.toUpperCase()).join('')
      }
    }
  }
</script>

<style scoped lang="scss">
  .b-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    &-words {
      border: 1px solid #262541;
      color: #262541;
    }

    img {
      height: 100%;
    }
  }
</style>