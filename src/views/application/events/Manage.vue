<template>
  <SubmitModal
    v-if="isSubmitModalOpened"
    :config="changeDataModalConfig"
    @closeModal="closeSubmitModal"
    @cancelAndGoToTheNextPage="cancelAndGoToTheNextPage"
    @continue="closeSubmitModal"
  />
  <div class="b-manage-event">
    <Form
      ref="myForm"
      v-slot="data"
      :initial-values="eventData"
      :validation-schema="schema"
      @submit="disableFormSubmit"
    >
      <SelectFormsColorsModal
        v-if="isSelectFormColarModalOpened"
        :formsData="eventForms"
        :selectedTab="formsModalSelectedTabId"
        @closeModal="closeSelectFormsModal"
        @saveData="saveForms($event, data)"
      />
      <div class="b-manage-event__page-title">
        <span v-if="manageAction === manageEventActionTypes.CREATE">
          {{ $t('events.event-creation') }}
        </span>
        <span v-else>
          {{ $t('events.event-update') }}
        </span>
      </div>
      <div class="b-manage-event__main-body">
        <div
          class="b-manage-event__create-event-block"
          :style="`height: ${createEventMainBlockHeight}`"
        >
          <ManageEventFirstStep
            v-if="currentStep === 1"
            :initialValues="eventData"
            @changeEventLocation="getNewEventLocation($event, data)"
            @selectEventDuration="runOnSelectEventDuration($event, data)"
            @changeEventDate="setEventDate($event, data)"
          />
          <ManageEventSecondStep
            v-if="currentStep === 2"
            :filteredUsersList="relevantUsersList"
            :filterUsersListLoading="searchUsersLoading"
            :invitedUsersList="invitedUsers"
            :initialValues="eventData"
            @searchUsers="searchRelevantUsers"
            @invite-user="inviteUsetToTheEvent"
            @changedEventPrivacyToFree="updateEventPriceAfterSelectFree(data)"
          />
          <ManageEventThirdStep
            v-if="currentStep === 3"
            :formsValue="eventForms"
            :initialValues="eventData"
            @selectNeedForm="selectNeedForm($event, data)"
            @setForms="openSelectFormsModal"
            @changeForms="openSelectFormsModal"
          />

          <div class="b-manage-event__progress-line">
            <div class="b-manage-event__sections">
              <div
                v-for="item of 3"
                :key="item"
                :class="[
                  'b-manage-event__section',
                  {
                    active: item <= currentStep,
                  },
                ]"
              ></div>
            </div>
          </div>

          <div class="b-manage-event__buttons-block">
            <WhiteBtn
              :text="whiteBtn.text"
              :main-color="'$--b-main-black-color'"
              :height="35"
              @click-function="changeStep('-', data)"
            />
            <GreenBtn
              :text="greenBtn.text"
              :icon-right="greenBtn.icon"
              :height="35"
              @click-function="changeStep('+', data)"
            />
          </div>
          <div class="b-manage-event__manage-buttons-block">
            <span @click="showPreviewEventModal">
              {{ $t('buttons.preview') }}
            </span>
            <span @click="showEventInvitedUsersListModal">
              {{ $t('buttons.invited-users') }}
            </span>
          </div>
        </div>

        <Transition name="slide">
          <PreviewInvitedUsersListModal
            v-if="isEventInvitedUsersListModal && invitedUsers.length"
            :invitedUsers="invitedUsers"
            :acceptedUsers="acceptedUsers"
            :manageAction="manageAction"
            @removeInvitedUser="removeInvitedUser"
            @closeModal="closeEventInvitedUsersListModal"
          />
        </Transition>

        <div class="b-manage-event-preview__block">
          <PreviewBlock :eventData="eventPreviewData" />
          <Transition name="slide">
            <PreviewEventModal
              v-if="isEventPreivewModalOpened"
              :eventData="eventPreviewData"
              @closeModal="closePreviewEventModal"
            />
          </Transition>

          <RemoveInvitedUsersModal
            v-if="removeInvitedUsersModalOpened"
            @closeModal="closeRemoveUsersModal"
            @deleteUsers="removeAllInvitedUsers"
          />

          <InvitedUsersList
            class="b-manage-event-invited-users__list"
            :invitedUsers="invitedUsers"
            :acceptedUsers="acceptedUsers"
            @removeInvitedUser="removeInvitedUser"
            @openRemoveUsersModal="openRemoveUsersModal"
          />
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form } from '@system.it.flumx.com/vee-validate';

import { merge } from 'lodash';

import MainInput from '@sharedComponents/input/MainInput.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import WhiteBtn from '@sharedComponents/button/WhiteBtn.vue';
import ManageEventFirstStep from '@mainComponents/manageEvent/ManageEventFirstStep.vue';
import userAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';
import PreviewBlock from '@mainComponents/manageEvent/PreviewBlock.vue';
import EventCard from '@mainComponents/events/EventCard.vue';
import ManageEventSecondStep from '@mainComponents/manageEvent/ManageEventSecondStep.vue';
import ManageEventThirdStep from '@mainComponents/manageEvent/ManageEventThirdStep.vue';
import RemoveInvitedUsersModal from '@mainComponents/manageEvent/modals/RemoveInvitedUsersModal.vue';
import SelectFormsColorsModal from '@mainComponents/manageEvent/modals/SelectFormsColorsModal.vue';
import InvitedUsersList from '@mainComponents/manageEvent/InvitedUsersList.vue';
import PreviewInvitedUsersListModal from '@mainComponents/events/modals/PreviewInvitedUsersListModal.vue';
import PreviewEventModal from '@mainComponents/events/modals/PreviewEventModal.vue';
import SubmitModal from '@sharedComponents/modals/SubmitModal.vue';


import { useUserDataStore } from '@/stores/userData';

import { calcHeight } from '@workers/window-size-worker/calcHeight';
import { finishSpinner, startSpinner } from '@workers/loading-worker/loading.worker';
import { disableFormSubmit } from '@utils/disableFormSubmit';

import { runOnSelectEventDuration } from '@utils/runOnSelectEventDuration';

import { ROUTES } from '@routes/router.const';
import { SCHEMAS } from '@/validators/schemas';

import Arrow from '@images/arrow-right-white.svg';

export default {
  name: 'CreateEventPage',
  components: {
    MainInput,
    GreenBtn,
    WhiteBtn,
    ManageEventFirstStep,
    ManageEventSecondStep,
    ManageEventThirdStep,
    EventCard,
    Form,
    SelectFormsColorsModal,
    PreviewBlock,
    userAvatar,
    InvitedUsersList,
    PreviewInvitedUsersListModal,
    RemoveInvitedUsersModal,
    PreviewEventModal,
    SubmitModal,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const currentStep = ref(1);
    const startDate = ref('');
    const userStore = useUserDataStore();
    const searchUsersLoading = ref(false);
    const relevantUsersList = ref([]);
    const isSelectFormColarModalOpened = ref(false);
    const removeInvitedUsersModalOpened = ref(false);
    const manageAction = ref(route.meta.action);
    const isEventInvitedUsersListModal = ref(false);
    const isEventPreivewModalOpened = ref(false);
    const isSubmitModalOpened = ref(false);
    const changeDataModalConfig = ref('');
    const isEventCreated = ref(false);
    const myForm = ref();
    const nextRoute = ref(ROUTES.APPLICATION.EVENTS.absolute);

    const manageEventActionTypes = ref({
      CREATE: 'CREATE',
      EDIT: 'EDIT',
    });

    const eventData = ref(
      route.meta?.eventData || {
        name: '',
        place: {},
        status: 'Planned',
        gender: null,
        description: '',
        type: '',
        need_ball: false,
        duration: null,
        need_form: null,
        date_and_time: '',
        forms: {},
        contact_number: userStore.user.phone,
        count_current_users: 0,
        count_current_fans: 0,
        current_users: [],
      }
    );

    const eventPreviewData = computed(() => {
      eventData.value = merge(
        eventData.value,
        myForm.value?.getControledValues()
      );
      return eventData.value;
    });

    const { calculatedHeight } = calcHeight(
      [90, 32, 20],
      [userStore.user.is_verified ? 0 : 40],
      [userStore.user.is_verified ? 0 : 40],
      true
    );
    
    const createEventMainBlockHeight = computed(() => {
      return `${calculatedHeight.value}px`;
    });

    const invitedUsers = ref([]);
    const acceptedUsers = ref(eventData.value.current_users);

    const formsModalSelectedTabId = ref(eventData.value.need_form ? 1 : 2);

    const eventForms = ref(eventData.value.forms);
    let searchTimeout;

    const schema = computed(() => {
      return SCHEMAS.manageEvent.schema(currentStep.value);
    });

    const getNewEventLocation = (location, data) => {
      data.values.place = {
        place_name: location.place,
        lat: location.lat,
        lon: location.lng,
      };
    };

    const greenBtn = computed(() => {
      let text;
      if (currentStep.value !== 3) {
        text = t('buttons.next');
      } else if (
        currentStep.value === 3 &&
        manageAction.value === manageEventActionTypes.value.CREATE
      ) {
        text = t('buttons.publish');
      } else {
        text = t('buttons.save-changes');
      }
      return {
        text: text,
        icon: currentStep.value !== 3 ? Arrow : null,
      };
    });

    const whiteBtn = computed(() => {
      let text;
      if (currentStep.value !== 1) {
        text = t('buttons.back');
      } else {
        text = t('buttons.cancel');
      }
      return {
        text: text,
      };
    });

    const openRemoveUsersModal = () => {
      removeInvitedUsersModalOpened.value = true;
    };

    const setEventDate = (date_value, data) => {
      data.values.date = date_value;
    };

    const openSelectFormsModal = () => {
      isSelectFormColarModalOpened.value = true;
    };

    const closeSelectFormsModal = () => {
      isSelectFormColarModalOpened.value = false;
    };

    const selectNeedForm = (needForm, data) => {
      eventForms.value = {};
      data.values.forms = {};
      switch (needForm) {
        case true:
          formsModalSelectedTabId.value = 1;
          break;
        case false:
          formsModalSelectedTabId.value = 2;
          break;
      }
    };

    const saveForms = (forms, data) => {
      switch (data.values.need_form) {
        case true:
          data.values.forms = {
            type: 'Forms',
            first_team: {
              t_shirts: forms.first_team.t_shirts,
              shorts: forms.first_team.shorts,
            },
            second_team: {
              t_shirts: forms.second_team.t_shirts,
              shorts: forms.second_team.shorts,
            },
          };
          break;
        case false:
          data.values.forms = {
            type: 'ShirtFronts',
            first_team: {
              shirtfronts: forms.first_team.shirtfronts,
            },
            second_team: {
              shirtfronts: forms.second_team.shirtfronts,
            },
          };
          break;
      }
      eventForms.value = data.values.forms;
      closeSelectFormsModal();
    };

    const updateEventPriceAfterSelectFree = (data) => {
      data.values.price = null;
      data.values.price_description = null;
    };

    const closeRemoveUsersModal = () => {
      removeInvitedUsersModalOpened.value = false;
    };

    const SKIPIDS = [
      eventData.value.author?.id
        ? eventData.value.author.id
        : userStore.user.id,
      ...(eventData.value?.current_users?.map((user) => user.id) ?? []),
      ...(eventData.value?.current_fans?.map((fan) => fan.id) ?? []),
    ];

    const getRelevantUsers = async (options) => {
      searchUsersLoading.value = true;
      let response = await API.UserService.getRelevantUsers({
        search: options?.search,
        skipids: options?.skipids,
      });
      relevantUsersList.value = response.data.results;
      searchUsersLoading.value = false;
    };

    const inviteUsetToTheEvent = (user_data) => {
      invitedUsers.value.push(user_data);
    };

    const searchRelevantUsers = (searchValue) => {
      clearTimeout(searchTimeout);
      searchUsersLoading.value = true;
      const relevantSearch = () => {
        getRelevantUsers({ search: searchValue, skipids: SKIPIDS });
      };
      searchTimeout = setTimeout(relevantSearch, 500);
    };

    getRelevantUsers({ skipids: SKIPIDS });

    const removeInvitedUser = (user_id) => {
      invitedUsers.value = invitedUsers.value.filter(function (item) {
        return item.id !== user_id;
      });
    };

    const removeAllInvitedUsers = () => {
      invitedUsers.value = [];
      closeRemoveUsersModal();
    };

    const icons = computed(() => {
      return {
        arrowRight: Arrow,
      };
    });

    const showEventInvitedUsersListModal = () => {
      if (invitedUsers.value.length) {
        isEventInvitedUsersListModal.value = true;
      }
    };

    const closeEventInvitedUsersListModal = () => {
      isEventInvitedUsersListModal.value = false;
    };

    const showPreviewEventModal = () => {
      isEventPreivewModalOpened.value = true;
    };

    const closePreviewEventModal = () => {
      isEventPreivewModalOpened.value = false;
    };

    async function saveEvent(data) {
      let emitName;
      startSpinner();
      isEventCreated.value = true;

      data.date_and_time = `${data.date} ${data.time}`;

      data.current_users = invitedUsers.value.map((user) => user.id);

      try {
        switch (manageAction.value) {
          case manageEventActionTypes.value.CREATE:
            await API.EventService.createOneEvent(data);
            finishSpinner();
            emitName = 'EventCreated';
            break;
          case manageEventActionTypes.value.EDIT:
            await API.EventService.editOneEvent(route.params.id, data);
            finishSpinner();
            emitName = 'EventUpdated';
            break;
        }
        cancelAndGoToTheNextPage();
        setTimeout(() => {
          EventBusInstance.emit(emitName);
        }, 100);
      } catch {}
    }

    const openSumbitModal = () => {
      switch (manageAction.value) {
        case manageEventActionTypes.value.CREATE:
          changeDataModalConfig.value = {
            title: 'Скасування створення події',
            description: 'Ви дійсно бажаєте скасувати створення події?',
            button_1: 'Ні, продовжити',
            button_2: 'Так, cкасувати',
            right_btn_action: 'cancelAndGoToTheNextPage',
            left_btn_action: 'continue',
            btn_with_1: 132,
            btn_with_2: 132,
          };
          isSubmitModalOpened.value = true;
          break;
        case manageEventActionTypes.value.EDIT:
          changeDataModalConfig.value = {
            title: 'Скасування редагування події',
            description: 'Ви дійсно бажаєте скасувати редагування події?',
            button_1: 'Ні, продовжити',
            button_2: 'Так, cкасувати',
            right_btn_action: 'cancelAndGoToTheNextPage',
            left_btn_action: 'continue',
            btn_with_1: 132,
            btn_with_2: 132,
          };
          isSubmitModalOpened.value = true;
          break;
      }
    };

    const closeSubmitModal = () => {
      isSubmitModalOpened.value = false;
    };

    function cancelAndGoToTheNextPage() {
      router.push(nextRoute.value);
    }

    async function changeStep(val, data) {
      eventData.value = merge(eventData.value, data.values);

      if (val === '-') {
        if (currentStep.value === 1) {
          return openSumbitModal();
        }
        return this.currentStep--;
      }

      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }

      if (val === '+') {
        if (currentStep.value === 3) {
          return saveEvent(eventData.value);
        }
        this.currentStep++;
      }
    }

    onBeforeRouteLeave((to, from, next) => {
      if (
        !isSubmitModalOpened.value &&
        !isEventCreated.value &&
        !to.meta.noGuards
      ) {
        nextRoute.value = to.fullPath;
        openSumbitModal();
      } else {
        next();
      }
    });


    return {
      currentStep,
      changeDataModalConfig,
      icons,
      schema,
      searchUsersLoading,
      relevantUsersList,
      invitedUsers,
      acceptedUsers,
      startDate,
      greenBtn,
      isSelectFormColarModalOpened,
      removeInvitedUsersModalOpened,
      eventData,
      eventPreviewData,
      isEventPreivewModalOpened,
      isEventInvitedUsersListModal,
      myForm,
      formsModalSelectedTabId,
      isSubmitModalOpened,
      createEventMainBlockHeight,
      eventForms,
      manageAction,
      whiteBtn,
      manageEventActionTypes,
      getNewEventLocation,
      showEventInvitedUsersListModal,
      openSelectFormsModal,
      closeSubmitModal,
      showPreviewEventModal,
      selectNeedForm,
      cancelAndGoToTheNextPage,
      runOnSelectEventDuration,
      closeEventInvitedUsersListModal,
      updateEventPriceAfterSelectFree,
      inviteUsetToTheEvent,
      closePreviewEventModal,
      changeStep,
      saveForms,
      removeAllInvitedUsers,
      saveEvent,
      removeInvitedUser,
      closeSelectFormsModal,
      searchRelevantUsers,
      openRemoveUsersModal,
      closeRemoveUsersModal,
      setEventDate,
      disableFormSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-cddde0: #cddde0;
$color-578d95: #578d95;
$color-dfdeed: #dfdeed;
$color-1ab2ad: #1ab2ad;
$color-8a8aa8: #8a8aa8;

.b-manage-event__main-body {
  margin-top: 0px;
  padding: 5px;
  @include tabletAndMobile {
    padding: 0px;
  }
}
.b-manage-event {
  overflow: hidden;
  @include calc-height;
  ::-webkit-scrollbar {
    display: none;
  }
  form {
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  &__page-title {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
    color: $--b-main-black-color;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include tabletAndMobile {
      padding: 0;
    }
    .b-manage-event__btns-mob-block {
      @media (min-width: 1200px) {
        display: none;
      }
      @include tabletAndMobile {
        width: 100%;
      }
    }
  }
  &__main-body {
    display: flex;
    margin-top: 20px;
    height: 100%;
    overflow: hidden;

    .b-manage-event__create-event-block {
      overflow-y: scroll;
      width: 420px;
      padding: 20px;
      position: relative;
      box-shadow: 2px 6px 10px rgba(56, 56, 251, 0.1);
      border-radius: 0px 6px 6px 0px;
      @media (min-width: 1200px) and (max-width: 1400px) {
        width: 360px;
      }
      @media (min-width: 768px) and (max-width: 1199px) {
        margin-right: 16px;
        width: 450px;
        min-width: 350px;
        padding: 12px;
      }
      @include tabletAndMobile {
        width: 100%;
        padding: 20px 0px;
        padding-top: 0px;
      }
      .b-manage-event__progress-line {
        margin-top: 20px;
        padding-top: 24px;
        border-top: 1px dashed $color-dfdeed;
        .b-manage-event__sections {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 5px;
          .b-manage-event__section {
            flex-basis: 33%;
            height: 4px;
            border-radius: 2px;
            background: $color-cddde0;
            &.active {
              background: $color-578d95;
            }
          }
        }
      }
      .b-manage-event__buttons-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        :deep(.b_white-btn) {
          border: 1px solid $color-dfdeed;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          text-align: center;
          color: $--b-main-gray-color;
          flex-basis: 48%;
        }
        :deep(.b-green-btn) {
          flex-basis: 48%;
        }
      }
      .b-manage-event__manage-buttons-block {
        width: 100%;
        background: rgba(239, 239, 246, 0.7);
        border: 1px solid $color-dfdeed;
        border-radius: 8px;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        margin-top: 8px;
        display: none;

        @include tabletAndMobile {
          display: flex;
        }

        span {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          text-align: right;
          color: $--b-main-gray-color;
        }
      }
    }

    .b-manage-event-invited-users__list {
      @include tabletAndMobile {
        display: none;
      }
    }
    .b-manage-event__btns-desktop-block {
      @media (max-width: 1200px) {
        display: none;
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

.b-manage-event-preview__block {
  margin-left: 50px;
  @include tabletAndMobile {
    margin-left: 0px;
  }
}
</style>
