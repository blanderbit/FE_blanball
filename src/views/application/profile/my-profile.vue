<template>
  <div class="user-cabinet">
    <Spiner v-if="isSpinerActive" />
    <!-- Modals delete -->
    <Transition>
      <ModalWindow 
        v-if="isModalActive.phone" 
        @close-modal="toggleModal('phone')"
      >
        <template #title>
          {{ $t('modals.change_number.title') }}
        </template>
        <template #title-icon>
          <img src="../../../assets/img/add-phone.svg" alt="" />
        </template>
        <template #change-phone-number>
          <div 
            v-if="modal.first" 
            class="change-phone-screen-1"
          >
            <div class="current-number">
              (617) 623-2338
            </div>
            <p class="description-text">
              {{ $t('modals.change_number.main-text') }}
            </p>
            <div class="btns-block">
              <div 
                class="cancle-btn"
                @click="toggleModal('phone')"
              >
                {{ $t('modals.change_number.leave-email') }}
              </div>
              <div 
                class="save-btn"
                @click="toggleModalPage"
              >
                {{ $t('modals.change_number.change-number-title') }}
              </div>
            </div>
          </div>
          <div 
            v-if="modal.second" 
            class="change-phone-screen-2"
          >
            <div class="current-number"> 
              <div class="inut-wrapper">
                <InputComponent
                  :title="$t('modals.change_number.current-number')"
                  :placeholder="'+38 066 825 07 77'"
                  :title-width="138"
                  :input-type="'number'"
                  :inside-title="true"
                  :is-disabled="true"
                />
              </div>
            </div>
            <div class="new-number">
              <div class="inut-wrapper">
                <InputComponent
                  :title="$t('modals.change_number.new-number')"
                  :placeholder="'(050) 623-78 95'"
                  :title-width="138"
                  :input-type="'number'"
                  :inside-title="true"
                />
              </div>
            </div>
            <p class="sms-text">
              {{ $t('modals.change_number.sms-code') }}        
            </p>
            <div class="sms-code-block">
              <input 
                v-for="item in codeResettingInputs"
                :key="item.id"
                :ref="`input-${item.id}`"
                v-model="item.value"
                type="text"
                placeholder="_"
                @input="codeInput(item.id, $event)"
              >
            </div>
            <div class="btns-block">
              <div 
                class="cancle-btn"
                @click="toggleModal('phone')"
              >
                {{ $t('buttons.cancel-editing') }}
                
              </div>
              <div 
                class="save-btn"
                @click="toggleModal('phone')"
              >
                {{ $t('buttons.save-changes') }}
                
              </div>
            </div>
          </div>
        </template>
      </ModalWindow>
    </Transition>

    <Transition>
      <ModalWindow 
        v-if="isModalActive.email" 
        @close-modal="toggleModal('email')"
      >
        <template #title>
          {{ $t('modals.change_login.title') }}
        </template>
        <template #title-icon>
          <img src="../../../assets/img/envelop.svg" alt="" />
        </template>
        <template #change-login>
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_login.current-email')"
              :placeholder="'stefa.kalyna@gmail.com'"
              :outside-title="true"
              :title-width="0"
            />
          </div>
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_login.new-email')"
              :placeholder="'stefa.kalyna@gmail.com'"
              :outside-title="true"
              :title-width="0"
            />
          </div>
          <div class="btns-block">
            <div 
              class="cancle-btn"
              @click="toggleModal('email')"
            >
              {{ $t('buttons.cancel-editing') }}
              
            </div>
            <div 
              class="save-btn"
              @click="toggleModal('email')"
            >
              {{ $t('buttons.save-changes') }}
              
            </div>
          </div>
        </template>
      </ModalWindow>
    </Transition>

    <Transition>
      <ModalWindow 
        v-if="isModalActive.delete_acc" 
        :title-color="'#C10B0B'"
        @close-modal="toggleModal('delete_acc')"
      >
        <template #title>
          {{ $t('modals.delete_acc.title') }}
        </template>
        <template #title-icon>
          <img src="../../../assets/img/warning.svg" alt="" />
        </template>
        <template #delete-account>
          <div class="current-number">
            (617) 623-2338
          </div>
          <div class="description-text">
            {{ $t('modals.delete_acc.text') }}
          </div>
          <div class="btns-block">
            <div 
              class="cancle-delete-acc"
              @click="toggleModal('delete_acc')"
            >
              {{ $t('buttons.cancel-deleting') }}
            </div>
            <div 
              class="delete-acc"
              @click="toggleModal('delete_acc')"
            >
              {{ $t('buttons.delete-account') }}
            </div>
          </div>
        </template>
      </ModalWindow>
    </Transition>

    <Transition>
      <ModalWindow 
        v-if="isModalActive.change_password" 
        @close-modal="toggleModal('change_password')"
      >
        <template #title>
          {{ $t('modals.change_password.title') }}
        </template>
        <template #title-icon>
          <img src="../../../assets/img/key.svg" alt="" />
        </template>
        <template #change-password>
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_password.current-pass')"
              :title-width="0"
              :type="['password', 'text']"
              :outside-title="true"
              :has-icon="true"
              :icon="[
                '../../../assets/img/eye-crossed.svg',
                '../../../assets/img/eye-opened.svg'
              ]"
            />
          </div>
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_password.new-pass')"
              :title-width="0"
              :type="['password', 'text']"
              :outside-title="true"
              :has-icon="true"
              :icon="[
                '../../../assets/img/eye-crossed.svg',
                '../../../assets/img/eye-opened.svg'
              ]"
            />
          </div>
          <p class="sms-text">
            {{ $t('modals.change_password.sms-code') }}        
          </p>
          <div class="sms-code-block">
            <input 
              v-for="item in codeResettingInputs"
              :key="item.id"
              :ref="`input-${item.id}`"
              v-model="item.value"
              type="number"
              placeholder="_"
              @input="codeInput(item.id, $event)"
            >
          </div>
          <div class="btns-block">
            <div 
              class="cancle-btn"
              @click="toggleModal('change_password')"
            >
              {{ $t('buttons.cancel-editing') }}
              
            </div>
            <div 
              class="save-btn"
              @click="toggleModal('change_password')"
            >
              {{ $t('buttons.save-changes') }}
              
            </div>
          </div>
        </template>
      </ModalWindow>
    </Transition>

    <Transition>
      <ModalUserWindow
        v-if="isModalActive.public_profile" 
        @close-modal="toggleModal('public_profile')"
      >
        <template #user-content>
          <PlayerPageComponent
            :page-mode="'public'"
          />
        </template>
      </ModalUserWindow>
    </Transition>
    <!-- Modals delete -->
    <div class="title-block">
      <div class="titles">
        <div  class="title">
          {{ $t('profile.title') }}
        </div>
        <div class="subtitle">{{ $t('profile.change-personal-data') }}</div>
      </div>
      <div class="buttons">
        <div class="btn-wrapper">
          <WhiteBtn 
            :text="$t('buttons.cancel')"
            :width="98"
          />
        </div>
        <GreenBtn 
          :text="$t('buttons.save')"
          :width="89"
          @click-function="openPublicProfile"
        />
      </div>
    </div>
    <div class="tab-block">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-element', {active : tab.isActive}]"
        @click="changeTab(tab.id, tab.url)"
      >
        <img :src="tab.img" :alt="tab.name">
        {{ $t('profile.' + tab.name) }}
      </div>
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
              <img src="../../../assets/img/smile_face.svg" alt="">
            </div>
            <div class="image">
              <img src="../../../assets/img/scale.svg" alt="">
            </div>
          </div>
          <div class="btns-block">
            <div 
              class="left-btn" 
              :style="{ border: `1px solid ${rateStatus ? '#DFDEED' : '#148581'}` }"
              @click="switchRate(false)"
            >
              {{ $t('profile.generally') }}
            </div>
            <div 
              class="right-btn"
              :style="{ border: `1px solid ${rateStatus ? '#148581' : '#DFDEED'}` }"
              @click="switchRate(true)"
            >
              {{ $t('profile.detailed') }}
            </div>
          </div>
          <transition>
            <div 
              v-if="rateStatus"
              class="cards-block"
            >
              <div 
                v-for="item in rateBlbock"
                :key="item.id"
                class="card"
                :style="{ 'border-top': item.id !== 0 && '1px dashed #DFDEED' }"
              >
                <div class="top-line">
                  <div class="name">
                    {{ item.name }}
                  </div>
                  <div class="rate">
                    <!-- rating stars -->
                  </div>
                </div>
                <div class="bottom-line">
                  <div class="date">
                    {{ item.date }}
                  </div>
                </div>
              </div>
            </div>
          </transition>
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
                <div 
                  class="edit-btn"
                  @click="switchEditMode"
                >
                  <img 
                    :src="editProfileIcon" 
                    alt=""
                  >
                </div>
              </div>
              <div class="nick-name-line">
                <div class="nick-name">@S_Kalyna</div>
                <div class="status">Гість</div>
              </div>
              <div 
                class="phone-number-line"
                @click="openChangeNumberModal"
              >
              +380 (95) 390 86 50
              </div>
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
        <div class="personal-information">
          <div class="title">
            {{ $t('profile.personal-details') }}
          </div>
          <div class="age-input">
            <InputComponent
              :title="'Вік'"
              :placeholder="'09. 07. 1998'"
              :inside-title="true"
            />
          </div>
          <Dropdown
            :options="dataDropdown"
            :main-title="'Гендер'"
            :inside-title="true"
            :width="344"
            :height="40"
          />
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
          <div class="email-input">
            <InputComponent
              :title="'E-mail'"
              :placeholder="'f.j.swann@aol.com'"
              :title-width="68"
              :inside-title="true"
              :has-icon="true"
              :icon="[
                sortArrowHorizontal
              ]"
              @icon-click="changeEmailIconClick"
            />
          </div>
          <div 
            class="change-pass-btn"
            @click="toggleModal('change_password')"
          >
            {{ $t('profile.change-password') }}
            <img src="../../../assets/img/lock.svg" alt="">
          </div>
        </div>
        <div 
          class="delete-account" 
          @click="toggleModal('delete_acc')"
        >
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
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import Switcher from '../../../components/Switcher.vue'
import Dropdown from '../../../components/Dropdown.vue'
import Spiner from '../../../workers/loading-worker/Loading.vue'
import InputComponent from '../../../components/InputComponent.vue'
import ModalWindow from '../../../components/ModalWindow.vue'
import ModalUserWindow from '../../../components/ModalUserWindow.vue'
import PlayerPageComponent from '../../../components/PlayerPageComponent.vue'

import userIcon from '../../../assets/img/user-icon.svg'
import database from '../../../assets/img/database.svg'
import notification from '../../../assets/img/notification-small.svg'
import tick from '../../../assets/img/tick.svg'
import edit from '../../../assets/img/edit.svg'
import sortArrowHorizontal from '../../../assets/img/sort-arrows-horizontal.svg'

export default {
  name: 'UserCabinet',
  components: {
    GreenBtn,
    WhiteBtn,
    Switcher,
    Dropdown,
    Spiner,
    InputComponent,
    ModalWindow,
    ModalUserWindow,
    PlayerPageComponent
  },
  data() {
    return {
      rateStatus: false,
      rateBlbock: [
        {
          id: 0,
          name: 'Дмитро Горбачевський',
          date: '13.07.2022'
        },
        {
          id: 1,
          name: 'Захар Беркут',
          date: '13.07.2022'
        },
        {
          id: 2,
          name: 'Василь Величко',
          date: '13.07.2022'
        },
        {
          id: 3,
          name: 'Дмитро Горбачевський',
          date: '13.07.2022'
        }
      ],
      isEditProfileMode: false,
      codeResettingInputs: [
        { id: 0, value: '' },
        { id: 1, value: '' },
        { id: 2, value: '' },
        { id: 3, value: '' },
        { id: 4, value: '' }
      ],
      isModalActive: {
        phone: false,
        email: false,
        delete_acc: false,
        change_password: false,
        public_profile: false
      },
      modal: {
        first: true,
        second: false
      },
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
          img: userIcon,
          url: '/application/profile/my-profile',
          isActive: true
        },
        {
          id: 1,
          name: 'rate-plan',
          img: database,
          url: '/application/profile/rate-plan',
          isActive: false
        },
        {
          id: 2,
          name: 'notifications',
          img: notification,
          url: '/application/profile/notifications',
          isActive: false
        }
      ]
    }
  },
  computed: {
    sortArrowHorizontal() {
      return sortArrowHorizontal
    },
    editProfileIcon() {
      return this.isEditProfileMode ? tick : edit
    }
  },
  mounted() {
    window.addEventListener('paste', this.pasteHandler)
  },
  beforeDestroy() {
    window.removeEventListener('paste', this.pasteHandler)
  },
  methods: {
    changeTab(id, url) {
      this.tabs = this.tabs.map(item => ({ ...item, isActive: false }))
                            .map(item => {
                              return item.id === id ?
                                    { ...item, isActive: true } :
                                    item
                            })
      this.$router.push(url)
    },
    toggleModal(val) {
      switch (val) {
        case 'phone':
          this.isModalActive.phone = !this.isModalActive.phone
          this.modal = {
            first: true,
            second: false
          }
          this.codeResettingInputs = this.codeResettingInputs.map(item => ({...item, value: ''}))
        break;
        case 'email':
          this.isModalActive.email = !this.isModalActive.email
        break;
        case 'delete_acc':
          this.isModalActive.delete_acc = !this.isModalActive.delete_acc
        break;
        case 'public_profile':
          this.isModalActive.public_profile = !this.isModalActive.public_profile
        break;
        case 'change_password':
          this.isModalActive.change_password = !this.isModalActive.change_password
        break;
      }
    },
    toggleModalPage() {
      this.modal = {
        first: false,
        second: true
      }
      this.$nextTick(() => {
        this.$refs.test.focus()
      })
    },
    codeInput(id, e) {
      if (e.inputType === 'deleteContentBackward') {
        if (id !== 0) this.$refs[`input-${id - 1}`][0].focus()
      } else {
        const currentInput = this.codeResettingInputs.find(i => i.id === id)
        if (currentInput.value.length > 1) {
          currentInput.value = currentInput.value.slice(1, 2);
        }
        const nextRefIndex = id + 1
        if (nextRefIndex !== 5) {
          this.$refs[`input-${id + 1}`][0].focus()
        }
      }

    },
    switchEditMode() {
      this.isEditProfileMode = !this.isEditProfileMode
    },
    openChangeNumberModal() {
      if (this.isEditProfileMode) {
        this.toggleModal('phone')
      }
    },
    changeEmailIconClick() {
      this.toggleModal('email')
    },
    openPublicProfile() {
      this.toggleModal('public_profile')
    },
    pasteHandler() {
      navigator.clipboard.readText()
        .then(text => {
          if (text.length === 5) {
            const splitedValue = text.split('')
            this.codeResettingInputs = this.codeResettingInputs.map((item, idx) => {
              return {
                ...item,
                value: splitedValue[idx]
              }
            })
          }
        })
        .catch(err => {
          console.log('К сожалению не удалось взять текст из буффера', err);
        });
    },
    switchRate(val) {
      this.rateStatus = val
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ease;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
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
    .btn-wrapper {
      margin-right: 12px;
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
          border-radius: 0px 6px 6px 0px;
          flex-basis: 50%;
          cursor: pointer;
        }
      }
      .cards-block {
        margin-top: 20px;
        .card {
          padding-top: 8px;
          margin-bottom: 8px;
          .top-line {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 13px;
              line-height: 20px;
              color: #262541;
            }
          }
          .bottom-line {
            display: flex;
            justify-content: flex-start;
            .date {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              text-align: center;
              color: #575775;
            }
          }
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
            .edit-btn {
              width: 30px;
              height: 30px;
              display: flex;
              img {
                margin: auto;
              }
            }
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
    .personal-information {
      .age-input {
        width: 344px;
        height: 40px;
      }
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
    .email-input {
      width: 240px;
      height: 40px;
      margin-bottom: 12px;
      margin-top: 8px;
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
}
</style>