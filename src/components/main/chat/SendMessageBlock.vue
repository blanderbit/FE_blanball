<template>
  <div :class="['b-send-message-block', { disabled: disabled }]">
    <MainInput
      :title-width="0"
      :placeholder="inputPlaceholder"
      inputMode="text"
      :isDisabled="disabled"
      :height="48"
      :iconLeft="icons.sendSmile"
      :icon="!disabled ? icons.addFile : icons.messagesDisabled"
      backgroundColor="#fff"
      v-model="messageValue"
      @leftIconClick="showEmojiPicker"
    />
    <div class="b-send-voice-message b-send-button">
      <img src="../../../assets/img/chat/microphone.svg" alt="" />
    </div>
    <div class="b-send-message b-send-button">
      <img src="../../../assets/img/chat/send-message-button.svg" alt="" />
    </div>
  </div>
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
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import MainInput from '../../shared/input/MainInput.vue';
import EmojiPicker from './EmojiPicker.vue';

import { useWindowWidth } from '../../../utils/widthScreen';

import SendSmileIcon from '../../../assets/img/chat/send-smile-button.svg';
import AddFileIcon from '../../../assets/img/chat/add-file.svg';
import MessagesDisabledIcon from '../../../assets/img/chat/messages-disabled.svg';

export default {
  components: {
    MainInput,
    EmojiPicker,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isEmojiPickerVisible = ref(false);
    const messageValue = ref('');
    const { isMobileSmall } = useWindowWidth();
    const { t } = useI18n();
    const emojiPickerX = ref();
    const emojiPickerY = ref();

    const icons = computed(() => {
      return {
        sendSmile: SendSmileIcon,
        addFile: AddFileIcon,
        messagesDisabled: MessagesDisabledIcon,
      };
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

    return {
      messageValue,
      inputPlaceholder,
      isEmojiPickerVisible,
      emojiPickerX,
      emojiPickerY,
      icons,
      onEmojiSelect,
      showEmojiPicker,
      closeEmojiPicker,
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

  &.disabled {
    opacity: 0.6;
    .b-send-button {
      cursor: default !important;
    }
    :deep(.b-input__icon-left) {
      cursor: default !important;
    }
  }

  .b-send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
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
</style>
