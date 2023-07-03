<template>
  <div class="b-user-joined-to-the-chat-message">
    <span>{{
      $t('chat.user_joined_to_chat', { userFullName: userFullName })
    }}</span>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const userFullName = computed(() => {
      const { userData } = props;
      return `${userData.profile.last_name} ${userData.profile.name}`;
    });

    return {
      userFullName,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-user-joined-to-the-chat-message {
  border-radius: 8px;
  background: var(--bg-dark-blur, rgba(9, 9, 16, 0.8));
  padding: 4px 12px;
  backdrop-filter: blur(1px);
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  margin-top: 8px;

  span {
    @include inter(14px, 400, $--b-main-white-color);
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
