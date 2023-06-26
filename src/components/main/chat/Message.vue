<template>
  <div :class="['b-message', messageType]">
    <div class="b-message-text">
      {{ messageData.text }}
    </div>

    <div class="b-like-message-button">
      <img src="../../../assets/img/chat/like-button.svg" alt="" />
    </div>
    <div class="b-message-time">{{ messageTime }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { computed } from 'vue';

const MESSAGE_TYPES = {
  MY: 'my',
  ANOTHER: 'another',
};

export default {
  props: {
    messageData: {
      type: Object,
      default: () => {},
    },
    messageType: {
      type: String,
      default: MESSAGE_TYPES.MY,
      validator: (value) => {
        return [MESSAGE_TYPES.MY, MESSAGE_TYPES.ANOTHER].includes(value);
      },
    },
  },
  setup(props) {
    const messageTime = computed(() => {
      return dayjs(props.time_created).format('HH:mm');
    });

    return {
      messageTime,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-message {
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  padding: 12px;
  width: fit-content;
  height: fit-content;
  position: relative;

  .b-like-message-button {
    background: #fcfcfc;
    padding: 3px 8px 5px;
    border: 1px solid #dfdeed;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    position: absolute;
    left: 0;
    bottom: -5px;
  }

  .b-message-time {
    text-align: right;
  }

  .b-message-text {
    margin-bottom: 8px;
  }

  &.my {
    border-radius: 12px 12px 0px 12px;
    background: $--b-main-white-color;

    .b-message-text {
      @include inter(16px, 400, $--b-main-black-color);
      line-height: 24px;
    }

    .b-message-time {
      @include inter(14px, 400, $--b-main-gray-color);
      line-height: 20px;
    }

    .b-like-message-button {

    }
  }
  &.another {
    border-radius: 12px 12px 12px 0px;
    background: $--b-main-green-color;

    .b-message-text {
      @include inter(16px, 400, $--b-main-white-color);
      line-height: 24px;
    }

    .b-message-time {
      @include inter(14px, 400, $--b-main-white-color);
      line-height: 20px;
    }
  }
}
</style>
