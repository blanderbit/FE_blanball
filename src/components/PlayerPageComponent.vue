<template>
  <div class="b-player-page">
    <Loading 
      :is-loading="loading"
    />
    <div class="b-player-page__back-image">
      <img :src="backPic" alt="">
    </div>
    <div class="b-player-page__main-block">
      <div class="b-player-page__user-card">
        <div class="b-player-page__top-line">
          <div class="b-player-page__picture">
            <img src="../assets/img/photo-user-big.svg" alt="">
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__surname">
              {{ userData.profile.last_name }}
            </div>
            <star-rating 
              :rating="userData.raiting"
              :star-size="14"
              :show-rating="false"
              :read-only="true"
              :active-color="'#148783'"
            >
            </star-rating>
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__name">
              {{ userData.profile.name }}
            </div>
            <div
              class="b-player-page__label"
            >
              {{$t('player_page.player')}}
            </div>
          </div>
          <div class="b-player-page__line mt-8">
            <div class="b-player-page__title">
              {{$t('player_page.qualification')}}
            </div>
            <div
              class="b_player-qualification"
            >
              {{$t('player_page.approved')}}
            </div>
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__invite">
              {{$t('player_page.invite')}}
            </div>
          </div>
          <div class="b-player-page__line">
            <div class="b-player-page__send-email">
              <img src="../assets/img/envelop-black.svg" alt="">
              {{$t('player_page.write-email')}}
            </div>
            <div class="b-player-page__call">
              <img src="../assets/img/phone-arrow.svg" alt="">
              {{$t('player_page.call')}}
            </div>
          </div>
        </div>
        <div class="b-player-page__about-line">
          <div class="b-player-page__title">{{$t('player_page.about-yourself')}}</div>
          <div class="b-player-page__text">
            {{ userData.profile.about_me }}
          </div>
        </div>
      </div>

      <div class="b-player-page__right-block">

        <div class="b-player-page__features-reviews-block">
          <div class="b-player-page__play-features">
            <div class="b-player-page__main-titles-text">
              {{$t('player_page.play-characteristics')}}
            </div>
            <div class="b-player-page__play-blocks">
              <div 
                v-for="item in playFeatures"
                :key="item.id"
                class="b-player-page__play-block"
              >
                <img :src="item.img" alt="">
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
                <div class="b-player-page__main-titles-text">
                  {{$t('player_page.feedbacks')}}
                </div>
                <div class="b-player-page__small-text">
                  {{reviewQuantity}} оцінок
                </div>
              </div>
              <div class="b-player-page__right-side">
                4
                <img src="../assets/img/star.svg" alt="">
              </div>
            </div>
            <div class="b-player-page__feedback-blocks">
              <div
                v-for="item in userReviews" 
                :key="item.id"
                class="b-player-page__feedback-block"
              >
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
            </div>
          </div>
        </div>

        <div class="b-player-page__events-history-block">

          <div class="b-player-page__play-events">
            <div class="b-player-page__main-titles-text">
              {{$t('player_page.planned-events')}}
            </div>
            <div class="b-player-page__event-blocks">
              <div
                v-for="item in myPlannedEvents" 
                :key="item.id"
                class="b-player-page__event-block"
              >
                <div class="b-player-page__title-line">
                  <div class="b-player-page__title">
                    {{ item.name }}
                  </div>
                  <div class="b-player-page__position">
                    {{$t('player_page.player')}}
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
            </div>
          </div>

          <div class="b-player-page__play-history">
            <div class="b-player-page__main-titles-text">
              {{$t('player_page.history')}}
            </div>
            <img src="../assets/img/arrow-right.svg" alt="">
          </div>

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

import publicPageBack from '../assets/img/public-page-back.svg'
import userPageBack from '../assets/img/user-page-back.svg'
import fitWeight from '../assets/img/fit-weight.svg'
import measureTape from '../assets/img/measure-tape.svg'

import { API } from '../workers/api-worker/api.worker'
import Loading from './../workers/loading-worker/Loading.vue'
import CONSTANTS from '../consts'

const PAGE_MODE = 'public'

export default {
  name: 'PlayerPage',
  components: {
    StarRating,
    Loading
  },
  props: {
    pageMode: {
      type: String,
      default: '',
    },
    userData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const userId = ref(props.userData.id)
    const reviewQuantity = ref(0)
    const userReviews = ref([])
    const loading = ref(true)
    const myPlannedEvents = ref([])
    const playFeatures = ref([
      {
        id: 3,
        title: 'Ігрова позиція',
        img: fitWeight,
        featureName: props.userData.profile.position
      },
      {
        id: 1,
        title: 'Вага',
        img: fitWeight,
        featureName: props.userData.profile.weight
      },
      {
        id: 2,
        title: 'Ударна нога',
        img: measureTape,
        featureName: props.userData.profile.working_leg
      },
      {
        id: 0,
        title: 'Зріст',
        img: measureTape,
        featureName: props.userData.profile.height
      }

    ])
    const userRating = computed(() => {
      return props.userData.raiting || 0
    })
    

    API.ReviewService.getUserReviews(userId.value)
      .then(res => {
        reviewQuantity.value = res.data?.page_size || 0
        userReviews.value = res.data?.results.map(item => {
          return {
            ...item,
            date: `${dayjs(item.time_created)
                    .locale(dayjsUkrLocale)
                    .format('D MMMM')}`
          }
        }) || []
        getMyPlannedEvents()
        loading.value = false
      })
      .catch(res => {
        loading.value = false
      })
    
    function getMyPlannedEvents() {
      API.EventService.getPlannedUserEvents(userId.value)
        .then(res => {
          myPlannedEvents.value = res.data.map(item => {
            return {
              ...item,
              time: `${dayjs(item.time_created)
                    .locale(dayjsUkrLocale)
                    .format('hh : mm')}`,
              date: `${dayjs(item.time_created)
                    .locale(dayjsUkrLocale)
                    .format('D MMMM')}`
            }
          })
        })
        .catch(res => console.log('some mistake', res))
    }

    return {
      userRating,
      reviewQuantity,
      userReviews,
      playFeatures,
      loading,
      myPlannedEvents
    }
  },
  data() {
    return {
      users: new Array(6).fill('t').map((item, idx) => {
        return {
          id: idx,
          name: 'Гончарук Павло',
          date: '3 серпня',
          text: 'Круто зіграла, відмінні передачі і ще якісь там слова похвали в кілька рядків',
        }
      }),
      events: new Array(2).fill('t').map((item, idx) => {
        return {
          id: idx,
          title: 'Дружній матч',
          position: 'Гравець',
          time: '12:00 – 14:00',
          date: '3 серпня',
          labels: [
            {
              id: 0,
              text: 'Футбол',
            },
            {
              id: 1,
              text: 'Чоловіки',
            },
            {
              id: 2,
              text: 'Розряд',
            },
          ],
        }
      }),
    }
  },
  computed: {
    backPic() {
      return this.pageMode === PAGE_MODE ? publicPageBack : userPageBack
    },
    // isResultVisible() {
    //   return this.pageMode === PAGE_MODE
    // },
  },
}
</script>

<style lang="scss" scoped>
.mt-8 {
  margin-top: 8px;
}
.mr-16 {
  margin-right: 16px;
}
.b-player-page {
  position: relative;
  padding: 80px 20px 20px 20px;
  height: 100%;
  @media (max-width: 1200px) {
    padding: 60px 16px 28px 16px;
  }
  .b-player-page__back-image {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    @media (max-width: 576px) {
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
    // overflow-y: scroll;
    // overflow-x: auto;
    @media (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
    }
    .b-player-page__user-card { 
      padding: 24px;
      width: 324px;
      background: #ffffff;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 6px;
      @media (max-width: 1200px) {
        width: 100%;
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
          @media (max-width: 576px) {
            align-items: flex-start;
          }
          &.invite-share-desk {
            @media (max-width: 576px) {
              display: none;
            }
          }
          .b_player-qualification {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #395D09;
            padding: 0px 4px;
            background: #D2F6A2;
            border-radius: 4px;
          }
          .b-player-page__name,
          .b-player-page__surname { 
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 24px;
            color: #262541;
            @media (max-width: 576px) {
              font-size: 16px;
              line-height: 20px;
            }
          }
          .b-player-page__label { 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            color: #575775;
            @media (max-width: 576px) {
              font-size: 12px;
            }
          }
          .b-player-page__invite {
            padding: 6px;
            margin-top: 16px;
            margin-bottom: 8px;
            background: #262541;
            border-radius: 6px;
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            color: #ffffff;
            width: 100%;
            cursor: pointer;
          }
          .b-player-page__title { 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #575775;
          }
          .b-player-page__send-email,
          .b-player-page__call {
            padding: 6px 8px;
            border: 1px solid #C5C5D3;
            border-radius: 4px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
            display: flex;
            cursor: pointer;
            img {
              margin-right: 9px;
            }
          }
        }

      }

      .b-player-page__about-line { 
        margin-top: 16px;
        .b-player-page__title { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          color: #575775;
          margin-bottom: 4px;
        }
        .b-player-page__text { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }
      }
    }

    .b-player-page {
      &__small-text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #575775;
      }
      &__main-titles-text {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
      }
      &__right-block {
        width: 732px;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 12px;
        padding-bottom: 55px;
        display: grid;
        grid-template-columns: 400px 1fr;
        height: 100%;
        overflow-y: scroll;
      }


      &__features-reviews-block {
        padding: 24px;
        border-right: 1px solid #EFEFF6;
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
          color: #262541;
        }
        .b-player-page__name-date-line {
          display: flex;
          justify-content: space-between;
        }
        .b-player-page__name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
        }
        .b-player-page__feedback-blocks {
          border-top: 1px solid #EFEFF6;
          .b-player-page__feedback-block {
            margin-top: 16px;
            padding-bottom: 16px;
            border-bottom: 1px dashed #DFDEED;
            &:last-child {
              border-bottom: none;
            }
          }
        }
        .b-player-page__main-text {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }
      }
      &__play-blocks {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-top: 1px solid #DFDEED;
        padding-top: 20px;
        margin-top: 16px;
        margin-bottom: 8px;
      }
      &__play-block {
        display: flex;
        margin-bottom: 16px;

        img {
          margin-right: 8px;
        }
      }
      &__feature-name {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #262541;
      }
      

      &__events-history-block {
        padding: 24px;
      }
      &__play-events { 
        .b-player-page__event-blocks {
          border-top: 1px solid #DFDEED;
          margin-top: 16px;
        }
        .b-player-page__event-block {
          margin-top: 22px;
          padding-bottom: 16px;
          border-bottom: 1px dashed #DFDEED;
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
            color: #262541;
            margin-right: 6px;
          }
          .b-player-page__position {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #262541;
            padding: 0px 4px;
            background: #F0F0F4;
            border-radius: 4px;
          }
        }
        .b-player-page__labels-line {
          display: flex;
          margin-bottom: 6px;
          .b-player-page__label {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #262541;
            padding: 0px 8px;
            border: 1px solid #DFDEED;
            border-radius: 100px;
            margin-right: 4px;
          }
        }
        .b-player-page__time-line {
          display: flex;
        }
      }
      &__play-history { 
        border-top: 1px solid #DFDEED;
        display: flex;
        justify-content: space-between;
        padding-top: 16px;
      }



    }
  }
}
</style>