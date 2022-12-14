<template>
  <div class="create-events-page">
    <div class="create-event-block">

      <ManageEventFirstStep 
        v-if="currentStep === 1"
        :type-of-event-dropdown="mockData.type_of_event_dropdown"
        :type-of-sport-dropdown="mockData.type_of_sport_dropdown"
        @dropdown-form-value="setFormValue"
        @set-event-data="setFormValue"
      />

      <ManageEventSecondStep 
        v-if="currentStep === 2"
        :tags="mockData.tags"
        :filtered-teams="filteredTeams"
        @set-event-data="setFormValue"
        @choose-category="chooseCategory"
      />
      
      <div 
        v-if="currentStep === 3"
        class="third-step"
      >
        <div class="title-block">
          <span>{{$t('events.additional-info')}}</span>
        </div>
        <div class="subtitle">
          {{$t('events.add-comment')}}
        </div>
        <div class="text-area-wrapper">
          <textarea
            placeholder="Опис подіїї"
          ></textarea>
          <div class="icon">
            <img src="../../../assets/img/aim.svg" alt="">
          </div>
        </div>
        <div class="contact-switcher">
          <div class="title-prize">
            {{$t('events.prize')}}
            <span>
              VIP
            </span>
          </div>
          <Switcher :id="'contacts'" />
        </div>
        <div class="input">
          <InputComponent
            :placeholder="$t('events.what-prize')"
            :title-width="0"
            :v-model="eventData.date"
            :icon="icons.aim"
          />
        </div>
        <div class="title-outfit">
          {{$t('events.need-clothes')}}
        </div>
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input 
              id="radio-outfit"
              name="outfit" 
              type="radio"
              :value="$t('events.yes')"
              checked
             >
            <label for="radio-outfit" class="radio-label">
              {{ $t('events.yes') }}
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-outfit2" 
              name="outfit" 
              type="radio"
              :value="$t('events.manijki-available')"
            >
            <label for="radio-outfit2" class="radio-label">
              {{$t('events.manijki-available')}}
            </label>
          </div>
        </div>
        <div class="title-outfit">
          {{$t('events.enter-colors')}}
        </div>
        <div class="outfit-colors">
          <div class="input">
            <InputComponent
              :placeholder="'Input'"
              :title-width="0"
              :outside-title="true"
              :title="$t('events.team1')"
            />
          </div>
          <div class="input">
            <InputComponent
              :placeholder="'Input'"
              :title-width="0"
              :outside-title="true"
              :title="$t('events.team2')"
            />
          </div>
        </div>
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
          @click-function="changeStep('-')"
        />
        <GreenBtn
          :text="$t('buttons.next')"
          :width="160"
          :icon-right="'../../../assets/img/arrow-right.svg'"
          @click-function="changeStep('+')"
        />
      </div>
    </div>

    <div class="tablet-block">
      <div class="save-template-block">
        <GreenBtn
          :text="$t('buttons.save')"
          :width="103"
          :background-color="'#575775'"
          :height="28"
          :icon="'../../../assets/img/save-icon.svg'"
          :font-styles="{'font-size': '13px'}"
        />
        <WhiteBtn
          :text="$t('buttons.download-template')"
          :width="177"
          :height="28"
          :font-styles="{
            'font-size': '13px',
            'font-weight': 400
          }"
          :main-color="'#575775'"
          :icon="'../../../assets/img/download-cloud.svg'"
        />
        <div class="close-btn">
          <img src="../../../assets/img/cross.svg" alt="">
        </div>
      </div>
      <div class="preview-tablet-block">
        <div class="left-block">
          <div class="img-icon">
            <img src="../../../assets/img/img-icon.svg" alt="">
          </div>
          <span>
            {{ $t('buttons.poster-preview') }}
          </span>
        </div>
        <div class="arrow-down">
          <img src="../../../assets/img/arrow-down.svg" alt="">
        </div>
      </div>
    </div>

    <div 
      v-if="currentStep === 1"
      class="preview-mob-block"
    >
      <div class="left-block">
        <div class="img-icon">
          <img src="../../../assets/img/img-icon.svg" alt="">
        </div>
        <span>{{ $t('buttons.poster-preview') }}</span>
      </div>
      <div class="arrow-down">
        <img src="../../../assets/img/arrow-down.svg" alt="">
      </div>
    </div>

    <div 
      v-if="currentStep === 2 || currentStep === 3"
      class="preview-mob-block-second"
    >
      <div class="btn btn-previous">
        <span>{{ $t('buttons.preview') }}</span>
      </div>
      <div class="btn btn-users">
        <span>{{ $t('buttons.invited-members') }}</span>
      </div>
    </div>

    <div class="wrapper-preview-block">
      <div class="preview-block">
        <div class="title">
          {{ $t('buttons.poster-preview') }}
        </div>
        <div class="subtitle">
          {{ $t('buttons.poster-main-preview') }}
        </div>
        <div class="form-block">
          <div class="top-line">
            <div class="left-block">
              <div class="col-1">
                <div class="card-icon">
                  <img src="../../../assets/img/hands-shake.svg" alt="" />
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
            <div class="left-block">
              В’ячеслав Залізняк
            </div>
            <div class="right-block">
              {{ eventData.payment }}
            </div>
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
                :text="eventData.isOpened"
                :width="115"
                :height="32"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="currentStep === 2" 
        class="chosen-ppl"
      >
        <div class="title">
          {{ $t('events.invited-people') }}
        </div>
        <div 
          @click="deleteAll"
          class="delete-all"
        >
          {{ $t('events.delete-all') }}
        </div>
        <div class="users-list">
          <div 
            v-for="user of chosenUsers"
            :key="user.id"
            class="user"
          >
            <div class="user-data">
              <div class="user-img">
                <img :src="user.img" alt="">
              </div>
              <div class="user-name">
                {{ user.name }}
              </div>
            </div>
            <div 
              class="delete-user"
              @click="deleteFromChosen(user.id, user.category)"
            >
              <img src="../../../assets/img/cross.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="manage-template-block">
      <div class="title">
        {{ $t('events.template-managing') }}
      </div>
      <div class="btns-block">
        <div class="white-btn-wrapper">
          <WhiteBtn
            :text="$t('buttons.download-template')"
            :width="208"
            :height="40"
            :main-color="'#262541'"
            :font-styles="{ 'font-weight': 400 }"
            :icon="'../../../assets/img/download-cloud.svg'"
          />
        </div>
        <GreenBtn
          :text="$t('buttons.save-as-template')"
          :icon="'../../../assets/img/save-icon.svg'"
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
import { computed, reactive } from 'vue'

import InputComponent from '../../../components/forms/InputComponent.vue'
import GreenBtn from '../../../components/GreenBtn.vue'
import WhiteBtn from '../../../components/WhiteBtn.vue'
import Switcher from '../../../components/Switcher.vue'
import ManageEventFirstStep from '../../../components/manage-event-components/ManageEventFirstStep.vue'
import ManageEventSecondStep from '../../../components/manage-event-components/ManageEventSecondStep.vue'

import AimIcon from '../../../assets/img/aim.svg'

import CONSTANTS from '../../../consts/index'

export default {
  name: 'CreateEventPage',
  components: {
    InputComponent,
    GreenBtn,
    WhiteBtn,
    Switcher,
    ManageEventFirstStep,
    ManageEventSecondStep
  },
  setup() {
    const labelStyle = reactive({
      padding: '0px 8px',
      border: '1px solid #EFEFF6',
      'border-radius': '100px'
    })
    const emptyLabelStyle = reactive({
        width: '70px',
        height: '18px',
        background: '#EFEFF6',
        'border-radius': '100px'
    })

    const icons = computed(() => {
      return {
        aim: AimIcon
      }
    })

    const mockData = computed(() => {
      return {
        type_of_event_dropdown: CONSTANTS.manage_event.type_of_event_dropdown,
        type_of_sport_dropdown: CONSTANTS.manage_event.type_of_sport_dropdown,
        tags: CONSTANTS.manage_event.tags,
        teams: CONSTANTS.manage_event.teams
      }
    })
    const filteredTeams = computed(() => {
      if (currentCategory === 'Всі') {
        return mockData.value.teams
      } else {
        return [mockData.value.teams.find(item => item.category_name === currentCategory)]
      }
    })

    function currentCategory() {
      return mockData.tags.find(item => item.isActive).text
    }
    function chooseCategory(id) {
      mockData.tags = mockData.tags.map(item => ({...item, isActive: false}))
      mockData.tags = mockData.tags.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isActive: true
          }
        } else {
          return item
        }
      })
    }

    return {
      mockData,
      filteredTeams,
      labelStyle,
      emptyLabelStyle,
      icons,
      chooseCategory
    }
  },
  data() {
    return {
      chosenUsers: [],
      currentStep: 1,
      eventData: {
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
        title: '',
        time: '',
        place: '',
        payment: '',
        isOpened: ''
      }
    }
  },
  methods: {
    deleteAll() {
      this.chosenUsers = []
    },
    deleteFromChosen(id, category) {
      this.chosenUsers = this.chosenUsers.filter(i => i.id !== id)
      this.teams.find(item => item.category_name === category).users
                              .find(item => item.id === id).isChosen = false
    },
    setFormValue(key, value, labelsId) {
      if (key === 'labels') {
        this.eventData.labels[labelsId].text = value
        return
      }
      this.eventData[key] = value
    },
    changeStep(val) {
      switch(val) {
        case '+': this.currentStep++
        break;
        case '-': this.currentStep--
        break;
      }
    },
    inviteUser(teamId, userId) {
      this.teams.find(item => item.id === teamId).users
                .find(item => item.id === userId).isChosen = true
                
      const team = this.teams.find(i => i.id === teamId)
      const user = team.users.find(i => i.id === userId)
      this.chosenUsers.push(user)
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-events-page {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    .create-event-block {
      width: 360px;
      padding: 20px;
      background: #FFFFFF;
      box-shadow: 2px 6px 10px rgba(56, 56, 251, 0.1);
      border-radius: 0px 6px 6px 0px;
      margin-right: 44px;
      @media (min-width: 576px) and (max-width: 992px) {
        margin-right: 16px;
      }
      @media (max-width: 768px) {
        order: 2;
        width: 100%;
        margin-right: 0;
      }
      // delete

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
      // delete

      // delete
      .input {
        width: 100%;
        height: 40px;
        margin-top: 16px;
      }
      // delete


      .third-step {
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
        .text-area-wrapper {
          position: relative;
          textarea {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            color: #575775;
            padding: 8px 35px 8px 12px;
            height: 88px;
            width: 100%;
            resize: none;
            border: 1px solid #DFDEED;
            border-radius: 6px;
            outline: none;
          }
          .icon {
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 40px;
            display: flex;
            border-radius: 6px;
            img {
              margin: auto;
            }
          }
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
        .title-outfit {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 20px;
          color: #575775;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        .contact-switcher {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 8px;
          .title-prize {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: #262541;
            span {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #575775;
              padding: 0px 4px;
              background: #EFEFF6;
              border-radius: 4px;
            }
          }
        }
        .outfit-colors {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .input {
            width: 154px;
            margin-top: 0;
          }
        }
      }

      .progress-line {
        margin-top: 20px;
        padding-top: 24px;
        border-top: 1px dashed #DFDEED;
        .sections {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 312px;
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
    .tablet-block {
      display: none;
      width: 320px;
      @media (max-width: 992px) {
        display: block;
      }      
      @media (max-width: 768px) {
        order: 1;
        margin-bottom: 16px;
        width: 100%;
      }
      .save-template-block {
        padding: 10px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(239, 239, 246, 0.7);
        border-radius: 8px;
      }
      .preview-tablet-block {
        padding: 8px 12px;
        background: rgba(239, 239, 246, 0.7);
        border: 1px solid #DFDEED;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        @media (max-width: 768px) {
          display: none;
        }
        .left-block {
          display: flex;
          align-items: center;
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 20px;
          text-align: center;
          color: #262541;
          .img-icon {
            margin-right: 10px;
            display: flex;
            img {
              margin: auto;
            }
          }
        }
      }
    }
    .preview-mob-block {
      display: none;
      padding: 8px 12px;
      background: rgba(239, 239, 246, 0.7);
      border: 1px solid #DFDEED;
      border-radius: 8px;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      @media (max-width: 768px) {
        display: flex;
        order: 3;
        width: 100%;
      }
      .left-block {
        display: flex;
        align-items: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
        color: #262541;
        .img-icon {
          margin-right: 10px;
          display: flex;
          img {
            margin: auto;
          }
        }
      }
    }



    .preview-mob-block-second {
      display: none;
      margin-top: 36px;
      margin-bottom: 8px;
      position: relative;
      height: 52px;
      @media (max-width: 768px) {
        display: flex;
        order: 3;
        width: 100%;
      }
      .btn {
        height: 52px;
        background: rgba(239, 239, 246, 0.7);
        border-radius: 8px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #262541;
        position: absolute;
        display: table;
        overflow: hidden;
        width: 53%;
        cursor: pointer;
        &-previous {
          left: 0;
          background: transparent;
          z-index: 1;
          border-left: 1px solid #DFDEED;
          &:after {
            content: " ";
            position: absolute;
            display: block;
            width: 100%;
            height: 96%;
            top: 0;
            left: 0;
            z-index: -1;
            background: #EFEFF6;
            transform-origin: bottom left;
            -ms-transform: skew(10deg, 0deg);
            -webkit-transform: skew(10deg, 0deg);
            transform: skew(10deg, 0deg);
            border: 1px solid #DFDEED;
            border-radius: 8px;
          }
        }
        &-users {
          border: 1px solid #DFDEED;
          right: 0;
        }
        span {
          display: table-cell;
          vertical-align: middle;
        }
      }
    }
    .wrapper-preview-block {
      margin-right: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 992px) and (max-width: 1199px) {
        margin-right: 10px;
      }
      @media (max-width: 991px) {
        display: none;
      }
      .preview-block {
        padding: 24px 44px;
        width: 504px;
        background: #F9F9FC;
        border-radius: 12px;
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
      .chosen-ppl {
        width: 416px;
        margin-top: 16px;
        .title {
          font-family: 'Exo 2';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          color: #262541;
        }
        .delete-all {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          margin-bottom: 8px;
          text-align: right;
          cursor: pointer;
        }
        .users-list {
          .user {
            padding: 4px;
            border-radius: 0px 6px 6px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #F0F0F4;
            .user-data {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .user-img {
                img {
                  display: block;
                }
              }
              .user-name {
                margin-left: 8px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #262541;
                user-select: none;
              }
            }
            .delete-user {
              cursor: pointer;
              img {
                margin-right: 12px;
              }
            }
          }
        }
      }
    }

    .manage-template-block {
      @media (min-width: 992px) and (max-width: 1400px) {
        margin-top: 20px;
      }
      @media (max-width: 991px) {
        display: none;
      }
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