<template>
  <div class="b-edit-chat-modal__wrapper" @click.self="closeModal">
    <div class="b-edit-chat-modal__modal-window">
      <div class="b-modal-window__top-side">
        <div class="b-modal-window__title">
          {{ $t('chat.edit_chat_modal.manage_group') }}
        </div>
        <img
          class="b-close-modal-button"
          src="../../../../assets/img/cross.svg"
          alt=""
          @click="closeModal"
        />
      </div>
      <div class="b-modal-window__main-side" ref="MODAL_MAIN_SIDE_BLOCK">
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
          :icon="icons.chatName"
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
      <div class="b-edit-chat-modal-users-list" :style="usersListBlockStyle">
        <ChatUsersList :chatData="chatData" />
      </div>
      <div class="b-modal-window__bottom-side" ref="MODAL_BOTTOM_SIDE_BLOCK">
        <WhiteBtn
          :text="$t('buttons.cancel')"
          :width="80"
          :main-color="'#575775'"
          :isBorder="false"
          @click-function="closeModal"
        />
        <GreenBtn
          :text="$t('buttons.save-changes')"
          :width="150"
          :height="38"
          @click-function="updateChat"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import { useElementSize } from '@vueuse/core';

import MainInput from '../../../shared/input/MainInput.vue';
import SearchBlockAll from '../../../SearchBlockAll.vue';
import ChatUsersList from '../ChatUsersList.vue';
import GreenBtn from '../../../shared/button/GreenBtn.vue';
import WhiteBtn from '../../../shared/button/WhiteBtn.vue';

import { copyToClipboard } from '../../../../utils/copyToClipBoard';

import CopyChatLinkIcon from '../../../../assets/img/chat/infinite.svg';
import ChatNameIcon from '../../../../assets/img/address-icon.svg';

export default {
  components: {
    MainInput,
    SearchBlockAll,
    ChatUsersList,
    GreenBtn,
    WhiteBtn,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  emits: ['closeModal', 'updateChat'],
  setup(props, { emit }) {
    const MODAL_BOTTOM_SIDE_BLOCK = ref();
    const MODAL_MAIN_SIDE_BLOCK = ref();
    const MODAL_HEIGHT_VALUE = 600;

    const { height: MODAL_MAIN_SIDE_BLOCK_HEIGHT } = useElementSize(
      MODAL_MAIN_SIDE_BLOCK
    );
    const { height: MODAL_BOTTOM_SIDE_BLOCK_HEIGHT } = useElementSize(
      MODAL_BOTTOM_SIDE_BLOCK
    );

    const toast = useToast();
    const { t } = useI18n();

    const icons = computed(() => {
      return {
        copyChatLink: CopyChatLinkIcon,
        chatName: ChatNameIcon,
      };
    });

    const usersListBlockStyle = computed(() => {
      return {
        height: `${
          MODAL_HEIGHT_VALUE -
          MODAL_MAIN_SIDE_BLOCK_HEIGHT.value -
          MODAL_BOTTOM_SIDE_BLOCK_HEIGHT.value
        }px`,
      };
    });
    function closeModal({ force }) {
      emit('closeModal', { force: force });
    }

    function copyChatLink() {
      copyToClipboard(props.chatData.link);
      toast.success(t('chat.toasts.chat_link_copieded_success'));
    }

    function updateChat() {
      emit('updateChat');
      closeModal({ force: true });
    }

    return {
      MODAL_MAIN_SIDE_BLOCK,
      MODAL_BOTTOM_SIDE_BLOCK,
      usersListBlockStyle,
      icons,
      closeModal,
      copyChatLink,
      updateChat,
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

      .b-close-modal-button {
        position: absolute;
        width: 12px;
        height: 12px;
        right: 20px;
        top: 20px;
        cursor: pointer;
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

      // .b-edit-chat-modal-users-list {
      //   overflow: scroll;
      //   height: 200px;
      // }
    }
    .b-modal-window__bottom-side {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
