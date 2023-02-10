<template>
  <div class="b-manage-event">
    <SelectionSuitModal v-if="isSuitModalActive" @close-modal="closeModal" />
    <Form v-slot="data" :validation-schema="schema" @submit="disableSubmit">
      <pre>
        {{ data.values }}
      </pre>
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
            @cancel-btn-click="cancelEventCreation"
          />
        </div>
      </div>
      <div class="b-manage-event__main-body">
        <div class="b-manage-event__create-event-block">
          <ManageEventFirstStep
            :currentStep="currentStep"
            @update-date="setNewDate"
            @update-location="setLocation"
          />
          <ManageEventSecondStep
            :currentStep="currentStep"
            :tags="mockData.tags"
            :filtered-teams="filteredTeams"
            @chose-category="choseCategory"
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
              @click-function="changeStep('-')"
            />
            <GreenBtn
              :text="greenBtnText"
              :width="160"
              :icon-right="icons.arrowRight"
              @click-function="changeStep('+')"
            />
          </div>
        </div>

        <PreviewBlock
          :form-data="data.values"
          :start-date="startDate"
          :user-location="userLocation"
        />

        <div class="b-manage-event__btns-desktop-block">
          <ButtonsBlock
            :save-btn-text="$t('buttons.save-as-template')"
            :white-btn-width="208"
            :green-btn-width="208"
            @save-btn-click="saveEvent(data)"
            @cancel-btn-click="cancelEventCreation"
          />
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from '@system.it.flumx.com/vee-validate'
import { useI18n } from 'vue-i18n'
import * as yup from 'yup'

import InputComponent from '../../../components/forms/InputComponent.vue'
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import SelectionSuitModal from '../../../components/suit/SelectionSuitModal.vue'
import ManageEventFirstStep from '../../../components/manage-event-components/ManageEventFirstStep.vue'
import ManageEventSecondStep from '../../../components/manage-event-components/ManageEventSecondStep.vue'
import ManageEventThirdStep from '../../../components/manage-event-components/ManageEventThirdStep.vue'
import PreviewBlock from '../../../components/manage-event-components/PreviewBlock.vue'
import ButtonsBlock from '../../../components/manage-event-components/ButtonsBlock.vue'

import Arrow from '../../../assets/img/arrow-right-white.svg'
import CONSTANTS from '../../../consts/index'
import { ROUTES } from '../../../router/router.const'

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
    PreviewBlock,
    ButtonsBlock,
    Form,
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const currentStep = ref(1)
    const startDate = ref('')
    const userLocation = ref('')
    const isSuitModalActive = ref(false)

    const schema = computed(() => {
      return yup.object({
        gender: yup.string().required('errors.required'),
        type: yup.string().required('errors.required'),
        time: yup.string().required('errors.required'),
        location: yup.string().required('errors.required'),
        date: yup.string().required('errors.required'),
        privacy: yup.string().required('errors.required'),
        payment: yup.string().required('errors.required'),
        is_price: yup.string().required('errors.required'),
        price: yup.string().required('errors.required'),
        is_phone_shown: yup.string().required('errors.required'),
        contact_number: yup.string().required('errors.required'),
        user_search: yup.string(),
        description: yup
          .string()
          .required('errors.required')
          .min(45, 'errors.min45')
          .max(200, 'errors.min200'),
        need_form: yup.string().required('errors.required'),
      })
    })

    const greenBtnText = computed(() => {
      return currentStep.value !== 3 ? t('buttons.next') : t('buttons.publish')
    })

    const icons = computed(() => {
      return {
        arrowRight: Arrow,
      }
    })

    const mockData = computed(() => {
      return {
        tags: CONSTANTS.manage_event.tags,
        teams: CONSTANTS.manage_event.teams,
      }
    })
    const filteredTeams = computed(() => {
      if (currentCategory() === 'Всі') {
        return mockData.value.teams
      } else {
        return [
          mockData.value.teams.find(
            (item) => item.category_name === currentCategory()
          ),
        ]
      }
    })

    function currentCategory() {
      return mockData.value.tags.find((item) => item.isActive).text
    }

    function choseCategory(id) {
      mockData.value.tags = mockData.value.tags.map((item) => ({
        ...item,
        isActive: false,
      }))
      mockData.value.tags = mockData.value.tags.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isActive: true,
          }
        } else {
          return item
        }
      })
    }
    function changeStep(val) {
      if (currentStep.value === 1 && val === '-') {
        return router.push(ROUTES.APPLICATION.EVENTS.absolute)
      }
      switch (val) {
        case '+':
          this.currentStep++
          break
        case '-':
          this.currentStep--
          break
      }
    }

    function closeModal() {
      VersionHandling.closeVersionModal()
    }
    function saveEvent(val) {
      console.log(val)
    }
    function cancelEventCreation() {
      console.log('cancelEventCreation')
    }
    function setNewDate(e) {
      startDate.value = e
    }
    function setLocation(e) {
      userLocation.value = e?.place
    }
    return {
      currentStep,
      mockData,
      filteredTeams,
      icons,
      schema,
      startDate,
      userLocation,
      greenBtnText,
      choseCategory,
      changeStep,
      saveEvent,
      cancelEventCreation,
      setNewDate,
      setLocation,
    }
  },
  data() {
    return {
      // chosenUsers: [],
    }
  },
  methods: {
    // deleteFromChosen(id, category) {
    //   this.chosenUsers = this.chosenUsers.filter(i => i.id !== id)
    //   this.teams.find(item => item.category_name === category).users
    //     .find(item => item.id === id).isChosen = false
    // },
    // inviteUser(teamId, userId) {
    //   this.teams.find(item => item.id === teamId).users
    //     .find(item => item.id === userId).isChosen = true
    //   const team = this.teams.find(i => i.id === teamId)
    //   const user = team.users.find(i => i.id === userId)
    //   this.chosenUsers.push(user)
    // }
  },
}
</script>

<style lang="scss" scoped>
.b-manage-event {
  overflow: hidden;
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
      width: 420px;
      padding: 20px;
      background: #ffffff;
      box-shadow: 2px 6px 10px rgba(56, 56, 251, 0.1);
      border-radius: 0px 6px 6px 0px;
      height: 100%;
      overflow-y: scroll;
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
          width: 312px;
          .b-manage-event__section {
            width: 102.67px;
            height: 4px;
            background: #efeff6;
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
</style>
