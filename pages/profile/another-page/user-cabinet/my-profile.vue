<template>
  <div class="user-cabinet">
    <Spiner v-if="isSpinerActive" />
    <div class="title-block">
      <div class="titles">
        <div  class="title">
          {{ $t('profile.title') }}
        </div>
        <div class="subtitle">{{ $t('profile.change-personal-data') }}</div>
      </div>
      <div class="buttons">
        <WhiteBtn 
          :text="$t('buttons.cancel')"
          :width="98"
        />
        <GreenBtn 
          :text="$t('buttons.save')"
          :width="89"
        />
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
        {{ $t('profile.' + tab.name) }}
      </nuxt-link>
    </div>
    <div class="my-profile-tab">
      <div class="block block-1">
        <div class="top-table">
          <div class="title">
            {{ $t('profile.your-rate') }}
          </div>
          <div class="subtitle">
            {{ $t('profile.sub-rate') }}
          </div>
          <div class="scale-block">
            <div class="image">
              <img src="../../../../assets/img/Slightly_Smiling_Face.png" alt="">
            </div>
            <div class="image">
              <img src="../../../../assets/img/scale.png" alt="">
            </div>
          </div>
          <div class="btns-block">
            <div class="left-btn">{{ $t('profile.generally') }}</div>
            <div class="right-btn">{{ $t('profile.detailed') }}</div>
          </div>
        </div>
      </div>
      <div class="block block-2">
        <div class="top-table">
          <div class="top-part">
            <div class="picture-block">
              <div class="profile-picture">
                <div class="add-image">
                  <img src="../../../../assets/img/add-user-pic.svg" alt="">
                </div>
                <div class="user-img">
                  <img src="../../../../assets/img/user-photo.png" alt="">
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
                  <img src="../../../../assets/img/edit.svg" alt="">
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
              {{ $t('profile.about-myself') }}
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
            {{ $t('profile.safety') }}
          </div>
          <div class="subtitle">
            {{ $t('profile.change-login&password') }}
          </div>
          <InputComponent
            :title="'E-mail'"
            :placeholder="'f.j.swann@aol.com'"
            :titleWidth="68"
          />
          <div class="change-pass-btn">
            {{ $t('profile.change-password') }}
            <img src="../../../../assets/img/lock.svg" alt="">
          </div>
        </div>
        <div class="delete-account">
          {{ $t('profile.delete-account') }}
        </div>
      </div>
      <div class="block block-4">
        <div class="title">
          {{ $t('profile.confidentiality') }}
        </div>
        <div class="subtitle">
          {{ $t('profile.set-personal-details') }}
        </div>
        <div class="settings-block">
          <div class="personal-settings">
            <p>{{ $t('profile.phone-number') }}</p>
            <Switcher :id="'phone'" />
          </div>
          <div class="personal-settings">
            <p>{{ $t('profile.e-mail') }}</p>
            <Switcher :id="'email'" />
          </div>
          <div class="personal-settings">
            <p>{{ $t('profile.my-feedbacks') }}<span>(Деякі)</span></p>
            <Switcher :id="'feedback'" />
          </div>
        </div>
      </div>
      <div class="block block-5">
        <div class="title">
          {{ $t('profile.personal-details') }}
        </div>
        <InputComponent
          :title="'Вік'"
          :placeholder="'09. 07. 1998'"
        />
        <Dropdown 
          :options="dataDropdown"
          :main-title="'Гендер'"
          :insideTitle="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../../../components/GreenBtn.vue'
import WhiteBtn from '../../../../components/WhiteBtn.vue'
import Switcher from '../../../../components/Switcher.vue'
import Dropdown from '../../../../components/Dropdown.vue'
import Spiner from '../../../../components/GlobalSpiner.vue'
import InputComponent from '../../../../components/InputComponent.vue'

export default {
  name: 'user-cabinet',
  components: {
    GreenBtn,
    WhiteBtn,
    Switcher,
    Dropdown,
    Spiner,
    InputComponent
  },
  data() {
    return {
      isSpinerActive: false,
      dataDropdown: [
        {
          id: 0,
          value: 'Жінка'
        },
        {
          id: 1,
          value: 'Чоловик'
        }
      ],
      tabs: [
        {
          id: 0,
          name: 'my-profile',
          img: require('../../../../assets/img/user.svg'),
          url: '/profile/another-page/user-cabinet/my-profile',
          isActive: true
        },
        {
          id: 1,
          name: 'rate-plan',
          img: require('../../../../assets/img/database.svg'),
          url: '/profile/another-page/user-cabinet/rate-plan',
          isActive: false
        },
        {
          id: 2,
          name: 'notifications',
          img: require('../../../../assets/img/notification-small.svg'),
          url: '/profile/another-page/user-cabinet/notifications',
          isActive: false
        }
      ]
    }
  },
  methods: {
    changeTab(id) {
      this.tabs = this.tabs.map(item => ({ ...item, isActive: false }))
                            .map(item => {
                              return item.id === id ?
                                    { ...item, isActive: true } :
                                    item
                            })
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
    user-select: none;
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
          z-index: -1;
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
  }
}
</style>