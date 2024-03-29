<template>
  <div class="b_modal_wrapper" @click.self="$emit('close-modal')">
    <div class="b_modal_modal-window" :style="windowStyle">
      <div
        v-if="isTitleShown"
        class="b_modal_window-title"
        :style="{ background: titleColor }"
      >
        <div class="b_modal_text">
          <slot name="title"></slot>
        </div>
        <div class="b_modal_icon">
          <slot name="title-icon"></slot>
        </div>
      </div>
      <div class="b_modal_modals-container">
        <slot name="change-phone-number"></slot>
        <slot name="change-login"></slot>
        <slot name="delete-account"></slot>
        <slot name="change-password"></slot>
        <slot name="version-modal"></slot>
        <slot name="edit-avatar"></slot>
        <slot name="default"></slot>
        <slot name="modal-filter"></slot>
        <slot name="verify-email"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { useWindowWidth } from '../../../utils/widthScreen';

export default {
  name: 'modal-window',
  props: {
    isTitleShown: {
      type: Boolean,
      default: true,
    },
    titleColor: {
      type: String,
      default: '#148783',
    },
    titleName: {
      type: String,
      default: 'Modal',
    },
    windowWidth: {
      type: Number,
      default: 400,
    },
    windowWidthMobile: {
      type: Number,
      default: 350,
    },
  },
  setup(props) {
    const { isMobileSmall } = useWindowWidth();

    const windowStyle = computed(() => {
      return {
        padding: props.isTitleShown ? '80px 20px 20px 20px' : '20px',
        width: `${
          isMobileSmall.value ? props.windowWidthMobile : props.windowWidth
        }px`,
      };
    });

    return {
      windowStyle,
    };
  },
};
</script>

<style lang="scss">
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-c10b0b: #c10b0b;
$color-d3f8f7: #d3f8f7;
.b_modal_wrapper {
  @include modal-wrapper;

  .b_modal_modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 400px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    background: $--b-main-white-color;
    padding: 80px 20px 20px 20px;

    .b_modal_window-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 6px 6px 0 0;
      color: $--b-main-white-color;
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    .input__wrapper {
      margin-bottom: 16px;
    }

    .current-number {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: $--b-main-black-color;
      margin-bottom: 12px;
    }

    .description-title-second {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: $--b-main-black-color;
      margin-bottom: 16px;
    }

    .description-text {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: $--b-main-gray-color;
      margin-bottom: 20px;
    }

    .sms-code-block {
      display: flex;
      margin-bottom: 24px;

      input {
        padding: 8px;
        width: 48px;
        height: 40px;
        background: $--b-main-white-color;
        border: 1px solid $color-dfdeed;
        border-radius: 6px;
        margin-right: 4px;
        outline: none;
        text-align: center;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        &[type='number'] {
          -moz-appearance: textfield;
        }
      }
    }

    .error-message {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: $--b-error-color;
    }

    .btns-block {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include mobile {
        flex-direction: column;
        gap: 8px;
      }

      .cancle-delete-acc {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: $--b-main-black-color;
        padding: 4px 0;
        cursor: pointer;
      }

      .delete-acc {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: $color-c10b0b;
        padding: 4px 0;
        cursor: pointer;
      }

      .cancle-btn {
        padding: 4px 0;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: $--b-main-green-color;
        cursor: pointer;
      }

      .save-btn {
        padding: 4px 16px;
        background: $color-d3f8f7;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: $--b-main-green-color;
        cursor: pointer;

        @include mobile {
          text-align: center;
          width: 100%;
          padding: 8px 16px;
        }
      }
    }
  }
}

.error-message {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: $--b-error-color;
}
</style>
