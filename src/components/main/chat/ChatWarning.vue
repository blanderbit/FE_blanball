<template>
  <div class="b-chat-warning">
    <img class="b-warning-icon" src="@images/warning.svg" alt="" />
    <span class="b-warning-text">{{
      $t('chat.you_were_kicked_from_the_chat')
    }}</span>
    <span class="b-warning-text-mobile">{{
      $t('chat.you_were_kicked_from_the_chat_small')
    }}</span>
    <img
      class="b-close-button"
      src="@images/cross.svg"
      alt=""
      @click="$emit('close')"
    />
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.b-chat-warning {
  background: #fff4ec;
  border: 1px solid #f6803c;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  height: fit-content;
  margin-bottom: 16px;

  .b-warning-icon {
    height: fit-content;
  }
  .b-close-button {
    cursor: pointer;
  }

  .b-warning-text {
    @include mobileDevice {
      display: none;
    }
    &-mobile {
      display: none;
      @include mobileDevice {
        display: block;
      }
    }
  }

  span {
    @include inter(14px, 400, $--b-main-black-color);
    line-height: 20px;
    margin: 0px 8px;
  }
}
</style>
