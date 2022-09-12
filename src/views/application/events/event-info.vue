<template>
  <div class="events-page">
    <ContextMenu 
      v-if="isContextMenuActive" 
      :client-x="contextMenuX"
      :client-y="contextMenuY"
      :menu-text="menuText"
      @close-modal="isContextMenuActive = false"
    />
    <div class="main-body">
      <div class="header-block">
        <div class="left-part">
          <div class="title">{{ $t('my_events.title') }}</div>
          <div class="subtitle">{{ $t('my_events.subtitle') }}</div>
        </div>
        <div class="right-part">
          <nuxt-link to="/profile/events/create-event">
            <GreenBtn 
              :text="$t('buttons.take-part-applications')"
              :width="168"
              :height="40"
            />
          </nuxt-link>
          <div class="share-link">
            <img src="../../../assets/img/share-icon.svg" alt="">
            <span>Поділитися</span>
          </div>
        </div>
      </div>
      <div class="details-block">
        <div class="left-side">
          <div class="timing">
            <img src="../../../assets/img/watch.svg" alt="">
            16 червня. 12:00 – 14:00
          </div>
          <div class="address">
            <img src="../../../assets/img/address-icon.svg" alt="">
            <span>Запоріжжя, Центральна, стадіон «Торпеда»</span>
          </div>
          <div class="clothes">
            <div class="clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="">
              <span>Форма №1</span>
            </div>
            <div class="clothe">
              <img src="../../../assets/img/t-shirt.svg" alt="">
              <span>Форма №2</span>
            </div>
          </div>
          <div class="title">
            {{ $t('my_events.description-title') }}
          </div>
          <div class="description">
            Donec a eros justo. Fusce egestas tristique ultrices. Nam tempor, augue nec tincidunt molestie, massa nunc varius arcu, at scelerisque elit erat a magna. Donec quis erat at libero ultrices mollis. In hac habitasse platea dictumst. Vivamus vehicula leo dui, at porta nisi facilisis finibus. In euismod augue vitae nisi ultricies, non aliquet urna tincidunt. Integer in nisi eget nulla commodo faucibus efficitur quis massa. Praesent felis est, finibus et nisi ac, hendrerit venenatis libero. Donec consectetur faucibus ipsum id gravida.
          </div>
          <div class="labels">
            <div
              v-for="label of labels"
              :key="label.id"
              class="label"
            >
              {{ label.text }}
            </div>
          </div>
        </div>
        <div class="right-side">
          <div class="users">
            <div
              v-for="cief of ciefs" 
              :key="cief.id"
              class="user"
              :style="{
                'border-top': cief.id === 0 ? 'none' : '1px solid #DFDEED'
              }"
            >
              <div class="left-side">
                <div class="picture">
                  <img :src="cief.img" alt="">
                </div>
                <div class="text-block">
                  <div class="name">{{cief.name}}</div>
                  <div class="phone">{{cief.phone}}</div>
                </div>
              </div>
              <div class="right-side">
                {{cief.status}}
              </div>
            </div>
          </div>
          <div class="map">
            <img src="../../../assets/img/map2.png" alt="">
          </div>
        </div>
      </div>
      <div class="tables-block">
        <div class="tables-title">{{ $t('my_events.already-accepted') }}</div>
        <div class="users-table table-players">
          <div class="table-label">
            Список гравців
          </div>
          <div 
            v-for="player of playersList"
            :key="player.id"
            :class="['table_card', { inactive: !player.isActive }]"
          >
            <div class="left-side">
              <div class="picture">
                <img :src="player.img" alt="">
              </div>
              <div 
                class="name"
              >
                {{player.name}}
              </div>
            </div>
            <div class="right-side">
              <div
                v-if="player.isActive"
                class="status"
              >
                {{ player.status }}
              </div>
              <img 
                v-else 
                :src="player.status" 
                class="inactive"
                alt=""
              >
              <div class="icon">
                <img :src="player.icon" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="judge-trainer-tables">
          <div class="users-table table-judge">
            <div class="table-label">
              Суддя
            </div>
            <div 
              class="table_card"
            >
              <div class="left-side">
                <div class="picture">
                  <img src="../../../assets/img/user3.png" alt="">
                </div>
                <div class="text-block">
                  <div 
                    class="name"
                  >
                    Валерій Завгородній
                  </div>
                  <div class="duty">
                    Суддівська категорія
                  </div>
                </div>
              </div>
              <div class="right-side">
                <div class="icon">
                  <img src="../../../assets/img/smile_face.png" alt="">
                </div>
              </div>
            </div>
          </div>
          <div class="users-table table-trainer">
            <div class="table-label">
              Тренер
            </div>
            <div 
              class="table_card"
            >
              <div class="left-side">
                <div class="picture">
                  <img src="../../../assets/img/user3.png" alt="">
                </div>
                <div class="text-block">
                  <div 
                    class="name"
                  >
                    Валерій Завгородній
                  </div>
                  <div class="duty">
                    Суддівська категорія
                  </div>
                </div>
              </div>
              <div class="right-side">
                <div class="icon">
                  <img src="../../../assets/img/smile_face.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="users-table table-awdience">
          <div class="table-label">
            Зареєстровані глядачі
          </div>
          <div 
            v-for="player of playersList"
            :key="player.id"
            :class="['table_card', { inactive: !player.isActive }]"
          >
            <div class="left-side">
              <div class="picture">
                <img :src="player.img" alt="">
              </div>
              <div 
                class="name"
              >
                {{player.name}}
              </div>
            </div>
            <div class="right-side">
              <div
                v-if="player.isActive"
                class="status"
              >
                {{ player.status }}
              </div>
              <div 
                v-else
                class="status"
              >
                <img :src="player.status" alt="">
              </div>
              <div class="icon">
                <img :src="player.icon" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-sidebar">
      <div class="title-block">
        <div class="title">{{ $t('events.planned-events') }}</div>
        <div class="subtitle">{{ $t('events.your-events') }}</div>
      </div>

      <div class="cards-block">
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">{{ $t('events.friendly-match') }}</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 {{ $t('events.months.June') }}</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">{{ $t('events.football') }}</div>
            <div class="label">{{ $t('events.men') }}</div>
            <div class="label">...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../../components/GreenBtn.vue'
import user5 from '../../../assets/img/user5.png'
import user4 from '../../../assets/img/user4.png'
import smile_face from '../../../assets/img/smile_face.png'
import no_user from '../../../assets/img/no-user.png'
import minus from '../../../assets/img/minus.png'
import add_user from '../../../assets/img/add-user.png'
export default {
  name: 'EventsPage',
  components: {
    GreenBtn
  },
  data() {
    return {
      playersList: [
        {
          id: 0,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 1,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },        {
          id: 2,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 3,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 4,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 5,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 6,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 7,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 8,
          img: user5,
          name: 'Капустин Никита',
          status: 'ПНЗ',
          icon: smile_face,
          isActive: true
        },
        {
          id: 9,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 10,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 11,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 12,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 13,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 14,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 15,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 16,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 17,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 18,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 19,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        },
        {
          id: 20,
          img: no_user,
          name: 'Приєднатися до команди',
          status: minus,
          icon: add_user,
          isActive: false
        }
      ],
      labels: [
        {
          id: 0,
          text: 'Футбол'
        },
        {
          id: 1,
          text: 'Чоловіки'
        },
        {
          id: 2,
          text: 'Без розряду'
        },
      ],
      ciefs: [
        {
          id: 0,
          img: user4,
          name: 'Сергій Білецький',
          phone: '+380 66 873 05 75',
          status: 'Організатор'
        },
        {
          id: 1,
          img: user4,
          name: 'Ярослав Бойко',
          phone: '+380 97 773 05 81',
          status: 'Тренер'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .events-page {
    display: grid;
    grid-template-columns: 1fr 256px;
    grid-gap: 28px;
    @media (max-width: 1200px) {
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
            color: #262541;
            margin-bottom: 4px;     
          }
          .subtitle {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #575775;
          }
        }
        .right-part {
          display: flex;
          align-items: center;
          @media (max-width: 992px) {
            display: none;
          }
          a {
            text-decoration: none;
          }
          .share-link {
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
      .details-block {
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
        .left-side {
          .timing,
          .address,
          .clothes {
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
            .clothe {
              margin-right: 16px;
              display: flex;
              align-items: center;
            }
          }
          .title {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
            margin-top: 20px;
            margin-bottom: 16px;
          }
          .description {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #262541;
            margin-bottom: 16px;
          }
          .labels {
            display: flex;
            .label {
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
        .right-side {
          .users {
            .user {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              padding-top: 12px;
              margin-bottom: 12px;
              .left-side {
                display: flex;
                align-items: center;
                .picture {
                  margin-right: 12px;
                }
                .name {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: #262541;
                }
                .phone {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: #575775;
                }
              }
              .right-side {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
              }
            }
          }
          .map {
            margin-top: 20px;
            img {
              width: 100%;
            }
          }
        }
      }
      .tables-block {
        margin-top: 36px;
        .tables-title {
          margin-bottom: 32px;
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
        }
        .table-label {
          position: absolute;
          left: 20px;
          top: -12px;
          padding: 2px 12px;
          border-radius: 4px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          color: #FFFFFF;
        }
        .users-table {
          padding: 24px 20px 12px 20px;
          margin-bottom: 32px;
          border-radius: 6px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          position: relative;
          .table_card {
            width: 368px;
            padding: 14px 20px;
            border: 1px solid #DFDEED;
            border-radius: 4px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: #262541;
            @media (min-width: 768px) and (max-width: 992px) {
              width: 300px;
            }
            @media (max-width: 768px) {
              width: 100%;
            }
            &.inactive {
              font-size: 13px;
              color: #575775;
            }
            .left-side {
              display: flex;
              align-items: center;
              .picture {
                margin-right: 16px;
              }
              .duty {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #575775;
              }
            }
            .right-side {
              display: flex;
              align-items: center;
              .status {
                margin-right: 24px;
              }
              .inactive {
                margin-right: 24px;
              }
            }
          }
        }
        .table-players, .table-awdience {
          border: 1px solid #148783;
          .table-label {
            background: #148783;
          }
        }
        .table-judge {
          border: 1px solid #7355B2;
          .table-label {
            background: #7355B2;
          }
          @media (max-width: 768px) {
            width: 100%;
          }
        }
        .table-trainer {
          border: 1px solid #1C4FC5;
          .table-label {
            background: #1C4FC5;
          }
          @media (max-width: 768px) {
            width: 100%;
          }
        }
        .judge-trainer-tables {
          display: flex;
          justify-content: space-between;
          align-items: center;
          @media (max-width: 768px) {
            flex-direction: column;
          }
        }
      }
    }
    .right-sidebar {
      @media (max-width: 1200px) {
        display: none;
      }
      .title-block {
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 32px;
          color: #262541;
        }
        .subtitle {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
        }
      }
      .cards-block {
        margin-top: 20px;
        .card {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #DFDEED;
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
                color: #262541;
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
                  color: #575775;
                  margin-right: 21px;
                }
                .date {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 16px;
                  text-align: right;
                  color: #262541;
                }
              }
            }
          }
          .address {
            display: flex;
            background: #FAFAFA;
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
              color: #575775;
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
              color: #575775;
              padding: 0px 8px;
              border: 1px solid #EFEFF6;
              border-radius: 100px;
            }
          }
        }
      }
    }
  }
</style>