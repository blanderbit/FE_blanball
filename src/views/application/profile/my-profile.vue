<template>
  <div class="b-user-cabinet">
    <Loading
      :is-loading="isLoading"
    />

    <EditAvatarModal
      v-if="isModalActive.edit_avatar"
      :user-image="userAvatar"
      @close-modal="toggleModal"
      @get-profile-data="getMyProfile"
    />

    <ChangeEmailModal
      v-if="isModalActive.email"
      :user-email="userEmail"
      @close-modal="toggleModal"
      @email="getMyProfile"
    />

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
    >
      <template #top-buttons>
        <div class="b-player-page__outer-btns">
          <div 
            class="b-player-page__continue"
            @click="toggleModal('public_profile')"
          >
            <span>{{ $t('buttons.keep-editing') }}</span>
            <img src="../../../assets/img/arrow-left-small.svg" alt="">
          </div>
          <div
            @click="toggleModal('public_profile')"
            class="b-player-page__exit"
          >
            <span>{{ $t('buttons.save-and-out') }}</span>
            <img src="../../../assets/img/cross-white.svg" alt="">
          </div>
        </div>
      </template>
      <template #user-content>
        <PlayerPageComponent 
          :page-mode="''"
          :user-data="restData"
        />
      </template>
    </ModalUserWindow>

    <ChangeUserDataModal 
      v-if="isModalActive.change_data"
      :config="changeDataModalConfig"
      @close-modal="closeChangeUserDataModal"
      @save-decline-changes="saveDeclineUserDataChanges"
    />

    <div class="b-user-cabinet__title-block">
      <div class="b-user-cabinet__titles">
        <div class="b-user-cabinet__title">
          {{ $t('profile.title') }}
        </div>
        <div class="b-user-cabinet__subtitle">
          {{ $t('profile.change-personal-data') }}
        </div>
      </div>
      <ButtonsBlock 
        v-if="!isMobile"
        :cancel-btn-width="'auto'"
        :save-btn-width="'auto'"
        :is-edit-mode-profile="isEditModeProfile"
        @cancel-data-edit="cancelDataEdit"
        @save-data-edit="saveDataEdit"
        @toggle-modal="toggleModal"
        @toggle-edit-mode="toggleEditMode"
      />

    </div>
    <div class="b-user-cabinet__tab-block">
      <div
        v-for="tab in mockData.tabs"
        :key="tab.id"
        :class="[
          'b-user-cabinet__tab-element', 
          { active: tab.isActive, disabled: tab.isDisabled }
        ]"
        @click="changeTab(tab.id, tab.url, tab.isDisabled)"
        @mouseenter="switchTabLabel(tab.isDisabled)"
        @mouseleave="switchTabLabel(tab.isDisabled)"
      >
        <img :src="tab.img" :alt="tab.name" />
        {{ tab.name }}
        <TabLabel 
          v-if="tab.isDisabled && isTabLabel" 
          :title="$t('profile.coming-soon-title')"
          :text="$t('profile.coming-soon-text')"
        />
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
          v-if="!isMobTabletSize"
          :rating-scale="userRating" 
        />
        <UserDetailsCard
          :user-data="userData"
          :phone="userPhone"
          :is-edit-mode="isEditModeProfile"
          @openEditPictureModal="openEditPictureModal"
        />
        <div class="b-user-cabinet__mobile-tablet-block">
          <RatingCard 
            v-if="isMobTabletSize"
            :rating-scale="userRating" 
          />
          <SecurityBlock
            @toggle-modal="toggleModal"
            :user-email="userEmail"
            :checkbox-data="checkboxData"
            :is-edit-mode="isEditModeProfile"
          />
        </div>
        <ButtonsBlock
          v-if="isMobile"
          :is-edit-mode-profile="isEditModeProfile"
          :edit-btn-width="'auto'"
          :cancel-btn-width="'auto'"
          :save-btn-width="'auto'"
          @cancel-data-edit="cancelDataEdit"
          @save-data-edit="saveDataEdit"
          @toggle-modal="toggleModal"
          @toggle-edit-mode="toggleEditMode"
        />
      </Form>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Form } from '@system.it.flumx.com/vee-validate'
import * as yup from 'yup'

import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import InputComponent from '../../../components/forms/InputComponent.vue'
import ModalWindow from '../../../components/ModalWindow.vue'
import ModalUserWindow from '../../../components/ModalUserWindow.vue'
import PlayerPageComponent from '../../../components/PlayerPageComponent.vue'
import RatingCard from '../../../components/RatingCard.vue'
import UserDetailsCard from '../../../components/UserDetailsCard.vue'
import SecurityBlock from '../../../components/SecurityBlock.vue'
import TabLabel from '../../../components/TabLabel.vue'
import DeleteAccountModal from '../../../components/user-cabinet/DeleteAccountModal.vue'
import ChangePasswordModal from '../../../components/user-cabinet/ChangePasswordModal.vue'
import ChangeUserDataModal from '../../../components/user-cabinet/ChangeUserDataModal.vue'
import ChangeEmailModal from '../../../components/user-cabinet/ChangeEmailModal.vue'
import ButtonsBlock from '../../../components/user-cabinet/ButtonsBlock.vue'
import EditAvatarModal from '../../../components/user-cabinet/EditAvatarModal.vue'

import Loading from '../../../workers/loading-worker/Loading.vue'
import { API } from "../../../workers/api-worker/api.worker"
import CONSTANTS from '../../../consts'

import useWindowWidth from '../../../utils/widthScreen'

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
    Form,
    Loading,
    ChangeEmailModal,
    ButtonsBlock,
    TabLabel,
    EditAvatarModal
  },
  setup(props) {
    const { t } = useI18n()
    
    const route = useRoute()
    const router = useRouter()
    const {
      onResize,
      isBetweenTabletAndDesktop, 
      isMobile,
      isTablet 
    } = useWindowWidth()

    const userInfo = ref(null)
    const userRating = ref(null)
    const userPhone = ref('')
    const userEmail = ref('')
    const userData = ref(null)
    const isEditModeProfile = ref(false)
    const changeDataModalConfig = ref(null)
    const myForm = ref(null)
    const isLoading = ref(false)
    const isTabLabel = ref(false)
    const userAvatar = ref('')
    const restData = ref()
    
    const isMobTabletSize = computed(() => {
      return isBetweenTabletAndDesktop.value || isMobile.value || isTablet.value
    })
    const mockData = computed(() => {
      return {
        user_info: CONSTANTS.users_page.userInfo,
        tabs: CONSTANTS.profile.tabs.map(item => ({...item, name: t(item.name)})),
        monthFromNumber: CONSTANTS.users_page.months.monthFromNumber,
        numberFromMonth: CONSTANTS.users_page.months.numberFromMonth
      }
    })
    restData.value = route.meta.usersData?.data
    const formValues = ref({
      last_name: route.meta.usersData?.data.profile?.last_name,
      name: route.meta.usersData?.data.profile?.name,
      about_me: route.meta.usersData?.data.profile?.about_me,
      day: getBirthDay(route.meta.usersData?.data.profile?.birthday),
      month: getBirthMonth(route.meta.usersData?.data.profile?.birthday),
      year: getBirthYear(route.meta.usersData?.data.profile?.birthday),
      height: route.meta.usersData?.data.profile?.height,
      weight: route.meta.usersData?.data.profile?.weight,
      working_leg: getWorkingLeg(route.meta.usersData?.data.profile?.working_leg),
      position: route.meta.usersData?.data.profile?.position,
      phone: route.meta.usersData?.data?.phone,
      config_phone: route.meta.usersData?.data.configuration?.phone,
      config_email: route.meta.usersData?.data.configuration?.email,
      show_reviews: route.meta.usersData?.data.configuration?.show_reviews,
      // phone: route.meta.usersData?.data.phone
    })
    
    const checkboxData = reactive({})
    const isModalActive = reactive({
      phone: false,
      email: false,
      delete_acc: false,
      change_password: false,
      public_profile: false,
      change_data: false,
      edit_avatar: false
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
        config_phone: yup.string().required(),
        config_email: yup.string().required(),
        show_reviews: yup.string().required(),
      })
    })

    userInfo.value = {
      ...route.meta.usersData?.data,
      profile: {
        ...route.meta.usersData?.data?.profile,
        working_leg: getWorkingLeg(route.meta.usersData?.data.profile?.working_leg)
      }
    }
    userRating.value = route.meta.usersData?.data?.raiting
    userPhone.value = route.meta.usersData?.data?.phone
    userEmail.value = route.meta.usersData?.data?.email
    userData.value = {
      ...route.meta.usersData?.data?.profile,
      working_leg: getWorkingLeg(route.meta.usersData?.data.profile?.working_leg),
      role: route.meta.usersData?.data?.role,
    }

    checkboxData.value = {
      checkboxPhone: route.meta.usersData?.data.configuration?.phone,
      checkboxEmail: route.meta.usersData?.data.configuration?.email,
      checkboxReviews: route.meta.usersData?.data.configuration?.show_reviews
    }

    onMounted(() => {
      window.addEventListener('resize', onResize);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize); 
    })

    function switchTabLabel(isDisabled) {
      if (isDisabled) {
        isTabLabel.value = !isTabLabel.value
      }
    }
    function getBirthDay(val) {
      return val?.split('-')[2]
    }
    function getBirthMonth(val) {
      return mockData.value.monthFromNumber[val?.split('-')[1]]
    }
    function getBirthYear(val) {
      return val?.split('-')[0]
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
        const { day, month, year, working_leg, config_email, config_phone, show_reviews, phone } = refProfileData
        const profileData = {
          ...refProfileData,
          birthday: `${year}-${mockData.value.numberFromMonth[month]}-${day}`,
          gender: route.meta.usersData?.data.profile?.gender,
          working_leg: getWorkingLeg(working_leg),
        }

        delete profileData.day
        delete profileData.month
        delete profileData.year
        delete profileData.phone
        delete profileData.config_email
        delete profileData.config_phone
        delete profileData.show_reviews

        const payload = {
          "configuration": {
            "email": config_email,
            "phone": config_phone,
            "show_reviews": show_reviews
          },
          "profile": {
            "place": {
              "place_name": "string",
              "lat": 90,
              "lon": 180
            },
            ...profileData
          },
          "get_planned_events": "1y",
          "phone": phone
        }


        API.UserService.updateProfileData(payload)
        .then(() => {
          closeChangeUserDataModal()
          getMyProfile()
        })
        .catch(e => console.log('mistake happened', e))
      } else {
        closeChangeUserDataModal()
      }
    }

    function getMyProfile() {
      isLoading.value = true
      API.UserService.getMyProfile()
        .then(res => {
          formValues.value = {
            last_name: res.data.profile?.last_name,
            name: res.data.profile?.name,
            about_me: res.data.profile?.about_me,
            day: getBirthDay(res.data.profile?.birthday),
            month: getBirthMonth(res.data.profile?.birthday),
            year: getBirthYear(res.data.profile?.birthday),
            height: res.data.profile?.height,
            weight: res.data.profile?.weight,
            working_leg: getWorkingLeg(res.data.profile?.working_leg),
            position: res.data.profile?.position,
            phone: res.data?.phone,
            config_phone: res.data.configuration?.phone,
            config_email: res.data.configuration?.email,
            show_reviews: res.data.configuration?.show_reviews
          }
          userInfo.value = res.data
          userData.value = {
            ...res.data?.profile,
            working_leg: getWorkingLeg(res.data.profile?.working_leg)
          }
          restData.value =res.data
          userEmail.value = res.data?.email
          userPhone.value = res.data?.phone
          isLoading.value = false
        })
    }


    function changeTab(id, url, isDisabled) {
      if (isDisabled) return
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
        case 'edit_avatar':
          isModalActive.edit_avatar = !isModalActive.edit_avatar
          break
        case 'email':
          isModalActive.email = !isModalActive.email
          break
        case 'delete_acc':
          isModalActive.delete_acc = !isModalActive.delete_acc
          break
        case 'public_profile':
          const refProfileData = { ...myForm.value.getControledValues() }
          const { day, month, year, working_leg, config_email, config_phone, show_reviews } = refProfileData
          const profileData = {
            ...refProfileData,
            birthday: `${year}-${mockData.value.numberFromMonth[month]}-${day}`,
            gender: route.meta.usersData?.data.profile?.gender,
            working_leg: getWorkingLeg(working_leg),
          }
          delete profileData.day
          delete profileData.month
          delete profileData.year
          delete profileData.phone
          delete profileData.config_email
          delete profileData.config_phone
          delete profileData.show_reviews

          restData.value= {
            ...restData.value,
            "configuration": {
              "email": config_email,
              "phone": config_phone,
              "show_reviews": show_reviews
            },
            "profile": {
              "place": {
                "place_name": "string",
                "lat": 90,
                "lon": 180
              },
              ...profileData
            },
            "get_planned_events": "1y"
          }
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

    function openEditPictureModal(modal, picture) {
      userAvatar.value = picture
      toggleModal(modal)
    }

    
    
    return {
      toggleEditMode,
      saveDeclineUserDataChanges,
      changeTab,
      closeChangeUserDataModal,
      toggleModal,
      switchTabLabel,
      saveDataEdit,
      cancelDataEdit,
      openEditPictureModal,
      getMyProfile,
      userRating,
      userPhone,
      userEmail,
      isEditModeProfile,
      changeDataModalConfig,
      mockData,
      isModalActive,
      checkboxData,
      userData,
      schema,
      formValues,
      myForm,
      userInfo,
      isLoading,
      isMobile,
      isTabLabel,
      isMobTabletSize,
      restData,
      userAvatar
    }
  }
}
</script>

<style lang="scss" scoped>
.b-player-page__outer-btns {
  position: absolute;
  top: -30px;
  right: 0;
  display: flex;
  align-items: center;
  .b-player-page__continue {
    margin-right: 24px;
    display: flex;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: #E2E2E9;
    cursor: pointer;
    span {
      margin-right: 10px;
    }
  }
  .b-player-page__exit {
    display: flex;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    color: #FFFFFF;
    padding: 2px 8px;
    background: #6F6F77;
    border-radius: 6px;
    cursor: pointer;
    span {
      margin-right: 10px;
    }
  }
}
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
  @media (max-width: 768px) {
    padding-bottom: 10px;
  }
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
}
.b-user-cabinet__tab-block {
  display: flex;
  border-bottom: 1px solid #dfdeed;
  margin-top: 28px;
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
    cursor: pointer;
    position: relative;
    img {
      margin-right: 8px;
    }
    &.active {
      border-bottom: 2px solid #262541;
    }
    &.disabled {
      color: #7F7DB5;
    }

  }
}
.b-user-cabinet__my-profile-tab {
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 24px;
    @media (min-width: 1200px) {
      justify-content: space-between;
    }
    @media (max-width: 768px) {
      display: block;
    }
    .b-user-cabinet__mobile-tablet-block {
      @media (min-width: 1400px) {
        flex-basis: 372px;
      }
      @media (min-width: 1200px) and (max-width: 1400px) {
        flex-basis: 320px;
      }
      @media (min-width: 768px) and (max-width: 1200px) {
        flex-basis: 49%;
      }
    }
  }
}
</style>