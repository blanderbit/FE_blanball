<template>
  <div class="b-edit-chat-modal__wrapper" @click.self="closeModal">
    <Form v-slot="data" :validation-schema="schema" @submit="disableFormSubmit">
      <div
        class="b-edit-chat-modal__modal-window"
        ref="ALL_MODAL_CONTENT_BLOCK"
      >
        <div class="b-modal-window__top-side">
          <img
            class="b-go-back-button"
            src="@images/chat/edit-chat-modal-back-arrow.svg"
            alt=""
            @click="closeModal"
          />
          <div class="b-modal-window__title">
            {{ $t('chat.edit_chat_modal.manage_group') }}
          </div>
          <img
            class="b-close-modal-button"
            src="@images/cross.svg"
            alt=""
            @click="closeModal"
          />
        </div>
        <div class="b-modal-window__main-side" ref="MODAL_MAIN_SIDE_BLOCK">
          <div class="b-select-photo__button">
            <img src="@images/chat/green-camera.svg" alt="" />
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
            name="name"
            v-model="newChatData.name"
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
            name="link"
            v-model="newChatData.link"
            @rightIconClick="copyChatLink"
          />
        </div>
        <div class="b-edit-chat-modal-users-list" :style="usersListBlockStyle">
          <ChatUsersList :chatData="chatData" />
        </div>
        <div class="b-modal-window__bottom-side" ref="MODAL_BOTTOM_SIDE_BLOCK">
          <WhiteBtn
            :text="cancelButtonConfig.text"
            :width="cancelButtonConfig.width"
            :main-color="'#575775'"
            :isBorder="false"
            @click-function="closeModal"
          />
          <GreenBtn
            :text="$t('buttons.save-changes')"
            :width="150"
            :height="38"
            @click-function="updateChat(data)"
          />
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useI18n } from 'vue-i18n';
import { useElementSize } from '@vueuse/core';

import { Form } from '@system.it.flumx.com/vee-validate';

import MainInput from '@sharedComponents/input/MainInput.vue';
import SearchBlockAll from '@mainComponents/header/SearchBlockAll.vue';
import ChatUsersList from '@mainComponents/chat/ChatUsersList.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import WhiteBtn from '@sharedComponents/button/WhiteBtn.vue';

import { copyToClipboard } from '@utils/copyToClipBoard';
import { useWindowWidth } from '@workers/window-size-worker/widthScreen';
import { disableFormSubmit } from '@utils/disableFormSubmit';

import CopyChatLinkIcon from '@images/chat/infinite.svg';
import ChatNameIcon from '@images/address-icon.svg';

import { SCHEMAS } from '@/validators/schemas';

export default {
  components: {
    MainInput,
    SearchBlockAll,
    ChatUsersList,
    GreenBtn,
    WhiteBtn,
    Form,
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
    const ALL_MODAL_CONTENT_BLOCK = ref();

    const newChatData = ref({
      name: props.chatData.name,
      link: props.chatData.link,
    });

    const { height: MODAL_MAIN_SIDE_BLOCK_HEIGHT } = useElementSize(
      MODAL_MAIN_SIDE_BLOCK
    );
    const { height: MODAL_BOTTOM_SIDE_BLOCK_HEIGHT } = useElementSize(
      MODAL_BOTTOM_SIDE_BLOCK
    );
    const { height: MODAL_HEIGHT_VALUE } = useElementSize(
      ALL_MODAL_CONTENT_BLOCK
    );
    const { isMobileSmall } = useWindowWidth();

    const toast = useToast();
    const { t } = useI18n();

    const schema = computed(() => {
      return SCHEMAS.editChat.schema;
    });

    const icons = computed(() => {
      return {
        copyChatLink: CopyChatLinkIcon,
        chatName: ChatNameIcon,
      };
    });

    const cancelButtonConfig = computed(() => {
      return {
        text: isMobileSmall.value
          ? 'Скасувати редагування'
          : t('buttons.cancel'),
        width: isMobileSmall.value ? 200 : 80,
      };
    });

    const usersListBlockStyle = computed(() => {
      return {
        height: `${
          MODAL_HEIGHT_VALUE.value -
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

    async function updateChat(data) {
      console.log(data);
      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }

      emit('updateChat', data.values);
      closeModal({ force: true });
    }

    return {
      MODAL_MAIN_SIDE_BLOCK,
      MODAL_BOTTOM_SIDE_BLOCK,
      ALL_MODAL_CONTENT_BLOCK,
      usersListBlockStyle,
      cancelButtonConfig,
      newChatData,
      icons,
      schema,
      closeModal,
      copyChatLink,
      updateChat,
      disableFormSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-edit-chat-modal__wrapper {
  @include mobile {
    @include modal-wrapper($z-index: 500);
  }

  @include afterMobile {
    &::after {
      content: '';
      @include modal-wrapper($z-index: 500);
    }
  }
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
    z-index: 550;

    @include mobile {
      width: 100%;
      height: 100%;
      border-radius: 0px;
      box-shadow: none;
    }

    .b-modal-window__top-side {
      .b-go-back-button {
        display: none;
        @include mobile {
          display: block;
          cursor: pointer;
        }
      }
      @include mobile {
        display: flex;
        gap: 16px;
        background: var(--bg-primary, #fff);
        box-shadow: 2px 2px 10px 0px rgba(56, 56, 251, 0.1);
        margin-top: -20px;
        margin-left: -16px;
        width: calc(100% + 32px);
        padding: 20px 16px;
      }
      .b-modal-window__title {
        @include exo(22px, 700);
        line-height: 32px;

        @include mobile {
          @include exo(18px, 700);
          line-height: 24px;
        }
      }

      .b-close-modal-button {
        position: absolute;
        width: 12px;
        height: 12px;
        right: 20px;
        top: 20px;
        cursor: pointer;

        @include mobile {
          display: none;
        }
      }
    }

    .b-edit-chat-modal-users-list {
      overflow: scroll;
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
    .b-modal-window__bottom-side {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @include mobile {
        flex-direction: column-reverse;
        border-radius: 12px 12px 0px 0px;
        border-top: 1.5px solid #f0f0f4;
        background: rgba(255, 255, 255, 0.8);
        padding: 16px;
        margin-left: -16px;
        width: calc(100% + 32px);

        :deep(.b-green-btn) {
          width: 100% !important;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
