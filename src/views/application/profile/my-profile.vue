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
          <div v-if="modalChangePhone.first" class="change-phone-screen-1">
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
          <div v-if="modalChangePhone.second" class="change-phone-screen-2">
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
            <!-- Past Code Input -->
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

    <DeleteAccountModal
      v-if="isModalActive.delete_acc"
      :user-email="userEmail"
      @close-modal="toggleModal"
    />

    <ChangePasswordModal 
      v-if="isModalActive.change_password"
      :user-email="userEmail"
      @close-modal="toggleModal"
    />

    <ModalUserWindow
      v-if="isModalActive.public_profile"
      @close-modal="toggleModal('public_profile')"
    >
      <template #user-content>
        <PlayerPageComponent :page-mode="'public'" />
      </template>
    </ModalUserWindow>

    <ChangeUserDataModal 
      v-if="isModalActive.change_data"
      :config="changeDataModalConfig"
      @close-modal="closeChangeUserDataModal"
      @save-changes="saveUserDataChanges"
    />
    <!-- Modals delete -->
    <div class="title-block">
      <div class="titles">
        <div class="title">
          {{ $t('profile.title') }}
        </div>
        <div class="subtitle">{{ $t('profile.change-personal-data') }}</div>
      </div>
      <div
        class="buttons"
      >
        <div
          v-if="isEditModeProfile"
          class="save-cancel-btns"
        >
          <div class="btns-line">
            <div class="btn-wrapper">
              <WhiteBtn 
                :text="$t('buttons.cancel')" 
                :width="98"
                @click-function="saveCancelDataEdit('cancel')"
              />
            </div>
            <GreenBtn
              :text="$t('buttons.save')"
              :width="89"
              @click-function="saveCancelDataEdit('save')"
            />
          </div>
          <div 
            class="look-preview"
            @click="toggleModal('public_profile')"
          >
          {{ $t('profile.how-profile-looks') }}
          </div>
        </div>
        <div
          v-else
          class="edit-button"
        >
          <GreenBtn
            :text="$t('buttons.edit-profile')"
            :width="197"
            :height="40"
            :icon-right="icons.editIcon"
            @click-function="toggleEditMode"
          />
        </div>
      </div>
    </div>
    <div class="tab-block">
      <div
        v-for="tab in mockData.tabs"
        :key="tab.id"
        :class="['tab-element', { active: tab.isActive }]"
        @click="changeTab(tab.id, tab.url)"
      >
        <img :src="tab.img" :alt="tab.name" />
        {{ tab.name }}
      </div>
    </div>
    <div class="my-profile-tab">
      <RatingCard 
        :rating-scale="userRating" 
      />
      <UserDetailsCard
        :user-data="userProfile"
        :phone="userPhone"
        :is-edit-mode="isEditModeProfile"
        :to-send-form="sendChangedDataAction"
        @change-data-action="toggleDataAction"
      />
      <SecurityBlock
        @toggle-modal="toggleModal"
        :user-email="userEmail"
        :checkbox-data="checkboxData"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import InputComponent from '../../../components/InputComponent.vue'
import ModalWindow from '../../../components/ModalWindow.vue'
import ModalUserWindow from '../../../components/ModalUserWindow.vue'
import PlayerPageComponent from '../../../components/PlayerPageComponent.vue'
import RatingCard from '../../../components/RatingCard.vue'
import UserDetailsCard from '../../../components/UserDetailsCard.vue'
import SecurityBlock from '../../../components/SecurityBlock.vue'
import DeleteAccountModal from '../../../components/user-cabinet-modals/DeleteAccountModal.vue'
import ChangePasswordModal from '../../../components/user-cabinet-modals/ChangePasswordModal.vue'
import ChangeUserDataModal from '../../../components/user-cabinet-modals/ChangeUserDataModal.vue'

import edit from '../../../assets/img/edit-white.svg'

import Spiner from '../../../workers/loading-worker/Loading.vue'
import { API } from "../../../workers/api-worker/api.worker"
import { ROUTES } from "../../../router"
import CONSTANTS from '../../../consts'

const usersData = {
  "configuration": {
    "email": true,
    "phone": true,
    "show_reviews": false
  },
  "profile": {
    "place": {
      "place_name": "string",
      "lat": "90",
      "lon": "180"
    },
    "last_name": "Borisovich",
    "name": "Mahmud",
    "about_me": "I am a teacher in a school",
    "birthday": "2000-04-12",
    "height": "178",
    "weight": "85",
    "working_leg": "Left",
    "position": "GK",
  },
  "raiting": "3",
  "phone": "+38075645342",
  "email": "hrundel@gmail.com",
  "get_planned_events": "10d"
}

export default {
  name: 'UserCabinet',
  components: {
    GreenBtn,
    WhiteBtn,
    Spiner,
    InputComponent,
    ModalWindow,
    ModalUserWindow,
    PlayerPageComponent,
    RatingCard,
    UserDetailsCard,
    SecurityBlock,
    DeleteAccountModal,
    ChangePasswordModal,
    ChangeUserDataModal
  },
  setup() {
    const { t } = useI18n()

    const route = useRoute()
    const router = useRouter()

    const userProfile = ref('')
    const userRating = ref(null)
    const userPhone = ref('')
    const userEmail = ref('')
    const isEditModeProfile = ref(false)
    const sendChangedDataAction = ref(false)
    const isSpinerActive = ref(false)
    
    const checkboxData = reactive({})
    const changeDataModalConfig = ref(null)

    const isModalActive = reactive({
        phone: false,
        email: false,
        delete_acc: false,
        change_password: false,
        public_profile: false,
        change_data: false
    })

    const modalChangePhone = reactive({
        first: true,
        second: false
    })

    const mockData = computed(() => {
      return {
        user_info: CONSTANTS.users_page.userInfo,
        tabs: CONSTANTS.profile.tabs.map(item => ({...item, name: t(item.name)}))
      }
    })

    const icons = computed(() => {
      return {
        editIcon: edit
      }
    })

    // ---------------- Switch back after server is back
    // userRating.value = route.meta.usersData.data.raiting
    // userProfile.value = route.meta.usersData.data.profile
    // userPhone.value = route.meta.usersData.data.phone
    // userEmail.value = route.meta.usersData.data.email

    // checkboxData.value = {
    //   checkboxPhone: route.meta.usersData.data.configuration.phone,
    //   checkboxEmail: route.meta.usersData.data.configuration.email,
    //   checkboxReviews: route.meta.usersData.data.configuration.show_reviews
    // }
    // ---------------- Switch back after server is back

    // ---------------- DELETE after server is back
    userRating.value = usersData.raiting
    userProfile.value = usersData.profile
    userPhone.value = usersData.phone
    userEmail.value = usersData.email

    checkboxData.value = {
      checkboxPhone: usersData.configuration.phone,
      checkboxEmail: usersData.configuration.email,
      checkboxReviews: usersData.configuration.show_reviews
    }
    // ---------------- DELETE after server is back


    function saveCancelDataEdit(val) {
      toggleModal('change_data')
      if (val === 'save') {
        changeDataModalConfig.value = {
          title: 'Подивитись зі сторони',
          button_1: 'Перейти до демонстрації',
          button_2: 'Просто зберегти',
          btn_with_1: 189,
          btn_with_2: 132
        }
      } else {
        changeDataModalConfig.value = {
          title: 'Вийти без збереження змін?',
          button_1: 'Ні, не виходити',
          button_2: 'Так, вийти',
          btn_with_1: 124,
          btn_with_2: 90
        }
      }
    }

    function toggleEditMode() {
      isEditModeProfile.value = !isEditModeProfile.value
    }

    function saveUserDataChanges() {
      sendChangedDataAction.value = true
    }

    function toggleDataAction() {
      sendChangedDataAction.value = !sendChangedDataAction.value
    }

    function changeTab(id, url) {
      mockData.tabs = mockData.tabs
        .map((item) => ({ ...item, isActive: false }))
        .map((item) => {
          return item.id === id ? { ...item, isActive: true } : item
        })
      router.push(url)
    }

    function closeChangeUserDataModal() {
      toggleModal('change_data')
      toggleEditMode()
    }

    function toggleModal(val) {
      switch (val) {
        case 'phone':
        isModalActive.phone = !isModalActive.phone
          modalChangePhone.value = {
            first: true,
            second: false,
          }
          break
        case 'email':
          isModalActive.email = !isModalActive.email
          break
        case 'delete_acc':
          isModalActive.delete_acc = !isModalActive.delete_acc
          break
        case 'public_profile':
          isModalActive.public_profile = !isModalActive.public_profile
          break
        case 'change_data':
          isModalActive.change_data = !isModalActive.change_data
          break
        case 'change_password':
          isModalActive.change_password = !isModalActive.change_password
          break
      }
    }

    return {
      toggleEditMode,
      saveUserDataChanges,
      toggleDataAction,
      changeTab,
      closeChangeUserDataModal,
      toggleModal,
      saveCancelDataEdit,
      userProfile,
      userRating,
      userPhone,
      userEmail,
      icons,
      isEditModeProfile,
      changeDataModalConfig,
      sendChangedDataAction,
      mockData,
      isSpinerActive,
      isModalActive,
      modalChangePhone,
      checkboxData
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
    // display: flex;
    @media (max-width: 768px) {
      display: none;
    }
    .save-cancel-btns {
      .btns-line {
        display: flex;
        justify-content: flex-end;
        .btn-wrapper {
          margin-right: 12px;
        }
      }
      .look-preview {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #575775;
        margin-top: 4px;
        cursor: pointer;
      }
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