<template>
  <div class="b-event-info">
    <div class="b-event-info__main-body">
      <div class="b-event-info__header-block">
        <div class="b-event-info__left-part">
          <div class="b-event-info__title">{{ $t('my_events.friendly-match') }}</div>
          <div class="b-event-info__subtitle">{{ $t('my_events.subtitle') }}</div>
        </div>
        <div class="b-event-info__right-part">
          <router-link :to="ALL_ROUTES.APPLICATION.EVENTS.CREATE.absolute">
            <GreenBtn 
              :text="$t('buttons.applications')"
              :width="168"
              :height="40"
            />
          </router-link>
          <div class="b-event-info__share-link">
            <img src="../../../assets/img/share-icon.svg" alt="">
            <span>
              {{ $t('my_events.share') }}
            </span>
          </div>
        </div>
      </div>
      <div class="b-event-info__details-block">
        <div class="b-event-info__left-side">
          <div class="b-event-info__timing">
            <img src="../../../assets/img/watch.svg" alt="">
            16 червня. 12:00 – 14:00
          </div>
          <div class="b-event-info__address">
            <img src="../../../assets/img/address-icon.svg" alt="">
            <span>Запоріжжя, Центральна, стадіон «Торпеда»</span>
          </div>
          <div class="b-event-info__clothes">
            <div class="b-event-info__clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="">
              <span>{{ $t('my_events.form1') }}</span>
            </div>
            <div class="b-event-info__clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="">
              <span>{{ $t('my_events.form2') }}</span>
            </div>
          </div>
          <div class="b-event-info__title">
            {{ $t('my_events.description-event') }}
          </div>
          <div class="b-event-info__description">
            Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.
          </div>
          <div class="b-event-info__labels">
            <div
              v-for="label of mockData.labels"
              :key="label.id"
              class="b-event-info__label"
            >
              {{ label.text }}
            </div>
          </div>
        </div>
        <div class="b-event-info__right-side">
          <div class="b-event-info__users">
            <div
              v-for="cief of mockData.ciefs" 
              :key="cief.id"
              class="b-event-info__user"
              :style="{
                'border-top': cief.id === 0 ? 'none' : '1px solid #DFDEED'
              }"
            >
              <div class="b-event-info__left-side">
                <div class="b-event-info__picture">
                  <img :src="cief.img" alt="">
                </div>
                <div class="b-event-info__text-block">
                  <div class="b-event-info__name">{{cief.name}}</div>
                  <div class="b-event-info__phone">{{cief.phone}}</div>
                </div>
              </div>
              <div class="b-event-info__right-side">
                {{cief.status}}
              </div>
            </div>
          </div>
          <div class="b-event-info__map">
            <img src="../../../assets/img/map-event-info.svg" alt="">
          </div>
        </div>
      </div>
      <div class="b-event-info__tables-block">
        <div class="b-event-info__tables-title">{{ $t('my_events.already-accepted') }}</div>
        <EventInfoUsersTable 
          :data="mockData.players_list"
          :table-title-text="$t('my_events.players-list')"
          :table-color="'#148783'"
        />
        <div class="b-event-info__judge-trainer-tables">
          <EventInfoUsersTable 
            :data="mockData.judge_list"
            :table-title-text="$t('my_events.judge')"
            :table-color="'#7355B2'"
          />
          <EventInfoUsersTable 
            :data="mockData.trainer_list"
            :table-title-text="$t('my_events.coach')"
            :table-color="'#1C4FC5'"
          />
        </div>
        <EventInfoUsersTable 
          :data="mockData.players_list"
          :table-title-text="$t('my_events.registered-audience')"
          :table-color="'#148783'"
        />
      </div>
    </div>

    <RightSidebar />

  </div>
</template>

<script>
import { computed } from 'vue'

import GreenBtn from '../../../components/GreenBtn.vue'
import RightSidebar from '../../../components/RightSidebar.vue'
import EventInfoUsersTable from '../../../components/EventInfoUsersTable.vue'

import CONSTANTS from '../../../consts/index'
import { ROUTES } from '../../../router/index'

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    RightSidebar,
    EventInfoUsersTable
  },
  setup() {
    const mockData = computed(() => {
      return {
        players_list: CONSTANTS.event_info.playersList,
        trainer_list: CONSTANTS.event_info.trainer,
        judge_list: CONSTANTS.event_info.judge,
        ciefs: CONSTANTS.event_info.ciefs,
        labels: CONSTANTS.event_info.labels
      }
    })

    const ALL_ROUTES = computed(() => {
      return ROUTES
    })

    return {
      mockData,
      ALL_ROUTES
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-event-info {
    display: grid;
    grid-template-columns: 1fr 256px;
    grid-gap: 28px;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
    .b-event-info__main-body {
      .b-event-info__header-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .b-event-info__left-part {
          .b-event-info__title {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 32px;
            color: #262541;
            margin-bottom: 4px;     
          }
          .b-event-info__subtitle {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #575775;
          }
        }
        .b-event-info__right-part {
          display: flex;
          align-items: center;
          @media (max-width: 992px) {
            display: none;
          }
          a {
            text-decoration: none;
          }
          .b-event-info__share-link {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #575775;
            margin-left: 25px;
            display: flex;
            align-items: center;
            img {
              margin-right: 10px;
            }
          }
        }
      }
      .b-event-info__details-block {
        border-top: 1px solid #DFDEED;
        padding-top: 14px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        margin-top: 24px;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .b-event-info__left-side {
          .b-event-info__timing,
          .b-event-info__address,
          .b-event-info__clothes {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
            margin-bottom: 10px;
            display: flex;
            img {
              margin-right: 8px;
            }
            span {
              border-bottom: 1px dashed #000;
            }
            .b-event-info__clothe {
              margin-right: 16px;
              display: flex;
              align-items: center;
            }
          }
          .b-event-info__title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
            margin-top: 20px;
            margin-bottom: 16px;
          }
          .b-event-info__description {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #262541;
            margin-bottom: 16px;
          }
          .b-event-info__labels {
            display: flex;
            .b-event-info__label {
              padding: 2px 8px;
              border: 1px solid #DFDEED;
              border-radius: 100px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #262541;
              margin-right: 4px;
            }
          }
        }
        .b-event-info__right-side {
          .b-event-info__users {
            .b-event-info__user {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              padding-top: 12px;
              margin-bottom: 12px;
              .b-event-info__left-side {
                display: flex;
                align-items: center;
                .b-event-info__picture {
                  margin-right: 12px;
                }
                .b-event-info__name {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: #262541;
                }
                .b-event-info__phone {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: #575775;
                }
              }
              .b-event-info__right-side {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
              }
            }
          }
          .b-event-info__map {
            margin-top: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
      .b-event-info__tables-block {
        margin-top: 36px;
        .b-event-info__tables-title {
          margin-bottom: 32px;
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
        }
        .b-event-info__judge-trainer-tables {
          display: flex;
          justify-content: space-between;
          align-items: center;
          @media (max-width: 768px) {
            flex-direction: column;
          }
        }
      }
    }
  }
</style>