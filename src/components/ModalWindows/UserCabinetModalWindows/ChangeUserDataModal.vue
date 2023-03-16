<template>
  <Transition>
    <div class="b-change-data__wrapper">
      <div class="b-change-data">
        <div class="b-change-data__title-block">
          <div class="b-change-data__title">
            {{ config.title }}
          </div>
          <div class="b-change-data__close" @click="closeModal(false)">
            &times;
          </div>
        </div>
        <div class="b-change-data__main-text">
          {{ config.description ? config.description : $t('modals.change_user_data.main-text') }}
        </div>
        <div class="b-change-data__btns-block">
          <div class="b-change-data__first-btn">
            <GreenBtn
              :text="config.button_1"
              :width="config.btn_with_1"
              :font-styles="{
                'font-size': '13px',
              }"
              @click-function="greenBtnFunction"
            />
          </div>
          <div class="b-change-data__second-btn">
            <WhiteBtn
              :text="config.button_2"
              :width="config.btn_with_2"
              :main-color="'#C5C5D3'"
              :font-styles="{
                'font-size': '13px',
              }"
              @click-function="$emit(config.right_btn_action, true)"
            />
          </div>
        </div>
        <div
          v-if="config.btn_cancel_changes"
          @click="$emit('declineChanges', true)"
          class="b-change-data__cancel-changes"
        >
          {{ $t('modals.change_user_data.cancel-changes') }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import GreenBtn from '../../GreenBtn.vue'
import WhiteBtn from '../../WhiteBtn.vue'

export default {
  name: 'ChangeUserDataModal',
  components: {
    GreenBtn,
    WhiteBtn,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['closeModal', 'showPreview', 'saveChanges', 'declineChanges'],
  setup(props, context) {
    function closeModal(isEditMode) {
      context.emit('closeModal', isEditMode)
    }
    function greenBtnFunction() {
      context.emit(props.config.left_btn_action, false)
    }

    return {
      closeModal,
      greenBtnFunction,
    }
  },
}
</script>

<style lang="scss" scoped>


// SCSS variables for hex colors
 $color-dfdeed: #dfdeed;
 $color-e2e2e9: #e2e2e9;


.b-change-data__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.514);
  z-index: 999;
  .b-change-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    max-width: 400px;
    min-width: 350px;
    background: $--b-main-black-color;
    border-radius: 6px;
    padding: 16px;
    font-family: 'Inter';
    font-style: normal;
    .b-change-data__title-block {
      display: flex;
      justify-content: space-between;
      .b-change-data__title {
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: $--b-main-white-color;
      }

      .b-change-data__close {
        line-height: 20px;
        color: $--b-main-white-color;
        font-size: 22px;
        cursor: pointer;
      }
    }
    .b-change-data__main-text {
      margin-top: 8px;
      margin-bottom: 14px;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: $color-dfdeed;
    }
    .b-change-data__btns-block {
      display: flex;
      .b-change-data__second-btn {
        margin-left: 8px;
      }
    }

    .b-change-data__cancel-changes {
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: $color-e2e2e9;
      margin-top: 14px;
      cursor: pointer;
    }
  }
}
</style>
