<template>
  <div 
    class="c-left-block"
    :style="{ 'margin-right': isFriendsVisible ? '0px' : '-260px' }"
  >
    <div class="c-top-part">
      <div class="c-date">
        Сьогодні: {{ todayDate }}
      </div>
      <div class="c-hide" 
      @click="$emit('friendsBlockSwitcher')"  >
        <span>
          Приховати
        </span>
        <span>
          <img src="../../../assets/img/scheduler/dbl-arrow.svg" alt="">
        </span>
      </div>
    </div>
    <div class="c-bottom-part">
      <div class="c-input-search">
        <div class="c-lens-icon">
          <img src="../../../assets/img/scheduler/lens.svg" alt="">
        </div>
        <input type="text" placeholder="Знайти людину">
      </div>
      <div class="c-friends-side-block">
        <div 
          v-for="user in users"
          :key="user.id"
          :class="['c-user-card', { active: user.isActive }]"
          @click="$emit('activateUser', user.id)"
        >
          <div class="avatar">
            <img :src="user.img" alt="">
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
import { computed } from 'vue'
import dates from '../../../consts/dates'

export default {
  name: 'LeftSidebar',
  props: {
    users: {
      type: Array,
      default: () => ([])
    },
    isFriendsVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['friendsBlockSwitcher', 'activateUser'],
  setup() {
    const todayDate = computed(() => {
      const date = new Date()
      return `${date.getDate()} ${dates.monthNames[date.getMonth()]}`
    })

    return {
      todayDate
    }
  }
}
</script>

<style scoped lang="scss">
$color-efeff6: #efeff6;
$color-262541: #262541;
$color-575775: #575775;
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
  transition: all .5s;
  .c-top-part {
    flex: 1 1;
    .c-date {
      border-bottom: 1px solid #EFEFF6;
      font-weight: 500;
      font-size: 12px;
      color: $color-262541;
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
        color: $color-575775;
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
    .c-input-search {
      position: relative;
      width: 100%;
      margin-bottom: 12px;
      .c-lens-icon {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 37px;
        display: flex;
        padding: 8px;
      }
      input {
        outline: none;
        width: 100%;
        padding: 8px 35px 8px 12px;
        border: 1px solid #DFDEED;
        border-radius: 6px;
      }
    }
    .c-friends-side-block {
      height: 100%;
      .c-user-card { 
        display: flex;
        padding-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        cursor: pointer;
        &.active {
          transition: all .3s;
          padding-left: 10px;
          background: #F9F9FC;
          border-left: 2px solid #D62953;
        }
        .avatar { 
          margin-right: 12px;
        }
        .text-block { 
          .name { 
            font-weight: 600;
            font-size: 14px;
            color: $color-262541;
          }
          .position { 
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: #8A8AA8;
          }
        }
      }
    }
  }
}
</style>