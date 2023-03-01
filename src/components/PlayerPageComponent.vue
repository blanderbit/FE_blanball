<template>
  <div class="b-player-page">
    <div class="b-player-page__back-image">
      <img :src="backPic" alt="" />
    </div>
    <div class="b-player-page__main-block">
      <div class="b-player-page__user-card">
        <div class="b-player-page__top-line">
          <div class="b-player-page__picture">
            <avatar
              :link="userData.profile.avatar_url"
              :full-name="
                userData.profile.name + ' ' + userData.profile.last_name
              "
              avatarType="square"
            ></avatar>
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__surname">
              {{ userData.profile.last_name || $t('profile.no-last-name') }}
            </div>
            <star-rating
              :rating="userRating"
              :star-size="14"
              :show-rating="false"
              :read-only="true"
              :active-color="'#148783'"
            >
            </star-rating>
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__name">
              {{ userData.profile.name || $t('profile.no-name') }}
            </div>
            <div class="b-player-page__label">
              {{ userData.role || $t('profile.no-role') }}
            </div>
          </div>
          <div class="b-player-page__line mt-8">
            <div class="b-player-page__title">
              {{ $t('player_page.qualification') }}
            </div>
            <div class="b_player-qualification">
              {{ $t('player_page.approved') }}
            </div>
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__invite">
              {{ $t('player_page.invite') }}
            </div>
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__send-email">
              <img src="../assets/img/envelop-black.svg" alt="" />
              {{ $t('player_page.write-email') }}
            </div>
            <div class="b-player-page__call">
              <img src="../assets/img/phone-arrow.svg" alt="" />
              {{ $t('player_page.call') }}
            </div>
          </div>
        </div>
        <div class="b-player-page__about-line">
          <div class="b-player-page__title">
            {{ $t('player_page.about-yourself') }}
          </div>
          <div class="b-player-page__text">
            {{ userData.profile.about_me || $t('profile.no-about_me') }}
          </div>
        </div>
      </div>

      <div class="b-player-page__right-block flex-grow-1">
        <div class="b-player-page__features-reviews-block flex-grow-1">
          <div class="b-player-page__play-features">
            <div class="b-player-page__main-titles-text">
              {{ $t('player_page.play-characteristics') }}
            </div>
            <div class="b-player-page__play-blocks">
              <div
                v-for="item in playFeatures"
                :key="item.id"
                class="b-player-page__play-block"
              >
                <img :src="item.img" alt="" />
                <div class="b-player-page__text-block">
                  <div class="b-player-page__small-text">
                    {{ item.title }}
                  </div>
                  <div class="b-player-page__feature-name">
                    {{ item.featureName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="b-player-page__play-reviews">
            <div class="b-player-page__title-line">
              <div class="b-player-page__left-side">
                <div class="b-player-page__main-titles-text me-1">
                  {{ $t('player_page.feedbacks') }}
                </div>
                <div class="b-player-page__small-text">
                  {{ reviewQuantity }} оцінок
                </div>
              </div>
              <div class="b-player-page__right-side">
                {{ userRating }}
                <img src="../assets/img/star.svg" alt="" />
              </div>
            </div>
            <div class="b-player-page__feedback-blocks" style="height: 400px">
              <div v-if="!isFeedbackShown" class="b-player-page__block-hidden">
                <img src="../assets/img/information.svg" alt="" />
                {{ $t('player_page.feedback-hidden') }}
              </div>
              <SimpleListWrapper v-else :requestForGetData="getReviews">
                <template #default="{ smartListItem: item }">
                  <div :key="item.id" class="b-player-page__feedback-block">
                    <div class="b-player-page__name-date-line">
                      <div class="b-player-page__name">
                        {{ item.author.profile?.last_name }}
                        {{ item.author.profile?.name }}
                      </div>
                      <div class="b-player-page__small-text">
                        {{ item.date }}
                      </div>
                    </div>
                    <div class="b-player-page__main-text">
                      {{ item.text }}
                    </div>
                  </div>
                </template>
                <template #emptyList>
                  Указать верстку что пустой список для отзывов юзера TODO
                </template>
              </SimpleListWrapper>
            </div>
          </div>
        </div>

        <div class="b-player-page__events-history-block flex-grow-1">
          <div v-if="!isEventsShown" class="b-player-page__block-hidden">
            <img src="../assets/img/information.svg" alt="" />
            {{ $t('player_page.events-hidden') }}
          </div>
          <div v-if="isEventsShown" class="b-player-page__play-events">
            <div class="b-player-page__main-titles-text">
              {{ $t('player_page.planned-events') }}
            </div>
            <div class="b-player-page__event-blocks">
              <SimpleListWrapper :requestForGetData="getPlanedEvents">
                <template #default="{ smartListItem: item }">
                  <div :key="item.id" class="b-player-page__event-block">
                    <div class="b-player-page__title-line">
                      <div class="b-player-page__title">
                        {{ item.name }}
                      </div>
                      <div class="b-player-page__position">
                        {{ $t('player_page.player') }}
                      </div>
                    </div>
                    <div class="b-player-page__labels-line">
                      <div class="b-player-page__label">
                        {{ item.type }}
                      </div>
                      <div class="b-player-page__label">
                        {{ item.gender }}
                      </div>
                    </div>
                    <div class="b-player-page__time-line">
                      <div class="b-player-page__small-text mr-16">
                        {{ item.date }}
                      </div>
                      <div class="b-player-page__small-text">
                        {{ item.time }}
                      </div>
                    </div>
                  </div>
                </template>
                <template #emptyList>
                  Указать верстку что пустой список для запланированых ивентов
                  TODO
                </template>
              </SimpleListWrapper>
            </div>
          </div>

          <!--<div class="b-player-page__play-history">-->
          <!--<div class="b-player-page__main-titles-text">-->
          <!--{{$t('player_page.history')}}-->
          <!--</div>-->
          <!--<img src="../assets/img/arrow-right.svg" alt="">-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
  
import StarRating from 'vue-star-rating'

import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'

import SimpleListWrapper from './simple-list/SimpleListWrapper.vue'
import Avatar from './Avatar.vue'
import Loading from './../workers/loading-worker/Loading.vue'

import { API } from '../workers/api-worker/api.worker'

import publicPageBack from '../assets/img/public-page-back.svg'
import userPageBack from '../assets/img/user-page-back.svg'
import fitWeight from '../assets/img/fit-weight.svg'
import measureTape from '../assets/img/measure-tape.svg'


const PAGE_MODE = 'public'

export default {
  name: 'PlayerPage',
  components: {
    StarRating,
    Loading,
    SimpleListWrapper,
    Avatar,
  },
  props: {
    pageMode: {
      type: String,
      default: '',
    },
    userData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const reviewQuantity = ref(0)
    const playFeatures = ref([
      {
        id: 3,
        title: 'Ігрова позиція',
        img: fitWeight,
        featureName: props.userData.profile?.position,
      },
      {
        id: 1,
        title: 'Вага',
        img: fitWeight,
        featureName: props.userData.profile?.weight,
      },
      {
        id: 2,
        title: 'Ударна нога',
        img: measureTape,
        featureName: props.userData.profile?.working_leg,
      },
      {
        id: 0,
        title: 'Зріст',
        img: measureTape,
        featureName: props.userData.profile?.height,
      },
    ])

    const userRating = computed(() => {
      return Math.round(props.userData.raiting) || 0
    })
    const isFeedbackShown = computed(() => {
      return props.userData.configuration?.show_reviews
    })
    const isEventsShown = computed(() => {
      return props.userData.configuration?.planned_events
    })

    const getPlanedEvents = (page) => {
      return API.EventService.getPlannedUserEvents(props.userData.id, {
        page,
      }).then((result) => {
        return {
          data: {
            results: result.data.map((i, index) => {
              i.id = index
              i.time = `${dayjs(i.date_and_time)
                .locale(dayjsUkrLocale)
                .format('hh : mm')}`
              i.date = `${dayjs(i.date_and_time)
                .locale(dayjsUkrLocale)
                .format('D MMMM')}`
              return {
                ...i,
              }
            }),
          },
        }
      })
    }

    const getReviews = (page) => {
      return API.ReviewService.getUserReviews(props.userData.id, {
        page,
      }).then((res) => {
        res.data.results =
          res.data.results.map((item) => {
            return {
              ...item,
              date: `${dayjs(item.time_created)
                .locale(dayjsUkrLocale)
                .format('D MMMM')}`,
            }
          }) || []
        reviewQuantity.value = res.data.results.length
        return res
      })
    }

    return {
      userRating,
      reviewQuantity,
      playFeatures,
      loading,
      isEventsShown,
      isFeedbackShown,
      getReviews,
      getPlanedEvents,
    }
  },
  computed: {
    backPic() {
      return this.pageMode === PAGE_MODE ? publicPageBack : userPageBack
    },
  },
}
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
 $color-6f6f77: #6f6f77;
 $color-dfdeed: #dfdeed;
 $color-395d09: #395d09;
 $color-d2f6a2: #d2f6a2;
 $color-ffffff: #ffffff;
 $color-c5c5d3: #c5c5d3;
 $color-efeff6: #efeff6;
 $color-f0f0f4: #f0f0f4;


@import '../assets/styles/mixins/device.scss';

.mt-8 {
  margin-top: 8px;
}

.mr-16 {
  margin-right: 16px;
}
.b-player-page__block-hidden {
  @include inter(12px, 400, $color-6f6f77);
  line-height: 20px;
  display: flex;
  align-items: flex-start;
  border-top: 1px solid $color-dfdeed;
  margin-top: 12px;
  padding-top: 16px;
  img {
    margin-right: 9px;
  }
}
.b-player-page {
  position: relative;
  padding: 80px 20px 20px 20px;
  // height: calc(100vh - 90px);
  height: 100%;
  @media (max-width: 1200px) {
    padding: 60px 0px 0px 0px;
  }
  .b-player-page__back-image {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    @include mobile {
      left: -70px;
      width: 250%;
    }
    img {
      width: 100%;
    }
  }
  .b-player-page__main-block {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      overflow-y: scroll;
    }
    .b-player-page__user-card {
      padding: 24px;
      flex-basis: 324px;
      background: $--b-main-white-color;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 6px;
      margin-right: 16px;
      @media (max-width: 1200px) {
        flex-basis: 344px;
      }
      @media (max-width: 768px) {
        margin-right: 0;
      }
      .b-player-page__top-line {
        .b-player-page__picture {
          margin-bottom: 16px;
          img {
            display: block;
          }
        }

        .b-player-page__line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          @include mobile {
            align-items: flex-start;
          }
          &.invite-share-desk {
            @include mobile {
              display: none;
            }
          }
          .b_player-qualification {
            @include inter(12px, 400, $color-395d09);
            line-height: 20px;
            padding: 0px 4px;
            background: $color-d2f6a2;
            border-radius: 4px;
          }
          .b-player-page__name,
          .b-player-page__surname {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
            color: $--b-main-black-color;
            @include mobile {
              font-size: 16px;
              line-height: 20px;
            }
          }
          .b-player-page__label {
            @include inter(14px, 500, $--b-main-gray-color);
            @include mobile {
              font-size: 12px;
            }
            line-height: 20px;
            text-align: center;
          }
          .b-player-page__invite {
            @include inter(14px, 500, $color-ffffff);
            line-height: 24px;
            padding: 6px;
            margin-top: 16px;
            margin-bottom: 8px;
            background: $--b-main-black-color;
            border-radius: 6px;
            text-align: center;
            width: 100%;
            cursor: pointer;
          }
          .b-player-page__title {
            @include inter(12px, 400, $--b-main-gray-color);
            line-height: 16px;
          }
          .b-player-page__send-email {
            margin-right: 8px;
          }
          .b-player-page__send-email,
          .b-player-page__call {
            @include inter(12px, 500, $--b-main-gray-color);
            line-height: 20px;

            padding: 6px 8px;
            border: 1px solid $color-c5c5d3;
            border-radius: 4px;
            display: flex;
            cursor: pointer;
            img {
              margin-right: 9px;
            }
            @media (max-width: 768px) {
              flex-basis: 50%;
            }
          }
        }
      }

      .b-player-page__about-line {
        margin-top: 16px;
        .b-player-page__title {
          @include inter(12px, 400, $--b-main-gray-color);
          line-height: 16px;
          margin-bottom: 4px;
        }
        .b-player-page__text {
          @include inter(14px, 400);
          line-height: 20px;
        }
      }
    }

    .b-player-page {
      &__small-text {
        @include inter(14px, 400, $--b-main-gray-color);
        line-height: 20px;
      }
      &__main-titles-text {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: $--b-main-black-color;
      }
      &__right-block {
        background: $--b-main-white-color;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 12px;
        padding-bottom: 15px;
        display: grid;
        grid-template-columns: 400px 1fr;
        height: 100%;
        overflow-y: scroll;
        @media (max-width: 1200px) {
          grid-template-columns: 1fr;
          flex-basis: 342px;
        }
        @media (max-width: 768px) {
          overflow-y: unset;
        }
      }

      &__features-reviews-block {
        padding: 24px;
        border-right: 1px solid $color-efeff6;
      }
      &__play-features {
      }
      &__play-reviews {
        .b-player-page__title-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .b-player-page__right-side {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: $--b-main-black-color;
        }
        .b-player-page__name-date-line {
          display: flex;
          justify-content: space-between;
        }
        .b-player-page__name {
          @include inter(12px, 500, $--b-main-gray-color);
          line-height: 20px;
        }
        .b-player-page__feedback-blocks {
          border-top: 1px solid $color-efeff6;
          .b-player-page__feedback-block {
            margin-top: 16px;
            padding-bottom: 16px;
            border-bottom: 1px dashed $color-dfdeed;
            &:last-child {
              border-bottom: none;
            }
          }
        }
        .b-player-page__main-text {
          @include inter(14px, 400);
          line-height: 20px;
        }
      }
      &__play-blocks {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-top: 1px solid $color-dfdeed;
        padding-top: 20px;
        margin-top: 16px;
        margin-bottom: 8px;
        img {
          display: block;
          width: 40px;
        }
      }
      &__play-block {
        display: flex;
        margin-bottom: 16px;

        img {
          margin-right: 8px;
        }
      }
      &__feature-name {
        @include inter(14px, 600);
        line-height: 20px;
      }

      &__events-history-block {
        padding: 24px;
      }
      &__play-events {
        .b-player-page__event-blocks {
          border-top: 1px solid $color-dfdeed;
          margin-top: 16px;
          height: 400px;
          @media (max-width: 1200px) {
            height: 200px;
          }
        }
        .b-player-page__event-block {
          margin-top: 22px;
          padding-bottom: 16px;
          border-bottom: 1px dashed $color-dfdeed;
          &:last-child {
            border-bottom: none;
          }
        }
        .b-player-page__title-line {
          display: flex;
          margin-bottom: 6px;
          .b-player-page__title {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: $--b-main-black-color;
            margin-right: 6px;
          }
          .b-player-page__position {
            @include inter(12px, 400);
            line-height: 20px;
            padding: 0px 4px;
            background: $color-f0f0f4;
            border-radius: 4px;
          }
        }
        .b-player-page__labels-line {
          display: flex;
          margin-bottom: 6px;
          .b-player-page__label {
            @include inter(12px, 400);
            line-height: 20px;
            padding: 0px 8px;
            border: 1px solid $color-dfdeed;
            border-radius: 100px;
            margin-right: 4px;
          }
        }
        .b-player-page__time-line {
          display: flex;
        }
      }
      &__play-history {
        border-top: 1px solid $color-dfdeed;
        display: flex;
        justify-content: space-between;
        padding-top: 16px;
      }
    }
  }
}
</style>
