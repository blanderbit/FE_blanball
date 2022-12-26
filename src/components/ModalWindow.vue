<template>
  <div>
    <div
      class="b_modal_wrapper"
      @click.self="$emit('close-modal')"
    >
      <div 
        class="b_modal_modal-window"
        :style="windowStyle"
      >
        <div
          v-if="isTitleShown"
          class="b_modal_window-title" 
          :style="{'background': titleColor}"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'modal-window',
  props: {
    isTitleShown: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: '#148783'
    },
    titleName: {
      type: String,
      default: 'Modal'
    },
    windowWidth: {
      type: Number,
      default: 400
    }
  },
  setup(props) {
    const windowStyle = computed(() => {
      return {
        'padding': props.isTitleShown ? '80px 20px 20px 20px' : '20px',
        'width': `${props.windowWidth}px`
      }
    })
    return {
      windowStyle
    }
  }
}
</script>

<style lang="scss">
.b_modal_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.514);
  z-index: 999;
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
    background: #fff;
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
      color: #fff;
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
    .inut-wrapper {
      width: 360px;
      height: 40px;
      margin-bottom: 16px;
    }
    .current-number {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #262541;
      margin-bottom: 12px;
    }
    .description-title-second {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #262541;
      margin-bottom: 16px;
    }
    .description-text {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #575775;
      margin-bottom: 20px;
    }
    .sms-code-block {
      display: flex;
      margin-bottom: 24px;
      input {
        padding: 8px;
        width: 48px;
        height: 40px;
        background: #FFFFFF;
        border: 1px solid #DFDEED;
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
        &[type=number] {
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
      color: #F32929;
    }
    .btns-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cancle-delete-acc {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #262541;
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
        color: #C10B0B;
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
        color: #148783;
        cursor: pointer;
      }
      .save-btn {
        padding: 4px 16px;
        background: #D3F8F7;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #148783;
        cursor: pointer;
      }
    }
  }
}
</style>