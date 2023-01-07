<template>
  <div class="b-user-card">
    <div class="b-user-card__top-table">
      <div class="b-user-card__top-part">
        <div class="b-user-card__picture-block">
          <div class="b-user-card__profile-picture">
            <img v-if="userData.avatar_url" :src="userData.avatar_url" alt="" />
            <Avatar
              v-else
              :full-name="fullUserName"
            />
            <div 
              v-if="isEditMode"
              class="b-user-card__add-pic-icon"
            >
              <label for="my_file">
                <input 
                  type="file"
                  accept="image/png, image/jpeg"
                  id="my_file" 
                  style="display: none;" 
                  @change="onFileSelected"
                />
                <img 
                  src="../assets/img/add-user-pic2.svg" 
                  alt="add user picture"
                >
              </label>
            </div>
          </div>
        </div>
        <div class="b-user-card__text-block">
          <div class="b-user-card__name-line-wrapper">
            <div class="b-user-card__user-name">
              {{ userData.name || $t('profile.no-name') }}
              {{ userData.last_name || $t('profile.no-last-name') }}
            </div>
          </div>
          <div class="b-user-card__labels">
            <div
              v-for="label in labels"
              :key="label"
              class="b-user-card__label"
            >
              <span v-if="label">
                # {{ label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-user-card__tabs-block">
      <div class="b-user-card__tab-titles">
        <div
          v-for="item in mockData.tabTitles"
          :key="item.id"
          class="b-user-card__tab-title d-flex justify-content-center align-items-center"
          :style="{
            'flex-basis' : item.id === 1 ? '50%' : '33.3333%',
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
        <div 
          v-show="currentTab === 0 || isMobTabletSize" 
          class="b-user-card__tab-body"
        >
          <div
            v-if="isMobTabletSize"
            class="b-user-card__mob-title"
          >
            {{ $t('profile.about-me') }}
          </div>
          <div v-if="isEditMode" class="b-user-card__name-line">
            <div class="b-user-card__input-surname">
              <InputComponent
                :outside-title="true"
                :title="$t('profile.surname')"
                :height="40"
                :title-width="0"
                name="last_name"
              />
            </div>
            <div class="b-user-card__input-name">
              <InputComponent
                :outside-title="true"
                :title="$t('profile.name')"
                :height="40"
                :title-width="0"
                name="name"
              />
            </div>
          </div>
          <div class="b-user-card__textarea-line">
            <div v-if="!isEditMode" class="b-user-card__about-me">
              {{ userData.about_me || $t('profile.no-about_me') }}
              <div class="b-user-card__title">{{ $t('profile.about-myself') }}</div>
            </div>
            <TextAreaComponent
              v-else
              :height="88"
              :title="$t('profile.words-about-myself')"
              name="about_me"
            />
          </div>
          <div class="b-user-card__birthday-line">
            <div v-if="!isEditMode" class="b-user-card__birth-date">
              {{ birthDate || $t('profile.no-birthday')}}
              <div class="b-user-card__title">
                {{ $t('profile.birth-date') }}
              </div>
            </div>
            <div v-else class="b-user-card__dropdowns">
              <div class="b-user-card__dropdown-days">
                <Dropdown
                  :placeholder="$t('profile.day')"
                  :main-title="$t('profile.day')"
                  :options="mockData.days"
                  display-name="name"
                  display-value="value"
                  name="day"
                />
              </div>
              <div class="b-user-card__dropdown-months">
                <Dropdown
                  :placeholder="$t('profile.month')"
                  :main-title="$t('profile.month')"
                  :options="mockData.months"
                  display-name="name"
                  display-value="value"
                  name="month"
                />
              </div>
              <div class="b-user-card__dropdown-years">
                <Dropdown
                  :placeholder="$t('profile.year')"
                  :main-title="$t('profile.year')"
                  :options="mockData.years"
                  display-name="name"
                  display-value="value"
                  name="year"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-show="currentTab === 1 || isMobTabletSize" class="b-user-card__tab-body">
          <div
            v-if="isMobTabletSize"
            class="b-user-card__mob-title"
          >
            {{ $t('profile.game-features') }}
          </div>
          <div class="b-user-card__body-features">
            <div class="b-user-card__height">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ userData.height || $t('profile.no-height') }} 
                  {{$t('profile.sm')}}
                </div>
                <div class="b-user-card__title">{{$t('profile.height')}}</div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="$t('profile.height')"
                :height="40"
                :title-width="0"
                name="height"
              />
            </div>
            <div class="b-user-card__weight">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ userData.weight || $t('profile.no-weight') }} 
                  {{ $t('profile.kg') }}
                </div>
                <div class="b-user-card__title">
                  {{ $t('profile.weight') }}
                </div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="$t('profile.weight')"
                :height="40"
                :title-width="0"
                name="weight"
              />
            </div>
            <div class="b-user-card__main-leg">
              <div
                v-if="!isEditMode && userData.working_leg"
                class="b-user-card__to-show"
              >
                <div class="b-user-card__data">
                  {{ userData.working_leg || $t('profile.no-working-leg') }}
                </div>
                <div class="b-user-card__title">{{$t('profile.main-leg')}}</div>
              </div>
              <div 
                v-if="isEditMode"
                class="b-user-card__dropdown-main-leg"
              >
                <Dropdown
                  :main-title="$t('profile.main-leg')"
                  :placeholder="$t('profile.main-leg')"
                  :options="mockData.mainLag"
                  display-name="name"
                  display-value="value"
                  name="working_leg"
                />
              </div>
            </div>
          </div>
          <div class="b-user-card__position">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{ userPosition || $t('profile.no-position') }}
              </div>
              <div class="b-user-card__title">
                {{ $t('profile.game-position') }}
              </div>
            </div>
            <Dropdown
              v-else
              :outside-title="true"
              :placeholder="$t('profile.game-position')"
              :main-title="$t('profile.game-position')"
              :options="mockData.position"
              :width="200"
              :height="40"
              display-name="name"
              display-value="value"
              name="position"
            />
          </div>
        </div>

        <div v-if="currentTab === 2 || isMobTabletSize" class="b-user-card__tab-body">
          <div
            v-if="isMobTabletSize"
            class="b-user-card__mob-title"
          >
            {{ $t('profile.contacts') }}
          </div>
          <div class="b-user-card__phone">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{ phone || $t('profile.no-phone') }}
              </div>
              <div class="b-user-card__title">
                {{ $t('profile.phone') }}
              </div>
            </div>
            <InputComponent
              v-else
              :title="$t('profile.phone')"
              :placeholder="phone"
              :title-width="0"
              :outside-title="true"
              :height="40"
              name="phone"
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
                :options="mockData.cities"
                :width="176"
                :height="40"
                @new-value="
                  $emit('dropdown-form-value', 'labels', $event, 0)
                "
              />
              <Dropdown
                :outside-title="true"
                :main-title="'Район'"
                :options="mockData.district"
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
</template>

<script>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'

import InputComponent from './forms/InputComponent.vue'
import TextAreaComponent from '../components/TextAreaComponent.vue'
import Dropdown from './forms/Dropdown.vue'
import Avatar from '../components/Avatar.vue'

import sortArrowHorizontally from '../assets/img/sort-arrows-horizontal.svg'
import tick from '../assets/img/tick.svg'
import edit from '../assets/img/edit.svg'

import { API } from "../workers/api-worker/api.worker"
import CONSTANTS from "../consts"
import useWindowWidth from '../utils/widthScreen'

const IMAGE_TYPES = ["image/jpeg", "image/png"]

export default {
  name: 'UserDetailsCard',
  components: {
    InputComponent,
    Dropdown,
    TextAreaComponent,
    Avatar
  },
  props: {
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
    }
  },
  emits: ['openEditPictureModal'],
  setup(props, {emit}) {
    const { 
      onResize,
      isBetweenTabletAndDesktop, 
      isMobile,
      isTablet 
    } = useWindowWidth()
    const currentTab = ref(0)
    const selectedFile = ref(null)
    const imageSrc = ref(null)
    const fileReader = new FileReader()
    const labels = ref([
      props.userData.age ? `${props.userData.age} років` : null ,
      props.userData.gender,
      props.userData.role,
      props.userData.position
    ])

    const userPosition = computed(() => {
      return CONSTANTS.profile.position.find(item => item.value === props.userData?.position).name
    })

    const isMobTabletSize = computed(() => {
      return isBetweenTabletAndDesktop.value || isMobile.value || isTablet.value
    })

    const fullUserName = computed(() => `${props.userData.name} ${props.userData.last_name}`)

    const mockData = computed(() => {
      return {
        monthFromNumber: CONSTANTS.users_page.months.monthFromNumber,
        numberFromMonth: CONSTANTS.users_page.months.numberFromMonth,
        tabTitles: CONSTANTS.profile.tabTitles,
        labels: CONSTANTS.profile.labels,
        days: CONSTANTS.dates.days,
        months: CONSTANTS.dates.months,
        years: CONSTANTS.dates.years,
        mainLag: CONSTANTS.profile.mainLeg,
        cities: CONSTANTS.profile.cities,
        district: CONSTANTS.profile.district,
        position: CONSTANTS.profile.position
      }
    })

    const icons = computed(() => {
      return {
        sortIcon: sortArrowHorizontally,
        tickIcon: tick,
        editIcon: edit,
      }
    })

    const birthDate = computed(() => {
      return `${dayjs(props.userData.birthday)
        .locale(dayjsUkrLocale)
        .format('D MMMM YYYY')} p.`
    })

    onMounted(() => {
      window.addEventListener('resize', onResize);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize); 
    })

    function changeUserTab(id) {
      currentTab.value = id
    }

    function onFileSelected(e) {
      const isValidFormat = IMAGE_TYPES.includes(e.target.files[0].type)
      if (isValidFormat) {
        selectedFile.value = e.target.files[0]
      }
    }

    fileReader.onload = (event) => {
      imageSrc.value = event.target.result
      emit('openEditPictureModal', 'edit_avatar', imageSrc.value)
    }

    watchEffect(() => {
      if(selectedFile.value) {
        fileReader.readAsDataURL(selectedFile.value)
      } else {
        imageSrc.value = null
      }
    })

    return {
      changeUserTab,
      onFileSelected,
      currentTab,
      icons,
      birthDate,
      mockData,
      labels,
      fullUserName,
      isMobTabletSize,
      userPosition
    }
  }
}
</script>

<style lang="scss" scoped>
.b-user-card {
  padding: 20px 16px;
  background: #eeeef3;
  border-radius: 8px;
  height: fit-content;
  @media (max-width: 1200px) {
    background: none;
  }
  @media (min-width: 1400px) {
    flex-basis: 508px;
  }
  @media (min-width: 1200px) and (max-width: 1400px) {
    flex-basis: 440px;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
      flex-basis: 49%;
    }

  .b-user-card__top-table {
    background: #ffffff;
    border-radius: 8px;
    padding: 16px 16px;
    margin-bottom: 16px;
    @media (max-width: 1200px) {
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    }
    .b-user-card__top-part {
      display: flex;
      .b-user-card__profile-picture {
        position: relative;
        margin-right: 12px;
        width: 52px;
        height: 52px;
        overflow: hidden;
        border-radius: 8px;
        img {
          display: block;
          width: 100%;
        }
        .b-user-card__add-pic-icon {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          label {
            display: block;
            cursor: pointer;
          }
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
            span {
              display: block;
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
  }
  .b-user-card__tabs-block {
    @media (max-width: 1200px) {
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    }
    .b-user-card__tab-titles {
      display: flex;
      justify-content: space-between;
      @media (max-width: 1200px) {
        display: none;
      }
      .b-user-card__tab-title {
        border-radius: 4px 4px 0px 0px;
        padding: 0 4px;
        cursor: pointer;
        font-family: 'Inter';
        font-style: normal;
        font-size: 14px;
        line-height: 20px;
        height: 36px;
      }
    }
    .b-user-card__main-tab-body {
      padding: 24px 16px;
      background: #fff;
      @media (max-width: 1200px) {
        padding: 12px;
      }
      .b-user-card__tab-body {
        &:nth-child(1) {
          .b-user-card__mob-title {
            margin-top: 0;
          }
        }
        .b-user-card__mob-title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
          margin-bottom: 12px;
          margin-top: 16px;
        }
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
          margin-bottom: 16px;
          @media (max-width: 1200px) {
            display: block;
          }
          .b-user-card__input-surname {
            margin-right: 8px;
          }
          .b-user-card__input-surname,
          .b-user-card__input-name {
            @media (max-width: 1200px) {
              width: 100%;
            }
          }
          .b-user-card__input-name {
            @media (max-width: 1200px) {
              margin-top: 12px;
            }
          }
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
            .b-user-card__dropdown-days {
              flex-basis: 30%;
              margin-right: 8px;
            }
            .b-user-card__dropdown-months {
              flex-basis: 40%;
              margin-right: 8px;
            }
            .b-user-card__dropdown-years {
              flex-basis: 30%;
            }
          }
        }
        .b-user-card__body-features {
          display: flex;
          justify-content: space-between;
          .b-user-card__height,
          .b-user-card__weight {
            flex-basis: 30%;
            margin-right: 8px;
          }
          .b-user-card__weight {
            border-left: 1px solid #EFEFF6;
          }
          .b-user-card__main-leg {
            flex-basis: 40%;
            border-left: 1px solid #EFEFF6;
            .b-user-card__dropdown-main-leg {
              ::v-deep {
                .vs__dropdown-toggle {
                  height: 40px;
                }
              }
            }
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