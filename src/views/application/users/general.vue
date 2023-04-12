<template>
  <div class="events-page">
    <div class="main-body">
      <div class="header-block">
        <div class="left-part">
          <div class="title">{{ $t('users.title') }}</div>
        </div>
      </div>
      <div class="tab-block-wrapper">
        <div class="tab-block">
          <div
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'tab-element',
              { active: tab.isActive },
              { disabled: tab.isDisabled },
            ]"
            @mouseenter="enterHoverSidebarItem(tab.id)"
            @mouseleave="leaveHoverSidebarItem"
          >
            <Transition>
              <TabLabel
                v-if="tab.isDisabled && currentHoverSideBarItemID === tab.id"
                :title="$t('profile.coming-soon-title')"
                :text="$t('profile.coming-soon-text')"
              />
            </Transition>

            <img :src="tab.img" :alt="tab.name" />
            <span>
              {{ $t('users.' + tab.name) }}
            </span>
          </div>
        </div>
      </div>
      <users-filters
        :model-value="filters"
        :elementsCount="paginationTotalCount"
        @update:value="setFilters"
        @clearFilters="clearFilters"
      >
      </users-filters>
      <div class="user-cards-wrapper">
        <div class="users-cards">
          <SmartList
            :list="paginationElements"
            ref="refList"
            v-model:scrollbar-existing="blockScrollToTopIfExist"
          >
            <template #smartListItem="slotProps">
              <UserCard
                :key="slotProps.index"
                :user-data="slotProps.smartListItem"
                @update:expanding="
                  slotProps.smartListItem.metadata.expanding = $event
                "
                @openUserProfile="openUserProfile(slotProps.smartListItem.id)"
              />
            </template>
            <template #after>
              <InfiniteLoading
                :identifier="triggerForRestart"
                ref="scrollbar"
                @infinite="loadDataPaginationData(paginationPage + 1, $event)"
              >
                <template #complete>
                  <EmptyList
                    v-if="!paginationElements.length"
                    :title="emptyListMessages.title"
                    :description="emptyListMessages.title"
                  />

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

    <RightSidebar></RightSidebar>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import InputComponent from '../../../components/forms/InputComponent.vue';
import UserCard from '../../../components/UserCard.vue';
import SmartList from '../../../components/smart-list/SmartList.vue';
import EmptyList from '../../../components/EmptyList.vue';
import ScrollToTop from '../../../components/ScrollToTop.vue';
import RightSidebar from '../../../components/RightSidebar.vue';
import TabLabel from '../../../components/TabLabel.vue';

import members from '../../../assets/img/members.svg';
import runner from '../../../assets/img/runner.svg';
import ball from '../../../assets/img/ball.svg';
import timer from '../../../assets/img/timer.svg';
import tShirt from '../../../assets/img/t-shirt.svg';
import searchIcon from '../../../assets/img/search.svg';

import InfiniteLoading from '../../../workers/infinit-load-worker/InfiniteLoading.vue';
import { v4 as uuid } from 'uuid';
import { PaginationWorker } from '../../../workers/pagination-worker';
import { API } from '../../../workers/api-worker/api.worker';

import { FilterPatch } from '../../../workers/api-worker/http/filter/filter.patch';
import UsersFilters from '../../../components/filters/block-filters/UsersFilters.vue';
import { ROUTES } from '../../../router/router.const';

export default {
  name: 'RatingPage',
  components: {
    InputComponent,
    UserCard,
    SmartList,
    InfiniteLoading,
    ScrollToTop,
    EmptyList,
    UsersFilters,
    RightSidebar,
    TabLabel,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const refList = ref();
    const blockScrollToTopIfExist = ref(false);
    const triggerForRestart = ref(false);
    const currentHoverSideBarItemID = ref(0);
    const { t } = useI18n();

    const restartInfiniteScroll = () => {
      triggerForRestart.value = uuid();
    };

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.UserService.getAllUsers({
          ...getRawFilters(),
          page,
        }),
      dataTransformation: (item) => {
        item.metadata = {
          expanding: false,
        };
        return item;
      },
    });

    const emptyListMessages = computed(() => {
      return {
        title: t('no_records.noUsers.title'),
        description: t('no_records.noUsers.description'),
      };
    });

    paginationPage.value = 1;
    paginationElements.value = route.meta.allUsersData.data.results;

    const { getRawFilters, filters, setFilters, clearFilters } = FilterPatch({
      router,
      filters: {
        dist: {
          type: Number,
          default: null,
        },
        ordering: {
          type: String,
          default: '',
        },
        point: {
          type: Number,
          default: null,
        },
        profile__age_min: {
          type: Number,
          default: 6,
        },
        profile__age_max: {
          type: Number,
          default: 80,
        },
        profile__position: {
          type: String,
          default: '',
        },
        profile__gender: {
          type: String,
          default: '',
        },
        search: {
          type: String,
          default: '',
        },
        is_online: {
          type: Boolean,
          default: false,
        },
      },
      afterUpdateFiltersCallBack: () => {
        restartInfiniteScroll();
        paginationClearData();
      },
    });

    const loadDataPaginationData = (pageNumber, $state) => {
      paginationLoad({
        pageNumber,
        $state,
        forceUpdate: paginationPage.value === 1,
      });
    };

    const enterHoverSidebarItem = (itemId) =>
      (currentHoverSideBarItemID.value = itemId);

    const leaveHoverSidebarItem = () => (currentHoverSideBarItemID.value = 0);

    return {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      refList,
      emptyListMessages,
      currentHoverSideBarItemID,
      blockScrollToTopIfExist,
      filters,
      triggerForRestart,
      loadDataPaginationData,
      leaveHoverSidebarItem,
      enterHoverSidebarItem,
      scrollToFirstElement: () => {
        refList.value.scrollToFirstElement();
      },
      openUserProfile: (userId) => {
        router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId));
      },
      setFilters,
      clearFilters,
    };
  },
  data() {
    return {
      eventData: {
        gender: '',
      },
      tabs: [
        {
          id: 1,
          name: 'general',
          img: members,
          url: '/application/users/general',
          isDisabled: false,
          isActive: true,
        },
        {
          id: 2,
          name: 'players',
          img: runner,
          url: '/application/users/players',
          isDisabled: true,
          isActive: false,
        },
        {
          id: 3,
          name: 'trainers',
          img: ball,
          url: '/application/users/trainers',
          isDisabled: true,
          isActive: false,
        },
        {
          id: 4,
          name: 'referee',
          img: timer,
          url: '/application/users/referee',
          isDisabled: true,
          isActive: false,
        },
        {
          id: 5,
          name: 'teams',
          img: tShirt,
          url: '/application/users/teams',
          isDisabled: true,
          isActive: false,
        },
      ],
      calendar: [
        {
          id: 0,
          week: [
            { id: 0, day: 'Пн', number: 13, isActive: false },
            { id: 1, day: 'Вт', number: 14, isActive: false },
            { id: 2, day: 'Ср', number: 15, isActive: false },
            { id: 3, day: 'Чт', number: 16, isActive: false },
            { id: 4, day: 'Пт', number: 17, isActive: false },
            { id: 5, day: 'Сб', number: 18, isActive: false },
            { id: 6, day: 'Вс', number: 19, isActive: true },
          ],
        },
        {
          id: 1,
          week: [
            { id: 0, day: 'Пн', number: 20, isActive: false },
            { id: 1, day: 'Вт', number: 21, isActive: false },
            { id: 2, day: 'Ср', number: 22, isActive: true },
            { id: 3, day: 'Чт', number: 23, isActive: false },
            { id: 4, day: 'Пт', number: 24, isActive: false },
            { id: 5, day: 'Сб', number: 25, isActive: false },
            { id: 6, day: 'Вс', number: 26, isActive: false },
          ],
        },
        {
          id: 2,
          week: [
            { id: 0, day: 'Пн', number: 27, isActive: true },
            { id: 1, day: 'Вт', number: 28, isActive: false },
            { id: 2, day: 'Ср', number: 29, isActive: false },
            { id: 3, day: 'Чт', number: 30, isActive: false },
            { id: 4, day: 'Пт', number: 31, isActive: false },
            { id: 5, day: 'Сб', number: 1, isActive: false },
            { id: 6, day: 'Вс', number: 2, isActive: false },
          ],
        },
      ],
    };
  },
  computed: {
    // users() {
    //   return CONSTANTS.users_page.users
    // },
    searchIcon() {
      return searchIcon;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-f4f4f4: #f4f4f4;
$color-efeff6: #efeff6;
$color-fafafa: #fafafa;
$color-4a7deb: #4a7deb;
$color-8978ee: #8978ee;
$color-d243c5: #d243c5;
$color-4c4a82: #4c4a82;
$color-393762: #393762;
$color-71ba12: #71ba12;
:deep(.b-filters__wrapper) {
  margin-top: -30px;
  @include beforeDesktop {
    margin-top: -50px;
  }
  @include mobile {
    margin-top: -75px;
  }
}
.events-page {
  display: grid;
  grid-template-columns: 1fr 256px;
  grid-gap: 28px;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  .main-body {
    .header-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-part {
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: $--b-main-black-color;
          margin-bottom: 4px;
        }
        .event-switcher {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          text-align: center;
          color: $--b-main-black-color;
          display: flex;
          @media (max-width: 992px) {
            display: none;
          }
          .general-events {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: 100px;
            height: 28px;
            border-radius: 6px 0px 0px 6px;
            cursor: pointer;
          }
          .my-events {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 10px;
            width: 100px;
            height: 28px;
            border-radius: 0px 6px 6px 0px;
            cursor: pointer;
          }
        }
      }
      .right-part {
        .search-input-desktop {
          width: 220px;
          height: 32px;
          margin-right: 8px;
          @media (max-width: 1200px) {
            display: none;
          }
        }
      }
    }
    .tab-block-wrapper {
      height: 125px;
      overflow-x: scroll;
      @include mobile {
        position: relative;
        margin-top: 24px;
      }
      .tab-block {
        display: flex;
        border-bottom: 1px solid $color-dfdeed;
        margin-top: 28px;
        @include mobile {
          position: absolute;
          margin-top: 0;
        }
        .tab-element {
          display: flex;
          align-items: center;
          margin-right: 24px;
          padding-bottom: 12px;
          text-decoration: none;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          color: $--b-main-black-color;
          cursor: pointer;
          position: relative;
          user-select: none;
          img {
            margin-right: 8px;
          }
          &.active {
            border-bottom: 2px solid $--b-main-black-color;
          }
          &.disabled {
            color: $--b-disabled-color;

            .v-enter-active,
            .v-leave-active {
              transition: opacity 0.4s ease;
            }

            .v-enter-from,
            .v-leave-to {
              opacity: 0;
            }

            img {
              opacity: 0.5;
            }
          }
        }
      }
    }
    .main-search-block {
      margin-top: 36px;
      position: relative;
      @media (max-width: 992px) {
        padding: 0;
      }
      .search-block {
        @media (max-width: 992px) {
          display: none;
        }
        .first-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          .left-block {
            display: flex;
            align-items: center;
            .radio-btn-wrapper {
              $color1: $color-f4f4f4;
              $color2: $--b-main-green-color;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .radio {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 6px 12px;
                background: $--b-main-white-color;
                border: 1px solid $color-dfdeed;
                border-radius: 6px;
                margin-right: 8px;
                input[type='radio'] {
                  position: absolute;
                  opacity: 0;
                  + .radio-label {
                    display: flex;
                    align-items: center;
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 13px;
                    line-height: 24px;
                    text-transform: capitalize;
                    color: $--b-main-black-color;
                    img {
                      margin-right: 4px;
                    }
                    &:after {
                      content: '';
                      border-radius: 100%;
                      border: 1px solid $--b-main-black-color;
                      display: inline-block;
                      width: 13px;
                      height: 13px;
                      position: relative;
                      top: 0px;
                      margin-left: 12px;
                      vertical-align: top;
                      cursor: pointer;
                      text-align: center;
                      transition: all 250ms ease;
                    }
                  }
                  &:checked {
                    + .radio-label {
                      &:after {
                        border: 1px solid $color2;
                        background-color: $color2;
                        box-shadow: inset 0 0 0 3px $color1;
                      }
                    }
                  }
                  &:focus {
                    + .radio-label {
                      &:before {
                        outline: none;
                        border-color: $color2;
                      }
                    }
                  }
                  &:disabled {
                    + .radio-label {
                      &:before {
                        box-shadow: inset 0 0 0 4px $color1;
                        border-color: darken($color1, 25%);
                        background: darken($color1, 25%);
                      }
                    }
                  }
                  + .radio-label {
                    &:empty {
                      &:before {
                        margin-right: 0;
                      }
                    }
                  }
                }
              }
            }
          }
          .middle-block {
            display: flex;
            align-items: center;
            border-bottom: 1px dashed $--b-main-black-color;
            img {
              margin-right: 7px;
            }
            .address {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: $--b-main-black-color;
            }
          }
          .right-block {
            display: flex;
            align-items: center;
            .old-new-filter {
              display: flex;
              align-items: center;
              margin-right: 20px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 13px;
              line-height: 20px;
              color: $--b-main-black-color;
              span {
                display: block;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: $--b-main-gray-color;
              }
              img {
                margin-right: 6px;
              }
            }
            .search-input-tablet {
              display: none;
              @media (min-width: 992px) and (max-width: 1200px) {
                display: flex;
              }
              width: 32px;
              height: 32px;
              background: $--b-main-white-color;
              border: 1px solid $color-dfdeed;
              border-radius: 6px;
              margin-right: 8px;
              cursor: pointer;
              img {
                margin: auto;
              }
            }
            .icon-container {
              width: 32px;
              min-width: 32px;
              height: 32px;
              background: $color-efeff6;
              border-radius: 6px;
              display: flex;
              margin-right: 8px;
              cursor: pointer;
              img {
                margin: auto;
              }
            }
            .set-filter {
              cursor: pointer;
            }
          }
        }
      }
      .search-block-mob {
        @media (min-width: 992px) {
          display: none;
        }
        .filters-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .icon {
            display: flex;
            width: 36px;
            min-width: 36px;
            height: 36px;
            background: $color-fafafa;
            border-radius: 6px;
            img {
              margin: auto;
            }
          }
          .title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: $--b-main-black-color;
          }
          .terms {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: $--b-main-gray-color;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .sort-item {
            display: flex;
            width: 132px;
            min-width: 132px;
            @media (min-width: 768px) {
              width: 196px;
              min-width: 196px;
            }
            &:last-child {
              width: auto;
              min-width: auto;
            }
            .icon {
              margin-right: 4px;
            }
          }
          .calendar-block {
            .icon {
              width: 32px;
              min-width: 32px;
              height: 32px;
              @media (min-width: 768px) {
                width: 36px;
                min-width: 36px;
                height: 36px;
                background: $color-efeff6;
              }
            }
            .text {
              @include tabletAndMobile {
                display: none;
              }
            }
          }
        }
      }
      .cards-block {
        margin-top: 23px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .event-card {
          position: relative;
          padding: 20px 16px;
          isolation: isolate;
          width: 328px;
          background: $--b-main-white-color;
          box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
          border-radius: 6px;
          margin-bottom: 16px;
          @media (min-width: 1200px) and (max-width: 1400px) {
            width: 408px;
          }
          @media (min-width: 992px) and (max-width: 1199px) {
            width: 320px;
          }
          @media (min-width: 768px) and (max-width: 991px) {
            width: 344px;
          }
          @include tabletAndMobile {
            width: 100%;
          }
          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(
              90.37deg,
              $color-4a7deb -29.39%,
              $color-8978ee 37.85%,
              $color-d243c5 97.19%
            );
            border-radius: 6px 6px 0px 0px;
          }
          .address {
            &.desk-address {
              display: none;
              // @media (max-width: 992px) {
              //   display: none;
              // }
            }
            &.mob-address {
              // @media (max-width: 992px) {
              //   display: flex;
              // }
            }
            display: flex;
            background: $color-fafafa;
            padding: 0px 4px;
            margin-top: 4px;
            @media (max-width: 992px) {
              width: fit-content;
              margin-top: 8px;
            }
            img {
              margin-right: 5px;
            }
            p {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-gray-color;
              border-radius: 4px;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
          .top-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .date {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
              text-align: right;
              color: $--b-main-black-color;
            }
            .time {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              text-align: right;
              color: $color-4c4a82;
            }
            .left-side {
              display: flex;
              // width: 262px;
              // min-width: 262px;
              .card-icon {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                min-width: 48px;
                width: 48px;
                height: 48px;
                background: $color-efeff6;
                border-radius: 4px;
                margin-right: 8px;
              }
              .text-block {
                .title {
                  font-family: 'Exo 2';
                  font-style: normal;
                  font-weight: 700;
                  font-size: 16px;
                  line-height: 24px;
                  color: $--b-main-black-color;
                }
                .date-time-mob {
                  display: flex;
                  align-items: center;
                  margin-top: 4px;
                  .date {
                    margin-right: 12px;
                  }
                }
              }
            }
            .right-side {
              display: none;
              // @media (max-width: 992px) {
              //   display: none;
              // }
            }
          }

          .main-text {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: $color-393762;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-top: 12px;
          }
          .labels {
            display: flex;
            align-items: center;
            margin-top: 12px;
            .label {
              margin-right: 4px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: $--b-main-gray-color;
              padding: 0px 8px;
              border: 1px solid $color-efeff6;
              border-radius: 100px;
            }
          }
          .bottom-block {
            margin-top: 12px;
            border-top: 1px dashed $color-dfdeed;
            .top-line {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-top: 12px;
              .name {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 20px;
                color: $color-393762;
              }
              .price {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 20px;
                text-align: right;
                color: $--b-main-black-color;
              }
            }
            .bottom-line {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 8px;
              .left-side {
                display: flex;
                align-items: center;
                .titles {
                  margin-right: 30px;
                }
                .titles,
                .date {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                }
                .players,
                .players-date {
                  color: $--b-main-black-color;
                }
                .visitors,
                .visitors-date {
                  color: $--b-main-gray-color;
                }
              }
              .right-side {
              }
            }
          }
        }
      }
      .my-events-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 23px;
        .my-event-card {
          padding: 12px;
          background: $--b-main-white-color;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          border: 1px solid $color-dfdeed;
          margin-bottom: 16px;
          width: 328px;
          @media (min-width: 1200px) and (max-width: 1400px) {
            width: 408px;
          }
          @media (min-width: 992px) and (max-width: 1199px) {
            width: 320px;
          }
          @media (min-width: 768px) and (max-width: 991px) {
            width: 344px;
          }
          @include tabletAndMobile {
            width: 100%;
          }
          &.active {
            border: 1px solid $color-71ba12;
          }
          .left-block {
            display: flex;
            .col-1 {
              margin-right: 8px;
              min-width: 50px;
              .card-icon {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                min-width: 48px;
                width: 48px;
                height: 48px;
                background: $color-efeff6;
                border-radius: 4px;
              }
            }
            .col-2 {
              width: 150px;
              @media (min-width: 1200px) and (max-width: 1400px) {
                width: 230px;
              }
              @media (min-width: 992px) and (max-width: 1199px) {
                width: 150px;
              }
              @media (min-width: 768px) and (max-width: 991px) {
                width: 165px;
              }
              @include tabletAndMobile {
                width: 70%;
              }
              .title {
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                color: $--b-main-black-color;
              }
              .address {
                display: flex;
                background: $color-fafafa;
                padding: 0px 4px;
                margin-top: 4px;
                img {
                  margin-right: 5px;
                }
                p {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                  color: $--b-main-gray-color;
                  border-radius: 4px;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
              }
              .labels {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 8px;
                .label {
                  padding: 0px 8px;
                  border: 1px solid $color-efeff6;
                  border-radius: 100px;
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                  color: $--b-main-gray-color;
                  margin-right: 4px;
                  margin-bottom: 4px;
                }
              }
            }
          }
          .right-block {
            .col-3 {
              min-width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              .state {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 20px;
                text-align: center;
                padding: 0px 4px;
                border-radius: 4px;
                background: $color-efeff6;
                color: $--b-main-black-color;
                width: fit-content;
                &.active {
                  background: $color-71ba12;
                  color: $--b-main-white-color;
                }
              }
              .date {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                text-align: right;
                color: $--b-main-black-color;
                margin-top: 12px;
                margin-bottom: 4px;
              }
              .time {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                text-align: right;
                color: $color-4c4a82;
              }
            }
          }
        }
      }
    }
    .user-cards-wrapper {
      height: calc(100vh - 90px - 36px - 31px - 80px - 36px);
      /*overflow-y: scroll;*/
      .users-cards {
        height: calc(100% - 20px);
        margin-top: 20px;

        @include beforeDesktop {
          height: calc(100%);
        }
      }
    }
  }
  .right-sidebar {
    @media (max-width: 992px) {
      display: none;
    }
    .title-block {
      .title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 32px;
        color: $--b-main-black-color;
      }
      .subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: $--b-main-gray-color;
      }
    }
    .cards-block {
      margin-top: 20px;
      .card {
        position: relative;
        width: 100%;
        background: $--b-main-white-color;
        border: 1px solid $color-dfdeed;
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 16px;
        .close {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 20px;
          cursor: pointer;
        }
        .top-line {
          display: flex;
          align-items: center;
          .text-data {
            margin-left: 8px;
            .name {
              font-family: 'Exo 2';
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 16px;
              color: $--b-main-black-color;
            }
            .bottom-line {
              display: flex;
              align-items: center;
              margin-top: 4px;
              .time {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                text-align: right;
                color: $--b-main-gray-color;
                margin-right: 21px;
              }
              .date {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 16px;
                text-align: right;
                color: $--b-main-black-color;
              }
            }
          }
        }
        .address {
          display: flex;
          background: $color-fafafa;
          padding: 0px 4px;
          margin-top: 4px;
          img {
            margin-right: 5px;
          }
          p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: $--b-main-gray-color;
            border-radius: 4px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        .labels {
          display: flex;
          align-items: center;
          margin-top: 12px;
          .label {
            margin-right: 4px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: $--b-main-gray-color;
            padding: 0px 8px;
            border: 1px solid $color-efeff6;
            border-radius: 100px;
          }
        }
      }
    }
  }
}
</style>
