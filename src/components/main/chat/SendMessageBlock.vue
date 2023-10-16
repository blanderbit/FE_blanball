<template>
  <Transition name="chat-warning">
    <ManageMessageWrapper
      v-if="isManageMessageWrapperVisible"
      :manageMessageData="manageMessageWrapperData"
      @closeManageMessage="closeManageMessageWrapper"
    />
  </Transition>

  <Form v-slot="data" :validation-schema="schema" @submit="disableFormSubmit">
    <div
      :class="['b-send-message-block', { disabled: disabled }]"
      @keyup.enter="sendMessage(data)"
    >
      <MainInput
        :title-width="0"
        :placeholder="inputPlaceholder"
        name="message"
        inputMode="text"
        :inputRightText="'(500)'"
        :isDisabled="disabled"
        :height="48"
        :iconLeft="icons.sendSmile"
        :icon="icons.addFile"
        backgroundColor="#fff"
        v-model="messageValue"
        @leftIconClick="showOrCloseEmojiPicker"
      />
      <div class="b-send-voice-message b-send-button">
        <img src="@images/chat/microphone.svg" alt="" />
      </div>
      <div class="b-send-message b-send-button" @click="sendMessage(data)">
        <img
          v-if="!disabled"
          src="@images/chat/send-message-button.svg"
          alt=""
        />
        <img v-else src="@images/chat/messages-disabled.svg" alt="" />
      </div>
    </div>
  </Form>
  <Transition :name="emojiPickerTransitionName">
    <EmojiPicker
      v-if="isEmojiPickerVisible"
      :positionY="emojiPickerY"
      :positionX="emojiPickerX"
      @closeEmojiPicker="closeEmojiPicker"
      @selectEmoji="onEmojiSelect"
    />
  </Transition>
</template>

<script>
import { Form } from '@system.it.flumx.com/vee-validate';

import MainInput from '@sharedComponents/input/MainInput.vue';
import EmojiPicker from './EmojiPicker.vue';
import ManageMessageWrapper from './ManageMessageWrapper.vue';

import { useWindowWidth } from '@workers/window-size-worker/widthScreen';
import { ChatEventBus } from '@workers/event-bus-worker';

import { disableFormSubmit } from '@utils/disableFormSubmit';

import SendSmileIcon from '@images/chat/send-smile-button.svg';
import AddFileIcon from '@images/chat/add-file.svg';

import { SCHEMAS } from '@validators/schemas';

import EditMessageButtonIcon from '@images/chat/message-wrapper-edit-icon.svg';

export default {
  components: {
    MainInput,
    EmojiPicker,
    Form,
    ManageMessageWrapper,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    chatData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isEmojiPickerVisible = ref(false);
    const messageValue = ref('');
    const { isMobileSmall } = useWindowWidth();
    const { t } = useI18n();
    const emojiPickerX = ref();
    const emojiPickerY = ref();
    const replyToMessageData = ref(null);
    const editChatMessageData = ref(null);

    const isManageMessageWrapperVisible = ref(false);
    const manageMessageWrapperData = ref({
      title: '',
      text: '',
      img: null,
    });

    const icons = computed(() => {
      return {
        sendSmile: SendSmileIcon,
        addFile: AddFileIcon,
      };
    });

    const schema = computed(() => {
      return SCHEMAS.chatMessage.schema;
    });

    const inputPlaceholder = computed(() => {
      if (isMobileSmall.value) {
        return t('chat.message');
      }
      return props.disabled
        ? t('chat.messages_not_avaliable')
        : t('chat.write_message');
    });

    const emojiPickerTransitionName = computed(() => {
      return !isMobileSmall.value ? 'emoji-picker' : null;
    });

    function closeEmojiPicker() {
      isEmojiPickerVisible.value = false;
    }

    function showEmojiPicker(e) {
      emojiPickerY.value = e.clientY;
      emojiPickerX.value = e.clientX;
      isEmojiPickerVisible.value = true;
    }

    function onEmojiSelect(emojiData) {
      messageValue.value += emojiData.i;
    }

    function resetCreateMessageData() {
      messageValue.value = '';
      closeEmojiPicker();
      closeManageMessageWrapper();
    }

    async function sendMessage(data) {
      if (messageValue.value) {
        const { valid } = await data.validate();
        if (!valid) {
          return false;
        }

        if (editChatMessageData.value) {
          await editMessage();
        } else {
          await createMessage();
        }
        resetCreateMessageData();
      }
    }

    async function createMessage() {
      API.ChatService.createChatMessage({
        chat_id: props.chatData.id,
        text: messageValue.value,
        reply_to_message_id: replyToMessageData.value?.id,
      }).then((replyToMessageData.value = null));
    }

    async function editMessage() {
      API.ChatService.editChatMessage({
        message_id: editChatMessageData.value.id,
        new_data: {
          text: messageValue.value,
        },
      }).then((editChatMessageData.value = null));
    }

    function showManageMessageWrapper() {
      isManageMessageWrapperVisible.value = true;
    }

    function closeManageMessageWrapper() {
      isManageMessageWrapperVisible.value = false;
    }

    function showOrCloseEmojiPicker(e) {
      if (props.disabled) {
        return;
      }

      if (isEmojiPickerVisible.value) {
        closeEmojiPicker();
      } else {
        showEmojiPicker(e);
      }
    }

    function resetManageMessageWrapperData() {
      manageMessageWrapperData.value = {
        title: '',
        text: '',
      };
    }

    function cancelReplyToChatMessage() {
      replyToMessageData.value = null;
      resetManageMessageWrapperData();
    }

    function cancelEditingMessage() {
      editChatMessageData.value = null;
      resetManageMessageWrapperData();
    }

    const onReplyToChatMessage = (messageData) => {
      if (editChatMessageData.value) {
        cancelEditingMessage();
      }

      replyToMessageData.value = messageData;
      manageMessageWrapperData.value = {
        title: `${messageData.sender.profile.last_name} ${messageData.sender.profile.name}`,
        text: messageData.text,
      };

      showManageMessageWrapper();
    };

    const onEditChatMessage = (messageData) => {
      if (replyToMessageData.value) {
        cancelReplyToChatMessage();
      }
      editChatMessageData.value = messageData;
      manageMessageWrapperData.value = {
        title: t('chat.message_editing'),
        text: messageData.text,
        img: EditMessageButtonIcon,
      };

      showManageMessageWrapper();
    };

    EventBusInstance.on('replyToChatMessage', onReplyToChatMessage);
    EventBusInstance.on('editChatMessage', onEditChatMessage);

    onBeforeUnmount(() => {
      EventBusInstance.off('replyToChatMessage', onReplyToChatMessage);
      EventBusInstance.off('editChatMessage', onEditChatMessage);
    });

    return {
      messageValue,
      inputPlaceholder,
      isEmojiPickerVisible,
      emojiPickerX,
      emojiPickerY,
      emojiPickerTransitionName,
      manageMessageWrapperData,
      isManageMessageWrapperVisible,
      icons,
      schema,
      onEmojiSelect,
      showEmojiPicker,
      closeEmojiPicker,
      cancelReplyToChatMessage,
      sendMessage,
      showOrCloseEmojiPicker,
      disableFormSubmit,
      closeManageMessageWrapper,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep {
  .b-input__icon,
  .b-input__icon-left {
    background: none !important;
  }
  .b-input__wrapper {
    border-radius: 100px !important;
  }

  input {
    @include inter(16px, 400, $--b-main-gray-color);
    line-height: 24px;
    padding-left: 8px !important;
  }
}

.b-send-message-block {
  display: flex;
  align-items: flex-start;
  height: fit-content;
  gap: 8px;
  transition: all 0.5s;
  margin-top: 4px;

  &.disabled {
    opacity: 0.6;
    .b-send-button {
      cursor: default !important;
    }
    :deep(.b-input__icon-left) {
      cursor: default !important;
    }
  }

  &.animated {
    transform: translateY(0);
  }

  .b-send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 8px 6px 8px;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 100px;
    cursor: pointer;
    margin-top: 5px;
  }

  .b-send-voice-message {
    background: $--b-main-white-color;
  }
  .b-send-message {
    background: $--b-main-green-color;
  }
}

.emoji-picker-enter-active,
.emoji-picker-leave-active {
  transition: all 0.5s;
}

.emoji-picker-enter-from,
.emoji-picker-leave-to {
  transform: translateY(100%);
}

.chat-warning-enter-active,
.chat-warning-leave-active {
  transition: opacity 0.4s ease;
}

.chat-warning-enter-from,
.chat-warning-leave-to {
  opacity: 0;
}
</style>
