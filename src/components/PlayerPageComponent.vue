<template>
  <div class="player-page">
    <div class="back-image">
      <img :src="backPic" alt="">
    </div>
    <div class="main-block">
      <div class="user-card">
        <div class="top-line">
          <div class="left-side">
            <div class="picture">
              <img src="../assets/img/user-photo.png" alt="">
            </div>
          </div>
          <div class="right-side">
            <div class="line">
              <div class="name">Калиновська Стефанія</div>
              <div
                :style="labelColor"
                class="label"
              >
                Гравець
              </div>
            </div>
            <div class="line">
              <div class="rating">
                <div class="start">
                  <!--<star-rating -->
                    <!--:star-style="starStyle"-->
                    <!--:rating="3"-->
                    <!--:is-indicator-active="false"-->
                  <!--&gt;</star-rating>-->
                </div>
                <div class="text">
                  17 оцінок
                </div>
              </div>
            </div>
            <div class="line">
              <div class="invite">
                Запросити на подію
              </div>
              <div class="share">
                <img src="../assets/img/share-icon.svg" alt="">
                <span>Поділитися</span>
              </div>
            </div>
          </div>
        </div>
        <div class="about-line">
          <div class="title">Про себе:</div>
          <div class="text">
            Donec vitae mi vulputate, suscipit urna in, malesuada nisl. Pellentesque laoreet pretium nisl, et pulvinar massa eleifend sed
          </div>
        </div>
        <div
          v-if="!isResultVisible"
          class="sport-results"
        >
          <div class="title">Спортивні показники</div>
          <div class="line">
            <div class="block">
              <div class="block-title">Зріст</div>
              <div class="text">168 см</div>
            </div>
            <div class="block">
              <div class="block-title">Вага</div>
              <div class="text">48 кг</div>
            </div>
            <div class="block">
              <div class="block-title">Ігрова позиція</div>
              <div class="text">Лівий Напівзахисник (ЛНЗ)</div>
            </div>
            <div class="block">
              <div class="block-title">Кваліфікація</div>
              <div class="text active">Підтверджено</div>
            </div>
          </div>
        </div>
        <div class="contacts-block">
          <div class="title">Контакти</div>
          <div class="info">
            <div class="block">
              <div class="block-title">Телефон</div>
              <div class="text">+380 (95) 390 86 50</div>
            </div>
            <div class="block">
              <div class="block-title">E-mail</div>
              <div class="text">eddie_lake@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rating-block">
        <div class="header-line">
          <div class="title">Рейтинг та відгуки</div>
          <div class="raiting">
            4
            <img src="../assets/img/star.png" alt="">
          </div>
        </div>
        <div class="ratings-cards">
          <div
            v-for="user of users"
            :key="user.id"
            class="rating-card"
          >
            <div class="header">
              <div class="name">{{user.name}}</div>
              <div class="date">{{user.date}}</div>
            </div>
            <div class="text">
              {{user.text}}
            </div>
          </div>
        </div>
      </div>
      <div class="planed-events">
        <div class="top-part">
          <div class="title">Заплановані події</div>
          <div class="events-cards">
            <div
              v-for="event of events"
              :key="event.id"
              class="event-card"
            >
              <div class="title-line">
                <div class="name">{{event.title}}</div>
                <div class="label">{{event.label}}</div>
              </div>
              <div class="time-line">
                <div class="time">{{event.time}}</div>
                <div class="date">{{event.date}}</div>
              </div>
              <div class="labels-line">
                <div 
                  v-for="label of event.labels"
                  :key="label.id"
                  class="label"
                >
                  {{label.text}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-part">
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

  import publicPageBack from '../assets/img/public-page-back.png'
  import userPageBack from '../assets/img/user-page-back.png'

  
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
.player-page {
  position: relative;
  padding: 80px 20px 20px 20px;
  @media (max-width: 1200px) {
    padding: 60px 20px 20px 20px;
  }
  .back-image {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .main-block {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
    }
    .user-card { 
      padding: 24px 20px;
      width: 536px;
      background: #FFFFFF;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 6px;
      @media (max-width: 1200px) {
        width: 100%;
      }
      .top-line { 
        display: flex;
        align-items: flex-start;
        .left-side { 
          .picture { 
            margin-right: 12px;
            img { 
              display: block;
              width: 92px;
            }
          }
        }

        .right-side { 
          width: 100%;
          .line { 
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name { 
              font-family: 'Exo 2';
              font-style: normal;
              font-weight: 700;
              font-size: 20px;
              line-height: 24px;
              color: #262541;
            }

            .label { 
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
            .invite {
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
            .share {
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
            .rating {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              margin-top: 8px;
              margin-bottom: 12px;
              .text {
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
      .about-line { 
        margin-top: 16px;
        .title { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 16px;
          color: #575775;
          margin-bottom: 4px;
        }
        .text { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }
      }
      .sport-results { 
        border-top: 1px dashed #DFDEED;
        border-bottom: 1px dashed #DFDEED;
        margin-top: 16px;
        padding-top: 16px;
        padding-bottom: 16px;
        .title { 
          margin-bottom: 8px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }

        .line { 
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          .block { 
            .block-title { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 16px;
              color: #8A8AA8;
            }

            .text { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              color: #262541;
              &.active {
                font-size: 12px;
                padding: 0px 4px;
                background: #D2F6A2;
                border-radius: 4px;
              }
            }
          }
        }
      }
      .contacts-block { 
        margin-top: 16px;
        .title { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
          margin-bottom: 8px;
        }
        .info { 
          display: flex;
          align-items: flex-start;
          .block { 
            margin-right: 20px;
            .block-title { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 16px;
              color: #8A8AA8;
            }
            .text { 
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
    .rating-block {
      padding: 24px 20px;
      width: 272px;
      background: #FFFFFF;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 6px;
      @media (max-width: 1200px) {
        margin-top: 16px;
        width: 100%;
      }
      .header-line { 
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title { 
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }

        .raiting { 
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
      .ratings-cards { 

        .rating-card { 
          border-top: 1px dashed #DFDEED;
          margin-top: 16px;
          padding-top: 16px;
          margin-bottom: 16px;
          .header { 
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
            }
            .date { 
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
            }
          }
          .text { 
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
    .planed-events { 
      width: 256px;
      @media (max-width: 1200px) {
        margin-top: 16px;
        width: 100%;
      }
      .top-part { 
        padding: 24px 20px;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 6px;
        .title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #262541;
        }
        .events-cards {
          @media (min-width: 768px) and (max-width: 1200px) {
            display: flex;
          }
          .event-card {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px dashed #DFDEED;
            .title-line { 
              display: flex;
              align-items: center;
              .name { 
                font-family: 'Exo 2';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 20px;
                color: #262541;
              }
              .label { 
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
            .time-line { 
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
              .time { 
                margin-right: 16px;
              }
            }

            .labels-line { 
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              .label { 
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
      .bottom-part { 
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