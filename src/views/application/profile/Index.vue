<template>
  <PublicProfileWrapper
    v-if="isModalActive.public_profile"
    @saveChanges="saveDataFromPreviewWindow"
    @closeModal="toggleModal"
  >
    <template #content>
      <PublicProfile :pageMode="'preview'" :userData="restData" />
    </template>
  </PublicProfileWrapper>
  <div class="b-user-cabinet">
    <ReviewsListModal
      v-if="isReviewsListModalOpened"
      @closeModal="closeReviewsModal"
    />

    <EditAvatarModal
      v-if="isModalActive.edit_avatar"
      :user-image="userAvatar"
      @close-modal="toggleModal"
      @get-profile-data="getMyProfile"
    />

    <ChangeEmailModal
      v-if="isModalActive.email"
      :user-email="userStore.user.email"
      @close-modal="toggleModal"
      @email="getMyProfile"
    />

    <DeleteAccountModal
      v-if="isModalActive.delete_acc"
      :user-email="userStore.user.email"
      @close-modal="toggleModal"
    />

    <ChangePasswordModal
      v-if="isModalActive.change_password"
      :user-email="userStore.user.email"
      @close-modal="toggleModal"
    />

    <HideMyEventsModal
      v-if="isHideMyEventsModalOpened"
      @closeModal="closeHideMyEventsModal"
      @closeAndSave="closeModalAndHideEvents"
    />

    <div class="b-user-cabinet__title-block">
      <div class="b-user-cabinet__titles">
        <div class="b-user-cabinet__title">
          {{ $t('profile.title') }}
        </div>
        <div class="b-user-cabinet__subtitle">
          {{ $t('profile.subtitle') }}
        </div>
      </div>
    </div>
    <div class="b-user-cabinet__tab-block">
      <div
        v-for="tab in mockData.tabs"
        :key="tab.id"
        :class="[
          'b-user-cabinet__tab-element',
          { active: tab.isActive, disabled: tab.isDisabled },
        ]"
        @click="changeTab(tab.id, tab.url, tab.isDisabled)"
        @mouseenter="switchTabLabel(tab.isDisabled)"
        @mouseleave="switchTabLabel(tab.isDisabled)"
      >
        <img :src="tab.img" :alt="tab.name" />
        <span>{{ $t(tab.name) }}</span>
        <Transition>
          <TabLabel
            v-if="tab.isDisabled && isTabLabel"
            :title="$t('profile.coming-soon-title')"
            :text="$t('profile.coming-soon-text')"
          />
        </Transition>
      </div>
    </div>
    <div
      class="b-user-cabinet__my-profile-tab"
      :style="`height: ${profileMainSideHeight}`"
    >
      <Form
        v-slot="data"
        :validation-schema="schema"
        :initial-values="formValues"
        @submit="disableSubmit"
        ref="myForm"
      >
        <ButtonsBlock
          v-if="!isMobile"
          class="b-user-cabinet__buttons-block"
          :cancel-btn-width="'auto'"
          :save-btn-width="'auto'"
          :is-edit-mode-profile="isEditModeProfile"
          @cancel-data-edit="cancelDataEdit"
          @save-data-edit="saveDataEdit(data)"
          @toggle-modal="toggleModal"
          @toggle-edit-mode="toggleEditMode"
        />

        <SubmitModal
          v-if="isModalActive.change_data"
          :config="changeDataModalConfig"
          @close-modal="closeSubmitModal"
          @save-changes="handleSaveDataChanges"
          @decline-changes="declineUserDataChanges"
          @show-preview="showPreview"
          @cancel-changes="cancelChangesAndGoToTheNextRoute"
        />
        <RatingCard
          v-if="!isTabletSize && !isMobile"
          :rating-scale="userRating"
          :reviewsCount="reviewsTotalCount"
          @showReviewsModal="showReviewsModal"
        />
        <UserDetailsCard
          :user-data="userData"
          :phone="userStore.user.phone"
          :is-edit-mode="isEditModeProfile"
          @openEditPictureModal="openEditPictureModal"
          :initValues="formValues"
        />
        <div class="b-user-cabinet__mobile-tablet-block">
          <RatingCard
            v-if="isTabletSize"
            :rating-scale="userRating"
            :reviewsCount="reviewsTotalCount"
            @showReviewsModal="showReviewsModal"
          />
          <SecurityBlock
            @toggle-modal="toggleModal"
            :user-email="userStore.user.email"
            :checkbox-data="checkboxData"
            :is-edit-mode="isEditModeProfile"
            @openHideEventsModal="showHideMyEventsModal"
          />
        </div>
        <ButtonsBlock
          v-if="isMobile"
          :is-edit-mode-profile="isEditModeProfile"
          :edit-btn-width="'auto'"
          :cancel-btn-width="'auto'"
          :save-btn-width="'auto'"
          @cancel-data-edit="cancelDataEdit"
          @save-data-edit="saveDataEdit(data)"
          @toggle-modal="toggleModal"
          @toggle-edit-mode="toggleEditMode"
        />
      </Form>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

import { Form } from '@system.it.flumx.com/vee-validate';

import GreenBtn from '../../../components/shared/button/GreenBtn.vue';
import WhiteBtn from '../../../components/shared/button/WhiteBtn.vue';
import MainInput from '../../../components/shared/input/MainInput.vue';
import ModalWindow from '../../../components/shared/modals/ModalWindow.vue';
import RatingCard from '../../../components/main/profile/RatingCard.vue';
import UserDetailsCard from '../../../components/main/profile/UserDetailsCard.vue';
import SecurityBlock from '../../../components/main/profile/SecurityBlock.vue';
import TabLabel from '../../../components/shared/tabLabel/TabLabel.vue';
import DeleteAccountModal from '../../../components/main/profile/modals/DeleteAccountModal.vue';
import ChangePasswordModal from '../../../components/main/profile/modals/ChangePasswordModal.vue';
import SubmitModal from '../../../components/shared/modals/SubmitModal.vue';
import ChangeEmailModal from '../../../components/main/profile/modals/ChangeEmailModal.vue';
import ButtonsBlock from '../../../components/main/profile/ButtonsBlock.vue';
import EditAvatarModal from '../../../components/main/profile/modals/EditAvatarModal.vue';
import PublicProfile from '../../../components/main/publicProfile/PublicProfile.vue';
import HideMyEventsModal from '../../../components/main/events/modals/HideMyEventsModal.vue';
import PublicProfileWrapper from '../../../components/main/publicProfile/PublicProfileWrapper.vue';
import ReviewsListModal from '../../../components/main/profile/modals/ReviewsListModal/ReviewsListModal.vue';

import { API } from '../../../workers/api-worker/api.worker';
import { useUserDataStore } from '@/stores/userData';
import { useWindowWidth } from '../../../utils/widthScreen';
import { calcHeight } from '../../../utils/calcHeight';

import { CONSTS } from '../../../consts';
import SCHEMAS from '../../../validators/schemas';
import {
  finishSpinner,
  startSpinner,
} from '../../../workers/loading-worker/loading.worker';

const EDIT_BUTTON_ACTIONS = {
  SAVE: 'save',
  CANCEL: 'cancel',
};

export default {
  name: 'UserCabinet',
  components: {
    GreenBtn,
    WhiteBtn,
    MainInput,
    ModalWindow,
    PublicProfile,
    RatingCard,
    UserDetailsCard,
    SecurityBlock,
    DeleteAccountModal,
    ChangePasswordModal,
    SubmitModal,
    Form,
    ReviewsListModal,
    ChangeEmailModal,
    ButtonsBlock,
    TabLabel,
    PublicProfileWrapper,
    HideMyEventsModal,
    EditAvatarModal,
  },
  setup(props) {
    const { t } = useI18n();
    const toast = useToast();
    const userStore = useUserDataStore();

    const router = useRouter();
    const { isBetweenTabletAndDesktop, isMobile, isTablet } =
      useWindowWidth();

    const userInfo = ref(null);
    const userData = ref(null);
    const isEditModeProfile = ref(false);
    const changeDataModalConfig = ref(null);
    const myForm = ref(null);
    const isTabLabel = ref(false);
    const userAvatar = ref('');
    const restData = ref();
    const nextRoutePath = ref('');
    const isReviewsListModalOpened = ref(false);
    const isHideMyEventsModalOpened = ref(false);

    const isTabletSize = computed(() => {
      return isBetweenTabletAndDesktop.value || isTablet.value;
    });

    const mockData = computed(() => {
      return {
        user_info: CONSTS.users_page.userInfo,
        tabs: CONSTS.profile.tabs,
        monthFromNumber: CONSTS.users_page.months.monthFromNumber,
        numberFromMonth: CONSTS.users_page.months.numberFromMonth,
      };
    });

    const { calculatedHeight } = calcHeight(
      [88, 46, 60],
      [40, userStore.user.is_verified ? 0 : 40],
      [userStore.user.is_verified ? 0 : 40],
      true
    );

    const profileMainSideHeight = computed(() => {
      return `${calculatedHeight.value}px`;
    });

    const schema = computed(() => {
      return SCHEMAS.profile.schema;
    });

    const userRating = computed(() => {
      return userStore.user.raiting ? userStore.user.raiting.toFixed(1) : null;
    });

    const reviewsTotalCount = computed(() => {
      return router.currentRoute.value.meta.allReviewsData?.data?.total_count;
    });

    restData.value = {
      ...userStore.user,
      configuration: {
        ...userStore.user.configuration,
        planned_events: true,
      },
    };

    const formValues = ref({
      last_name: userStore.user.profile.last_name,
      name: userStore.user.profile.name,
      about_me: userStore.user.profile.about_me,
      day: getBirthDay(userStore.user.profile.birthday),
      month: getBirthMonth(userStore.user.profile.birthday),
      year: getBirthYear(userStore.user.profile.birthday),
      height: userStore.user.profile.height,
      weight: userStore.user.profile.weight,
      working_leg: getWorkingLeg(userStore.user.profile.working_leg),
      position: userStore.user.profile.position,
      phone: userStore.user.phone,
      config_phone: userStore.user.configuration.phone,
      config_email: userStore.user.configuration.email,
      show_reviews: userStore.user.configuration.show_reviews,
      planned_events: true,
    });

    const checkboxData = reactive({});
    const isModalActive = reactive({
      phone: false,
      email: false,
      delete_acc: false,
      change_password: false,
      public_profile: false,
      change_data: false,
      edit_avatar: false,
    });

    userInfo.value = {
      ...userStore.user,
      profile: {
        ...userStore.user.profile,
        working_leg: getWorkingLeg(userStore.user.profile.working_leg),
      },
    };
    userData.value = {
      ...userStore.user.profile,
      phone: userStore.user.phone,
      raiting: userStore.user.raiting
        ? userStore.user.raiting.toFixed(1)
        : null,
      working_leg: getWorkingLeg(userStore.user.profile.working_leg),
      role: userStore.user.role,
    };

    checkboxData.value = {
      checkboxPhone: userStore.user.configuration.phone,
      checkboxEmail: userStore.user.configuration.email,
      checkboxReviews: userStore.user.configuration.show_reviews,
    };

    function switchTabLabel(isDisabled) {
      if (isDisabled) {
        isTabLabel.value = !isTabLabel.value;
      }
    }
    function getBirthDay(val) {
      return val?.split('-')[2];
    }
    function getBirthMonth(val) {
      return mockData.value.monthFromNumber[val?.split('-')[1]];
    }
    function getBirthYear(val) {
      return val?.split('-')[0];
    }
    function getWorkingLeg(val) {
      switch (val) {
        case 'Left':
          return 'Ліва';
          break;
        case 'Right':
          return 'Права';
          break;
        case 'Ліва':
          return 'Left';
          break;
        case 'Права':
          return 'Right';
          break;
      }
    }

    async function saveDataEdit(data) {
      const { valid } = await data.validate();

      if (!valid) {
        toast.error(t('errors.check-data'));
        return false;
      }

      toggleModal('change_data');
      changeDataModalConfig.value = {
        title: 'Подивитись зі сторони',
        button_1: 'Так, перейти до демонстрації',
        button_2: 'Ні, просто зберегти',
        btn_cancel_changes: EDIT_BUTTON_ACTIONS.CANCEL,
        right_btn_action: 'saveChanges',
        left_btn_action: 'showPreview',
        btn_with_1: 200,
        btn_with_2: 140,
      };
    }
    function cancelDataEdit() {
      toggleModal('change_data');
      changeDataModalConfig.value = {
        title: 'Вийти без збереження змін',
        description: 'Ви дійсно хочете вийти, скасувавши всі внесені зміни?',
        button_1: 'Ні, не виходити',
        button_2: 'Так, вийти',
        right_btn_action: 'declineChanges',
        left_btn_action: 'closeModal',
        btn_with_1: 124,
        btn_with_2: 90,
      };
    }

    function showPreview() {
      closeSubmitModal(false);
      toggleModal('public_profile');
    }

    function toggleEditMode() {
      isEditModeProfile.value = !isEditModeProfile.value;
    }

    function declineUserDataChanges(val = true) {
      closeSubmitModal(val);
    }

    async function handleSaveDataChanges() {
      saveUserDataChanges();
      closeSubmitModal(true);
    }

    const showHideMyEventsModal = () => {
      isHideMyEventsModalOpened.value = true;
    };

    const closeHideMyEventsModal = () => {
      isHideMyEventsModalOpened.value = false;
    };

    const closeReviewsModal = () => {
      isReviewsListModalOpened.value = false;
    };

    const showReviewsModal = () => {
      isReviewsListModalOpened.value = true;
    };

    function saveUserDataChanges() {
      const refProfileData = { ...myForm.value.getControledValues() };
      const {
        day,
        month,
        year,
        working_leg,
        config_email,
        config_phone,
        show_reviews,
        phone,
      } = refProfileData;
      const profileData = {
        ...refProfileData,
        birthday:
          year && month && day
            ? `${year}-${mockData.value.numberFromMonth[month]}-${day}`
            : null,
        gender: userStore.user.profile.gender,
        working_leg: getWorkingLeg(working_leg),
      };

      delete profileData.day;
      delete profileData.month;
      delete profileData.year;
      delete profileData.phone;
      delete profileData.config_email;
      delete profileData.config_phone;
      delete profileData.show_reviews;

      profileData.height = profileData.height ? profileData.height : null;
      profileData.weight = profileData.weight ? profileData.weight : null;

      const payload = {
        configuration: {
          email: config_email,
          phone: config_phone,
          show_reviews: show_reviews,
        },
        profile: {
          place: {
            place_name: 'string',
            lat: 90,
            lon: 180,
          },
          ...profileData,
        },
        get_planned_events: '1y',
        phone: phone,
      };

      API.UserService.updateProfileData(payload).then(() => {
        getMyProfile();
      });
    }
    function getMyProfile() {
      startSpinner();
      API.UserService.getMyProfile()
        .then((res) => {
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
            show_reviews: res.data.configuration?.show_reviews,
          };
          userInfo.value = res.data;
          userData.value = {
            ...res.data?.profile,
            phone: res.data?.phone,
            raiting: res.data?.raiting ? res.data?.raiting.toFixed(1) : null,
            working_leg: getWorkingLeg(res.data.profile?.working_leg),
            role: res.data?.role,
          };
          finishSpinner();
          userStore.$patch({
            user: res.data,
          });
          toast.success(t('profile.data-updated'));
        })
        .catch((e) => {
          finishSpinner();
        });
    }

    function changeTab(id, url, isDisabled) {
      if (isDisabled) return;
      mockData.tabs = mockData.tabs
        .map((item) => ({ ...item, isActive: false }))
        .map((item) => {
          return item.id === id ? { ...item, isActive: true } : item;
        });
      router.push(url);
    }

    function closeSubmitModal(isEditMode) {
      toggleModal('change_data');
      if (isEditMode) {
        toggleEditMode();
      }
    }

    async function closeModalAndHideEvents(ids) {
      startSpinner();
      closeHideMyEventsModal();
      await API.EventService.showOrHideMyEvents(ids);
      finishSpinner();
    }

    function toggleModal(val) {
      switch (val) {
        case 'edit_avatar':
          isModalActive.edit_avatar = !isModalActive.edit_avatar;
          break;
        case 'email':
          isModalActive.email = !isModalActive.email;
          break;
        case 'delete_acc':
          isModalActive.delete_acc = !isModalActive.delete_acc;
          break;
        case 'public_profile':
          const refProfileData = { ...myForm.value.getControledValues() };
          const {
            day,
            month,
            year,
            working_leg,
            config_email,
            planned_events,
            config_phone,
            show_reviews,
            position,
          } = refProfileData;
          const profileData = {
            ...refProfileData,
            birthday: `${year}-${mockData.value.numberFromMonth[month]}-${day}`,
            gender: userStore.user.profile.gender,
            avatar_url: userStore.getUserAvatar,
            position: position,
          };
          delete profileData.day;
          delete profileData.month;
          delete profileData.year;
          delete profileData.phone;
          delete profileData.config_email;
          delete profileData.config_phone;
          delete profileData.show_reviews;

          restData.value = {
            ...restData.value,
            configuration: {
              email: config_email,
              phone: config_phone,
              show_reviews: show_reviews,
              planned_events: planned_events,
            },
            profile: {
              ...profileData,
            },
            get_planned_events: '1y',
          };
          isModalActive.public_profile = !isModalActive.public_profile;
          break;
        case 'change_data':
          isModalActive.change_data = !isModalActive.change_data;
          break;
        case 'change_password':
          isModalActive.change_password = !isModalActive.change_password;
          break;
      }
    }

    function openEditPictureModal(modal, picture) {
      userAvatar.value = picture;
      toggleModal(modal);
    }

    function saveDataFromPreviewWindow() {
      toggleModal('public_profile');
      saveUserDataChanges();
      toggleEditMode();
    }

    function cancelChangesAndGoToTheNextRoute() {
      router.push(nextRoutePath.value);
      nextRoutePath.value = '';
    }

    onBeforeRouteLeave((to, from, next) => {
      if (
        isEditModeProfile.value &&
        !isModalActive.change_data &&
        !to.meta.noGuards
      ) {
        toggleModal('change_data');
        nextRoutePath.value = to.fullPath;
        changeDataModalConfig.value = {
          title: 'Вийти без збереження змін',
          description: 'Ви дійсно хочете вийти, скасувавши всі внесені зміни?',
          button_1: 'Ні, не виходити',
          button_2: 'Так, вийти',
          right_btn_action: 'cancelChanges',
          left_btn_action: 'closeModal',
          btn_with_1: 124,
          btn_with_2: 90,
        };
      } else {
        next();
      }
    });

    return {
      toggleEditMode,
      saveDataFromPreviewWindow,
      saveUserDataChanges,
      handleSaveDataChanges,
      declineUserDataChanges,
      changeTab,
      closeSubmitModal,
      toggleModal,
      switchTabLabel,
      saveDataEdit,
      cancelDataEdit,
      openEditPictureModal,
      getMyProfile,
      closeModalAndHideEvents,
      closeReviewsModal,
      showReviewsModal,
      cancelChangesAndGoToTheNextRoute,
      showPreview,
      showHideMyEventsModal,
      closeHideMyEventsModal,
      isEditModeProfile,
      changeDataModalConfig,
      mockData,
      isModalActive,
      profileMainSideHeight,
      userStore,
      checkboxData,
      isReviewsListModalOpened,
      userData,
      isHideMyEventsModalOpened,
      schema,
      formValues,
      myForm,
      userInfo,
      userRating,
      isMobile,
      reviewsTotalCount,
      isTabLabel,
      isTabletSize,
      restData,
      userAvatar,
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-e2e2e9: #e2e2e9;
$color-6f6f77: #6f6f77;
$color-dfdeed: #dfdeed;

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
    color: $color-e2e2e9;
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
    color: $--b-main-white-color;
    padding: 2px 8px;
    background: $color-6f6f77;
    border-radius: 6px;
    cursor: pointer;
    span {
      margin-right: 10px;
    }
  }
}
.b-user-cabinet {
  @media (min-width: 768px) {
    position: relative;
  }
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
    color: $--b-main-black-color;
  }
  .b-user-cabinet__subtitle {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    color: $--b-main-gray-color;
    margin-top: 4px;
  }
}
.b-user-cabinet__tab-block {
  display: flex;
  border-bottom: 1px solid $color-dfdeed;
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
    color: $--b-main-black-color;
    user-select: none;
    cursor: pointer;
    position: relative;
    img {
      margin-right: 8px;
    }
    &.active {
      border-bottom: 2px solid $--b-main-black-color;
    }
    &.disabled {
      color: $--b-disabled-color;
    }

    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.4s ease;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }
}
.b-user-cabinet__my-profile-tab {
  overflow-y: scroll;
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 24px;
    @media (min-width: 1200px) {
      justify-content: space-between;
    }
    @include tabletAndMobile {
      display: block;
    }
    .b-user-cabinet__buttons-block {
      position: absolute;
      top: 5px;
      right: 0;
    }
    .b-user-cabinet__mobile-tablet-block {
      padding-right: 16px;
      @media (min-width: 1400px) {
        flex-basis: 372px;
      }
      @media (min-width: 1200px) and (max-width: 1400px) {
        flex-basis: 320px;
      }
      @media (min-width: 768px) and (max-width: 1200px) {
        flex-basis: 49%;
      }
      @include mobile {
        padding-right: 0px;
      }
    }
  }
}
</style>
