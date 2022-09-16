<template>
  <div class="b_event_info">
    <div class="b_event_info_main-body">
      <div class="b_event_info_header-block">
        <div class="b_event_info_left-part">
          <div class="b_event_info_title">{{ $t('my_events.title') }}</div>
          <div class="b_event_info_subtitle">{{ $t('my_events.subtitle') }}</div>
        </div>
        <div class="b_event_info_right-part">
          <router-link to="/application/events/create">
            <GreenBtn 
              :text="$t('buttons.take-part-applications')"
              :width="168"
              :height="40"
            />
          </router-link>
          <div class="b_event_info_share-link">
            <img src="../../../assets/img/share-icon.svg" alt="">
            <span>Поділитися</span>
          </div>
        </div>
      </div>
      <div class="b_event_info_details-block">
        <div class="b_event_info_left-side">
          <div class="b_event_info_timing">
            <img src="../../../assets/img/watch.svg" alt="">
            16 червня. 12:00 – 14:00
          </div>
          <div class="b_event_info_address">
            <img src="../../../assets/img/address-icon.svg" alt="">
            <span>Запоріжжя, Центральна, стадіон «Торпеда»</span>
          </div>
          <div class="b_event_info_clothes">
            <div class="b_event_info_clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="">
              <span>Форма №1</span>
            </div>
            <div class="b_event_info_clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="">
              <span>Форма №2</span>
            </div>
          </div>
          <div class="b_event_info_title">
            {{ $t('my_events.description-title') }}
          </div>
          <div class="b_event_info_description">
            Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.
          </div>
          <div class="b_event_info_labels">
            <div
              v-for="label of mockData.labels"
              :key="label.id"
              class="b_event_info_label"
            >
              {{ label.text }}
            </div>
          </div>
        </div>
        <div class="b_event_info_right-side">
          <div class="b_event_info_users">
            <div
              v-for="cief of mockData.ciefs" 
              :key="cief.id"
              class="b_event_info_user"
              :style="{
                'border-top': cief.id === 0 ? 'none' : '1px solid #DFDEED'
              }"
            >
              <div class="b_event_info_left-side">
                <div class="b_event_info_picture">
                  <img :src="cief.img" alt="">
                </div>
                <div class="b_event_info_text-block">
                  <div class="b_event_info_name">{{cief.name}}</div>
                  <div class="b_event_info_phone">{{cief.phone}}</div>
                </div>
              </div>
              <div class="b_event_info_right-side">
                {{cief.status}}
              </div>
            </div>
          </div>
          <div class="b_event_info_map">
            <img src="../../../assets/img/map-event-info.svg" alt="">
          </div>
        </div>
      </div>
      <div class="b_event_info_tables-block">
        <div class="b_event_info_tables-title">{{ $t('my_events.already-accepted') }}</div>
        <EventInfoUsersTable 
          :data="mockData.players_list"
          :table-title-text="'Список гравців'"
          :table-color="'#148783'"
        />
        <div class="b_event_info_judge-trainer-tables">
          <EventInfoUsersTable 
            :data="mockData.judge_list"
            :table-title-text="'Суддя'"
            :table-color="'#7355B2'"
          />
          <EventInfoUsersTable 
            :data="mockData.trainer_list"
            :table-title-text="'Тренер'"
            :table-color="'#1C4FC5'"
          />
        </div>
        <EventInfoUsersTable 
          :data="mockData.players_list"
          :table-title-text="'Зареєстровані глядачі'"
          :table-color="'#148783'"
        />
      </div>
    </div>

    <RightSidebar />

  </div>
</template>

<script>
import GreenBtn from '../../../components/GreenBtn.vue'
import RightSidebar from '../../../components/RightSidebar.vue'
import EventInfoUsersTable from '../../../components/EventInfoUsersTable.vue'

import CONSTANTS from '../../../consts/index'

export default {
  name: 'EventsPage',
  components: {
    GreenBtn,
    RightSidebar,
    EventInfoUsersTable
  },
  data() {
    return {

    }
  },
  computed: {
    mockData() {
      return {
        players_list: CONSTANTS.event_info.playersList,
        trainer_list: CONSTANTS.event_info.trainer,
        judge_list: CONSTANTS.event_info.judge,
        ciefs: CONSTANTS.event_info.ciefs,
        labels: CONSTANTS.event_info.labels
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .b_event_info {
    display: grid;
    grid-template-columns: 1fr 256px;
    grid-gap: 28px;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
    .b_event_info_main-body {
      .b_event_info_header-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .b_event_info_left-part {
          .b_event_info_title {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 22px;
            line-height: 32px;
            color: #262541;
            margin-bottom: 4px;     
          }
          .b_event_info_subtitle {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #575775;
          }
        }
        .b_event_info_right-part {
          display: flex;
          align-items: center;
          @media (max-width: 992px) {
            display: none;
          }
          a {
            text-decoration: none;
          }
          .b_event_info_share-link {
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
      .b_event_info_details-block {
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
        .b_event_info_left-side {
          .b_event_info_timing,
          .b_event_info_address,
          .b_event_info_clothes {
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
            .b_event_info_clothe {
              margin-right: 16px;
              display: flex;
              align-items: center;
            }
          }
          .b_event_info_title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
            margin-top: 20px;
            margin-bottom: 16px;
          }
          .b_event_info_description {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #262541;
            margin-bottom: 16px;
          }
          .b_event_info_labels {
            display: flex;
            .b_event_info_label {
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
        .b_event_info_right-side {
          .b_event_info_users {
            .b_event_info_user {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              padding-top: 12px;
              margin-bottom: 12px;
              .b_event_info_left-side {
                display: flex;
                align-items: center;
                .b_event_info_picture {
                  margin-right: 12px;
                }
                .b_event_info_name {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: #262541;
                }
                .b_event_info_phone {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: #575775;
                }
              }
              .b_event_info_right-side {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
              }
            }
          }
          .b_event_info_map {
            margin-top: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
      .b_event_info_tables-block {
        margin-top: 36px;
        .b_event_info_tables-title {
          margin-bottom: 32px;
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
        }
        .b_event_info_judge-trainer-tables {
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