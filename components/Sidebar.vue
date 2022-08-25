<template>
  <div class="sidebar-wrapper">
    <div 
      v-if="isMenuOpened" 
      class="slide-menu-back"
      @click="toggleMenu"
    >
    </div>
    <div 
      class="slide-menu-wrapper" 
      :style="sliderStyle"
    >
      <div class="sidebar-arrow" @click="toggleMenu">
        <img :src="arrowPosition" alt="">
      </div>
      <div class="slide-menu">
        <div class="top-block">
          <div class="logo">
            <img src="../assets/img/Logo2.png" alt="">
          </div>
          <div class="slide-menu-items">
            <div class="title">Сповіщення</div>
            <ul>
              <li v-for="item of 7" :key="item">
                <img src="../assets/img/Settings.svg" alt="">
                Посилання
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom-block">
          <div class="top-line">
            <div class="left-part">
              <div class="position">тренер</div>
              <div class="name">Юлія Кісліцина</div>
            </div>
            <div class="right-part">
              <img src="../assets/img/exit-icon.svg" alt="">
            </div>
          </div>
          <div class="bottom-line">
            Blanball.version 1.0
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="top-block">
        <div class="picture-top">
          <img src="../assets/img/Rectangle_149.png" alt="">
        </div>
        <div class="menu-block">
          <ul>
            <li
              v-for="item in menuItems"
              :key="item.id"
              :class="['menu-item', { active: item.isActive }]"
            >
              <nuxt-link :to="item.url">
                <img :src="item.img" alt="">
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="bottom-block">
        <div class="picture-bottom">
          <nuxt-link to="/profile/user-cabinet/my-profile">
            <img src="../assets/img/Rectangle_148.png" alt="">
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainSidebar',
  data() {
    return {
      isMenuOpened: false,
      menuItems: [
        {
          id: 0,
          img: require('../assets/img/Notification.svg'),
          url: '',
          isActive: true
        },
        // {
        //   id: 1,
        //   img: require('../assets/img/Settings.svg'),
        //   url: '',
        //   isActive: false
        // },
        {
          id: 2,
          img: require('../assets/img/record.svg'),
          url: '/profile/events',
          isActive: false
        },
        // {
        //   id: 3,
        //   img: require('../assets/img/window.svg'),
        //   url: '',
        //   isActive: false
        // },
        {
          id: 4,
          img: require('../assets/img/members.svg'),
          url: '',
          isActive: false
        },
      ]
    }
  },
  computed: {
    sliderStyle() {
      if (this.isMenuOpened) {
        return {
          'right': '-260px'
        }
      } else {
        return {
          'right': '0px'
        }
      }
    },
    arrowPosition() {
      return this.isMenuOpened ? 
      require("../assets/img/sidebar-arrow-back.svg") : 
      require("../assets/img/sidebar-arrow.svg")
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  position: relative;
  @media (max-width: 992px) {
    display: none;
  }
  .slide-menu-back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: rgba(0, 0, 0, 0.37);
    z-index: 2;
  }
  .slide-menu-wrapper {
    transition: all 0.7s ease;
    position: absolute;
    top: 0;
    right: -260px;
    height: 100%;
    .sidebar-arrow {
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
    .slide-menu {
      width: 260px;
      padding: 24px 20px 0 8px;
      position: absolute;
      top: 0;
      right: 0px;
      height: 100%;
      background: #FCFCFC;
      box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
      border-radius: 6px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .top-block {
        .logo {
          padding-left: 8px;
        }
        .slide-menu-items {
          margin-top: 12px;
          border-top: 1px solid #DFDEED;
          padding: 12px 11px;
          .title {
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
      .bottom-block {
        padding: 16px 11px;
        border-top: 1px solid #DFDEED;
        .top-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          .left-part {
            .position {
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
            .name {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 24px;
              color: #262541;
            }
          }
          .right-part {

          }
        }
        .bottom-line {
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

  .sidebar {
    position: relative;
    height: 100%;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    padding-top: 24px;
    padding-bottom: 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    background: #FFFFFF;
    .top-block {
      .picture-top {
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgb(206, 206, 206);
        display: flex;
        img {
          margin: auto;
        }
      }
      .menu-block {
        .menu-item {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          cursor: pointer;
          &.active {
            background: #D3F8F7;
          }
          a {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            img {
              &:hover {
                animation: shake 0.4s linear;
              }
            }
          }
        }
      }
    }
    @keyframes shake {
      0% {
        transform: rotate(20deg);
      }
      20% {
        transform: rotate(-16deg);
      }
      40% {
        transform: rotate(12deg);
      }
      60% {
        transform: rotate(-8deg);
      }
      80% {
        transform: rotate(4deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }
}



</style>