<template>
  <div class="b-user-cabinet">
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
      @save-decline-changes="saveDeclineUserDataChanges"
    />
    <!-- Modals delete -->
    <div class="b-user-cabinet__title-block">
      <div class="b-user-cabinet__titles">
        <div class="b-user-cabinet__title">
          {{ $t('profile.title') }}
        </div>
        <div class="b-user-cabinet__subtitle">{{ $t('profile.change-personal-data') }}</div>
      </div>
      <div
        class="b-user-cabinet__buttons"
      >
        <div
          v-if="isEditModeProfile"
          class="b-user-cabinet__save-cancel-btns"
        >
          <div class="b-user-cabinet__btns-line">
            <div class="b-user-cabinet__btn-wrapper">
              <WhiteBtn 
                :text="$t('buttons.cancel')" 
                :width="98"
                @click-function="cancelDataEdit"
              />
            </div>
            <GreenBtn
              :text="$t('buttons.save')"
              :width="89"
              @click-function="saveDataEdit"
            />
          </div>
          <div 
            class="b-user-cabinet__look-preview"
            @click="toggleModal('public_profile')"
          >
          {{ $t('profile.how-profile-looks') }}
          </div>
        </div>
        <div
          v-else
          class="b-user-cabinet__edit-button"
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
    <div class="b-user-cabinet__tab-block">
      <div
        v-for="tab in mockData.tabs"
        :key="tab.id"
        :class="['b-user-cabinet__tab-element', { active: tab.isActive }]"
        @click="changeTab(tab.id, tab.url)"
      >
        <img :src="tab.img" :alt="tab.name" />
        {{ tab.name }}
      </div>
    </div>
    <div class="b-user-cabinet__my-profile-tab">
      <Form
        v-slot="data"
        :validation-schema="schema"
        :initial-values="formValues"
        ref="myForm"
      >
        <RatingCard 
          :rating-scale="userRating" 
        />
        <UserDetailsCard
          :user-data="userData"
          :phone="userPhone"
          :is-edit-mode="isEditModeProfile"
        />
        <SecurityBlock
          @toggle-modal="toggleModal"
          :user-email="userEmail"
          :checkbox-data="checkboxData"
          :is-edit-mode="isEditModeProfile"
        />
      </Form>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Form } from '@system.it.flumx.com/vee-validate'
import * as yup from 'yup'

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

import { API } from "../../../workers/api-worker/api.worker"
import { ROUTES } from "../../../router"
import CONSTANTS from '../../../consts'

const EDIT_BUTTON_ACTIONS = {
  SAVE: 'save',
  CANCEL: 'cancel'
}

export default {
  name: 'UserCabinet',
  components: {
    GreenBtn,
    WhiteBtn,
    InputComponent,
    ModalWindow,
    ModalUserWindow,
    PlayerPageComponent,
    RatingCard,
    UserDetailsCard,
    SecurityBlock,
    DeleteAccountModal,
    ChangePasswordModal,
    ChangeUserDataModal,
    Form
  },
  setup(props) {
    const { t } = useI18n()

    const route = useRoute()
    const router = useRouter()

    const userRating = ref(null)
    const userPhone = ref('')
    const userEmail = ref('')
    const userData = ref(null)
    const isEditModeProfile = ref(false)
    const changeDataModalConfig = ref(null)
    const myForm = ref(null)

    const mockData = computed(() => {
      return {
        user_info: CONSTANTS.users_page.userInfo,
        tabs: CONSTANTS.profile.tabs.map(item => ({...item, name: t(item.name)})),
        monthFromNumber: CONSTANTS.users_page.months.monthFromNumber,
        numberFromMonth: CONSTANTS.users_page.months.numberFromMonth
      }
    })

    console.log(route.meta.usersData.data)
    const formValues = ref({
      last_name: route.meta.usersData.data.profile.last_name,
      name: route.meta.usersData.data.profile.name,
      about_me: route.meta.usersData.data.profile.about_me,
      day: getBirthDay(route.meta.usersData.data.profile.birthday),
      month: getBirthMonth(route.meta.usersData.data.profile.birthday),
      year: getBirthYear(route.meta.usersData.data.profile.birthday),
      height: route.meta.usersData.data.profile.height,
      weight: route.meta.usersData.data.profile.weight,
      working_leg: getWorkingLeg(route.meta.usersData.data.profile.working_leg),
      position: route.meta.usersData.data.profile.position,
      phone: route.meta.usersData.data.configuration.phone,
      email: route.meta.usersData.data.configuration.email,
      show_reviews: route.meta.usersData.data.configuration.show_reviews
    })
    
    const checkboxData = reactive({})
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

    const schema = computed(() => {
      return yup.object({
        last_name: yup.string().required(),
        name: yup.string().required(),
        about_me: yup.string().required(),
        day: yup.string().required(),
        month: yup.string().required(),
        year: yup.string().required(),
        height: yup.string().required(),
        weight: yup.string().required(),
        working_leg: yup.string().required(),
        position: yup.string().required(),
        phone: yup.string().required(),
        email: yup.string().required(),
        show_reviews: yup.string().required(),
      })
    })

    const icons = computed(() => {
      return {
        editIcon: edit
      }
    })

    userRating.value = route.meta.usersData.data.raiting
    userPhone.value = route.meta.usersData.data.phone
    userEmail.value = route.meta.usersData.data.email
    userData.value = {
      ...route.meta.usersData.data.profile,
      working_leg: getWorkingLeg(route.meta.usersData.data.profile.working_leg)
    }

    checkboxData.value = {
      checkboxPhone: route.meta.usersData.data.configuration.phone,
      checkboxEmail: route.meta.usersData.data.configuration.email,
      checkboxReviews: route.meta.usersData.data.configuration.show_reviews
    }

    function getBirthDay(val) {
      return val.split('-')[2]
    }
    function getBirthMonth(val) {
      return mockData.value.monthFromNumber[val.split('-')[1]]
    }
    function getBirthYear(val) {
      return val.split('-')[0]
    }
    function getWorkingLeg(val) {
      switch(val) {
        case 'Left': return 'Ліва'
          break;
        case 'Right': return 'Права'
          break;
        case 'Ліва': return 'Left'
          break;
        case 'Права': return 'Right'
          break;
      }
    }

    function saveDataEdit() {
      toggleModal('change_data')
      changeDataModalConfig.value = {
        title: 'Подивитись зі сторони',
        button_1: 'Перейти до демонстрації',
        button_2: 'Просто зберегти',
        btn_action: EDIT_BUTTON_ACTIONS.SAVE,
        btn_with_1: 189,
        btn_with_2: 132
      }
    }
    function cancelDataEdit() {
      toggleModal('change_data')
      changeDataModalConfig.value = {
        title: 'Вийти без збереження змін?',
        button_1: 'Ні, не виходити',
        button_2: 'Так, вийти',
        btn_action: EDIT_BUTTON_ACTIONS.CANCEL,
        btn_with_1: 124,
        btn_with_2: 90
      }
    }

    function toggleEditMode() {
      isEditModeProfile.value = !isEditModeProfile.value
    }

    function saveDeclineUserDataChanges(val) {
      if (val === EDIT_BUTTON_ACTIONS.SAVE) {
        const refProfileData = { ...myForm.value.getControledValues() }
        const { day, month, year, working_leg } = refProfileData
        const profileData = {
          ...refProfileData,
          birthday: `${year}-${mockData.value.numberFromMonth[month]}-${day}`,
          gender: route.meta.usersData.data.profile.gender,
          working_leg: getWorkingLeg(working_leg),
        }
        delete profileData.day
        delete profileData.month
        delete profileData.year

        const payload = {
          "configuration": {
            "email": profileData.email,
            "phone": profileData.phone,
            "show_reviews": profileData.show_reviews
          },
          "profile": {
            "place": {
              "place_name": "string",
              "lat": 90,
              "lon": 180
            },
            ...profileData
          },
          "get_planned_events": "10d"
        }
        API.UserService.updateProfileData(payload)
        .then(() => {
          console.log('data successfully sent')
          getMyProfile()
        })
        .catch(e => console.log('mistake happened', e))
      } else {
        closeChangeUserDataModal()
      }
    }

    function getMyProfile() {
      API.UserService.getMyProfile()
        .then(res => {
          console.log('data successfully received')
          formValues.value = {
            last_name: res.data.profile.last_name,
            name: res.data.profile.name,
            about_me: res.data.profile.about_me,
            day: getBirthDay(res.data.profile.birthday),
            month: getBirthMonth(res.data.profile.birthday),
            year: getBirthYear(res.data.profile.birthday),
            height: res.data.profile.height,
            weight: res.data.profile.weight,
            working_leg: getWorkingLeg(res.data.profile.working_leg),
            position: res.data.profile.position,
            phone: res.data.configuration.phone,
            email: res.data.configuration.email,
            show_reviews: res.data.configuration.show_reviews
          }
          userData.value = res.data.profile

          userData.value = {
            ...res.data.profile,
            working_leg: getWorkingLeg(res.data.profile.working_leg)
          }
        })
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
      saveDeclineUserDataChanges,
      changeTab,
      closeChangeUserDataModal,
      toggleModal,
      saveDataEdit,
      cancelDataEdit,
      userRating,
      userPhone,
      userEmail,
      icons,
      isEditModeProfile,
      changeDataModalConfig,
      mockData,
      isModalActive,
      modalChangePhone,
      checkboxData,
      userData,
      schema,
      formValues,
      myForm
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
.b-user-cabinet {
  overflow-y: scroll;
}
.b-user-cabinet__user-cabinet::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.b-user-cabinet__user-cabinet {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.b-user-cabinet__title-block {
  display: flex;
  justify-content: space-between;
  .b-user-cabinet__title {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    color: #262541;
  }
  .b-user-cabinet__subtitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: #575775;
    margin-top: 4px;
  }
  .b-user-cabinet__buttons {
    // display: flex;
    @media (max-width: 768px) {
      display: none;
    }
    .b-user-cabinet__save-cancel-btns {
      .b-user-cabinet__btns-line {
        display: flex;
        justify-content: flex-end;
        .b-user-cabinet__btn-wrapper {
          margin-right: 12px;
        }
      }
      .b-user-cabinet__look-preview {
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
.b-user-cabinet__tab-block {
  display: flex;
  border-bottom: 1px solid #dfdeed;
  margin-top: 28px;
  cursor: pointer;
  .b-user-cabinet__tab-element {
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
.b-user-cabinet__my-profile-tab {
  form {
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
  }
}
</style>