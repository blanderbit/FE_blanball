<template>
  <div class="create-events-page">
    <div class="create-event-block">
      <div
        v-if="currentStep === 1"
        class="first-step"
      >
        <Dropdown
          :outside-title="true"
          :main-title="'Тип події'"
          :options="dataDropdown"
          :width="320"
          :height="40"
          @new-value="setFormValue('title', $event)"
        />
        <div class="title">Гендер учасників події</div>
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input 
              id="radio-1" 
              name="radio" 
              type="radio"
              value="Чоловіки"
              v-model="eventData.labels[1].text"
              checked
             >
            <label for="radio-1" class="radio-label">
              <img src="../../../assets/img/male-icon.svg" alt="">
                Чоловіки
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-2" 
              name="radio" 
              type="radio"
              value="Жінки"
              v-model="eventData.labels[1].text"
            >
            <label for="radio-2" class="radio-label">
              <img src="../../../assets/img/female-icon.svg" alt="">
                Жінки
            </label>
          </div>
        </div>
        <Dropdown
          :outside-title="true"
          :main-title="'Вид спорту'"
          :options="dataDropdown2"
          :width="320"
          :height="40"
          @new-value="setFormValue('gameType', $event)"
        />
        <div class="input">
          <InputComponent
            :outside-title="true"
            :title="'Дата проведення'"
            :placeholder="'Input'"
            :title-width="0"
            :v-model="eventData.date"
            @new-value="setFormValue('date', $event)"
          />
        </div>
        <div class="input">
          <InputComponent
            :outside-title="true"
            :title="'Час проведення'"
            :placeholder="'Input'"
            :title-width="0"
            :v-model="eventData.date"
            @new-value="setFormValue('time', $event)"
          />
        </div>
        <div class="input">
          <InputComponent
            :outside-title="true"
            :title="'Місце проведення'"
            :placeholder="'Input'"
            :title-width="0"
            @new-value="setFormValue('place', $event)"
          />
        </div>
        <div class="event-map">
          <img src="../../../assets/img/map.png" alt="">
        </div>
      </div>

      <div 
        v-if="currentStep === 2"
        class="second-step"
      >
        <div class="title-block">
          <span>Конфіденційність</span>
          <div class="vip-only">
            Тільки для ViP
          </div>
        </div>
        <div class="subtitle">
          Чи бажаєте ви отримувати запити на участьу події?
        </div>
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input 
              id="radio-3" 
              name="entrance" 
              type="radio"
              value="Вільний"
              v-model="eventData.labels[1].text"
              checked
             >
            <label for="radio-1" class="radio-label">
              <img src="../../../assets/img/male-icon.svg" alt="">
                Вільний
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-4" 
              name="entrance" 
              type="radio"
              value="Закритий"
              v-model="eventData.labels[1].text"
            >
            <label for="radio-2" class="radio-label">
              <img src="../../../assets/img/female-icon.svg" alt="">
                Закритий
            </label>
          </div>
        </div>
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input 
              id="radio-5" 
              name="payment" 
              type="radio"
              value="Безкоштовно"
              v-model="eventData.labels[1].text"
              checked
             >
            <label for="radio-1" class="radio-label">
              <img src="../../../assets/img/male-icon.svg" alt="">
                Безкоштовно
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-6" 
              name="payment" 
              type="radio"
              value="Платно"
              v-model="eventData.labels[1].text"
            >
            <label for="radio-2" class="radio-label">
              <img src="../../../assets/img/female-icon.svg" alt="">
                Платно
            </label>
          </div>
        </div>
        <div class="input">
          <InputComponent
            :outside-title="true"
            :title="'Дата проведення'"
            :placeholder="'Input'"
            :title-width="0"
            :v-model="eventData.date"
            @new-value="setFormValue('date', $event)"
          />
        </div>
        <div class="input">
          <InputComponent
            :outside-title="true"
            :title="'Час проведення'"
            :placeholder="'Input'"
            :title-width="0"
            :v-model="eventData.date"
            @new-value="setFormValue('time', $event)"
          />
        </div>
        <div class="input">
          <InputComponent
            :outside-title="true"
            :title="'Місце проведення'"
            :placeholder="'Input'"
            :title-width="0"
            @new-value="setFormValue('place', $event)"
          />
        </div>
      </div>

      <div class="third-step">

      </div>
       
      <div class="progress-line">
        <div class="sections">
          <div
            v-for="item of 3"
            :key="item"
            :class="['section', { 
              active : item <= currentStep
            }]"
          ></div>
        </div>
      </div>
      <div class="buttons-block">
        <WhiteBtn
          :text="$t('buttons.back')"
          :width="140"
          :main-color="'#262541'"
        />
        <GreenBtn
          :text="$t('buttons.next')"
          :width="160"
          :icon-right="require('../../../assets/img/arrow-right.svg')"
          @click-function="changeStep"
        />
      </div>
    </div>
    <div class="preview-block">
      <div class="title">
        Попередній перегляд афіші
      </div>
      <div class="subtitle">
        Таким чином виглядатиме афіша вашої події для інших користувачів додатку BlanBall
      </div>
      <div class="form-block">
        <div class="top-line">
          <div class="left-block">
            <div class="col-1">
              <div class="card-icon">
                <img src="../../../assets/img/hands-shake.png" alt="" />
              </div>
            </div>
            <div class="col-2">
              <div class="title">{{eventData.title}}</div>
              <div class="address">
                <img src="../../../assets/img/location-point.svg" alt="">
                <p>
                  {{ eventData.place }}
                </p>
              </div>
            </div>
          </div>
          <div class="right-block">
            <div class="col-3">
              <div class="date">
                {{ eventData.date }}
              </div>
              <div class="time">
                {{ eventData.time }}
              </div>
            </div>
          </div>
        </div>
        <div class="text-area"></div>
        <div class="labels">
          <div 
            v-for="label in eventData.labels"
            :key="label.id"
            class="label"
            :style="
              label.text.length ?  
              labelStyle :
              emptyLabelStyle
            "
          >
            {{ label.text }}
          </div>
        </div>
        <div class="bottom-part">
          <div class="left-block"></div>
          <div class="right-block"></div>
        </div>
        <div class="bottom-line">
          <div class="left-side">
            <div class="titles">
              <div class="players">{{ $t('events.players') }}:</div>
              <div class="visitors">{{ $t('events.fans') }}:</div>
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
    <div class="manage-template-block">
      <div class="title">
        Управління шаблонами
      </div>
      <div class="btns-block">
        <div class="white-btn-wrapper">
          <WhiteBtn
            :text="$t('buttons.download-template')"
            :width="208"
            :height="40"
            :main-color="'#262541'"
            :font-styles="{ 'font-weight': 400 }"
            :icon="require('../../../assets/img/download-cloud.svg')"
          />
        </div>
        <GreenBtn
          :text="$t('buttons.save-as-template')"
          :icon="require('../../../assets/img/save-icon.svg')"
          :width="208"
          :height="40"
          :background-color="'#575775'"
          :font-styles="{ 'font-weight': 400 }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '../../../components/Dropdown.vue'
import InputComponent from '../../../components/InputComponent.vue'
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'

export default {
  name: 'CreateEventPage',
  components: {
    Dropdown,
    InputComponent,
    GreenBtn,
    WhiteBtn
  },
  data() {
    return {
      currentStep: 1,
      eventData: {
        title: '',
        labels: [
          {
            id: 0,
            text: ''
          },
          {
            id: 1,
            text: ''
          }
        ],
        date: '',
        time: '',
        place: ''
      },
      dataDropdown: [
        {
          id: 0,
          value: 'Дружній матч'
        },
        {
          id: 1,
          value: 'Не дружній матч'
        },
        {
          id: 2,
          value: 'Ворожий матч'
        }
      ],
      dataDropdown2: [
        {
          id: 0,
          value: 'Футбол'
        },
        {
          id: 1,
          value: 'Литрбол'
        },
        {
          id: 2,
          value: 'Метание кизяков'
        },
        {
          id: 3,
          value: 'Плевки в длину'
        }
      ]
    }
  },
  computed: {
    labelStyle() {
      return {
        padding: '0px 8px',
        border: '1px solid #EFEFF6',
        'border-radius': '100px'
      }
    },
    emptyLabelStyle() {
      return {
        width: '70px',
        height: '18px',
        background: '#EFEFF6',
        'border-radius': '100px'
      }
    }
  },
  methods: {
    setFormValue(key, value) {
      if (key === 'gameType') {
        this.eventData.labels[0].text = value
        return
      }
      this.eventData[key] = value
    },
    changeStep() {
      this.currentStep++
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-events-page {
    display: flex;
    align-items: flex-start;
    .create-event-block {
      width: 360px;
      padding: 20px;
      background: #FFFFFF;
      box-shadow: 2px 6px 10px rgba(56, 56, 251, 0.1);
      border-radius: 0px 6px 6px 0px;
      margin-right: 44px;
      .radio-btn-wrapper {
        $color1: #f4f4f4;
        $color2: #148783;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .radio {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          background: #FFFFFF;
          border: 1px solid #DFDEED;
          border-radius: 6px;
          min-width: 154px;
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
      .input {
        width: 100%;
        height: 40px;
        margin-top: 16px;
      }
      .first-step {
        .title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #262541;
          margin-bottom: 8px;
        }
        .event-map {
          margin-top: 16px;
        }
      }
      .second-step {
        .title-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            font-family: 'Exo 2';
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #262541;
          }
          .vip-only {
            width: 93px;
            height: 20px;
            background: #EFEFF6;
            border-radius: 4px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
            text-align: center;
          }
        }
        .subtitle {
          margin-top: 8px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
          margin-bottom: 20px;
        }
        .title {
          margin-top: 20px;
          margin-bottom: 8px;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          color: #262541;
        }
      }
      .third-step {

      }

      .progress-line {
        margin-top: 72px;
        padding-top: 24px;
        border-top: 1px dashed #DFDEED;
        .sections {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .section {
            width: 102.67px;
            height: 4px;
            background: #EFEFF6;
            border-radius: 2px;
            &.active {
              background: #1AB2AD;
            }
          }
        }
      }
      .buttons-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }
    }
    .preview-block {
      padding: 24px 44px;
      width: 504px;
      background: #F9F9FC;
      border-radius: 12px;
      margin-right: 40px;
      .title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
      }
      .subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
        color: #575775;
        margin: 6px 0 20px;
      }
      .form-block {
        padding: 20px 16px;
        background: #FFFFFF;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 6px;
        .top-line {
          display: flex;
          justify-content: space-between;
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
                background: #EFEFF6;
                border-radius: 4px;
              }
            }
            .col-2 {
              width: 200px;
              @media (min-width: 1200px) and (max-width: 1400px) {
                width: 230px;
              }
              @media (min-width: 992px) and (max-width: 1199px) {
                width: 150px;
              }
              @media (min-width: 768px) and (max-width: 991px) {
                width: 165px;
              }
              @media (max-width: 768px) {
                width: 70%;
              }
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
                img {
                  margin-right: 5px;
                }
                p {
                  font-family: "Inter";
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
                background: #EFEFF6;
                color:  #262541;
                width: fit-content;
                &.active {
                  background: #71BA12;
                  color:  #fff;
                }
              }
              .date {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                text-align: right;
                color: #262541;
                margin-bottom: 4px;
              }
              .time {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                text-align: right;
                color: #4C4A82;
              }
            }
          }
        }
        .text-area {
          margin-top: 12px;
          height: 80px;
          background: #EFEFF6;
          border-radius: 6px;
        }
        .labels {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 8px;
          .label {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            color: #575775;
            margin-right: 4px;
            margin-bottom: 4px;
          }
        }
        .bottom-part {
          border-top: 1px dashed #DFDEED;
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          .left-block {
            width: 113px;
            height: 20px;
            background: #EFEFF6;
            border-radius: 6px;
          }
          .right-block {
            width: 87px;
            height: 20px;
            background: #EFEFF6;
            border-radius: 6px;
          }
        }
        .bottom-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          .left-side {
            display: flex;
            align-items: center;
            .titles {
              margin-right: 30px;
            }
            .titles, .date {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
            }
            .players, .players-date {
              color: #262541;
            }
            .visitors, .visitors-date {
              color: #575775;
            }
          }
        }
      }
    }
    .manage-template-block {
      .title {
        font-family: 'Exo 2';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #262541;
      }
      .btns-block {
        margin-top: 20px;
        .white-btn-wrapper {
          margin-bottom: 12px;
        }
      }
    }
  }
</style>