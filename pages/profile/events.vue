<template>
  <div class="events-page">
    <div class="main-body">
      <div class="header-block">
        <div class="left-part">
          <div class="title">Майбутні події</div>
          <div class="event-switcher">
            <div class="general-events">Загальна</div>
            <div class="my-events">Мої події</div>
          </div>
        </div>
        <div class="right-part">
          <GreenBtn 
            :text="'Створити подію'" 
            :width="168"
            :icon="require('../../assets/img/plus.svg')"
            :height="40"
          />
        </div>
      </div>
      <div class="main-search-block">
        <div class="grey-rectangle"></div>
        <div class="search-block">
          <div class="first-line">
            <Dropdown 
              :options="dataDropdown"
              :main-title="'Тип гри'"
              :outsideTitle="true"
              :width="152"
            />
            <div class="location-filters">
              <div class="location">
                <img src="../../assets/img/location-point.svg" alt="">
                <p>Запоріжжя</p>
              </div>
              <div class="drop-filters">
                <img src="../../assets/img/clear-filter.svg" alt="">
              </div>
              <img class="set-filter" src="../../assets/img/set-filter.svg" alt="">
            </div>
          </div>
          <div class="second-line">
            <div class="left-side">
              <div class="choose-gender">
                <div class="radio">
                  <input id="radio-1" name="radio" type="radio" checked>
                  <label for="radio-1" class="radio-label">
                    <img src="../../assets/img/male-icon.svg" alt="">
                    Checked
                  </label>
                </div>

                <div class="radio">
                  <input id="radio-2" name="radio" type="radio">
                  <label for="radio-2" class="radio-label">
                  <img src="../../assets/img/female-icon.svg" alt="">
                    Unchecked
                  </label>
                </div>

                <div class="radio">
                  <input id="radio-3" name="radio" type="radio">
                  <label for="radio-3" class="radio-label">
                    <img src="../../assets/img/unisex.svg" alt="">
                    Disabled
                  </label>
                </div>
              </div>
              <div class="calendar">
                <img src="../../assets/img/calendar.svg" alt="">
                Календар
              </div>
            </div>
            <div class="right-side">
              <div class="address-block">
                <img src="../../assets/img/address-icon.svg" alt="">
                <p>35 West Fork Street, Missoula</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cards-block">
          <div class="event-card">
            <div class="top-title">
              <div class="left-side">
                <div class="card-icon">
                  <img src="../../assets/img/hands-shake.png" alt=""></div>
                <div class="text-block">
                  <div class="title">Дружній матч</div>
                  <div class="address">
                    <img src="../../assets/img/location-point.svg" alt="">
                    <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
                  </div>
                </div>
              </div>
              <div class="right-side">
                <div class="date">16 червня</div>
                <div class="time">12:00 – 14:00</div>
              </div>
            </div>
            <div class="main-text">
              Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd
            </div>
            <div class="labels">
              <div class="label">Футбол</div>
              <div class="label">Чоловіки</div>
              <div class="label">Без розряду</div>
              <div class="label">Потрібна форма</div>
            </div>
            <div class="bottom-block">
              <div class="top-line">
                <div class="name">В’ячеслав Залізняк</div>
                <div class="price">Безкоштовно</div>
              </div>
              <div class="bottom-line">
                <div class="left-side">
                  <div class="titles">
                    <div class="players">Гравці:</div>
                    <div class="visitors">Вболівальники:</div>
                  </div>
                  <div class="date">
                    <div class="players-date">10 / 22</div>
                    <div class="visitors-date">17 / 30</div>
                  </div>
                </div>
                <div class="right-side">
                  <GreenBtn 
                    :text="'Долучитися'" 
                    :width="115"
                    :height="32"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="right-sidebar">
       <div class="title-block">
          <div class="title">Заплановані події</div>
          <div class="subtitle">Заходи у яких ви запланували участь</div>
       </div>

       <div class="cards-block">
        <div class="card">
          <div class="close">&times;</div>
          <div class="top-line">
            <div class="icon-pic">
              <img src="../../assets/img/hands-shake.png" alt="">
            </div>
            <div class="text-data">
              <div class="top-line name">Дружній матч</div>
              <div class="bottom-line">
                <div class="time">12:00 – 14:00</div>
                <div class="date">16 червня</div>
              </div>
            </div>
          </div>
          <div class="address">
            <img src="../../assets/img/location-point.svg" alt="">
            <p>Запоріжжя, Центральна, стадіон «Торпеда»</p>
          </div>
          <div class="labels">
            <div class="label">Футбол</div>
            <div class="label">Чоловіки</div>
            <div class="label">...</div>
          </div>
        </div>
       </div>
    </div>
  </div>
</template>

<script>
import GreenBtn from '../../components/GreenBtn.vue'
import Dropdown from '../../components/Dropdown.vue'

export default {
  name: 'events-page',
  components: {
    GreenBtn,
    Dropdown
  },
  data() {
    return {
      dataDropdown: [
        {
          id: 0,
          value: 'Футбол'
        },
        {
          id: 1,
          value: 'Хокей'
        },
        {
          id: 2,
          value: 'Баскетбол'
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
    grid-gap: 16px;
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
          .event-switcher {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            text-align: center;
            color: #262541;
            display: flex;
            .general-events {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              gap: 10px;
              width: 100px;
              height: 28px;
              border: 1px solid #148581;
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
              border: 1px solid #DFDEED;
              border-radius: 0px 6px 6px 0px;
              cursor: pointer;
            }
          }
        }
        .right-part {

        }
      }
      .main-search-block {
        margin-top: 36px;
        padding: 20px 16px;
        position: relative;
        .grey-rectangle {
          width: 100%;
          height: 208px;
          background: #F9F9FC;
          border-radius: 8px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
        }
        .search-block {
          .first-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .location-filters {
              display: flex;
              align-items: center;
              .location {
                margin-right: 20px;
                display: flex;
                align-items: center;
                img {
                  margin-right: 8px;
                }
                p {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  color: #262541;
                  border-bottom: 1px dashed #000;
                  cursor: pointer;
                }
              }
              .drop-filters {
                width: 36px;
                height: 36px;
                background: #EFEFF6;
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
          .second-line {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left-side {
              display: flex;
              align-items: center;
              .choose-gender {
                $color1: #f4f4f4;
                $color2: #148783;
                display: flex;
                align-items: center;
                margin-right: 16px;
                .radio {
                  margin-right: 8px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  padding: 6px 12px;
                  background: #FFFFFF;
                  border: 1px solid #DFDEED;
                  border-radius: 6px;
                  input[type="radio"] {
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
                      color: #262541;
                      img {
                        margin-right: 4px;
                      }
                      &:after {
                        content: '';
                        border-radius: 100%;
                        border: 1px solid #262541;
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
              .calendar {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 112px;
                height: 36px;
                background: #FFFFFF;
                border: 1px solid #DFDEED;
                border-radius: 6px;
                cursor: pointer;
                img {
                  margin-right: 7px;
                }
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 13px;
                line-height: 24px;
                text-transform: capitalize;
                color: #262541;
              }
            }
            .right-side {
              .address-block {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  margin-right: 7px;
                }
                p {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 14px;
                  line-height: 20px;
                  text-align: right;
                  color: #262541;
                  border-bottom: 1px dashed #000;
                }
              }
            }
          }
        }
        .cards-block {
          margin-top: 23px;
          .event-card {
            padding: 20px 16px;
            isolation: isolate;
            width: 416px;
            background: #FFFFFF;
            box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
            border-radius: 6px;
            .top-title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left-side {
                display: flex;
                .card-icon {
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  width: 48px;
                  height: 48px;
                  background: #EFEFF6;
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
                    color: #262541;
                  }
                  .address {
                    display: flex;
                    background: #FAFAFA;
                    padding: 0px 4px;
                    margin-top: 4px;
                    width: 212px;
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
                }
              }
              .right-side {
                .date {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  text-align: right;
                  color: #262541;
                }
                .time {
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 20px;
                  text-align: right;
                  color: #4C4A82;
                  margin-top: 4px;
                }
              }
            }
            .main-text {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #393762;
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
                color: #575775;
                padding: 0px 8px;
                border: 1px solid #EFEFF6;
                border-radius: 100px;
              }
            }
            .bottom-block {
              margin-top: 12px;
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
                  color: #393762;
                }
                .price {
                  font-family: 'Lato';
                  font-style: normal;
                  font-weight: 600;
                  font-size: 14px;
                  line-height: 20px;
                  text-align: right;
                  color: #262541;
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
                  .titles, .date {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    margin-right: 30px;
                  }
                    .players, .players-date {
                      color: #262541;
                    }
                    .visitors, .visitors-date {
                      color: #575775;
                    }
                  
                  .date {

                  }
                }
                .right-side {

                }
              }
            }
          }
        }
      }
    }
    .right-sidebar {
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