<template>
  <Form
    v-slot="data"
    :validation-schema="schema"
    :initial-values="formValues"
    ref="myForm"
  >
    <div class="b-user-card">
      <div class="b-user-card__top-table">
        <div class="b-user-card__top-part">
          <div class="b-user-card__picture-block">
            <div class="b-user-card__profile-picture">
              <img src="../assets/img/user-photo.png" alt="" />
            </div>
          </div>
          <div class="b-user-card__text-block">
            <div class="b-user-card__name-line-wrapper">
              <div class="b-user-card__user-name">
                {{ formValues.name }}
                {{ formValues.last_name }}
              </div>
            </div>
            <div class="b-user-card__labels">
              <div
                v-for="label in labels"
                :key="label"
                class="b-user-card__label"
              >
                # {{ label.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="b-user-card__tabs-block">
        <div class="b-user-card__tab-titles">
          <div
            v-for="item in tabTitles"
            :key="item.id"
            class="b-user-card__tab-title"
            :style="{
              'flex-basis': item.width,
              'margin-right': item.id !== 2 ? '4px' : 0,
              background: currentTab === item.id ? '#FFFFFF' : '#F9F9FC',
              color: currentTab === item.id ? '#262541' : '#575775',
              'font-weight': currentTab === item.id ? 500 : 400,
            }"
            @click="changeUserTab(item.id)"
          >
            {{ item.title }}
          </div>
        </div>
        <div class="b-user-card__main-tab-body">
          <div v-show="currentTab === 0" class="b-user-card__tab-body">
            <div v-if="isEditMode" class="b-user-card__name-line">
              <div class="b-user-card__input-surname">
                <InputComponent
                  :outside-title="true"
                  :title="'Прізвище'"
                  :height="40"
                  :title-width="0"
                  name="last_name"
                />
              </div>
              <div class="b-user-card__input-name">
                <InputComponent
                  :outside-title="true"
                  :title="`Ім'я`"
                  :height="40"
                  :title-width="0"
                  name="name"
                />
              </div>
            </div>
            <div class="b-user-card__textarea-line">
              <div v-if="!isEditMode" class="b-user-card__about-me">
                {{ formValues.about_me }}
                <div class="b-user-card__title">Про себе</div>
              </div>
              <TextAreaComponent
                v-else
                :height="88"
                :title="'Декілька слів про себе'"
                name="about_me"
              />
            </div>
            <div class="b-user-card__birthday-line">
              <div v-if="!isEditMode" class="b-user-card__birth-date">
                {{ formValues.day }}
                {{ formValues.month }} 
                {{ formValues.year }}
                <div class="b-user-card__title">Дата народження</div>
              </div>
              <div v-else class="b-user-card__dropdowns">
                <Dropdown
                  :outside-title="true"
                  :main-title="'День'"
                  :options="days"
                  :width="96"
                  :height="40"
                  name="day"
                />
                <Dropdown
                  :outside-title="true"
                  :main-title="'Місяць'"
                  :options="months"
                  :width="168"
                  :height="40"
                  name="month"
                />
                <Dropdown
                  :outside-title="true"
                  :main-title="'Рік'"
                  :options="years"
                  :width="120"
                  :height="40"
                  name="year"
                />
              </div>
            </div>
          </div>

          <div v-show="currentTab === 1" class="b-user-card__tab-body">
            <div class="b-user-card__body-features">
              <div class="b-user-card__height">
                <div v-if="!isEditMode" class="b-user-card__to-show">
                  <div class="b-user-card__data">{{ formValues.height }} см</div>
                  <div class="b-user-card__title">Зріст</div>
                </div>
                <InputComponent
                  v-else
                  :outside-title="true"
                  :title="'Зріст'"
                  :height="40"
                  :title-width="0"
                  name="height"
                />
              </div>
              <div class="b-user-card__weight">
                <div v-if="!isEditMode" class="b-user-card__to-show">
                  <div class="b-user-card__data">{{ formValues.weight }} кг</div>
                  <div class="b-user-card__title">Вага</div>
                </div>
                <InputComponent
                  v-else
                  :outside-title="true"
                  :title="`Вага`"
                  :height="40"
                  :title-width="0"
                  name="weight"
                />
              </div>
              <div class="b-user-card__main-leg">
                <div
                  v-if="!isEditMode && formValues.working_leg"
                  class="b-user-card__to-show"
                >
                  <div class="b-user-card__data">
                    {{ formValues.working_leg }}
                  </div>
                  <div class="b-user-card__title">Ударна нога</div>
                </div>
                <Dropdown
                  v-if="isEditMode"
                  :outside-title="true"
                  :main-title="'Ударна нога'"
                  :options="mainLag"
                  :width="200"
                  :height="40"
                  name="working_leg"
                />
              </div>
            </div>
            <div class="b-user-card__position">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ formValues.position }}
                </div>
                <div class="b-user-card__title">Ігрова позиція</div>
              </div>
              <InputComponent
                v-else
                :title="'Ігрова позиція'"
                :title-width="0"
                :outside-title="true"
                :hasIcon="true"
                :height="40"
                :icon="[icons.sortIcon]"
                name="position"
              />
            </div>
          </div>

          <div v-if="currentTab === 2" class="b-user-card__tab-body">
            <div class="b-user-card__phone">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ phone }}
                </div>
                <div class="b-user-card__title">Телефон</div>
              </div>
              <InputComponent
                v-else
                :title="'Телефон'"
                :placeholder="phone"
                :title-width="0"
                :outside-title="true"
                :height="40"
                name="position"
              />
            </div>
            <!-- <div class="b-user-card__area-line">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{userData.location}}
                </div>
                <div class="b-user-card__title">
                  Місце знаходження
                </div>
              </div>
              <div v-else class="b-user-card__dropdowns">
                <Dropdown
                  :outside-title="true"
                  :main-title="'Місто'"
                  :options="cities"
                  :width="176"
                  :height="40"
                  @new-value="
                    $emit('dropdown-form-value', 'labels', $event, 0)
                  "
                />
                <Dropdown
                  :outside-title="true"
                  :main-title="'Район'"
                  :options="district"
                  :width="216"
                  :height="40"
                  @new-value="
                    $emit('dropdown-form-value', 'labels', $event, 0)
                  "
                />
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'
import * as yup from 'yup'
import { Form, useForm } from '@system.it.flumx.com/vee-validate'

import InputComponent from '../components/InputComponent.vue'
import TextAreaComponent from '../components/TextAreaComponent.vue'
import Dropdown from '../components/Dropdown.vue'

import sortArrowHorizontally from '../assets/img/sort-arrows-horizontal.svg'
import tick from '../assets/img/tick.svg'
import edit from '../assets/img/edit.svg'

import { API } from "../workers/api-worker/api.worker"
import CONSTANTS from "../consts"

export default {
  name: 'UserDetailsCard',
  components: {
    InputComponent,
    Dropdown,
    TextAreaComponent,
    Form,
  },
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    tabTitles: {
      type: Array,
      default: () => [],
    },
    days: {
      type: Array,
      default: () => [],
    },
    months: {
      type: Array,
      default: () => [],
    },
    years: {
      type: Array,
      default: () => [],
    },
    mainLag: {
      type: Array,
      default: () => [],
    },
    cities: {
      type: Array,
      default: () => [],
    },
    district: {
      type: Array,
      default: () => [],
    },
    userData: {
      type: Object,
      default: () => {},
    },
    phone: {
      type: String,
      default: '',
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    toSendForm: {
      type: Boolean,
      default: false,
    },
  },
  emits: [],
  setup(props, context) {
    console.log(props.userData)
    const currentTab = ref(0)
    const isEditModeProfile = ref(false)
    const myForm = ref(null)

    const mockData = computed(() => {
      return {
        monthFromNumber: CONSTANTS.users_page.months.monthFromNumber,
        numberFromMonth: CONSTANTS.users_page.months.numberFromMonth
      }
    })
    const formValues = ref({
      last_name: props.userData.last_name,
      name: props.userData.name,
      about_me: props.userData.about_me,
      day: getBirthDay(props.userData.birthday),
      month: getBirthMonth(props.userData.birthday),
      year: getBirthYear(props.userData.birthday),
      height: props.userData.height,
      weight: props.userData.weight,
      working_leg: getWorkingLeg(props.userData.working_leg),
      position: props.userData.position,
    })

    const icons = computed(() => {
      return {
        sortIcon: sortArrowHorizontally,
        tickIcon: tick,
        editIcon: edit,
      }
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
      })
    })

    const birthDate = computed(() => {
      return `${dayjs(formValues.value.year + '-' + formValues.value.month + '-' + formValues.value.day)
        .locale(dayjsUkrLocale)
        .format('D MMMM YYYY')} p.`
    })

    watch(
      () => props.toSendForm,
      (newData, oldData) => {
        const refProfileData = { ...myForm.value.getControledValues() }

        if (newData) {
          const { day, month, year, working_leg } = refProfileData
          const profileData = {
            ...refProfileData,
            birthday: `${year}-${mockData.value.numberFromMonth[month]}-${day}`,
            gender: props.userData.gender,
            working_leg: getWorkingLeg(working_leg),
          }
          delete profileData.day
          delete profileData.month
          delete profileData.year

          const payload = {
            "configuration": {
              "email": true,
              "phone": true,
              "show_reviews": true
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
            API.UserService.getMyProfile()
            .then(res => {
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
              }
            })
          })
          .catch(e => console.log('mistake happened', e))
          context.emit('changeDataAction')
        }
      }
    )

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
    function changeUserTab(id) {
      currentTab.value = id
    }

    function toggleEditMode() {
      isEditModeProfile.value = !isEditModeProfile.value
    }

    return {
      changeUserTab,
      toggleEditMode,
      currentTab,
      icons,
      birthDate,
      schema,
      formValues,
      myForm
    }
  },
}
</script>

<style lang="scss" scoped>
.b-user-card {
  padding: 20px 16px;
  background: #eeeef3;
  border-radius: 8px;
  height: fit-content;
  @media (min-width: 1400px) {
    margin-right: 16px;
  }
  @media (min-width: 992px) {
    width: 464px;
    min-width: 464px;
  }
  @media (max-width: 992px) {
    width: 100%;
    min-width: 100%;
    order: 1;
    margin-bottom: 10px;
    margin-right: 0;
  }
  .b-user-card__top-table {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px 16px;
    margin-bottom: 16px;
    .b-user-card__top-part {
      display: flex;
      .b-user-card__profile-picture {
        position: relative;
        margin-right: 12px;
        img {
          display: block;
        }
      }
      .b-user-card__text-block {
        flex-basis: 100%;
        .b-user-card__name-line-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .b-user-card__user-name {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #262541;
            margin-bottom: 8px;
          }
          img {
            cursor: pointer;
          }
        }
        .b-user-card__labels {
          display: flex;
          flex-wrap: wrap;
          .b-user-card__label {
            margin-top: 4px;
            margin-right: 4px;
            background: #148581;
            border-radius: 100px;
            padding: 0 8px;
            height: 20px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: #ffffff;
          }
        }
      }
    }
  }
  .b-user-card__tabs-block {
    .b-user-card__tab-titles {
      display: flex;
      justify-content: space-between;
      .b-user-card__tab-title {
        border-radius: 4px 4px 0px 0px;
        padding: 8px 0;
        padding-left: 16px;
        cursor: pointer;
        font-family: 'Inter';
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
      }
    }
    .b-user-card__main-tab-body {
      padding: 24px 16px;
      background: #fff;
      .b-user-card__tab-body {
        .b-user-card__to-show {
          .b-user-card__data {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            color: #262541;
          }
          .b-user-card__title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
          }
        }
        .b-user-card__name-line {
          display: flex;
          justify-content: space-between;
          .b-user-card__input-surname,
          .b-user-card__input-name {
            width: 196px;
          }
          margin-bottom: 16px;
        }
        .b-user-card__textarea-line {
          .b-user-card__about-me {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
            .b-user-card__title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              margin-top: 4px;
            }
          }
        }
        .b-user-card__birthday-line {
          padding-top: 12px;
          margin-top: 12px;
          border-top: 1px solid #efeff6;
          .b-user-card__birth-date {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
            .b-user-card__title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
            }
          }
          .b-user-card__dropdowns {
            display: flex;
            justify-content: space-between;
          }
        }
        .b-user-card__body-features {
          display: flex;
          justify-content: space-between;
          .b-user-card__height,
          .b-user-card__weight {
            width: 92px;
          }
        }
        .b-user-card__position {
          margin-top: 16px;
        }
        .b-user-card__area-line {
          margin-top: 16px;
          .b-user-card__dropdowns {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>