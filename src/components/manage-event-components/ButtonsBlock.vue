<template>
  <div class="b-manage-tem-btns">
    <div class="b-manage-tem-btns__title">
      {{ $t('events.template-managing') }}
    </div>
    <div class="b-manage-tem-btns__btns-block">
      <div class="b-manage-tem-btns__white-btn-wrapper">
        <WhiteBtn
          :text="$t('buttons.download-template')"
          :width="whiteBtnWidth"
          :height="40"
          :main-color="'$--b-main-black-color'"
          :is-border="false"
          :font-styles="{ 'font-weight': 400 }"
          :icon="icons.iconCloud"
          @click-function="$emit('cancelBtnClick')"
        />
      </div>
      <div class="b-manage-tem-btns__green-btn-wrapper">
        <GreenBtn
          :text="saveBtnText"
          :icon="icons.iconSave"
          :width="greenBtnWidth"
          :height="greenBtnHeight"
          :background-color="'$--b-main-gray-color'"
          :font-styles="{ 'font-weight': 400 }"
          @click-function="$emit('saveBtnClick')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

import GreenBtn from '../../components/GreenBtn.vue'
import WhiteBtn from '../../components/WhiteBtn.vue'

import Cloud from '../../assets/img/download-cloud.svg'
import Save from '../../assets/img/save-icon.svg'

export default {
  name: 'ButtonsBlock',
  components: {
    GreenBtn,
    WhiteBtn,
  },
  props: {
    saveBtnText: {
      type: String,
      default: '',
    },
    whiteBtnWidth: {
      type: Number,
      default: null,
    },
    greenBtnWidth: {
      type: Number,
      default: null,
    },
    greenBtnHeight: {
      type: Number,
      default: 40,
    },
  },
  emits: ['saveBtnClick', 'cancelBtnClick'],
  setup() {
    const icons = computed(() => {
      return {
        iconCloud: Cloud,
        iconSave: Save,
      }
    })

    return {
      icons,
    }
  },
}
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
 $color-f9f9fc: #f9f9fc;


.b-manage-tem-btns {
  @media (max-width: 1200px) {
    background: $color-f9f9fc;
    border-radius: 8px;
    padding: 10px 12px;
  }
  .b-manage-tem-btns__title {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: $--b-main-black-color;
    margin-top: 24px;
    @media (max-width: 1200px) {
      display: none;
    }
  }
  .b-manage-tem-btns__btns-block {
    margin-top: 20px;
    @media (max-width: 1200px) {
      margin-top: 0;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
    }
    .b-manage-tem-btns__white-btn-wrapper {
      margin-bottom: 12px;
      @media (max-width: 1200px) {
        margin-bottom: 0;
      }
      @media (max-width: 768px) {
        flex-basis: 50%;
      }
    }
    .b-manage-tem-btns__green-btn-wrapper {
      @media (max-width: 768px) {
        flex-basis: 50%;
        margin-right: 16px;
      }
      @media (max-width: 1200px) {
        margin-right: 16px;
      }
    }
  }
}
</style>
