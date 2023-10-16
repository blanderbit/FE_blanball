<template>
  <div class="b-edit-event-modal__wrapper">
    <SubmitModal
      v-if="isSubmitModalOpened"
      :config="changeDataModalConfig"
      @closeModal="closeSubmitModal"
      @closeEventUpdateModal="$emit('closeEventUpdateModal')"
      @continue="closeSubmitModal"
    />
    <div class="b-edit-event-modal__modal-window">
      <div class="b-edit-event-modal__header">
        <img
          class="b-edit-event-modal__close"
          src="@images/cross.svg"
          alt=""
          @click="openSubmitModal"
        />
        <div class="b-edit-event-modal__title">
          {{ $t('events.event-update') }}
        </div>
        <div class="b-edit-event-modal__subtitle">
          Оберіть кольори форм або маніжок для команд
        </div>
      </div>
      <Form
        v-slot="data"
        :initial-values="eventData"
        @submit="disableFormSubmit"
        :validation-schema="schema"
      >
        <div class="b-edit-event-modal__main-side">
          <Teleport to="body">
            <SelectFormsColorsModal
              v-if="isSelectFormColarModalOpened"
              :formsData="eventForms"
              :selectedTab="1"
              @closeModal="closeSelectFormsModal"
              @saveData="saveForms($event, data)"
            />
          </Teleport>

          <div class="b-main-side__first-step">
            <ManageEventFirstStep
              :initialValues="eventData"
              @changeEventLocation="getNewEventLocation($event, data)"
              @selectEventDuration="runOnSelectEventDuration($event, data)"
              @changeEventDate="setEventDate($event, data)"
            />
          </div>
          <div class="b-main-side__second-step">
            <ManageEventSecondStep
              :filteredUsersList="relevantUsersList"
              :filterUsersListLoading="searchUsersLoading"
              :invitedUsersList="invitedUsers"
              :initialValues="eventData"
              @searchUsers="searchRelevantUsers"
              @invite-user="inviteUsetToTheEvent"
              @changedEventPrivacyToFree="updateEventPriceAfterSelectFree(data)"
            />
          </div>
          <div class="b-main-side__third-step">
            <ManageEventThirdStep
              :formsValue="eventForms"
              :initialValues="eventData"
              @selectNeedForm="selectNeedForm($event, data)"
              @setForms="openSelectFormsModal"
              @changeForms="openSelectFormsModal"
            />
          </div>
        </div>
        <div class="b-edit-event-modal__buttons-block">
          <WhiteBtn
            :text="$t('buttons.cancel-editing')"
            :main-color="'$--b-main-black-color'"
            :height="35"
            @click-function="openSubmitModal"
          />
          <GreenBtn
            :text="$t('buttons.save-changes')"
            :height="40"
            @click-function="editEvent(data)"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form } from '@system.it.flumx.com/vee-validate';

import ManageEventFirstStep from '@mainComponents/manageEvent/ManageEventFirstStep.vue';
import ManageEventSecondStep from '@mainComponents/manageEvent/ManageEventSecondStep.vue';
import ManageEventThirdStep from '@mainComponents/manageEvent/ManageEventThirdStep.vue';
import SelectFormsColorsModal from './SelectFormsColorsModal.vue';
import WhiteBtn from '@sharedComponents/button/WhiteBtn.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import SubmitModal from '@sharedComponents/modals/SubmitModal.vue';



import {
  startSpinner,
  finishSpinner,
} from '@workers/loading-worker/loading.worker';

import { runOnSelectEventDuration } from '@utils/runOnSelectEventDuration';

import { SCHEMAS } from '@validators/schemas';

export default {
  components: {
    ManageEventFirstStep,
    ManageEventSecondStep,
    ManageEventThirdStep,
    SelectFormsColorsModal,
    WhiteBtn,
    GreenBtn,
    Form,
    SubmitModal,
  },
  props: {
    eventDataValue: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const searchUsersLoading = ref(false);
    const relevantUsersList = ref([]);
    const isSelectFormColarModalOpened = ref(false);
    const isSubmitModalOpened = ref(false);

    const eventData = ref(props.eventDataValue);

    const invitedUsers = ref([]);

    const formsModalSelectedTabId = ref(eventData.value.need_form ? 1 : 2);

    const eventForms = ref(eventData.value.forms);
    let searchTimeout;

    const changeDataModalConfig = {
      title: 'Скасування редагування події',
      description: 'Ви дійсно бажаєте скасувати редагування події?',
      button_1: 'Ні, продовжити',
      button_2: 'Так, cкасувати',
      right_btn_action: 'closeEventUpdateModal',
      left_btn_action: 'continue',
      btn_with_1: 132,
      btn_with_2: 132,
    };

    const schema = computed(() => {
      return SCHEMAS.manageEvent.schema();
    });

    const getNewEventLocation = (location, data) => {
      data.values.place = {
        place_name: location.place,
        lat: location.lat,
        lon: location.lng,
      };
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

    const openSubmitModal = () => {
      isSubmitModalOpened.value = true;
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

    const closeSubmitModal = () => {
      isSubmitModalOpened.value = false;
    };

    const SKIPIDS = [
      eventData.value.author.id,
      ...eventData.value.current_users.map((user) => user.id),
      ...eventData.value.current_fans.map((fan) => fan.id),
    ];

    const searchRelevantUsers = (searchValue) => {
      clearTimeout(searchTimeout);
      searchUsersLoading.value = true;
      const relevantSearch = () => {
        getRelevantUsers({
          search: searchValue,
          skipids: SKIPIDS,
        });
      };
      searchTimeout = setTimeout(relevantSearch, 500);
    };

    getRelevantUsers({ skipids: SKIPIDS });

    async function editEvent(data) {
      const { valid } = await data.validate();

      if (!valid) {
        return false;
      }

      startSpinner();
      const createEventData = data.values;

      createEventData.date_and_time = `${createEventData.date} ${createEventData.time}`;

      createEventData.current_users = invitedUsers.value.map((user) => user.id);

      await API.EventService.editOneEvent(eventData.value.id, createEventData);
      finishSpinner();
      emit('closeEventUpdateModal');
      EventBusInstance.emit('EventUpdated');
    }
    return {
      searchUsersLoading,
      relevantUsersList,
      invitedUsers,
      isSelectFormColarModalOpened,
      eventData,
      changeDataModalConfig,
      isSubmitModalOpened,
      schema,
      formsModalSelectedTabId,
      eventForms,
      openSubmitModal,
      getNewEventLocation,
      openSelectFormsModal,
      selectNeedForm,
      closeSubmitModal,
      runOnSelectEventDuration,
      updateEventPriceAfterSelectFree,
      inviteUsetToTheEvent,
      saveForms,
      editEvent,
      closeSelectFormsModal,
      searchRelevantUsers,
      setEventDate,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-8a8aa8: #8a8aa8;

form {
  overflow: scroll;
}
.b-edit-event-modal__block-title {
  @include exo(16px, 700);
  line-height: 24px;
}
.b-edit-event-modal__wrapper {
  @include modal-wrapper;
  .b-edit-event-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 385px;
    height: 80%;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    background: $--b-main-white-color;
    padding: 20px 20px 28px 24px;

    .b-edit-event-modal__header {
      padding-bottom: 5px;
      .b-edit-event-modal__close {
        position: absolute;
        right: 20px;
        cursor: pointer;
      }
      .b-edit-event-modal__title {
        @include exo(22px, 700);
        line-height: 32px;
      }
      .b-edit-event-modal__subtitle {
        @include exo(12px, 400, $--b-main-gray-color);
        line-height: 20px;
        margin-top: 4px;
      }
    }
    .b-edit-event-modal__main-side {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .b-edit-event-modal__general-info {
        display: flex;
        flex-direction: column;
        gap: 16px 16px;
        margin-bottom: 20px;
        .b-general-info__dropdowns {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .b-general-info__dropdown {
            flex-basis: 48%;
          }
        }
      }
    }
    .b-edit-event-modal__buttons-block {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      :deep(.b_white-btn) {
        font-weight: 400;
        color: $--b-main-gray-color;
        width: 164px !important;
      }
      :deep(.b-green-btn) {
        width: 130px !important;
      }
    }
  }
}
</style>
