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
          <div v-if="modal.first" class="change-phone-screen-1">
            <div class="current-number">(617) 623-2338</div>
            <p class="description-text">
              {{ $t('modals.change_number.main-text') }}
            </p>
            <div class="btns-block">
              <div class="cancle-btn" @click="toggleModal('phone')">
                {{ $t('modals.change_number.leave-email') }}
              </div>
              <div class="save-btn" @click="toggleModalPage">
                {{ $t('modals.change_number.change-number-title') }}
              </div>
            </div>
          </div>
          <div v-if="modal.second" class="change-phone-screen-2">
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
              />
            </div>
            <div class="btns-block">
              <div class="cancle-btn" @click="toggleModal('phone')">
                {{ $t('buttons.cancel-editing') }}
              </div>
              <div class="save-btn" @click="toggleModal('phone')">
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
            <div class="cancle-btn" @click="toggleModal('email')">
              {{ $t('buttons.cancel-editing') }}
            </div>
            <div class="save-btn" @click="toggleModal('email')">
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
          <div class="current-number">(617) 623-2338</div>
          <div class="description-text">
            {{ $t('modals.delete_acc.text') }}
          </div>
          <div class="btns-block">
            <div class="cancle-delete-acc" @click="toggleModal('delete_acc')">
              {{ $t('buttons.cancel-deleting') }}
            </div>
            <div class="delete-acc" @click="toggleModal('delete_acc')">
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
              :icon="[eyeCrossed, eyeOpened]"
            />
          </div>
          <div class="inut-wrapper">
            <InputComponent
              :title="$t('modals.change_password.new-pass')"
              :title-width="0"
              :type="['password', 'text']"
              :outside-title="true"
              :has-icon="true"
              :icon="[eyeCrossed, eyeOpened]"
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
            />
          </div>
          <div class="btns-block">
            <div class="cancle-btn" @click="toggleModal('change_password')">
              {{ $t('buttons.cancel-editing') }}
            </div>
            <div class="save-btn" @click="toggleModal('change_password')">
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
          <PlayerPageComponent :page-mode="'public'" />
        </template>
      </ModalUserWindow>
    </Transition>
    <!-- Modals delete -->
    <div class="title-block">
      <div class="titles">
        <div class="title">
          {{ $t('profile.title') }}
        </div>
        <div class="subtitle">{{ $t('profile.change-personal-data') }}</div>
      </div>
      <div class="buttons">
        <div class="btn-wrapper">
          <WhiteBtn :text="$t('buttons.cancel')" :width="98" />
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
        :class="['tab-element', { active: tab.isActive }]"
        @click="changeTab(tab.id, tab.url)"
      >
        <img :src="tab.img" :alt="tab.name" />
        {{ $t('profile.' + tab.name) }}
      </div>
    </div>
    <div class="my-profile-tab">
      <RatingCard 
        :rate-block="rateBlbock"
        :rating-scale="userRating"
      />
      <UserDetailsCard
        :labels="labels"
        :tab-titles="tabTitles"
        :days="mockData.days"
        :months="mockData.months"
        :years="mockData.years"
        :main-lag="mockData.main_lag"
        :cities="mockData.cities"
        :district="mockData.district"
        :user-data="userProfile"
        :phone="userPhone"

      />
      <SecurityBlock 
        :toggle-modal="toggleModal('email')"
        :user-email="userEmail"
      />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import Switcher from '../../../components/Switcher.vue'
import Dropdown from '../../../components/Dropdown.vue'
import InputComponent from '../../../components/InputComponent.vue'
import ModalWindow from '../../../components/ModalWindow.vue'
import ModalUserWindow from '../../../components/ModalUserWindow.vue'
import PlayerPageComponent from '../../../components/PlayerPageComponent.vue'
import TextAreaComponent from '../../../components/TextAreaComponent.vue'
import RatingCard from '../../../components/RatingCard.vue'
import UserDetailsCard from '../../../components/UserDetailsCard.vue'
import SecurityBlock from '../../../components/SecurityBlock.vue'

import eyeCross from '../../../assets/img/eye-crossed.svg'
import eyeOpen from '../../../assets/img/eye-opened.svg'
import userIcon from '../../../assets/img/user-icon.svg'
import database from '../../../assets/img/database.svg'
import notification from '../../../assets/img/notification-small.svg'
import sortArrowHorizontal from '../../../assets/img/sort-arrows-horizontal.svg'

import Spiner from '../../../workers/loading-worker/Loading.vue'

import CONSTANTS from '../../../consts'

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
    PlayerPageComponent,
    TextAreaComponent,
    RatingCard,
    UserDetailsCard,
    SecurityBlock
  },
  setup() {
    const route = useRoute()
    const userProfile = ref('')
    const userRating = ref(null)
    const userPhone = ref('')
    const userEmail = ref('')

    userRating.value = route.meta.usersData.data.raiting
    userProfile.value = route.meta.usersData.data.profile
    userPhone.value = route.meta.usersData.data.phone
    userEmail.value = route.meta.usersData.data.email

    console.log(route.meta.usersData.data)

    return {
      userProfile,
      userRating,
      userPhone,
      userEmail
    }
  },
  data() {
    return {
      currentTab: 0,
      tabTitles: [
        { id: 0, title: 'Про мене', width: '119px' },
        { id: 1, title: 'Ігрові характеристики', width: '186px' },
        { id: 2, title: 'Контакти', width: '119px' },
      ],
      labels: [
        { title: 'asdfkj' },
        { title: 'asdf' },
        { title: 'as' },
        { title: 'asdfk' },
      ],
      rateBlbock: [
        {
          id: 0,
          name: 'Дмитро Горбачевський',
          date: '13.07.2022',
        },
        {
          id: 1,
          name: 'Захар Беркут',
          date: '13.07.2022',
        },
        {
          id: 2,
          name: 'Василь Величко',
          date: '13.07.2022',
        },
        {
          id: 3,
          name: 'Дмитро Горбачевський',
          date: '13.07.2022',
        },
      ],
      codeResettingInputs: [
        { id: 0, value: '' },
        { id: 1, value: '' },
        { id: 2, value: '' },
        { id: 3, value: '' },
        { id: 4, value: '' },
      ],
      isModalActive: {
        phone: false,
        email: false,
        delete_acc: false,
        change_password: false,
        public_profile: false,
      },
      modal: {
        first: true,
        second: false,
      },
      isSpinerActive: false,
      dataDropdown: [
        {
          id: 0,
          value: 'Жінка',
        },
        {
          id: 1,
          value: 'Чоловик',
        },
      ],
      tabs: [
        {
          id: 0,
          name: 'my-profile',
          img: userIcon,
          url: '/application/profile/my-profile',
          isActive: true,
        },
        {
          id: 1,
          name: 'rate-plan',
          img: database,
          url: '/application/profile/rate-plan',
          isActive: false,
        },
        {
          id: 2,
          name: 'notifications',
          img: notification,
          url: '/application/profile/notifications',
          isActive: false,
        },
      ],
    }
  },
  computed: {
    eyeCrossed() {
      return eyeCross
    },
    eyeOpened() {
      return eyeOpen
    },
    sortArrowHorizontal() {
      return sortArrowHorizontal
    },
    mockData() {
      return {
        days: CONSTANTS.dates.days,
        months: CONSTANTS.dates.months,
        years: CONSTANTS.dates.years,
        main_lag: CONSTANTS.profile.mainLeg,
        cities: CONSTANTS.profile.cities,
        district: CONSTANTS.profile.district,
        user_info: CONSTANTS.users_page.userInfo
      }
    }
  },
  mounted() {
    window.addEventListener('paste', this.pasteHandler)
  },
  beforeDestroy() {
    window.removeEventListener('paste', this.pasteHandler)
  },
  methods: {
    changeUserTab(id) {
      this.currentTab = id
    },
    changeTab(id, url) {
      this.tabs = this.tabs
        .map((item) => ({ ...item, isActive: false }))
        .map((item) => {
          return item.id === id ? { ...item, isActive: true } : item
        })
      this.$router.push(url)
    },
    toggleModal(val) {
      switch (val) {
        case 'phone':
          this.isModalActive.phone = !this.isModalActive.phone
          this.modal = {
            first: true,
            second: false,
          }
          this.codeResettingInputs = this.codeResettingInputs.map((item) => ({
            ...item,
            value: '',
          }))
          break
        case 'email':
          this.isModalActive.email = !this.isModalActive.email
          break
        case 'delete_acc':
          this.isModalActive.delete_acc = !this.isModalActive.delete_acc
          break
        case 'public_profile':
          this.isModalActive.public_profile = !this.isModalActive.public_profile
          break
        case 'change_password':
          this.isModalActive.change_password =
            !this.isModalActive.change_password
          break
      }
    },
    toggleModalPage() {
      this.modal = {
        first: false,
        second: true,
      }
      this.$nextTick(() => {
        this.$refs.test.focus()
      })
    },
    codeInput(id, e) {
      if (e.inputType === 'deleteContentBackward') {
        if (id !== 0) this.$refs[`input-${id - 1}`][0].focus()
      } else {
        const currentInput = this.codeResettingInputs.find((i) => i.id === id)
        if (currentInput.value.length > 1) {
          currentInput.value = currentInput.value.slice(1, 2)
        }
        const nextRefIndex = id + 1
        if (nextRefIndex !== 5) {
          this.$refs[`input-${id + 1}`][0].focus()
        }
      }
    },
    changeEmailIconClick() {
      this.toggleModal('email')
    },
    openPublicProfile() {
      this.toggleModal('public_profile')
    },
    pasteHandler() {
      navigator.clipboard
        .readText()
        .then((text) => {
          if (text.length === 5) {
            const splitedValue = text.split('')
            this.codeResettingInputs = this.codeResettingInputs.map(
              (item, idx) => {
                return {
                  ...item,
                  value: splitedValue[idx],
                }
              }
            )
          }
        })
        .catch((err) => {
          console.log('К сожалению не удалось взять текст из буффера', err)
        })
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
.user-cabinet {
  overflow-y: scroll;
}
.user-cabinet::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.user-cabinet {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
  border-bottom: 1px solid #dfdeed;
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
  justify-content: space-between;
  margin-top: 24px;
  @media (min-width: 1400px) {
    justify-content: flex-start;
  }
  @media (max-width: 992px) {
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
  .subtitle-security {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #575775;
    padding-bottom: 20px;
    border-bottom: 1px solid #dfdeed;
  }
}
</style>