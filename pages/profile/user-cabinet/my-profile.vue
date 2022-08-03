<template>
  <div class="user-cabinet">
    <div class="title-block">
      <div class="titles">
        <div  class="title">Особистий кабінет</div>
        <div class="subtitle">Оновіть своє фото та персональні дані </div>
      </div>
      <div class="buttons">
        <WhiteBtn :text="'Скасувати'" />
        <GreenBtn :text="'Зберегти'" />
      </div>
    </div>
    <div class="tab-block">
      <nuxt-link
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-element', {active : tab.isActive}]"
        @click="changeTab(tab.id)"
        :to="tab.url"
      >
        <img :src="tab.img" :alt="tab.name">
        {{tab.name}}
      </nuxt-link>
    </div>
    <div class="my-profile-tab">
      <div class="block block-1">
        <div class="top-table">
          <div class="title">
            Ваш рейтинг
          </div>
          <div class="subtitle">
            Складається на основі оцінок інших користувачів
          </div>
          <div class="scale-block">
            <div class="image">
              <img src="../../../assets/img/Slightly_Smiling_Face.png" alt="">
            </div>
            <div class="image">
              <img src="../../../assets/img/scale.png" alt="">
            </div>
          </div>
          <div class="btns-block">
            <div class="left-btn">Узагальнено</div>
            <div class="right-btn">Детально</div>
          </div>
        </div>
      </div>
      <div class="block block-2">
        <div class="top-table">
          <div class="top-part">
            <div class="picture-block">
              <div class="profile-picture">
                <div class="add-image">
                  <img src="../../../assets/img/add-user-pic.svg" alt="">
                </div>
                <div class="user-img">
                  <img src="../../../assets/img/user-photo.png" alt="">
                </div>
              </div>
            </div>
            <div class="text-block">
              <div class="user-name-line">
                <div class="user-name">
                  <div class="name">Стефанія</div>
                  <div class="surname">Калиновська</div>
                </div>
                <div class="edit-btn">
                  <img src="../../../assets/img/edit.svg" alt="">
                </div>
              </div>
              <div class="nick-name-line">
                <div class="nick-name">@S_Kalyna</div>
                <div class="status">Гість</div>
              </div>
              <div class="phone-number-line">+380 (95) 390 86 50</div>
            </div>
          </div>
          <div class="bottom-part">
            <div class="title">
              Про себе:
            </div>
            <div class="description">
              Donec vitae mi vulputate, suscipit urna in, malesuada nisl. Pellentesque laoreet pretium nisl, et pulvinar massa eleifend sed
            </div>
          </div>
        </div>
      </div>
      <div class="block block-3">
        <div class="top-table">
          <div class="title">
            Безпека
          </div>
          <div class="subtitle">
            Ви можете змінити свій логін та пароль
          </div>
          <div class="email-input">
            <div class="title">
              <span>E-mail</span>
            </div>
            <input type="text" placeholder="f.j.swann@aol.com">
          </div>
          <div class="change-pass-btn">
            Змінити пароль
            <img src="../../../assets/img/lock.svg" alt="">
          </div>
        </div>
        <div class="delete-account">
          Видалити акаунт
        </div>
      </div>
      <div class="block block-4">
        <div class="title">
          Конфіденційність
        </div>
        <div class="subtitle">
          Налаштуйте видимість ваших персональних даних іншим користувачам
        </div>
        <div class="settings-block">
          <div class="personal-settings">
            <p>Номер телефону</p>
            <Switcher :id="'phone'" />
          </div>
          <div class="personal-settings">
            <p>E-mail</p>
            <Switcher :id="'email'" />
          </div>
          <div class="personal-settings">
            <p>Відгуки про мене<span>(Деякі)</span></p>
            <Switcher :id="'feedback'" />
          </div>
        </div>
      </div>
      <div class="block block-5">
        <div class="title">
          Особиста інформація
        </div>
        <div class="age-input">
          <div class="title">
            <span>Вік</span>
          </div>
          <input type="text" placeholder="09. 07. 1998">
        </div>
        <Dropdown />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import Switcher from '../../../components/Switcher.vue'
import Dropdown from '../../../components/Dropdown.vue'

export default {
  name: 'user-cabinet',
  components: {
    GreenBtn,
    WhiteBtn,
    Switcher,
    Dropdown
  },
  setup() {
    const tabs = ref([
      {
        id: 0,
        name: 'Мій профіль',
        img: require('../../../assets/img/user.svg'),
        url: '/profile/user-cabinet/my-profile',
        isActive: true
      },
      {
        id: 1,
        name: 'Тарифний план',
        img: require('../../../assets/img/database.svg'),
        url: '/profile/user-cabinet/rate-plan',
        isActive: false
      },
      {
        id: 2,
        name: 'Сповіщення',
        img: require('../../../assets/img/notification-small.svg'),
        url: '/profile/user-cabinet/notifications',
        isActive: false
      },
    ])
    const changeTab = id => {
      tabs.value = tabs.value.map(item => ({ ...item, isActive: false }))
                              .map(item => {
                                return item.id === id ?
                                      { ...item, isActive: true } :
                                      item
                              })
    }

    return {
      tabs,
      changeTab
    }
  }
}
</script>

<style lang="scss" scoped>
.title-block {
  display: flex;
  justify-content: space-between;
  .title {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    color: #262541;
  }
  .subtitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #575775;
    margin-top: 4px;
  }
  .buttons {
    display: flex;
    @media (max-width: 768px) {
      display: none;
    }
  }
}
.tab-block {
  display: flex;
  border-bottom: 1px solid #DFDEED;
  margin-top: 28px;
  cursor: pointer;
  .tab-element {
    display: flex;
    align-items: center;
    margin-right: 24px;
    padding-bottom: 12px;
    text-decoration: none;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    color: #262541;
    img {
      margin-right: 8px;
    }
    &.active {
      border-bottom: 2px solid #262541;
    }
  }
}
.my-profile-tab {
  display: flex;
  flex-wrap: wrap;
  margin-top: 28px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  .title {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #262541;
  }
  .subtitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #575775;
  }
  .top-table {
    border: 1px solid #DFDEED;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 28px;
  }
  .block {
    margin-right: 88px;
    @media (max-width: 992px) {
      margin-right: 12px;
    }
    @media (max-width: 768px) {
      width: 100%;
      min-width: 100%;
    }
  }
  .block-1 {
    @media (min-width: 992px) {
      width: 344px;
      min-width: 344px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 328px;
      min-width: 328px;
      order: 1;
    }
    .top-table {
      .scale-block {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 12px;
        margin-bottom: 12px;
      }
      .btns-block {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        display: flex;
        .left-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          color: #262541;
          border: 1px solid #148581;
          border-radius: 6px 0px 0px 6px;
          flex-basis: 50%;
          cursor: pointer;
        }
        .right-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          color: #575775;
          border: 1px solid #DFDEED;
          border-radius: 0px 6px 6px 0px;
          flex-basis: 50%;
          cursor: pointer;
        }
      }
    }
  }
  .block-2 {
    @media (min-width: 992px) {
      width: 344px;
      min-width: 344px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 328px;
      min-width: 328px;
      order: 2;
    }
    .top-table {
      .top-part {
        display: flex;
        border-bottom: 1px solid #DFDEED;
        padding-bottom: 5px;
        .profile-picture {
          position: relative;
          margin-right: 12px;
          .add-image {
            position: absolute;
            width: 36px;
            height: 36px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 6px;
            display: flex;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            img {
              margin: auto;
            }
          }
        }
        .text-block {
          flex-basis: 100%;
          .user-name-line {
            display: flex;
            justify-content: space-between;
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            color: #262541;
          }
          .nick-name-line {
            margin-top: 4px;
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
            .nick-name {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              color: #575775;
            }
            .status {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 20px;
              color: #148783;
            }
          }
          .phone-number-line {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
          }
        }
      }
      .bottom-part {
        padding-top: 5px;
        .title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
        }
        .description {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }
      }

    }
  }
  .block-3 {
    @media (min-width: 992px) {
      width: 272px;
      min-width: 272px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 328px;
      min-width: 328px;
      order: 5;
    }
    .top-table {
      .email-input {
        width: 100%;
        height: 40px;
        border: 1px solid #DFDEED;
        position: relative;
        border-radius: 6px;
        margin: 12px 0;
        .title {
          display: table;
          width: 68px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #575775;
          span {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
            border-right: 1px solid #DFDEED;
          }
        }
        input {
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          padding-left: 75px;
          padding-right: 5px;
          border-radius: 6px;
        }
      }
      .change-pass-btn {
        padding-left: 16px;
        padding-right: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
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
    .delete-account {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      text-decoration-line: underline;
      color: #575775;
      text-align: right;
      cursor: pointer;
    }
  }
  .block-4 {
    @media (min-width: 992px) {
      width: 344px;
      min-width: 344px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 328px;
      min-width: 328px;
      order: 3;
    }
    .settings-block {
      margin-top: 12px;
    .personal-settings {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #262541;
        border-top: 1px solid #DFDEED;
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .block-5 {
    @media (min-width: 992px) {
      width: 344px;
      min-width: 344px;
    }
    @media (min-width: 768px) and (max-width: 992px) {
      width: 328px;
      min-width: 328px;
      order: 4;
    }
    .age-input {
      width: 100%;
      height: 40px;
      border: 1px solid #DFDEED;
      position: relative;
      border-radius: 6px;
      margin: 12px 0;
      .title {
        display: table;
        width: 108px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #575775;
        background: #fff;
        border-radius: 6px;
        span {
          display: table-cell;
          text-align: left;
          vertical-align: middle;
          border-right: 1px solid #DFDEED;
          padding-left: 12px;
        }
      }
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding-left: 115px;
        padding-right: 5px;
        border-radius: 6px;
      }
    }
  }
}
</style>