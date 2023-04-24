<template>
  <div @click.self="$emit('closeWindow')" class="c-scheduler-wrapper">
    <div class="c-common-block">
      <!-- Sidebar Slot -->
      <slot
        name="LeftSidebar"
        :allUsers="allUsers"
        :isFriendsVisible="isFriendsVisible"
        :friendsBlockSwitcher="friendsBlockSwitcher"
        :activateUser="activateUser"
      ></slot>
      <!-- Sidebar Slot -->
      <div class="c-right-block">
        <div class="c-friends-line">
          <slot
            name="TopFriendsBlock"
            :isFriendsVisible="isFriendsVisible"
            :minUsers="minUsers"
            :usersNumber="config.users.length"
            :friendsBlockSwitcher="friendsBlockSwitcher"
          ></slot>
          <div class="c-hide-btn" @click="$emit('closeWindow')">
            <img src="../../../assets/img/scheduler/close-icton.svg" alt="" />
          </div>
        </div>
        <div class="c-scheduler-block">
          <vue-cal
            selected-date="2023-03-19"
            xsmall
            :time-from="10 * 60"
            :disable-views="['day', 'year', 'years']"
            events-count-on-year-view
            active-view="month"
            :events="currentEvent"
            locale="uk"
          >
            <template #title="{ title }">
              <div class="c-title">
                {{ removeYearFromDate(title) }}
              </div>
            </template>
            <template #arrow-prev>
              <img src="../../../assets/img/scheduler/arrow-left.svg" alt="" />
            </template>
            <template #arrow-next>
              <img src="../../../assets/img/scheduler/arrow-right.svg" alt="" />
            </template>
            <template #cell-content="{ cell, events }">
              <div
                class="c-cell-wrapper"
                @mouseover="mouseOverCell(cell.formattedDate)"
                @mouseleave="mouseLeaveCell"
              >
                <div
                  v-if="showCornerThreeDots(cell.formattedDate)"
                  class="c-three-dots"
                  @click="openContextMenu"
                >
                  <div v-for="i in 3" :key="i" class="c-menu-dots"></div>
                </div>
                <div>
                  {{ cell.content }}
                </div>
                <div class="c-event-dots">
                  <div class="c-myevents-cover">
                    <slot
                      name="MyEventDots"
                      :events="events"
                      :bgColor="myEventsDotColor"
                    ></slot>
                  </div>
                  <div class="c-otherevents-cover">
                    <slot
                      name="OtherEventDots"
                      :bgColor="otherEventsDotColor"
                    ></slot>
                  </div>
                </div>
              </div>
            </template>
          </vue-cal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import VueCal from 'vue-cal';
import ContextMenu from '@imengyu/vue3-context-menu';

import 'vue-cal/dist/vuecal.css';

export default {
  name: 'VueScheduler',
  components: {
    VueCal,
  },
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['closeWindow'],
  setup(props) {
    const isFriendsVisible = ref(false);
    const isThreeDotsShown = ref(false);
    const currentCellDay = ref('');
    const currentCellMonth = ref('');
    const currentEvent = ref(props.config.users[0].events);
    const myEventsDotColor = ref(props.config.myEventsDotColor || '#148581');
    const otherEventsDotColor = ref(
      props.config.otherEventsDotColor || '#D62953'
    );

    const allUsers = ref(props.config.users);
    const minUsers = computed(() => {
      return allUsers.value.filter((item, idx) => idx < 4);
    });

    function friendsBlockSwitcher() {
      isFriendsVisible.value = !isFriendsVisible.value;
    }
    function mouseOverCell(val) {
      currentCellDay.value = +val.split('-')[1];
      currentCellMonth.value = +val.split('-')[2];
    }
    function mouseLeaveCell() {
      currentCellDay.value = '';
      currentCellMonth.value = '';
    }
    function activateUser(id) {
      allUsers.value.map((item) => (item.isActive = false));
      allUsers.value.find((item) => item.id === id).isActive = true;
      currentEvent.value = props.config.users[id].events;
    }
    function removeYearFromDate(title) {
      return title.split(' ')[0];
    }
    function showCornerThreeDots(val) {
      return (
        currentCellDay.value === +val.split('-')[1] &&
        currentCellMonth.value === +val.split('-')[2]
      );
    }
    function openContextMenu(e) {
      e.preventDefault();
      ContextMenu.showContextMenu({
        x: e.x,
        y: e.y,
        items: props.config?.contextMenu,
      });
    }

    return {
      allUsers,
      minUsers,
      isFriendsVisible,
      isThreeDotsShown,
      currentCellDay,
      currentCellMonth,
      currentEvent,
      myEventsDotColor,
      otherEventsDotColor,
      friendsBlockSwitcher,
      mouseOverCell,
      mouseLeaveCell,
      openContextMenu,
      activateUser,
      removeYearFromDate,
      showCornerThreeDots,
    };
  },
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.mx-context-menu {
  background: red;
}
.c-scheduler-wrapper {
  @include modal-wrapper;
  display: flex;
  justify-content: flex-end;
  font-family: 'Inter', sans-serif;
  padding: 8px;
  .c-common-block {
    background: #ffffff;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    padding: 16px;
    display: flex;
    height: fit-content;
    position: absolute;
    top: 80px;
    right: 160px;

    .c-right-block {
      z-index: 1;
      background: #fff;
      .c-friends-line {
        border-bottom: 1px solid #efeff6;
        padding-bottom: 14px;
        height: 51px;
        position: relative;
        .c-hide-btn {
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
        }
      }
      .c-scheduler-block {
        width: 704px;
        height: 644px;
        box-shadow: none;
        &::v-deep {
          .vuecal {
            box-shadow: none;
            .vuecal__header {
              .vuecal__title-bar {
                background: none;
                justify-content: center;
                .vuecal__title {
                  flex: 0;
                  margin: 0 30px;
                }
                .c-title {
                  font-weight: 500;
                  font-size: 12px;
                  color: #575775;
                }
              }
              .vuecal__menu {
                display: none;
              }
              .vuecal__weekdays-headings {
                border: none;
                .vuecal__heading {
                  font-weight: 600;
                }
              }
            }
            .vuecal__body {
              .vuecal__cell {
                &::before {
                  right: 0;
                  bottom: 0;
                }
                .vuecal__cell-content {
                  .c-cell-wrapper {
                    height: 100%;
                    padding-top: 12px;
                    position: relative;
                    .c-three-dots {
                      position: absolute;
                      top: 0;
                      right: 0;
                      width: 28px;
                      height: 28px;
                      right: 0px;
                      background: #bef0ef;
                      border-radius: 0px 0px 0px 4px;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                      cursor: pointer;
                      .c-menu-dots {
                        width: 3px;
                        height: 3px;
                        background: #148783;
                        border-radius: 50%;
                        margin-bottom: 2px;
                      }
                    }
                    &:hover {
                      background: #e9fcfb;
                      color: #148783;
                    }
                    .c-event-dots {
                      margin-top: 10px;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      .c-myevents-cover {
                        display: flex;
                      }
                      .c-otherevents-cover {
                        margin-top: 10px;
                        display: flex;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
