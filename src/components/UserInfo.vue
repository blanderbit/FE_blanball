<template>
  <div class="b-user-info">
    <div class="b-user-info__top-side">
      <Avatar
        class=""
        :link="userData.profile.avatar_url"
        :full-name="`${userData.profile.last_name} ${userData.profile.name}`"
      ></Avatar>
      <div class="b-user-info__top-side-user-info">
        <div class="b-user__full-name">
          {{ userData.profile.last_name }} {{ userData.profile.name }}
        </div>
        <div class="b-user__hashtags">
          <div v-for="hastag in hashtags" class="b-user__hashtag">
            <span v-if="hastag"> # {{ $t(hastag) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="b-user-info__main-side">
      <div class="b-main-side__tabs">
        <div
          v-for="tab in mockData.tabs"
          :class="['b-main-side__tab', { active: currentTab === tab.id }]"
          :style="`width: ${tab.width};`"
          @click="switchTab(tab.id)"
        >
          {{ tab.title }}
        </div>
      </div>
      <div class="b-main-side-content">
        <div
          v-if="currentTab === 0 && !editMode"
          class="b-main-side__tab-content"
        >
          <div class="b-tab__field">
            <div class="b-field__title">
              {{ userData.profile.about_me || $t('profile.about-me') }}
            </div>
            <div class="b-field__subtitlte">
              {{
                userData.profile.about_me
                  ? $t('profile.about-me')
                  : $t('profile.write-several-words')
              }}
            </div>
          </div>
          <div class="b-tab__field">
            <div class="b-field__title">
              {{ userData.profile.about_me || $t('profile.no-content') }}
            </div>
            <div class="b-field__subtitlte">
              {{ $t('profile.birth-date') }}
            </div>
          </div>
        </div>

        <div
          v-if="currentTab === 0 && editMode"
          class="b-main-side-content__edit-mode"
        >
          <div class="b-edit-mode__top-side">
            <InputComponent
              :outside-title="true"
              :placeholder="$t('profile.surname')"
              :title="$t('profile.surname')"
              :title-width="0"
              :height="40"
              v-model="userData.profile.last_name"
              name="name"
            />
            <InputComponent
              :outside-title="true"
              :placeholder="$t('profile.words-about-myself')"
              :title="$t('profile.words-about-myself')"
              :title-width="0"
              :height="40"
              v-model="userData.profile.name"
              name="last_name"
            />
          </div>
          <div class="b-edit-mode__main-side">
            <TextAreaComponent
              :outside-title="true"
              :title="$t('profile.words-about-myself')"
              :height="86"
              :title-width="0"
              v-model="userData.profile.about_me"
              name="about_me"
            />
          </div>

          <div class="b-edit-mode__bottom-side">
            <Dropdown
              class="b-edit-mode__day-dropdown"
              :placeholder="$t('profile.day')"
              :main-title="$t('profile.day')"
              :options="mockData.days"
              display-name="name"
              display-value="value"
              name="day"
            />
            <Dropdown
              class="b-edit-mode__month-dropdown"
              :placeholder="$t('profile.month')"
              :main-title="$t('profile.month')"
              :options="mockData.months"
              display-name="name"
              display-value="value"
              name="month"
            />
            <Dropdown
              class="b-edit-mode__year-dropdown"
              :placeholder="$t('profile.year')"
              :main-title="$t('profile.year')"
              :options="mockData.years"
              display-name="name"
              display-value="value"
              name="year"
            />
          </div>
        </div>

        <div
          v-if="currentTab === 1 && !editMode"
          class="b-main-side__tab-content"
        >
          <div class="b-tab__user-characteristics">
            <div class="b-tab__field">
              <div class="b-field__title">
                {{ userData.profile.height || $t('profile.no-content') }}
              </div>
              <div class="b-field__subtitlte">
                {{ $t('profile.height') }}
              </div>
            </div>

            <div class="b-tab__field">
              <div class="b-field__title">
                {{ userData.profile.weight || $t('profile.no-content') }}
              </div>
              <div class="b-field__subtitlte">
                {{ $t('profile.weight') }}
              </div>
            </div>

            <div class="b-tab__field">
              <div class="b-field__title">
                {{ userData.profile.working_leg || $t('profile.no-content') }}
              </div>
              <div class="b-field__subtitlte">
                {{ $t('profile.main-leg') }}
              </div>
            </div>
          </div>
          <div class="b-tab__field">
            <div class="b-field__title">
              {{ userData.profile.position || $t('profile.no-content') }}
            </div>
            <div class="b-field__subtitlte">
              {{ $t('profile.game-position') }}
            </div>
          </div>
        </div>

        <div
          v-if="currentTab === 1 && editMode"
          class="b-main-side-content__edit-mode"
        >
          <div class="b-edit-mode__top-side">
            <Dropdown
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
          <div class="b-edit-mode__main-side"></div>

          <div class="b-edit-mode__bottom-side"></div>
        </div>

        <div
          v-if="currentTab === 2 && !editMode"
          class="b-main-side__tab-content"
        >
          <div class="b-tab__field">
            <div class="b-field__title">
              {{ userData.phone || $t('profile.no-content') }}
            </div>
            <div class="b-field__subtitlte">
              {{ $t('profile.phone') }}
            </div>
          </div>
          <div class="b-tab__field">
            <div class="b-field__title">
              {{ userData.profile.place || $t('profile.no-content') }}
            </div>
            <div class="b-field__subtitlte">
              {{ $t('profile.location') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import Avatar from './Avatar.vue';
import InputComponent from './forms/InputComponent.vue';
import Dropdown from './forms/Dropdown.vue';
import TextAreaComponent from './TextAreaComponent.vue';

import CONSTANTS from '../consts';

export default {
  components: {
    Avatar,
    Dropdown,
    InputComponent,
    TextAreaComponent,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
    editMode: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const currentTab = ref(0);
    const hashtags = ref([
      props.userData.role ? `hashtags.${props.userData.role}` : null,
      props.userData.position ? `hashtags.${props.userData.position}` : null,
      props.userData.age ? `${props.userData.age} років` : null,
      props.userData.gender ? `hashtags.${props.userData.gender}` : null,
    ]);

    const mockData = computed(() => {
      return {
        days: CONSTANTS.dates.days,
        months: CONSTANTS.dates.months,
        years: CONSTANTS.dates.years,
        tabs: CONSTANTS.profile.tabTitles,
      };
    });

    const switchTab = (tabId) => {
      currentTab.value = tabId;
    };

    return {
      hashtags,
      mockData,
      currentTab,
      switchTab,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-eeeef3: #eeeef3;
$color-148581: #148581;
$color-f9f9fc: #f9f9fc;
$color-6f6f77: #6f6f77;

.b-user-info {
  background: $color-eeeef3;
  border-radius: 8px;
  padding: 20px 16px;
  width: 100%;
  max-width: 464px;
  .b-user-info__top-side {
    background: $--b-main-white-color;
    border-radius: 8px;
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    .b-user-info__top-side-user-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      .b-user__full-name {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: $--b-main-black-color;
      }
      .b-user__hashtags {
        display: flex;
        align-items: center;
        gap: 4px;
        .b-user__hashtag {
          background: $color-148581;
          border-radius: 100px;
          padding: 0px 8px;
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
  .b-user-info__main-side {
    margin-top: 16px;
    .b-main-side__tabs {
      display: flex;
      gap: 4px;
      width: 100%;
      .b-main-side__tab {
        background: $color-f9f9fc;
        border-radius: 4px 4px 0px 0px;
        padding: 8px 16px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: $--b-main-gray-color;
        cursor: pointer;

        &.active {
          background: $--b-main-white-color;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: $--b-main-gray-color;
        }
      }
    }
    .b-main-side-content {
      background: $--b-main-white-color;
      width: 100%;
      min-height: 160px;
      padding: 20px 16px 12px 16px;
      display: flex;
      justify-content: space-between;

      .b-main-side__tab-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        .b-tab__user-characteristics {
          min-width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .b-tab__field {
          .b-field__title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: $--b-main-black-color;
          }
          .b-field__subtitlte {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: $color-6f6f77;
            margin-top: 8px;
          }
        }
      }
    }
  }
  .b-main-side-content__edit-mode {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .b-edit-mode__top-side {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .b-edit-mode__bottom-side {
      display: flex;
      align-items: center;
      gap: 8px;

      .b-edit-mode__day-dropdown {
        flex-basis: 30%;
      }
      .b-edit-mode__month-dropdown {
        flex-basis: 40%;
      }
      .b-edit-mode__year-dropdown {
        flex-basis: 30%;
      }
    }
  }
}
</style>
