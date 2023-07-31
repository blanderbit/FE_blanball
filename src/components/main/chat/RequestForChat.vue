<template>
  <div class="b-request-for-chat">
    <div class="b-text">
      {{ $t('chat.accept_send_messages', { chatName: chatData.name }) }}
    </div>
    <div class="b-buttons-block">
      <GreenBtn
        :width="130"
        :height="32"
        backgroundColor="#FFE8E8"
        :font-styles="{
          'font-weight': '400',
          color: '#F32929',
        }"
        :text="$t('buttons.forbid')"
      />
      <GreenBtn
        :width="130"
        :height="32"
        backgroundColor="#ECFCFB"
        :font-styles="{
          'font-weight': '400',
          color: '#148783',
        }"
        :text="$t('buttons.alow')"
      />
    </div>
  </div>
</template>

<script>
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
export default {
  components: {
    GreenBtn,
  },
  props: {
    chatData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.b-request-for-chat {
  background: $--b-main-black-color;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  width: max-content;
  height: fit-content;
  bottom: 16px;
  gap: 12px;
  margin: 0 auto;
  width: fit-content;

  @media (max-width: 1300px) {
    justify-content: space-between;
    flex-direction: column;
  }

  .b-text {
    @include inter(14px, 400, $--b-main-white-color);
    line-height: 20px;
    text-align: center;
    word-break: break-word;
  }
  .b-buttons-block {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
