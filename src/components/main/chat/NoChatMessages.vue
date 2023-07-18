<template>
  <div class="b-no-chat-messages">
    <div class="b-no-chat-messages-content">
      <img src="@images/chat/no-chat-messages.svg" alt="" />
      <div class="b-no-chat-messages__title">
        {{ $t('chat.no_chat_messages.title') }}
      </div>
      <div class="b-no-chat-messages__subtitle">
        {{ $t('chat.no_chat_messages.main_text') }}
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.b-no-chat-messages {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 290px;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 8px;
  background: $--b-main-white-color;
  padding: 0px 16px 16px;

  .b-no-chat-messages__title {
    @include exo(18px, 700);
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 4px;
  }
  .b-no-chat-messages__subtitle {
    @include inter(14px, 400, $--b-main-gray-color);
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
