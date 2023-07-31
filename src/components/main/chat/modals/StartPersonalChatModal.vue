<template>
  <div class="b-start-pesonal-chat-modal__wrapper" @click.self="closeModal">
    <div class="b-start-pesonal-chat-modal__modal-window">
      <img src="@images/chat/start-pesonal-chat-modal-head-part.svg" alt="" />
      <div class="b-modal-title">
        {{ $t('chat.start_personal_chat_modal.title') }}
      </div>
      <div class="b-modal-main-text">
        {{ $t('chat.start_personal_chat_modal.main_text') }}
      </div>
      <GreenBtn
        :text="$t('chat.start_personal_chat_modal.button_text')"
        :height="40"
        :backgroundColor="'#575775'"
        @click-function="closeModal"
      />
    </div>
  </div>
</template>

<script>
import GreenBtn from '@/components/shared/button/GreenBtn.vue';
export default {
  components: {
    GreenBtn,
  },
  emits: ['closeModal'],
  setup(_, { emit }) {
    function closeModal() {
      emit('closeModal');
    }

    return {
      closeModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-start-pesonal-chat-modal__wrapper {
  @include modal-wrapper;
  .b-start-pesonal-chat-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 292px;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    background: $--b-main-white-color;
    box-shadow: 2px 2px 10px 0px rgba(56, 56, 251, 0.1);
    padding: 0px 16px 16px 16px;
    height: fit-content;

    .b-modal-title {
      @include exo(18px, 700);
      line-height: 24px;
      text-align: center;
    }
    .b-modal-main-text {
      @include exo(14px, 400, $--b-main-gray-color);
      line-height: 24px;
      text-align: center;
      margin-top: 8px;
      margin-bottom: 12px;
    }
  }
}
</style>
