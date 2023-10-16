<template>
  <div class="b-chat-service-message">
    <span>{{ serviceMessageText }}</span>
  </div>
</template>

<script>
 


import { detectServiceChatMessageTextByType } from './utils/detectServiceChatMessageTextByType';

export default {
  props: {
    messageData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const serviceMessageText = computed(() => {
      return detectServiceChatMessageTextByType(props.messageData, t);
    });

    return {
      serviceMessageText,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-chat-service-message {
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
