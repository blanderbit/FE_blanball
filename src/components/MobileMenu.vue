<template>
  <div class="b-mob-menu">
    <div class="b-mob-menu__logo-block">
      <div class="b-mob-menu__logo">Blanball</div>
      <div class="b-mob-menu__close">&times;</div>
    </div>
    <div class="b-mob-menu__user-data">
      <div class="b-mob-menu__user-img">
        <img src="../assets/img/my-profile-pic.svg" alt="">
      </div>
      <div class="b-mob-menu__text-block">
        <div class="b-mob-menu__user-name">
          Стефанія Калиновська
        </div>
        <div class="b-mob-menu__account-type">
          Гостьовий акаунт
        </div>
      </div>
      <div class="b-mob-menu__logout-icon">
        <img src="../assets/img/logout-icon.svg" alt="">
      </div>
    </div>
    <div class="b-mob-menu__menu-block">
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
            color: item.textColor
          }"
          @click="topLineMenuClick(item.id, 'top-menu')"
        >
          <img 
            :src="item.isIconActive ? item.imgActive : item.imgInactive" 
            alt=""
          >
          <span v-if="item.value_show">
            {{ item.value }}
          </span>
        </div>
      </div>
      <div class="b-mob-menu__content-block"></div>
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
            color: item.textColor
          }"
          @click="topLineMenuClick(item.id)"
        >
          <img 
            :src="item.isIconActive ? item.imgActive : item.imgInactive" 
            alt=""
          >
          <span v-if="item.value_show">
            {{ item.value }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

import Notification from '../assets/img/notification-small.svg'
import NotificationWhite from '../assets/img/notification-white.svg'
import Record from '../assets/img/record.svg'
import RecordWhite from '../assets/img/record-white.svg'
import Members from '../assets/img/members.svg'
import MembersWhite from '../assets/img/members-white.svg'
import Settings from '../assets/img/Settings.svg'
import SettingsWhite from '../assets/img/Settings-white.svg'

export default {
  name: 'MobileMenu',
  setup() {
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
        textColor: '#575775'
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
        textColor: '#575775'
      }
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
        textColor: '#575775'
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
        textColor: '#575775'
      }
    ])

    function topLineMenuClick(id, menuType) {
      const currentlyClickedMenu = menuType === 'top-menu' ? topMenu : bottomMenu
      const spareMenu = menuType === 'top-menu' ? bottomMenu : topMenu
      const spareId = id ? 0 : 1

      spareMenu.value = spareMenu.value.map(item => {
          return {
            ...item,
            value_show: true,
            isIconActive: false,
            width: '50%',
            height: '76px',
            alignement: 'flex-start',
            background: '#FFFFFF',
            textColor: '#575775'
          }
      })

      currentlyClickedMenu.value = currentlyClickedMenu.value.map(item => {
        if (item.id === id) {
          return {
            ...item,
            value_show: true,
            isIconActive: true,
            width: '80%',
            height: '52px',
            alignement: 'flex-start',
            background: '#575775',
            textColor: '#fff'
          }
        } else {
          return item
        }
      })
      currentlyClickedMenu.value = currentlyClickedMenu.value.map(item => {
        if (item.id === spareId) {
          return {
            ...item,
            value_show: false,
            isIconActive: false,
            width: '20%',
            height: '52px',
            alignement: 'center',
            background: '#FFFFFF',
            textColor: '#575775'
          }
        } else {
          return item
        }
      })
    }

    return {
      topMenu,
      bottomMenu,
      topLineMenuClick
    }
  }
}
</script>

<style lang="scss" scoped>
.b-mob-menu {
  position: fixed;
  background: #EFEFF6;
  padding: 16px;
  width: 100%;
  height: 100%;
  z-index: 999;
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
    background: #FFFFFF;
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
    .b-mob-menu__line {
      display: flex;
      border-bottom: 1.5px solid #DFDEED;
      &:last-child {
        border: none;
      }
      .b-mob-menu__menu-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0 16px;
        border-right: 1.5px solid #DFDEED;
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
      
    }
  }
}
</style>