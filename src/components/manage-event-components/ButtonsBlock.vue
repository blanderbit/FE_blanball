<template>
  <div class="b-manage-tem-btns">
    <div class="b-manage-tem-btns__title">
      {{ $t('events.template-managing') }}
    </div>
    <div class="b-manage-tem-btns__btns-block">
      <div class="b-manage-tem-btns__white-btn-wrapper">

        <div class="b-manage-tem-white__btn">
          <WhiteBtn
            class="b-manage-tem-download-template__button"
            :text="$t('buttons.download-template')"
            :height="40"
            :width="200"
            :main-color="'$--b-main-black-color'"
            :is-border="false"
            :font-styles="{ 'font-weight': 400 }"
            :icon="icons.iconCloud"
            @click-function="$emit('cancelBtnClick')"
          />
          <!-- <Transition>
            <TabLabel
              :title="$t('profile.coming-soon-title')"
              :text="$t('profile.coming-soon-text')"
            />
          </Transition> -->
        </div>

        <div class="b-manage-tem-white__btn">
          <WhiteBtn
          class="b-manage-tem-save-template__button"
          :text="$t('buttons.download-template')"
          :height="40"
          :width="200"
          :main-color="'$--b-main-black-color'"
          :is-border="false"
          :font-styles="{ 'font-weight': 400 }"
          :icon="icons.iconSave"
          @click-function="$emit('cancelBtnClick')"
        />
          <Transition>
            <TabLabel
              :title="$t('profile.coming-soon-title')"
              :text="$t('profile.coming-soon-text')"
            />
          </Transition>
        </div>
      </div>
      <div class="b-manage-tem-btns__green-btn-wrapper"></div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import GreenBtn from '../../components/GreenBtn.vue';
import WhiteBtn from '../../components/WhiteBtn.vue';
import TabLabel from '../TabLabel.vue';

import Cloud from '../../assets/img/download-cloud.svg';
import Save from '../../assets/img/save-icon.svg';

export default {
  name: 'ButtonsBlock',
  components: {
    GreenBtn,
    WhiteBtn,
    TabLabel,
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
      };
    });

    return {
      icons,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f9f9fc: #f9f9fc;

.b-manage-tem-btns {
  @media (max-width: 1200px) {
    border-radius: 8px;
    padding: 10px 12px;
  }
  @include tabletAndMobile {
    background: #f0f0f4;
    border-radius: 0px;
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
    display: flex;
    opacity: 0.6;
    @media (max-width: 1200px) {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .b-manage-tem-btns__white-btn-wrapper {
      margin-bottom: 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      @media (max-width: 1200px) {
        margin-bottom: 0;
        flex-direction: row;
      }
      @include tabletAndMobile {
        flex-basis: 50%;
        flex-direction: row-reverse;
      }
    }
    .b-manage-tem-btns__green-btn-wrapper {
      @include tabletAndMobile {
        flex-basis: 50%;
        margin-right: 16px;
      }
      @media (max-width: 1200px) {
        margin-right: 16px;
      }
    }
  }
}
.b-manage-tem-download-template__button {
  border: 1px solid #dfdeed !important;
  border-radius: 6px;
}
.b-manage-tem-save-template__button {
  background-color: #575775;
  color: #ffffff;
}
.b-manage-tem-white__btn {
  position: relative;
}
</style>
