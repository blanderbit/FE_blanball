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
          v-model="searchFriendsValue"
          :height="36"
          :icon="icons.search"
          :backgroundColor="'#fff'"
          name="search"
        />
      </div>
      <div class="c-friends-side-block">
        <div class="c-friends-list">
          <SmartList
            :list="paginationElements"
            ref="refList"
            v-model:scrollbar-existing="blockScrollToTopIfExist"
          >
            <template #smartListItem="slotProps">
              <div
                :class="[
                  'c-freinds-list__friend',
                  { active: slotProps.smartListItem.id === activeUserId },
                ]"
                :key="slotProps.index"
                @click="activateUser(slotProps.smartListItem.id)"
              >
                <div class="c-friend__avatar">
                  <UserAvatar
                    :link="slotProps.smartListItem.profile.avatar_url"
                    :full-name="`${slotProps.smartListItem.profile.last_name} ${slotProps.smartListItem.profile.name}`"
                    @clickByAvatar="activateUser(slotProps.smartListItem.id)"
                  />
                </div>
                <div class="c-friend__main-info">
                  <div class="c-friend__full-name">
                    {{ slotProps.smartListItem.profile.last_name }}
                    {{ slotProps.smartListItem.profile.name }}
                  </div>
                  <div class="c-friend__gaming-position">
                    <span v-if="slotProps.smartListItem.profile.position">{{
                      $t(
                        `hashtags.position_full.${slotProps.smartListItem.profile.position}`
                      )
                    }}</span>
                    <span v-else>----</span>
                  </div>
                </div>
              </div>
            </template>
            <template #after>
              <InfiniteLoading
                :identifier="triggerForRestart"
                ref="scrollbar"
                @infinite="loadDataPaginationData(paginationPage + 1, $event)"
              >
                <div class="c-no-results">
                  {{ $t('errors.no-results') }}
                </div>
                <template #complete>
                  <ScrollToTop
                    :element-length="paginationElements"
                    :is-scroll-top-exist="blockScrollToTopIfExist"
                    @scroll-button-clicked="scrollToFirstElement()"
                  />
                </template>
              </InfiniteLoading>
            </template>
          </SmartList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

import { v4 as uuid } from 'uuid';

import MainInput from '../../shared/input/MainInput.vue';
import SmartList from '../../../components/shared/smartList/SmartList.vue';
import ScrollToTop from '../../ScrollToTop.vue';
import InfiniteLoading from '../../main/infiniteLoading/InfiniteLoading.vue';
import UserAvatar from '../../shared/userAvatar/UserAvatar.vue';

import { PaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';

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
    UserAvatar,
    MainInput,
    SmartList,
    ScrollToTop,
    InfiniteLoading,
  },
  emits: ['friendsBlockSwitcher'],
  setup() {
    const refList = ref();
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref(false);
    const activeUserId = ref(0);
    const searchFriendsValue = ref('');

    const todayDate = computed(() => {
      const date = new Date();
      return `${date.getDate()} ${dates.monthNames[date.getMonth()]}`;
    });

    const icons = computed(() => {
      return {
        search: searchIcon,
      };
    });

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const activateUser = (userId) => {
      if (activeUserId.value !== userId) {
        activeUserId.value = userId;
      }
    };

    let searchTimeout;

    const searchFriends = () => {
      clearTimeout(searchTimeout);

      const load = () => {
        paginationClearData();
        loadDataPaginationData(1, null);
        restartInfiniteScroll();
      };
      searchTimeout = setTimeout(load, 500);
    };

    watch(
      () => searchFriendsValue.value,
      () => {
        searchFriends();
      }
    );

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.UserService.getAllUsers({
          page,
          search: searchFriendsValue.value,
        }),
    });

    function loadDataPaginationData(pageNumber, $state) {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    }

    loadDataPaginationData(1, null);

    return {
      todayDate,
      icons,
      refList,
      triggerForRestart,
      paginationPage,
      blockScrollToTopIfExist,
      activeUserId,
      paginationElements,
      searchFriendsValue,
      restartInfiniteScroll,
      activateUser,
      loadDataPaginationData,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
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
.c-no-results {
  @include inter(13px, 20, $--b-main-gray-color);
  line-height: 20px;
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
      overflow: hidden;

      .c-friends-list {
        overflow-y: scroll;
        height: 100%;
        .c-freinds-list__friend {
          display: flex;
          align-items: center;
          margin-top: 20px;
          cursor: pointer;

          &.active {
            transition: all 0.3s;
            padding-left: 10px;
            background: #f9f9fc;
            border-left: 2px solid #d62953;
          }

          .c-friend__main-info {
            margin-left: 12px;
            .c-friend__full-name {
              @include inter(14px, 600);
              line-height: 20px;
            }

            .c-friend__gaming-position {
              @include inter(12px, 500, #8a8aa8);
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
