<template>
  <Loading :is-loading="eventCreateLoader"></Loading>
  <div class="b-manage-event">
    <Form
      v-slot="data"
      :initial-values="eventPreviewData"
      :validation-schema="schema"
      @submit="disableSubmit"
    >
      <div class="b-manage-event__page-title">
        <span>
          {{ $t('events.event-creation') }}
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
            @changeEventLocation="getNewEventLocation($event, data)"
            @selectEventDuration="runOnSelectEventDuration($event, data)"
            @changeEventDate="setEventDate($event, data)"
          />
          <ManageEventSecondStep
            :currentStep="currentStep"
            :filteredUsersList="relevantUsersList"
            :filterUsersListLoading="searchUsersLoading"
            :invitedUsersList="invitedUsers"
            @searchUsers="searchRelevantUsers"
            @invite-user="inviteUsetToTheEvent"
            @changedEventPrivacyToFree="updateEventPriceAfterSelectFree(data)"
          />
          <ManageEventThirdStep :currentStep="currentStep" />

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
              :text="$t('buttons.back')"
              :width="140"
              :main-color="'#262541'"
              :is-border="false"
              @click-function="changeStep('-', data)"
            />
            <GreenBtn
              :text="greenBtnText"
              :width="160"
              :icon-right="icons.arrowRight"
              @click-function="changeStep('+', data)"
            />
          </div>
        </div>

        <div class="b-manage-event-preview__block">
          <PreviewBlock :eventData="data.values" />

          <RemoveInvitedUsersModal
            v-if="removeInvitedUsersModalOpened"
            @closeModal="closeRemoveUsersModal"
            @deleteUsers="removeAllInvitedUsers"
          />

          <div class="b-manage-event__invited-users__list mt-10">
            <span class="b-user-what-you__invited" v-if="invitedUsers.length">
              {{ $t('events.invited-people') }}
            </span>
            <span
              class="b-remove-all__invited-users"
              @click="openRemoveUsersModal"
              >Видалити всіх</span
            >
            <div
              class="b-manage-event__invited-user"
              v-for="user in invitedUsers"
            >
              <div class="b-manage-event__invited-user-left__side">
                <avatar
                  class="b-invited-user__avatar"
                  :link="user.profile.avatar_url"
                  :avatarType="'small-square'"
                  :full-name="`${user.profile.name} ${user.profile.last_name}`"
                ></avatar>
                <span class="b-invited-user__position">{{
                  user.profile.position
                }}</span>
                <span class="b-invited-user__full-name">
                  {{ user.profile.name }} {{ user.profile.last_name }}
                </span>
              </div>
              <div class="b-invited-user-right__side">
                <img
                  class="b-remove-invited__user"
                  src="../../../assets/img/gray-cross.svg"
                  alt="gray-cross"
                  @click="removeInvitedUser(user.id)"
                />
              </div>
            </div>
          </div>
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
import { useRouter } from 'vue-router'

import { Form } from '@system.it.flumx.com/vee-validate'

import * as yup from 'yup'

import InputComponent from '../../../components/forms/InputComponent.vue'
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import SelectionSuitModal from '../../../components/suit/SelectionSuitModal.vue'
import ManageEventFirstStep from '../../../components/manage-event-components/ManageEventFirstStep.vue'
import Avatar from '../../../components/Avatar.vue'
import PreviewBlock from '../../../components/manage-event-components/PreviewBlock.vue'
import EventCard from '../../../components/event-components/EventCard.vue'
import ManageEventSecondStep from '../../../components/manage-event-components/ManageEventSecondStep.vue'
import ManageEventThirdStep from '../../../components/manage-event-components/ManageEventThirdStep.vue'
import ButtonsBlock from '../../../components/manage-event-components/ButtonsBlock.vue'
import RemoveInvitedUsersModal from '../../../components/manage-event-components/RemoveInvitedUsersModal.vue'
import Loading from '../../../workers/loading-worker/Loading.vue'

import { API } from '../../../workers/api-worker/api.worker'
import { useUserDataStore } from '../../../stores/userData'
import { BlanballEventBus } from '../../../workers/event-bus-worker'

import { ROUTES } from '../../../router/router.const'

import Arrow from '../../../assets/img/arrow-right-white.svg'

export default {
  name: 'CreateEventPage',
  components: {
    InputComponent,
    GreenBtn,
    WhiteBtn,
    ManageEventFirstStep,
    ManageEventSecondStep,
    ManageEventThirdStep,
    SelectionSuitModal,
    ButtonsBlock,
    EventCard,
    Form,
    PreviewBlock,
    Avatar,
    Loading,
    RemoveInvitedUsersModal,
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const currentStep = ref(1)
    const startDate = ref('')
    const userStore = useUserDataStore()
    const searchUsersLoading = ref(false)
    const relevantUsersList = ref([])
    const eventCreateLoader = ref(false)
    const invitedUsers = ref([])
    const removeInvitedUsersModalOpened = ref(false)
    let searchTimeout

    const eventFormTypes = {
      T_Shirt: 'T-Shirt',
      Shirt_Front: 'Shirt-Front',
    }

    const eventPreviewData = ref({
      name: '',
      place: {},
      status: 'Planned',
      gender: null,
      description: '',
      type: '',
      contact_number: userStore.user.phone,
      need_ball: false,
      duration: null,
      need_form: null,
      date_and_time: '',
      forms: {
        first_team: {},
        second_team: {},
      },
      count_current_users: 0,
      count_current_fans: 0,
      current_users: [],
    })

    const schema = computed(() => {
      if (currentStep.value === 1) {
        return yup.object({
          gender: yup.string().required('errors.required'),
          type: yup.string().required('errors.required'),
          name: yup
            .string()
            .required('errors.required')
            .max(255, 'errors.max255'),
          time: yup
            .string()
            .matches(
              /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
              'errors.invalid-time'
            )
            .min(5, 'errors.invalid-time')
            .required('errors.required')
            .test({
              name: 'isOneHourLater',
              message: 'errors.time-more-than-one-hour',
              test: (time) => {
                try {
                  let currentHour = new Date().getHours()
                  let currentMinute = new Date().getMinutes()
                  let hour = parseInt(time.split(':')[0])
                  let minute = parseInt(time.split(':')[1])
                  return (
                    hour > currentHour + 1 ||
                    (hour === currentHour + 1 && minute > currentMinute)
                  )
                } catch {
                  return false
                }
              },
            }),
          end_time: yup
            .string()
            .matches(
              /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
              'errors.invalid-time'
            )
            .required('errors.required')
            .min(5, 'errors.invalid-time')
            .when('time', (time, schema, value) => {
              if (time)
                return schema
                  .test(
                    'end_time',
                    'errors.duration-10min-3hours',
                    function (value) {
                      try {
                        const start_time_hours = parseInt(time.split(':')[0])
                        const end_time_hours = parseInt(value.split(':')[0])
                        const start_time_minutes = parseInt(time.split(':')[1])
                        const end_time_minutes = parseInt(value.split(':')[1])
                        const maxDifference = 3 * 60 // 3 hours in minutes
                        const minDifference = 10 // 10 minutes
                        const timeDifference =
                          (end_time_hours - start_time_hours) * 60 +
                          (end_time_minutes - start_time_minutes)

                        if (timeDifference > maxDifference) {
                          return false
                        }

                        if (timeDifference < minDifference) {
                          return false
                        }

                        return true
                      } catch {
                        return false
                      }
                    }
                  )
                  .test(
                    'event_duration',
                    'errors.duration-must-be-round',
                    function (value) {
                      try {
                        const [hours1, minutes1] = time.split(':').map(Number)
                        const [hours2, minutes2] = value.split(':').map(Number)
                        const totalMinutes1 = hours1 * 60 + minutes1
                        const totalMinutes2 = hours2 * 60 + minutes2
                        const timeDifference = Math.abs(
                          totalMinutes1 - totalMinutes2
                        )

                        return timeDifference % 10 === 0
                      } catch {
                        return false
                      }
                    }
                  )
              return schema
            }),
          place: yup.object({
            place_name: yup.string().required(() => t('errors.required')),
            lat: yup.number().required('errors.required'),
            lon: yup.number().required('errors.required'),
          }),
        })
      }
      if (currentStep.value === 2) {
        return yup.object({
          privacy: yup.boolean().required('errors.required'),
          is_price: yup.boolean().required('errors.required'),
          amount_members: yup
            .number()
            .typeError('errors.type-number')
            .required('errors.required')
            .min(6, 'errors.min6')
            .max(50, 'errors.max50'),
          price: yup
            .number('errors.type-number')
            .nullable()
            .when('is_price', {
              is: true,
              then: yup
                .number()
                .typeError('errors.type-number')
                .required('errors.required')
                .min(1, 'errors.min1')
                .max(32767, 'errors.max32767'),
            }),
          price_description: yup
            .string('errors.required')
            .nullable()
            .when('price', (price, schema) => {
              if (price)
                return schema
                  .required('errors.required')
                  .max(500, 'errors.max500')
              return schema
            }),
        })
      }
      if (currentStep.value === 3) {
        return yup.object({
          description: yup.string().required('errors.required'),
          need_form: yup.string().required('errors.required'),
          is_phone_shown: yup.boolean().nullable(),
          contact_number: yup
            .string()
            .nullable()
            .when('is_phone_shown', {
              is: true,
              then: yup
                .string()
                .required('errors.required')
                .min(19, 'errors.invalid-phone'),
            }),
        })
      }
    })

    const getNewEventLocation = (location, data) => {
      data.values.place = {
        place_name: location.place,
        lat: location.lat,
        lon: location.lng,
      }
    }

    const greenBtnText = computed(() => {
      return currentStep.value !== 3 ? t('buttons.next') : t('buttons.publish')
    })

    const openRemoveUsersModal = () => {
      removeInvitedUsersModalOpened.value = true
    }

    const setEventDate = (date_value, data) => {
      data.values.date = date_value
    }

    function addZeroBefore(n) {
      return (n < 10 ? '0' : '') + n
    }

    const updateEventPriceAfterSelectFree = (data) => {
      data.values.price = null
      data.values.price_description = null
    }

    const runOnSelectEventDuration = (durationValue, data) => {
      const currentDateTime = new Date()
      const eventStartTime = new Date(currentDateTime.getTime() + 65 * 60000)
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
        getRelevantUsers({ search: searchValue, skipids: userStore.user.id })
      }
      searchTimeout = setTimeout(relevantSearch, 500)
    }

    getRelevantUsers({ skipids: userStore.user.id })

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

    async function saveEvent(data) {
      eventCreateLoader.value = true
      const createEventData = data.values

      createEventData.date_and_time = `${createEventData.date} ${createEventData.time}`

      createEventData.current_users = invitedUsers.value.map((user) => user.id)

      switch (createEventData.need_form) {
        case true:
          createEventData.forms.first_team.type = eventFormTypes.T_Shirt
          createEventData.forms.second_team.type = eventFormTypes.T_Shirt
          break
        case false:
          createEventData.forms.first_team.type = eventFormTypes.Shirt_Front
          createEventData.forms.second_team.type = eventFormTypes.Shirt_Front
      }

      try {
        await API.EventService.createOneEvent(createEventData).finally(() => {
          eventCreateLoader.value = false
        })
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
      greenBtnText,
      removeInvitedUsersModalOpened,
      eventPreviewData,
      eventCreateLoader,
      getNewEventLocation,
      runOnSelectEventDuration,
      updateEventPriceAfterSelectFree,
      inviteUsetToTheEvent,
      changeStep,
      removeAllInvitedUsers,
      saveEvent,
      removeInvitedUser,
      searchRelevantUsers,
      openRemoveUsersModal,
      closeRemoveUsersModal,
      setEventDate,
    }
  },
}
</script>

<style lang="scss" scoped>
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
    color: #262541;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      @media (max-width: 768px) {
        display: none;
      }
    }
    @media (max-width: 768px) {
      padding: 0;
    }
    .b-manage-event__btns-mob-block {
      @media (min-width: 1200px) {
        display: none;
      }
      @media (max-width: 768px) {
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
      @media (max-width: 768px) {
        width: 100%;
      }
      .b-manage-event__progress-line {
        margin-top: 20px;
        padding-top: 24px;
        border-top: 1px dashed #dfdeed;
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
              background: #1ab2ad;
            }
          }
        }
      }
      .b-manage-event__buttons-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        @media (max-width: 768px) {
          margin-bottom: 50px;
        }
      }
    }
    .b-manage-event__btns-desktop-block {
      @media (max-width: 1200px) {
        display: none;
      }
    }
  }
}
.b-manage-event__invited-users__list {
  overflow: auto;
  margin-top: 20px;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
}
.b-manage-event__invited-user {
  padding: 8px;
  border-bottom: 1px solid #dfdeed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:first-of-type {
    margin-top: 30px;
    border-top: 1px solid #dfdeed;
  }
}
.b-user-what-you__invited {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #262541;
}
.b-manage-event__invited-user-left__side {
  display: flex;
  align-items: center;
  gap: 8px;
}
.b-invited-user__avatar {
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  border-radius: 4px;
}
.b-invited-user__full-name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #262541;
}
.b-invited-user__position {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #8a8aa8;
}
.b-remove-invited__user {
  cursor: pointer;
}
.b-manage-event-preview__block {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.b-remove-all__invited-users {
  position: absolute;
  right: 0;
  top: 30px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #575775;
  cursor: pointer;
}
</style>
