<template>
  <div class="b-kicked-from-chat-message">
    <img class="b-warning-icon" src="../../../assets/img/warning.svg" alt="" />
    <span class="b-kicked-from-chat-text">{{
      $t('chat.you_were_kicked_from_the_chat')
    }}</span>
    <span class="b-kicked-from-chat-text-mobile">{{
      $t('chat.you_were_kicked_from_the_chat_small')
    }}</span>
    <img class="b-close-button" src="../../../assets/img/cross.svg" alt="" />
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
.b-kicked-from-chat-message {
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

  .b-kicked-from-chat-text {
    @include mobile {
      display: none;
    }
    &-mobile {
      display: none;
      @include mobile {
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
