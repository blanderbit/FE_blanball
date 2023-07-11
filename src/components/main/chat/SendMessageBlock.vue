<template>
  <Transition name="chat-warning">
    <ReplyToChatMessage
      v-if="replyToMessageData"
      :replyToMessageData="replyToMessageData"
      @cancelReply="cancelReplyToChatMessage"
    />
  </Transition>

  <Form v-slot="data" :validation-schema="schema" @submit="disableSubmit">
    <div :class="['b-send-message-block', { disabled: disabled }]">
      <MainInput
        :title-width="0"
        :placeholder="inputPlaceholder"
        name="message"
        inputMode="text"
        :isDisabled="disabled"
        :height="48"
        :iconLeft="icons.sendSmile"
        :icon="icons.addFile"
        backgroundColor="#fff"
        v-model="messageValue"
        @leftIconClick="showOrCloseEmojiPicker"
      />
      <div class="b-send-voice-message b-send-button">
        <img src="../../../assets/img/chat/microphone.svg" alt="" />
      </div>
      <div class="b-send-message b-send-button" @click="sendMessage(data)">
        <img
          v-if="!disabled"
          src="../../../assets/img/chat/send-message-button.svg"
          alt=""
        />
        <img
          v-else
          src="../../../assets/img/chat/messages-disabled.svg"
          alt=""
        />
      </div>
    </div>
  </Form>
  <Transition name="emoji-picker">
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
import { ref, computed, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

import { Form } from '@system.it.flumx.com/vee-validate';

import MainInput from '../../shared/input/MainInput.vue';
import EmojiPicker from './EmojiPicker.vue';
import ReplyToChatMessage from './ReplyToChatMessage.vue';

import { useWindowWidth } from '../../../workers/window-size-worker/widthScreen';
import { ChatEventBus } from '../../../workers/event-bus-worker';
import { API } from '../../../workers/api-worker/api.worker';

import SendSmileIcon from '../../../assets/img/chat/send-smile-button.svg';
import AddFileIcon from '../../../assets/img/chat/add-file.svg';

import SCHEMAS from '../../../validators/schemas';

export default {
  components: {
    MainInput,
    EmojiPicker,
    ReplyToChatMessage,
    Form,
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
    }

    async function sendMessage(data) {
      if (messageValue.value) {
        const { valid } = await data.validate();
        if (!valid) {
          return false;
        }

        await API.ChatService.createChatMessage({
          chat_id: props.chatData.id,
          text: messageValue.value,
          reply_to_message_id: replyToMessageData.value?.id,
        });
        resetCreateMessageData();
      }
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

    function cancelReplyToChatMessage() {
      replyToMessageData.value = null;
    }

    ChatEventBus.on('replyToChatMessage', (messageData) => {
      replyToMessageData.value = messageData;
    });

    onBeforeUnmount(() => {
      ChatEventBus.off('replyToChatMessage');
    });

    return {
      messageValue,
      inputPlaceholder,
      isEmojiPickerVisible,
      emojiPickerX,
      emojiPickerY,
      replyToMessageData,
      icons,
      schema,
      onEmojiSelect,
      showEmojiPicker,
      closeEmojiPicker,
      cancelReplyToChatMessage,
      sendMessage,
      showOrCloseEmojiPicker,
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
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
  align-items: center;
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
