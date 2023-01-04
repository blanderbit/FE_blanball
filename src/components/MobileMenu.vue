<template>
  <div class="b-mob-menu" :style="mobMenuStyle">
    <div class="b-mob-menu__logo-block">
      <div class="b-mob-menu__logo">{{$t('menu.blanball')}}</div>
      <div class="b-mob-menu__close" @click="closeMobMenu">&times;</div>
    </div>
    <div class="b-mob-menu__user-data">
      <div class="b-mob-menu__user-img">
        <img src="../assets/img/my-profile-pic.svg" alt="" />
      </div>
      <div class="b-mob-menu__text-block">
        <div class="b-mob-menu__user-name">Стефанія Калиновська</div>
        <div class="b-mob-menu__account-type">
          {{$t('menu.guest-account')}}
        </div>
      </div>
      <div 
        class="b-mob-menu__logout-icon" 
        @click="logOut"
      >
        <img src="../assets/img/logout-icon.svg" alt="" />
      </div>
    </div>
    <div class="b-mob-menu__menu-block" :style="menuBlockStyle">
      <div class="b-mob-menu__line">
        <div
          class="b-mob-menu__menu-item"
          v-for="item in topMenu"
          :key="item.id"
          :style="{
            width: item.width,
            height: item.height,
            'justify-content': item.alignement,
            background: item.background,
            color: item.textColor,
          }"
          @click="lineMenuClick(item.id, item.url, 'top-menu')"
        >
          <img
            :src="item.isIconActive ? item.imgActive : item.imgInactive"
            alt=""
          />
          <span v-if="item.value_show">
            {{ item.value }}
          </span>
        </div>
      </div>
      <div class="b-mob-menu__content-block">
        <div class="b-mob-menu__message-list">
          <div
            class="b-mob-menu__message"
            v-for="item in mockData.letters"
            :key="item.id"
          >
            <div class="b-mob-menu__left-side">
              <img :src="item.userImg" alt="" />
              <div class="b-mob-menu__is-user-active"></div>
            </div>
            <div class="b-mob-menu__right-side">
              <div class="b-mob-menu__top-line">
                <span>{{ item.sender }}</span>
                <span>{{ item.time }}</span>
              </div>
              <div class="b-mob-menu__bottom-line">
                <span>{{ item.topic }}</span>
                <img :src="item.icon" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="b-mob-menu__line">
        <div
          class="b-mob-menu__menu-item"
          v-for="item in bottomMenu"
          :key="item.id"
          :style="{
            width: item.width,
            height: item.height,
            'justify-content': item.alignement,
            background: item.background,
            color: item.textColor,
          }"
          @click="lineMenuClick(item.id, item.url)"
        >
          <img
            :src="item.isIconActive ? item.imgActive : item.imgInactive"
            alt=""
          />
          <span v-if="item.value_show">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import Notification from '../assets/img/notification-small.svg'
import NotificationWhite from '../assets/img/notification-white.svg'
import Record from '../assets/img/record.svg'
import RecordWhite from '../assets/img/record-white.svg'
import Members from '../assets/img/members.svg'
import MembersWhite from '../assets/img/members-white.svg'
import Settings from '../assets/img/Settings.svg'
import SettingsWhite from '../assets/img/Settings-white.svg'

import CONSTANTS from '../consts/index'
import { ROUTES } from "../router/router.const";
import { TokenWorker } from "../workers/token-worker";

export default {
  name: 'MobileMenu',
  props: {
    isMenuActive: {
      type: Boolean,
      default: false,
    },
  },
  emit: ['closeMenu'],
  setup(props, { emit }) {
    const topMenu = ref([
      {
        id: 0,
        value: 'Сповіщення',
        value_show: true,
        imgInactive: Notification,
        imgActive: NotificationWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        textColor: '#575775',
      },
      {
        id: 1,
        value: 'Події',
        value_show: true,
        imgInactive: Record,
        imgActive: RecordWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        textColor: '#575775',
        url: ROUTES.APPLICATION.EVENTS.absolute,
      },
    ])
    const bottomMenu = ref([
      {
        id: 0,
        value: 'Рейтинг користувачів',
        value_show: true,
        imgInactive: Members,
        imgActive: MembersWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        textColor: '#575775',
        url: ROUTES.APPLICATION.USERS.GENERAL.absolute,
      },
      {
        id: 1,
        value: 'Налаштуваня',
        value_show: true,
        imgInactive: Settings,
        imgActive: SettingsWhite,
        isIconActive: false,
        width: '50%',
        height: '76px',
        alignement: 'flex-start',
        background: '#FFFFFF',
        textColor: '#575775',
        url: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
      },
    ])
    const router = useRouter()

    const mockData = computed(() => {
      return {
        letters: CONSTANTS.mob_menu.letters,
      }
    })
    const menuBlockHeight = ref('auto')
    const menuBlockStyle = computed(() => {
      return {
        height: menuBlockHeight.value,
      }
    })
    const mobMenuStyle = computed(() => {
      return {
        transform: `translateX(${props.isMenuActive ? 0 : -100}%)`,
      }
    })

    function closeMobMenu() {
      normalizeBlock(topMenu)
      normalizeBlock(bottomMenu)
      menuBlockHeight.value = 'auto'
      emit('closeMenu')
    }
    function normalizeBlock(menu) {
      menu.value = menu.value.map((item) => {
        return {
          ...item,
          value_show: true,
          isIconActive: false,
          width: '50%',
          height: '76px',
          alignement: 'flex-start',
          background: '#FFFFFF',
          textColor: '#575775',
        }
      })
    }
    function lineMenuClick(id, url, menuType) {
      if (url) {
        router.push(url)
        closeMobMenu()
        return
      }
      menuBlockHeight.value = '100%'
      const currentlyClickedMenu =
        menuType === 'top-menu' ? topMenu : bottomMenu
      const spareMenu = menuType === 'top-menu' ? bottomMenu : topMenu
      const spareId = id ? 0 : 1

      normalizeBlock(spareMenu)

      currentlyClickedMenu.value = currentlyClickedMenu.value.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value_show: true,
            isIconActive: true,
            width: '80%',
            height: '52px',
            alignement: 'flex-start',
            background: '#575775',
            textColor: '#fff',
          }
        } else {
          return item
        }
      })
      currentlyClickedMenu.value = currentlyClickedMenu.value.map((item) => {
        if (item.id === spareId) {
          return {
            ...item,
            value_show: false,
            isIconActive: false,
            width: '20%',
            height: '52px',
            alignement: 'center',
            background: '#FFFFFF',
            textColor: '#575775',
          }
        } else {
          return item
        }
      })
    }

    const logOut = () => {
      TokenWorker.clearToken();
      router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute)
    }

    return {
      topMenu,
      bottomMenu,
      mockData,
      menuBlockStyle,
      mobMenuStyle,
      lineMenuClick,
      closeMobMenu,
      logOut
    }
  },
}
</script>

<style lang="scss" scoped>
.b-mob-menu {
  position: fixed;
  background: #efeff6;
  padding: 16px;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-out;
  .b-mob-menu__logo-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .b-mob-menu__logo {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 32px;
      color: #262541;
    }
    .b-mob-menu__close {
      font-size: 28px;
      cursor: pointer;
    }
  }
  .b-mob-menu__user-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: #ffffff;
    border-radius: 8px;
    .b-mob-menu__user-img {
      img {
        display: block;
      }
    }

    .b-mob-menu__text-block {
      .b-mob-menu__user-name {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 800;
        font-size: 18px;
        line-height: 24px;
        color: #262541;
      }
      .b-mob-menu__account-type {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #148581;
      }
    }

    .b-mob-menu__logout-icon {
      img {
        display: block;
      }
    }
  }
  .b-mob-menu__menu-block {
    margin-top: 16px;
    border-radius: 8px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease-out;
    .b-mob-menu__line {
      display: flex;
      border-bottom: 1.5px solid #dfdeed;
      &:last-child {
        border: none;
      }
      .b-mob-menu__menu-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 16px;
        border-right: 1.5px solid #dfdeed;
        transition: all 0.3s ease-out;
        &:last-child {
          border: none;
        }
        img {
        }
        span {
          margin-left: 13px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 16px;
        }
      }
    }
    .b-mob-menu__content-block {
      background: #fff;
      height: 100%;
      position: relative;
      overflow-y: scroll;
      transition: all 0.3s ease-out;
      .b-mob-menu__message-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .b-mob-menu__message {
          padding: 14px 12px;
          display: flex;
          border-bottom: 1px solid #efeff6;
          .b-mob-menu__left-side {
            margin-right: 12px;
            position: relative;
            .b-mob-menu__is-user-active {
              width: 10px;
              height: 10px;
              position: absolute;
              right: 0;
              bottom: 4px;
              background: #1ccd62;
              border: 2px solid #fff;
              border-radius: 50%;
            }
          }

          .b-mob-menu__right-side {
            width: 100%;
            .b-mob-menu__top-line {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #8a8aa8;
              margin-bottom: 4px;
            }

            .b-mob-menu__bottom-line {
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 20px;
              color: #8a8aa8;
            }
          }
        }
      }
    }
  }
}
</style>