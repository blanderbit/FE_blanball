<template>
  <div class="c-not-selected-friend-card">
    <img src="@images/chat/not-selected-chat-icon.svg" alt="" />
    <div class="c-title">{{ $t('chat.not_selected_chat_card.title') }}</div>
    <div class="c-subtitle">
      {{ $t('chat.not_selected_chat_card.description') }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-not-selected-friend-card {
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  padding: 0px 16px 16px;
  width: 292px;
  height: 184px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  justify-content: space-between;
  margin: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .c-title {
    @include exo(18px, 700);
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: -10px
  }
  .c-subtitle {
    @include inter(14px, 400, $--b-main-gray-color);
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
