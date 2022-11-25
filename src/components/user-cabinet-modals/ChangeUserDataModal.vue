<template>
  <Transition>
    <div 
      class="b-change-data__wrapper" 
      @click="closeModal"
    >
      <div class="b-change-data">
        <div class="b-change-data__title-block">
          <div class="b-change-data__title">
            {{config.title}}
          </div>
          <div 
            class="b-change-data__close"
            @click="closeModal"
          >
            &times;
          </div>
        </div>
        <div class="b-change-data__main-text">
          Бажаєте подивитись як виглядатиме ваш профіль для інших користувачів?
        </div>
        <div class="b-change-data__btns-block">
          <div class="b-change-data__first-btn">
            <GreenBtn
              :text="config.button_1"
              :width="config.btn_with_1"
              :background-color="'#575775'"
              :font-styles="{
                'font-size': '13px'
              }"
            />
          </div>
          <div class="b-change-data__second-btn">
            <WhiteBtn 
              :text="config.button_2"
              :width="config.btn_with_2"
              :main-color="'#C5C5D3'"
              :font-styles="{
                'font-size': '13px'
              }"
              @click-function="$emit('saveChanges')"
            />
          </div>
        </div>
        <div class="b-change-data__cancel-changes">
          Скасувати зміни
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import GreenBtn from '../GreenBtn.vue'
import WhiteBtn from '../WhiteBtn.vue'

export default {
  name: 'ChangeUserDataModal',
  components: {
    GreenBtn,
    WhiteBtn
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['closeModal', 'saveChanges'],
  setup(props, context) {
    function closeModal() {
      context.emit('closeModal', 'change_data')
    }

    return {
      closeModal
    }
  }
}
</script>

<style lang="scss" scoped>
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
    width: 361px;
    background: #262541;
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
        color: #FFFFFF;
      }

      .b-change-data__close { 
        line-height: 20px;
        color: #FFFFFF;
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
      color: #DFDEED;
    }
    .b-change-data__btns-block { 
      display: flex;
      justify-content: flex-end;
      .b-change-data__second-btn {
        margin-left: 8px;
      }
    }

    .b-change-data__cancel-changes { 
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      color: #E2E2E9;
      margin-top: 14px;
      cursor: pointer;
    }
  }
}
</style>