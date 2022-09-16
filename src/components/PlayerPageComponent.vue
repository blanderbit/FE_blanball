<template>
  <div class="b_player-page">
    <div class="b_player-page_back-image">
      <img :src="backPic" alt="">
    </div>
    <div class="b_player-page_main-block">
      <div class="b_player-page_user-card">
        <div class="b_player-page_top-line">
          <div class="b_player-page_left-side">
            <div class="b_player-page_picture">
              <img src="../assets/img/user-photo.png" alt="">
            </div>
          </div>
          <div class="b_player-page_right-side">
            <div class="b_player-page_line">
              <div class="b_player-page_name">Калиновська Стефанія</div>
              <div
                :style="labelColor"
                class="b_player-page_label"
              >
                Гравець
              </div>
            </div>
            <div class="b_player-page_line">
              <div class="b_player-page_rating">
                <div class="b_player-page_start">
                  <!--<star-rating -->
                    <!--:star-style="starStyle"-->
                    <!--:rating="3"-->
                    <!--:is-indicator-active="false"-->
                  <!--&gt;</star-rating>-->
                </div>
                <div class="b_player-page_text">
                  17 оцінок
                </div>
              </div>
            </div>
            <div class="b_player-page_line">
              <div class="b_player-page_invite">
                Запросити на подію
              </div>
              <div class="b_player-page_share">
                <img src="../assets/img/share-icon.svg" alt="">
                <span>Поділитися</span>
              </div>
            </div>
          </div>
        </div>
        <div class="b_player-page_about-line">
          <div class="b_player-page_title">Про себе:</div>
          <div class="b_player-page_text">
            Donec vitae mi vulputate, suscipit urna in, malesuada nisl. Pellentesque laoreet pretium nisl, et pulvinar massa eleifend sed
          </div>
        </div>
        <div
          v-if="!isResultVisible"
          class="b_player-page_sport-results"
        >
          <div class="b_player-page_title">Спортивні показники</div>
          <div class="b_player-page_line">
            <div class="b_player-page_block">
              <div class="b_player-page_block-title">Зріст</div>
              <div class="b_player-page_text">168 см</div>
            </div>
            <div class="b_player-page_block">
              <div class="b_player-page_block-title">Вага</div>
              <div class="b_player-page_text">48 кг</div>
            </div>
            <div class="b_player-page_block">
              <div class="b_player-page_block-title">Ігрова позиція</div>
              <div class="b_player-page_text">Лівий Напівзахисник (ЛНЗ)</div>
            </div>
            <div class="b_player-page_block">
              <div class="b_player-page_block-title">Кваліфікація</div>
              <div class="b_player-page_text active">Підтверджено</div>
            </div>
          </div>
        </div>
        <div class="b_player-page_contacts-block">
          <div class="b_player-page_title">Контакти</div>
          <div class="b_player-page_info">
            <div class="b_player-page_block">
              <div class="b_player-page_block-title">Телефон</div>
              <div class="b_player-page_text">+380 (95) 390 86 50</div>
            </div>
            <div class="b_player-page_block">
              <div class="b_player-page_block-title">E-mail</div>
              <div class="b_player-page_text">eddie_lake@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div class="b_player-page_rating-block">
        <div class="b_player-page_header-line">
          <div class="b_player-page_title">Рейтинг та відгуки</div>
          <div class="b_player-page_raiting">
            4
            <img src="../assets/img/star.svg" alt="">
          </div>
        </div>
        <div class="b_player-page_ratings-cards">
          <div
            v-for="user of users"
            :key="user.id"
            class="b_player-page_rating-card"
          >
            <div class="b_player-page_header">
              <div class="b_player-page_name">{{user.name}}</div>
              <div class="b_player-page_date">{{user.date}}</div>
            </div>
            <div class="b_player-page_text">
              {{user.text}}
            </div>
          </div>
        </div>
      </div>
      <div class="b_player-page_planed-events">
        <div class="b_player-page_top-part">
          <div class="b_player-page_title">Заплановані події</div>
          <div class="b_player-page_events-cards">
            <div
              v-for="event of events"
              :key="event.id"
              class="b_player-page_event-card"
            >
              <div class="b_player-page_title-line">
                <div class="b_player-page_name">{{event.title}}</div>
                <div class="b_player-page_label">{{event.label}}</div>
              </div>
              <div class="b_player-page_time-line">
                <div class="b_player-page_time">{{event.time}}</div>
                <div class="b_player-page_date">{{event.date}}</div>
              </div>
              <div class="b_player-page_labels-line">
                <div 
                  v-for="label of event.labels"
                  :key="label.id"
                  class="b_player-page_label"
                >
                  {{label.text}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="b_player-page_bottom-part">
          <span>
            Історія участі у заходах
          </span>
          <img src="../assets/img/arrow-right.svg" alt="">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import StarRating from 'vue-dynamic-star-rating'
  import CONSTANTS from '../consts'

  import publicPageBack from '../assets/img/public-page-back.svg'
  import userPageBack from '../assets/img/user-page-back.svg'

  
  const PAGE_MODE = 'public'
  
  export default {
    name: 'PlayerPage',
    props: {
      pageMode: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        users: new Array(6).fill('t').map((item, idx) => {
          return {
            id: idx,
            name: 'Гончарук Павло',
            date: '3 серпня',
            text: 'Круто зіграла, відмінні передачі і ще якісь там слова похвали в кілька рядків'
          }
        }),
        events: new Array(2).fill('t').map((item, idx) => {
          return {
            id: idx,
            title: 'Дружній матч',
            label: 'Гравець',
            time: '12:00 – 14:00',
            date: '3 серпня',
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
                text: 'Розряд'
              }
            ]
          }
        })
      }
    },
    computed: {
      backPic() {
        return this.pageMode === PAGE_MODE ? publicPageBack : userPageBack
      },
      labelColor() {
        return this.pageMode === PAGE_MODE ? 
                { background: '#148783' } :
                { background: '#F57125' }
      },
      isResultVisible() {
        return this.pageMode === PAGE_MODE
      }
    }
  }
  </script>

<style lang="scss" scoped>
.b_player-page {
  position: relative;
  padding: 80px 20px 20px 20px;
  @media (max-width: 1200px) {
    padding: 60px 20px 20px 20px;
  }
  .b_player-page_back-image {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .b_player-page_main-block {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
    }
    .b_player-page_user-card { 
      padding: 24px 20px;
      width: 536px;
      background: #FFFFFF;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 6px;
      @media (max-width: 1200px) {
        width: 100%;
      }
      .b_player-page_top-line { 
        display: flex;
        align-items: flex-start;
        .b_player-page_left-side { 
          .b_player-page_picture { 
            margin-right: 12px;
            img { 
              display: block;
              width: 92px;
            }
          }
        }

        .b_player-page_right-side { 
          width: 100%;
          .b_player-page_line { 
            display: flex;
            align-items: center;
            justify-content: space-between;
            .b_player-page_name { 
              font-family: 'Exo 2';
              font-style: normal;
              font-weight: 700;
              font-size: 20px;
              line-height: 24px;
              color: #262541;
            }

            .b_player-page_label { 
              padding: 0px 4px;
              background: #F57125;
              border-radius: 4px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
              text-align: center;
              color: #FFFFFF;
            }
            .b_player-page_invite {
              padding: 2px 12px;
              background: #262541;
              border-radius: 6px;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 13px;
              line-height: 24px;
              text-align: center;
              color: #FFFFFF;
            }
            .b_player-page_share {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 13px;
              line-height: 24px;
              text-align: center;
              color: #575775;
              display: flex;
              align-items: center;
              img {
                margin-right: 8px;
              }
            }
            .b_player-page_rating {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-top: 8px;
              margin-bottom: 12px;
              .b_player-page_text {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 20px;
                color: #8A8AA8;
                margin-left: 6px;
              }
            }
          }
        }
      }
      .b_player-page_about-line { 
        margin-top: 16px;
        .b_player-page_title { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          color: #575775;
          margin-bottom: 4px;
        }
        .b_player-page_text { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }
      }
      .b_player-page_sport-results { 
        border-top: 1px dashed #DFDEED;
        border-bottom: 1px dashed #DFDEED;
        margin-top: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
        .b_player-page_title { 
          margin-bottom: 8px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }

        .b_player-page_line { 
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          .b_player-page_block { 
            .b_player-page_block-title { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 16px;
              color: #8A8AA8;
            }

            .b_player-page_text { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #262541;
              &.b_player-page_active {
                font-size: 12px;
                padding: 0px 4px;
                background: #D2F6A2;
                border-radius: 4px;
              }
            }
          }
        }
      }
      .b_player-page_contacts-block { 
        margin-top: 16px;
        .b_player-page_title { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
          margin-bottom: 8px;
        }
        .b_player-page_info { 
          display: flex;
          align-items: flex-start;
          .b_player-page_block { 
            margin-right: 20px;
            .b_player-page_block-title { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 16px;
              color: #8A8AA8;
            }
            .b_player-page_text { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #262541;
            }
          }
        }
      }
    }
    .b_player-page_rating-block {
      padding: 24px 20px;
      width: 272px;
      background: #FFFFFF;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 6px;
      @media (max-width: 1200px) {
        margin-top: 16px;
        width: 100%;
      }
      .b_player-page_header-line { 
        display: flex;
        align-items: center;
        justify-content: space-between;
        .b_player-page_title { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }

        .b_player-page_raiting { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          color: #262541;
          display: flex;
          align-items: center;
          img { 
            margin-left: 2px;
          }
        }
      }
      .b_player-page_ratings-cards { 

        .b_player-page_rating-card { 
          border-top: 1px dashed #DFDEED;
          margin-top: 16px;
          padding-top: 16px;
          margin-bottom: 16px;
          .b_player-page_header { 
            display: flex;
            align-items: center;
            justify-content: space-between;
            .b_player-page_name { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
            }
            .b_player-page_date { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
            }
          }
          .b_player-page_text { 
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #262541;
            margin-top: 6px;
          }
        }
      }
    }
    .b_player-page_planed-events { 
      width: 256px;
      @media (max-width: 1200px) {
        margin-top: 16px;
        width: 100%;
      }
      .b_player-page_top-part { 
        padding: 24px 20px;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 6px;
        .b_player-page_title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }
        .b_player-page_events-cards {
          @media (min-width: 768px) and (max-width: 1200px) {
            display: flex;
          }
          .b_player-page_event-card {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px dashed #DFDEED;
            .b_player-page_title-line { 
              display: flex;
              align-items: center;
              .b_player-page_name { 
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 20px;
                color: #262541;
              }
              .b_player-page_label { 
                padding: 0px 4px;
                background: #FEEFE7;
                border-radius: 4px;
                margin-left: 6px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #262541;
              }
            }
            .b_player-page_time-line { 
              display: flex;
              align-items: center;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              margin-top: 6px;
              margin-bottom: 4px;
              .b_player-page_time { 
                margin-right: 16px;
              }
            }

            .b_player-page_labels-line { 
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              .b_player-page_label { 
                padding: 0px 8px;
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
        }
      }
      .b_player-page_bottom-part { 
        padding: 16px 20px;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 6px;
        margin-top: 8px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #262541;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>