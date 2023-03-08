<template>
  <Loading :is-loading="eventCreateLoader"></Loading>
  <div class="b-manage-event">
    <Form
      v-slot="data"
      :initial-values="eventPreviewData"
      :validation-schema="schema"
      @submit="disableSubmit"
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
        <div class="b-manage-event__btns-mob-block">
          <ButtonsBlock
            :save-btn-text="$t('buttons.save')"
            :white-btn-width="null"
            :green-btn-width="105"
            :green-btn-height="28"
            @save-btn-click="saveEvent(data)"
          />
        </div>
      </div>
      <div class="b-manage-event__main-body">
        <div class="b-manage-event__create-event-block">
          <ManageEventFirstStep
            :currentStep="currentStep"
            :initialValues="eventPreviewData"
            @changeEventLocation="getNewEventLocation($event, data)"
            @selectEventDuration="runOnSelectEventDuration($event, data)"
            @changeEventDate="setEventDate($event, data)"
          />
          <ManageEventSecondStep
            :currentStep="currentStep"
            :filteredUsersList="relevantUsersList"
            :filterUsersListLoading="searchUsersLoading"
            :invitedUsersList="invitedUsers"
            :initialValues="eventPreviewData"
            @searchUsers="searchRelevantUsers"
            @invite-user="inviteUsetToTheEvent"
            @changedEventPrivacyToFree="updateEventPriceAfterSelectFree(data)"
          />
          <ManageEventThirdStep 
            :currentStep="currentStep"
            :formsValue="eventForms"
            :initialValues="eventPreviewData"
            @selectNeedForm="selectNeedForm($event, data)"
            @setForms="openSelectFormsModal"
            @changeForms="openSelectFormsModal"/>

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
          <InvitedUsersListModal
            v-if="isEventInvitedUsersListModal && invitedUsers.length"
            :invitedUsers="invitedUsers"
            @removeInvitedUser="removeInvitedUser"
            @closeModal="closeEventInvitedUsersListModal"
          />            
        </Transition>

        <div class="b-manage-event-preview__block">
          <PreviewBlock :eventData="data.values" />
          <Transition name="slide">
          <PreviewEventModal
            v-if="isEventPreivewModalOpened"
            :eventData="data.values"
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
            @removeInvitedUser="removeInvitedUser"
            @openRemoveUsersModal="openRemoveUsersModal"
          />
        </div>

        <div class="b-manage-event__btns-desktop-block">
          <ButtonsBlock
            :save-btn-text="$t('buttons.save-as-template')"
            :white-btn-width="208"
            :green-btn-width="208"
          />
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

import { Form } from '@system.it.flumx.com/vee-validate'

import { storeToRefs } from "pinia"

import InputComponent from '../../../components/forms/InputComponent.vue'
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import ManageEventFirstStep from '../../../components/manage-event-components/ManageEventFirstStep.vue'
import Avatar from '../../../components/Avatar.vue'
import PreviewBlock from '../../../components/manage-event-components/PreviewBlock.vue'
import EventCard from '../../../components/event-components/EventCard.vue'
import ManageEventSecondStep from '../../../components/manage-event-components/ManageEventSecondStep.vue'
import ManageEventThirdStep from '../../../components/manage-event-components/ManageEventThirdStep.vue'
import ButtonsBlock from '../../../components/manage-event-components/ButtonsBlock.vue'
import RemoveInvitedUsersModal from '../../../components/manage-event-components/RemoveInvitedUsersModal.vue'
import Loading from '../../../workers/loading-worker/Loading.vue'
import SelectFormsColorsModal from '../../../components/ModalWindows/SelectFormsColorsModal.vue'
import InvitedUsersList from '../../../components/manage-event-components/InvitedUsersList.vue'
import InvitedUsersListModal from '../../../components/ModalWindows/InvitedUsersListModal.vue'
import PreviewEventModal from '../../../components/ModalWindows/PreviewEventModal.vue'

import { API } from '../../../workers/api-worker/api.worker'
import { useUserDataStore } from '../../../stores/userData'
import { BlanballEventBus } from '../../../workers/event-bus-worker'

import { ROUTES } from '../../../router/router.const'
import SCHEMAS from '../../../validators/schemas'

import Arrow from '../../../assets/img/arrow-right-white.svg'

const manageEventActionTypes = ref(
  {
    CREATE: 'CREATE'
  },
  {
    EDIT: 'EDIT'
  }
)

export default {
  name: 'CreateEventPage',
  components: {
    InputComponent,
    GreenBtn,
    WhiteBtn,
    ManageEventFirstStep,
    ManageEventSecondStep,
    ManageEventThirdStep,
    ButtonsBlock,
    EventCard,
    Form,
    SelectFormsColorsModal,
    PreviewBlock,
    Avatar,
    Loading,
    InvitedUsersList,
    InvitedUsersListModal,
    RemoveInvitedUsersModal,
    PreviewEventModal,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n()
    const currentStep = ref(1)
    const startDate = ref('')
    const userStore = useUserDataStore()
    const { user } = storeToRefs(userStore)
    const searchUsersLoading = ref(false)
    const relevantUsersList = ref([])
    const eventCreateLoader = ref(false)
    const invitedUsers = ref([])
    const isSelectFormColarModalOpened = ref(false)
    const removeInvitedUsersModalOpened = ref(false);
    const manageAction = ref(route.meta.action);
    const isEventInvitedUsersListModal = ref(false);
    const isEventPreivewModalOpened = ref(false);
    
    const eventPreviewData = ref(route.meta?.eventData ||
    {
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
      contact_number: user.value.phone,
      count_current_users: 0,
      count_current_fans: 0,
      current_users: [],
    })

    const formsModalSelectedTabId = ref(
      eventPreviewData.value.need_form ? 1 : 2
    )

    const eventForms = ref(eventPreviewData.value.forms);
    let searchTimeout

    const schema = computed(() => {
      return SCHEMAS.manageEvent.schema(currentStep.value)
    })

    const getNewEventLocation = (location, data) => {
      data.values.place = {
        place_name: location.place,
        lat: location.lat,
        lon: location.lng,
      }
    }

    const greenBtn = computed(() => {
      let text;
      if (currentStep.value !== 3) {
        text = t('buttons.next')
      } else if (currentStep.value === 3 && manageAction.value === manageEventActionTypes.value.CREATE) {
        text = t('buttons.publish')
      } else {
        text = t('buttons.save-changes')
      }
      return {
        text: text,
        icon: currentStep.value !== 3 ? Arrow : null
      }
    })

    const whiteBtn = computed(() => {
      let text;
      if (currentStep.value !== 1) {
        text = t('buttons.back')
      } else {
        text = t('buttons.cancel')
      }
      return {
        text: text,
      }
    })

    const openRemoveUsersModal = () => {
      removeInvitedUsersModalOpened.value = true
    }

    const setEventDate = (date_value, data) => {
      data.values.date = date_value
    }

    const openSelectFormsModal = () => {
      isSelectFormColarModalOpened.value = true
    }

    const closeSelectFormsModal = () => {
      isSelectFormColarModalOpened.value = false
    }

    const selectNeedForm = (needForm, data) => {
      eventForms.value = {}
      data.values.forms = {}
      switch(needForm) {
        case true:
          formsModalSelectedTabId.value = 1
          break
        case false:
          formsModalSelectedTabId.value = 2
          break
      }
    }

    const saveForms = (forms, data) => {
      switch(data.values.need_form) {
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
            }
          }
          break
        case false:
          data.values.forms = {
            type: 'ShirtFronts',
            first_team: {
              shirtfronts: forms.first_team.shirtfronts,
            },
            second_team: {
              shirtfronts: forms.second_team.shirtfronts,
            }
          }
          break
      }
      eventForms.value = data.values.forms
      closeSelectFormsModal()
    }

    function addZeroBefore(n) {
      return (n < 10 ? '0' : '') + n
    }

    const updateEventPriceAfterSelectFree = (data) => {
      data.values.price = null
      data.values.price_description = null
    }

    const runOnSelectEventDuration = (durationValue, data) => {
      let eventStartTime;
      if (data.values.time) {
        let timeStr = data.values.time;
        let [hours, minutes] = timeStr.split(":").map(Number);
        let date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        eventStartTime = date;
      } else {
        eventStartTime = new Date(new Date().getTime() + 65 * 60000)
      }
      const eventEndDateTime = new Date(
        eventStartTime.getTime() + durationValue
      )
      data.values.time = `${addZeroBefore(
        eventStartTime.getHours()
      )}:${addZeroBefore(eventStartTime.getMinutes())}`
      data.values.end_time = `${addZeroBefore(
        eventEndDateTime.getHours()
      )}:${addZeroBefore(eventEndDateTime.getMinutes())}`
      data.values.duration = durationValue / 60000
    }

    const closeRemoveUsersModal = () => {
      removeInvitedUsersModalOpened.value = false
    }

    const getRelevantUsers = async (options) => {
      searchUsersLoading.value = true
      let response = await API.UserService.getRelevantUsers(options)
      relevantUsersList.value = response.data.results
      searchUsersLoading.value = false
    }

    const inviteUsetToTheEvent = (user_data) => {
      invitedUsers.value.push(user_data)
    }

    const searchRelevantUsers = (searchValue) => {
      clearTimeout(searchTimeout)
      searchUsersLoading.value = true
      const relevantSearch = () => {
        getRelevantUsers({ search: searchValue, skipids: user.value.id })
      }
      searchTimeout = setTimeout(relevantSearch, 500)
    }

    getRelevantUsers({ skipids: user.value.id })

    const removeInvitedUser = (user_id) => {
      invitedUsers.value = invitedUsers.value.filter(function (item) {
        return item.id !== user_id
      })
    }

    const removeAllInvitedUsers = () => {
      invitedUsers.value = []
      closeRemoveUsersModal()
    }

    const icons = computed(() => {
      return {
        arrowRight: Arrow,
      }
    })


    const showEventInvitedUsersListModal = () => {
      if (invitedUsers.value.length) {
        isEventInvitedUsersListModal.value = true
      }
    }

    const closeEventInvitedUsersListModal = () => {
      isEventInvitedUsersListModal.value = false
    }

    const showPreviewEventModal = () => {
      isEventPreivewModalOpened.value = true
    }

    const closePreviewEventModal = () => {
      isEventPreivewModalOpened.value = false
    }


    async function saveEvent(data) {
      eventCreateLoader.value = true
      const createEventData = data.values

      createEventData.date_and_time = `${createEventData.date} ${createEventData.time}`

      createEventData.current_users = invitedUsers.value.map((user) => user.id)

      try {
        switch(manageAction.value) {
          case 'CREATE':
            await API.EventService.createOneEvent(createEventData)
            eventCreateLoader.value = false
            break
          case 'EDIT':
            await API.EventService.editOneEvent(route.params.id, createEventData)
            eventCreateLoader.value = false
            break
        }
        router.push(ROUTES.APPLICATION.EVENTS.absolute)
        setTimeout(() => BlanballEventBus.emit('EventCreated'), 100)
      } catch {}
    }

    async function changeStep(val, data) {
      
      if (currentStep.value === 1 && val === '-') {
        return router.push(ROUTES.APPLICATION.EVENTS.absolute)
      }

      if (val === '-') {
        return this.currentStep--
      }

      const { valid } = await data.validate()

      if (!valid) {
        return false
      }

      if (currentStep.value === 3 && val === '+') {
        return saveEvent(data)
      }

      if (val === '+') {
        this.currentStep++
      }
    }

    return {
      currentStep,
      icons,
      schema,
      searchUsersLoading,
      relevantUsersList,
      invitedUsers,
      startDate,
      greenBtn,
      isSelectFormColarModalOpened,
      removeInvitedUsersModalOpened,
      eventPreviewData,
      isEventPreivewModalOpened,
      isEventInvitedUsersListModal,
      eventCreateLoader,
      formsModalSelectedTabId,
      eventForms,
      manageAction,
      whiteBtn,
      manageEventActionTypes,
      getNewEventLocation,
      showEventInvitedUsersListModal,
      openSelectFormsModal,
      showPreviewEventModal,
      selectNeedForm,
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
    }
  },
}
</script>

<style lang="scss" scoped>

// SCSS variables for hex colors
 $color-dfdeed: #dfdeed;
 $color-1ab2ad: #1ab2ad;
 $color-8a8aa8: #8a8aa8;


.b-manage-event__main-body {
  margin-top: 0px;
}
.b-manage-event {
  overflow: hidden;
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
    span {
      @include tabletAndMobile {
        display: none;
      }
    }
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
    justify-content: space-between;
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
      height: 100%;
      @media (min-width: 1200px) and (max-width: 1400px) {
        width: 360px;
      }
      @media (min-width: 768px) and (max-width: 1199px) {
        margin-right: 16px;
        width: 450px;
        min-width: 350px;
      }
      @include tabletAndMobile {
        width: 100%;
        padding: 20px 0px;
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
            &.active {
              background: $color-1ab2ad;
            }
          }
        }
      }
      .b-manage-event__buttons-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        ::v-deep(.b_white-btn) {
          border: 1px solid #DFDEED;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          text-align: center;
          color: #575775;
          flex-basis: 48%;
        }
        ::v-deep(.b-green-btn) {
          flex-basis: 48%;
        }
      }
      .b-manage-event__manage-buttons-block {
        width: 100%;
        background: rgba(239, 239, 246, 0.7);
        border: 1px solid #DFDEED;
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
          color: #575775;
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

</style>
