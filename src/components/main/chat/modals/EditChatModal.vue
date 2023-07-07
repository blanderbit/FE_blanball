<template>
  <div class="b-edit-chat-modal__wrapper" @click.self="closeModal">
    <div class="b-edit-chat-modal__modal-window">
      <div class="b-modal-window__top-side">
        <div class="b-modal-window__title">
          {{ $t('chat.edit_chat_modal.manage_group') }}
        </div>
      </div>
      <div class="b-modal-window__main-side">
        <div class="b-select-photo__button">
          <img src="../../../../assets/img/chat/green-camera.svg" alt="" />
          <span>{{ $t('chat.edit_chat_modal.select_photo') }}</span>
        </div>
        <MainInput
          :outside-title="true"
          :title-width="0"
          :swipeTitle="false"
          :title="$t('chat.edit_chat_modal.name_of_group_chat')"
          inputMode="text"
          :height="48"
          :backgroundColor="'#fff'"
          name="search"
          v-model="chatData.name"
        />
        <MainInput
          :outside-title="true"
          :title-width="0"
          :swipeTitle="false"
          :isReadOnly="true"
          :icon="icons.copyChatLink"
          :title="$t('chat.edit_chat_modal.invitation_link')"
          inputMode="text"
          :height="48"
          :backgroundColor="'#fff'"
          name="search"
          v-model="chatData.link"
          @rightIconClick="copyChatLink"
        />
      </div>

      <!-- <ChatUsersList :chatData="chatData"/> -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';

import MainInput from '../../../shared/input/MainInput.vue';
import SearchBlockAll from '../../../SearchBlockAll.vue'
import ChatUsersList from '../ChatUsersList.vue';

import { copyToClipboard } from '../../../../utils/copyToClipBoard';

import CopyChatLinkIcon from '../../../../assets/img/chat/infinite.svg';

export default {
  components: {
    MainInput,
    SearchBlockAll,
    ChatUsersList,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const toast = useToast();
    const { t } = useI18n();
    const icons = computed(() => {
      return {
        copyChatLink: CopyChatLinkIcon,
      };
    });

    function closeModal() {
      emit('closeModal');
    }

    function copyChatLink() {
      copyToClipboard(props.chatData.link);
      toast.success(t('chat.toasts.chat_link_copieded_success'));
    }

    return {
      icons,
      closeModal,
      copyChatLink,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-edit-chat-modal__wrapper {
  @include modal-wrapper;
  .b-edit-chat-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    gap: 16px 16px;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 6px;
    background: $--b-main-white-color;
    width: 400px;
    height: 600px;
    box-shadow: 2px 2px 10px 0px rgba(56, 56, 251, 0.1);

    .b-modal-window__top-side {
      .b-modal-window__title {
        @include exo(22px, 700, $--b-main-black-color);
        line-height: 32px;
      }
    }
    .b-modal-window__main-side {
      display: flex;
      flex-direction: column;
      gap: 16px 16px;
      .b-select-photo__button {
        border-radius: 6px;
        border: 1px dashed $--b-main-green-color;
        background: #ecfcfb;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        cursor: pointer;
        gap: 8px;

        span {
          @include inter(14px, 500, $--b-main-green-color);
          line-height: 20px;
        }
      }
    }
  }
}
</style>
