<template>
  <div>
    <div
      v-if="isMenuOpened"
      class="b_slide_menu_back"
      @click="toggleMenu"
    >
    </div>
    <div
      class="b_slide_menu_wrapper"
      :style="sliderStyle"
    >
      <div class="b_slide_menu_sidebar-arrow" @click="toggleMenu">
          <img :src="arrowPosition" alt="">
      </div>
      <div class="b_slide_menu_main">
        <div class="b_slide_menu_top-block">
          <div class="b_slide_menu_logo">
              <img src="../assets/img/logo-sidebar.svg" alt="">
          </div>
          <div class="b_slide_menu_items">
              <div class="b_slide_menu_title">
                {{$t('slide_menu.notifications')}}
              </div>
              <ul>
                  <li v-for="item of 7" :key="item">
                      <img src="../assets/img/Settings.svg" alt="">
                      {{$t('slide_menu.link')}}
                  </li>
              </ul>
          </div>
        </div>
        <div class="b_slide_menu_bottom-block">
          <div class="b_slide_menu_top-line">
            <div class="b_slide_menu_left-part">
                <div class="b_slide_menu_position">тренер</div>
                <div class="b_slide_menu_name">Юлія Кісліцина</div>
            </div>
            <div class="b_slide_menu_right-part">
                <img src="../assets/img/exit-icon.svg" alt="">
            </div>
          </div>
          <div class="b_slide_menu_bottom-line">
            {{$t('slide_menu.version')}}
            <router-link to="/versions">{{clientVersion}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, inject, computed } from 'vue'

  import sidebarArrowBack from '../assets/img/sidebar-arrow-back.svg'
  import sidebarArrow from '../assets/img/sidebar-arrow.svg'

  export default {
    setup() {
      const isMenuOpened = ref(false)
      const clientVersion = ref(inject('clientVersion'))

      const sliderStyle = computed(() => {
        if (isMenuOpened.value) {
          return {
            'right': '-260px'
          }
        } else {
          return {
            'right': '0px'
          }
        }
      })
      const arrowPosition = computed(() => {
        return isMenuOpened.value ? sidebarArrowBack : sidebarArrow
      })

      function toggleMenu() {
        isMenuOpened.value = !isMenuOpened.value
      }

      return {
        isMenuOpened,
        clientVersion,
        sliderStyle,
        arrowPosition,
        toggleMenu
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    background: #FFFFFF;
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
    width: 260px;
    padding: 24px 20px 0 8px;
    position: absolute;
    top: 0;
    right: 0px;
    height: 100vh;
    background: #FCFCFC;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .b_slide_menu_top-block {
      .b_slide_menu_logo {
        padding-left: 8px;
      }
      .b_slide_menu_items {
        margin-top: 12px;
        border-top: 1px solid #DFDEED;
        padding: 12px 11px;
        .b_slide_menu_title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #575775;
        }
        ul {
          margin-top: 22px;
          li {
            list-style: none;
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #262541;
            img {
                margin-right: 12px;
            }
          }
        }
      }
    }
    .b_slide_menu_bottom-block {
      padding: 16px 11px;
      border-top: 1px solid #DFDEED;
      .b_slide_menu_top-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        .b_slide_menu_left-part {
          .b_slide_menu_position {
            background: #E9F6FF;
            border-radius: 4px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #1C4FC5;
            width: fit-content;
            padding: 1px 4px;
          }
          .b_slide_menu_name {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 24px;
            color: #262541;
          }
        }
      }
      .b_slide_menu_bottom-line {
        text-align: left;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #8A8AA8;
      }
    }
  }
}

</style>