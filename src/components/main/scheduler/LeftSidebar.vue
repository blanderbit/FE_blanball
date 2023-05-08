<template>
  <div
    class="c-left-block"
    :style="{ 'margin-right': isFriendsVisible ? '0px' : '-260px' }"
  >
    <div class="c-top-part">
      <div class="c-date">
        {{ $t('scheduler.today-date', { todayDate: todayDate }) }}
      </div>
      <div class="c-hide" @click="$emit('friendsBlockSwitcher')">
        <span> {{ $t('buttons.hide') }} </span>
        <span>
          <img src="../../../assets/img/scheduler/dbl-arrow.svg" alt="" />
        </span>
      </div>
    </div>
    <div class="c-bottom-part">
      <div class="c-input-search">
        <MainInput
          :title-width="0"
          :placeholder="$t('scheduler.found-user')"
          inputMode="search"
          :height="36"
          :icon="icons.search"
          :backgroundColor="'#fff'"
          name="search"
        />
      </div>
      <div class="c-friends-side-block">
        <div
          v-for="user in users"
          :key="user.id"
          :class="['c-user-card', { active: user.isActive }]"
          @click="$emit('activateUser', user.id)"
        >
          <div class="avatar">
            <img :src="user.img" alt="" />
          </div>
          <div class="text-block">
            <div class="name">
              {{ user.name }}
            </div>
            <div class="position">
              {{ user.role }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import MainInput from '../../shared/input/MainInput.vue';

import dates from '../../../consts/dates';

import searchIcon from '../../../assets/img/scheduler/lens.svg';

export default {
  name: 'LeftSidebar',
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    isFriendsVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    MainInput,
  },
  emits: ['friendsBlockSwitcher', 'activateUser'],
  setup() {
    const todayDate = computed(() => {
      const date = new Date();
      return `${date.getDate()} ${dates.monthNames[date.getMonth()]}`;
    });

    const icons = computed(() => {
      return {
        search: searchIcon,
      };
    });

    return {
      todayDate,
      icons,
    };
  },
};
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
$color-dfdeed: #dfdeed;
$color-f9f9fc: #f9f9fc;
$color-d62953: #d62953;
$color-8a8aa8: #8a8aa8;
* {
  box-sizing: border-box;
}
.c-left-block {
  width: 260px;
  height: 100%;
  z-index: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
  .c-top-part {
    flex: 1 1;
    .c-date {
      border-bottom: 1px solid #efeff6;
      font-weight: 500;
      font-size: 12px;
      color: $--b-main-black-color;
      padding-top: 6px;
      height: 51px;
    }
    .c-hide {
      text-align: right;
      padding: 20px 0px;
      cursor: pointer;
      span {
        font-weight: 400;
        font-size: 12px;
        color: $--b-main-gray-color;
        margin-right: 9px;
      }
    }
  }
  .c-bottom-part {
    padding-right: 16px;
    height: 566px;
    flex: 439px 1;
    display: flex;
    flex-direction: column;
    .c-friends-side-block {
      height: 100%;
      margin-top: 12px;
      .c-user-card {
        display: flex;
        padding-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        cursor: pointer;
        &.active {
          transition: all 0.3s;
          padding-left: 10px;
          background: #f9f9fc;
          border-left: 2px solid #d62953;
        }
        .avatar {
          margin-right: 12px;
        }
        .text-block {
          .name {
            font-weight: 600;
            font-size: 14px;
            color: $--b-main-black-color;
          }
          .position {
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: #8a8aa8;
          }
        }
      }
    }
  }
}
</style>
