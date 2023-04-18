<template>
  <div>
    <div
      v-if="isMenuOpened"
      class="b_slide_menu_back"
      @click="toggleMenu"
    ></div>
    <div
      class="b_slide_menu_wrapper"
      :style="{
        right: isMenuOpened ? '-464px' : '0px',
      }"
    >
      <div
        v-if="isMenuOpened"
        class="b_slide_menu_sidebar-arrow"
        @click="toggleMenu"
      >
        <img :src="arrowPosition" alt="" />
      </div>
      <div class="b_slide_menu_main">
        <div class="b_slide_menu_top-block">
          <div class="b_slide_menu_logo">
            <slot name="logo"></slot>
          </div>
          <div class="b_slide_menu-top-side">
            <slot name="top-side"></slot>
          </div>

          <slot name="tabs" class="b_slide_menu_tabs">
          </slot>

          <ul>
            <slot name="main-content"></slot>
          </ul>
        </div>
        <div class="b_slide_menu_bottom-block">
          <slot name="bottom-block"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import sidebarArrowBack from '../../assets/img/sidebar-arrow-back.svg';
import sidebarArrow from '../../assets/img/sidebar-arrow.svg';

export default {
  components: {
    Notification,
  },
  props: {
    isMenuOpened: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(context, { emit }) {
    const arrowPosition = computed(() => {
      return context.isMenuOpened ? sidebarArrowBack : sidebarArrow;
    });

    function toggleMenu() {
      emit('close', !context.isMenuOpened);
    }

    return {
      arrowPosition,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-fcfcfc: #fcfcfc;
$color-dfdeed: #dfdeed;

.b_slide_menu_back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.b_slide_menu_wrapper {
  transition: all 0.7s ease;
  position: absolute;
  top: 0;
  right: -260px;
  height: 100%;
  .b_slide_menu_sidebar-arrow {
    position: absolute;
    width: 32px;
    height: 32px;
    right: -20px;
    top: 72px;
    background: $--b-main-white-color;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    display: flex;
    cursor: pointer;
    z-index: 3;
    img {
      margin: auto;
    }
  }
  .b_slide_menu_main {
    width: 464px;
    padding: 35px 20px 0 20px;
    position: absolute;
    top: 0;
    right: 0px;
    height: 100vh;
    background: $color-fcfcfc;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .b_slide_menu_top-block {
      height: calc(100% - 102px);
      .b_slide_menu_logo {
        padding-left: 8px;
      }
    }
    .b_slide_menu_bottom-block {
      padding: 16px 11px;
    }
  }
}
.b_slide_menu_tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $color-dfdeed;
  gap: 32px;
}
</style>
