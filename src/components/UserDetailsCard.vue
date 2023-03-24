<template>
  <div class="b-user-card">
    <div class="b-user-card__top-table">
      <div class="b-user-card__top-part">
        <div class="b-user-card__picture-block">
          <div class="b-user-card__profile-picture">
            <Avatar
              class="b-user-card__profile-avatar"
              :link="userData.avatar_url"
              :full-name="fullUserName"
            />
            <div v-if="isEditMode" class="b-user-card__add-pic-icon">
              <label for="my_file">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="my_file"
                  style="display: none"
                  @change="onFileSelected"
                  @click="clearFileInputValue"
                  ref="fileInput"
                />
                <img
                  src="../assets/img/add-user-pic2.svg"
                  alt="add user picture"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="b-user-card__text-block">
          <div class="b-user-card__name-line-wrapper">
            <div class="b-user-card__user-name">
              {{ userData.last_name || $t('profile.no-name') }}
              {{ userData.name || $t('profile.no-last-name') }}
            </div>
          </div>
          <div class="b-user-card__labels">
            <div
              v-for="label in labels"
              :key="label"
              class="b-user-card__label"
            >
              <span v-if="label"> # {{ $t(label) }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <RatingCard
      v-if="isMobile"
      :rating-scale="userData.raiting"
      :openedReviewID="openedReviewId"
      @clickReview="clickReview"
    />

    <div class="b-user-card__tabs-block">
      <div class="b-user-card__tab-titles">
        <div
          v-for="item in mockData.tabTitles"
          :key="item.id"
          class="b-user-card__tab-title d-flex justify-content-center align-items-center"
          :style="{
            'flex-basis': item.id === 1 ? '50%' : '33.3333%',
            'margin-right': item.id !== 2 ? '4px' : 0,
            background: currentTab === item.id ? '#FFFFFF' : '#F9F9FC',
            color:
              currentTab === item.id
                ? '$--b-main-black-color'
                : '$--b-main-gray-color',
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
          <div v-if="isMobTabletSize" class="b-user-card__mob-title">
            {{ $t('profile.about-me') }}
          </div>
          <div v-if="isEditMode" class="b-user-card__name-line">
            <div class="b-user-card__input-surname">
              <InputComponent
                :outside-title="true"
                :title="$t('profile.surname')"
                :placeholder="$t('profile.surname')"
                :height="40"
                :title-width="0"
                name="last_name"
              />
            </div>
            <div class="b-user-card__input-name">
              <InputComponent
                :outside-title="true"
                :title="$t('profile.name')"
                :placeholder="$t('profile.name')"
                :height="40"
                :title-width="0"
                name="name"
              />
            </div>
          </div>
          <div class="b-user-card__textarea-line">
            <div v-if="!isEditMode" class="b-user-card__about-me">
              {{ userData.about_me || $t('profile.about-myself') }}
              <div class="b-user-card__title">
                {{
                  userData.about_me
                    ? $t('profile.about-myself')
                    : $t('profile.write-several-words')
                }}
              </div>
            </div>
            <TextAreaComponent
              v-else
              :height="88"
              :title="$t('profile.words-about-myself')"
              :maxTextValue="110"
              name="about_me"
            />
          </div>
          <div class="b-user-card__birthday-line">
            <div v-if="!isEditMode" class="b-user-card__birth-date">
              {{ birthDate || $t('profile.no-content') }}
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
                  :initValue="initValues.day"
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
                  :initValue="initValues.month"
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
                  :initValue="initValues.year"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          v-show="currentTab === 1 || isMobTabletSize"
          class="b-user-card__tab-body"
        >
          <div v-if="isMobTabletSize" class="b-user-card__mob-title">
            {{ $t('profile.game-features') }}
          </div>
          <div class="b-user-card__body-features">
            <div class="b-user-card__height"
            :style="`border-right: ${!isEditMode ? '1px' : '0px'} solid #efeff6;`">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ userData.height || $t('profile.no-content') }}
                  {{ userData.height ? $t('profile.sm') : '' }}
                </div>
                <div class="b-user-card__title">{{ $t('profile.height') }}</div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="$t('profile.height')"
                :placeholder="$t('profile.height')"
                :height="40"
                :title-width="0"
                name="height"
                v-maska="'###'"
              />
            </div>
            <div class="b-user-card__weight"
              :style="`border-right: ${!isEditMode ? '1px' : '0px'} solid #efeff6;`">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ userData.weight || $t('profile.no-content') }}
                  {{ userData.weight ? $t('profile.kg') : '' }}
                </div>
                <div class="b-user-card__title">
                  {{ $t('profile.weight') }}
                </div>
              </div>
              <InputComponent
                v-else
                :outside-title="true"
                :title="$t('profile.weight')"
                :placeholder="$t('profile.weight')"
                :height="40"
                :title-width="0"
                name="weight"
                v-maska="'###'"
              />
            </div>
            <div class="b-user-card__main-leg">
              <div v-if="!isEditMode" class="b-user-card__to-show">
                <div class="b-user-card__data">
                  {{ userData.working_leg || $t('profile.no-content') }}
                </div>
                <div class="b-user-card__title">
                  {{ $t('profile.main-leg') }}
                </div>
              </div>
              <div v-if="isEditMode" class="b-user-card__dropdown-main-leg">
                <Dropdown
                  :main-title="$t('profile.main-leg')"
                  :placeholder="$t('profile.main-leg')"
                  :options="mockData.mainLag"
                  display-name="name"
                  display-value="value"
                  name="working_leg"
                  :initValue="initValues.working_leg"
                />
              </div>
            </div>
          </div>
          <div class="b-user-card__position">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{
                  userData.position
                    ? $t(`hashtags.position_full.${userData.position}`)
                    : $t('profile.no-content')
                }}
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
              :initValue="initValues.position"
            />
          </div>
        </div>

        <div
          v-show="currentTab === 2 || isMobTabletSize"
          class="b-user-card__tab-body"
        >
          <div v-if="isMobTabletSize" class="b-user-card__mob-title">
            {{ $t('profile.contacts') }}
          </div>
          <div class="b-user-card__phone">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data">
                {{ userData.phone || $t('profile.no-content') }}
              </div>
              <div class="b-user-card__title">
                {{ $t('profile.phone') }}
              </div>
            </div>
            <InputComponent
              v-else
              :title="$t('profile.phone')"
              :placeholder="userData.phone"
              :title-width="0"
              :outside-title="true"
              :height="40"
              name="phone"
              :icon="icons.arrowsIcon"
              v-maska="'+38 (0##) ### ## ##'"
            />
          </div>
          <div class="b-user-card__area-line">
            <div v-if="!isEditMode" class="b-user-card__to-show">
              <div class="b-user-card__data b-user__location">
                {{ userData.place?.place_name || $t('profile.no-content') }}
              </div>
              <div class="b-user-card__title">
                {{ $t('profile.location') }}
              </div>
            </div>
            <div v-else class="b-user-card__dropdowns"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  watch,
  watchEffect,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useI18n } from 'vue-i18n';

import dayjs from 'dayjs';
import dayjsUkrLocale from 'dayjs/locale/uk';

import InputComponent from './forms/InputComponent.vue';
import TextAreaComponent from '../components/TextAreaComponent.vue';
import Dropdown from './forms/Dropdown.vue';
import Avatar from '../components/Avatar.vue';
import RatingCard from '../components/RatingCard.vue';

import CONSTANTS from '../consts';
import useWindowWidth from '../utils/widthScreen';

import sortArrowHorizontally from '../assets/img/sort-arrows-horizontal.svg';
import tick from '../assets/img/tick.svg';
import edit from '../assets/img/edit.svg';
import arrows from '../assets/img/sort-arrows-horizontal.svg';

const IMAGE_TYPES = ['image/jpeg', 'image/png'];

export default {
  name: 'UserDetailsCard',
  components: {
    InputComponent,
    Dropdown,
    TextAreaComponent,
    Avatar,
    RatingCard,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    initValues: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['openEditPictureModal'],
  setup(props, { emit }) {
    const { onResize, isBetweenTabletAndDesktop, isMobile, isTablet } =
      useWindowWidth();
    const { t } = useI18n();

    const currentTab = ref(0);
    const selectedFile = ref(null);
    const imageSrc = ref(null);
    const fileReader = new FileReader();
    const labels = ref(setupLabels());
    const openedReviewId = ref(0);

    watch(
      () => props.userData,
      (newData, oldData) => {
        labels.value = setupLabels();
      }
    );

    function setupLabels() {
      return [
        props.userData?.age ? `${props.userData?.age} років` : null,
        props.userData?.position
          ? `hashtags.${props.userData?.position}`
          : null,
        props.userData?.gender ? `hashtags.${props.userData?.gender}` : null,
        props.userData?.role ? `hashtags.${props.userData?.role}` : null,
      ];
    }

    const fileInput = ref(null);

    const isMobTabletSize = computed(() => {
      return (
        isBetweenTabletAndDesktop.value || isMobile.value || isTablet.value
      );
    });

    const fullUserName = computed(
      () => `${props.userData?.last_name} ${props.userData?.name}`
    );

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
        position: CONSTANTS.profile.position,
      };
    });

    const icons = computed(() => {
      return {
        sortIcon: sortArrowHorizontally,
        tickIcon: tick,
        editIcon: edit,
        arrowsIcon: arrows,
      };
    });

    const birthDate = computed(() => {
      if (props.userData?.birthday) {
        return `${dayjs(props.userData?.birthday)
          .locale(dayjsUkrLocale)
          .format('D MMMM YYYY')} p.`;
      }
    });

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    function clickReview(reviewId) {
      if (openedReviewId.value === reviewId) {
        openedReviewId.value = 0;
      } else {
        openedReviewId.value = reviewId;
      }
    }

    function changeUserTab(id) {
      currentTab.value = id;
    }
    function clearFileInputValue() {
      fileInput.value.value = '';
    }
    function onFileSelected(e) {
      const isValidFormat = IMAGE_TYPES.includes(e.target.files[0].type);
      if (isValidFormat) {
        selectedFile.value = e.target.files[0];
      }
    }

    fileReader.onload = (event) => {
      imageSrc.value = event.target.result;
      emit('openEditPictureModal', 'edit_avatar', imageSrc.value);
    };

    watchEffect(() => {
      if (selectedFile.value) {
        fileReader.readAsDataURL(selectedFile.value);
      } else {
        imageSrc.value = null;
      }
    });

    return {
      changeUserTab,
      onFileSelected,
      clearFileInputValue,
      clickReview,
      openedReviewId,
      currentTab,
      icons,
      birthDate,
      mockData,
      labels,
      fullUserName,
      isMobTabletSize,
      fileInput,
      isMobile,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-eeeef3: #eeeef3;
$color-148581: #148581;
$color-efeff6: #efeff6;

.b-user-card {
  padding: 20px 16px;
  background: $color-eeeef3;
  border-radius: 8px;
  height: fit-content;
  @media (max-width: 1200px) {
    background: none;
    padding-top: 0px;
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

  @include tabletAndMobile {
    padding-bottom: 0px;
  }

  .b-user-card__top-table {
    background: $--b-main-white-color;
    border-radius: 8px;
    padding: 16px 16px;
    margin-bottom: 10px;
    @media (max-width: 1200px) {
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    }
    @include tabletAndMobile {
      padding: 8px 8px 10px;
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
        .b-user-card__profile-avatar {
          ::v-deep(.b-avatar) {
            width: 52px;
            height: 52px;
            border-radius: 8px;
            font-size: 23px;
          }
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
            color: $--b-main-black-color;
            margin-bottom: 8px;
          }
          img {
            cursor: pointer;
          }
        }
        .b-user-card__labels {
          display: flex;
          flex-wrap: wrap;
          width: fit-content;
          .b-user-card__label {
            span {
              display: block;
              margin-top: 4px;
              margin-right: 4px;
              background: $color-148581;
              border-radius: 100px;
              padding: 0 8px;
              height: 20px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-white-color;
            }
          }
        }
      }
    }
  }
  .b-user-card__tabs-block {
    @media (max-width: 1200px) and (min-width: 768px) {
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
      background: $--b-main-white-color;
      @media (max-width: 1200px) {
        padding: 12px;
      }
      @include tabletAndMobile {
        padding: 0px;
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
          color: $--b-main-black-color;
          margin-bottom: 10px;
          margin-top: 12px;
        }
        .b-user-card__to-show {
          .b-user-card__data {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            color: $--b-main-black-color;
          }
          .b-user-card__title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: $--b-main-gray-color;
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
            width: 100%;
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
            word-break: break-word;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: $--b-main-black-color;
            .b-user-card__title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-gray-color;
              margin-top: 4px;
            }
          }
        }
        .b-user-card__birthday-line {
          padding-top: 12px;
          margin-top: 12px;
          border-top: 1px solid $color-efeff6;
          .b-user-card__birth-date {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: $--b-main-black-color;
            .b-user-card__title {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-gray-color;
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
          .b-user-card__main-leg {
            flex-basis: 40%;
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
          border-top: 1px solid $color-efeff6;
          padding-top: 12px;
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
.b-user__location {
  border-top: 1px solid $color-efeff6;
  padding-top: 12px;
}
</style>
