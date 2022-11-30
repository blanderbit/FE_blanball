<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">
        {{$t('register.your-skills')}}
      </div>
      <div class="b-register-step__progress-line">
        <div class="b-register-step__sections">
          <div
            v-for="item of 3"
            :key="item"
            :class="[
              'b-register-step__section',
              { active: item === 1 || item === 2 },
            ]"
          ></div>
        </div>
      </div>
      <div class="b-register-step__subtitle">
        <span>
          {{$t('register.great')}}
        </span>
        <span>
          {{$t('register.your-football-experience')}}
        </span>
      </div>
      <div class="b-register-step__small-title">
        {{$t('register.you-played-football')}}
      </div>
      <div class="b-register-step__experience-block">
        <div class="radio-btn-wrapper">
          <div class="radio">
            <input
              id="radio-1"
              name="gender"
              type="radio"
              :value="$t('register.along')"
              v-model="profesionaLevel"
              checked
            />
            <label for="radio-1" class="radio-label">
              {{$t('register.along')}} 
            </label>
          </div>
          <div class="radio">
            <input 
              id="radio-2" 
              name="gender" 
              type="radio" 
              :value="$t('register.professionally')"
              v-model="profesionaLevel"
            />
            <label for="radio-2" class="radio-label"> 
              {{$t('register.professionally')}} 
            </label>
          </div>
          <div class="radio">
            <input
              id="radio-3"
              name="gender"
              type="radio"
              :value="$t('register.amateurishly')"
              v-model="profesionaLevel"
            />
            <label for="radio-3" class="radio-label">
              {{$t('register.amateurishly')}} 
            </label>
          </div>
          <div class="radio">
            <input
              id="radio-4"
              name="gender"
              type="radio"
              :value="$t('register.not-engaged')"
              v-model="profesionaLevel"
            />
            <label for="radio-4" class="radio-label">
              {{$t('register.not-engaged')}} 
            </label>
          </div>
        </div>
      </div>
      <div 
        class="b-register-step__confirm-qualification"
        v-if="isDocumentNeeded"
      >
        <div class="b-register-step__small-title">
          {{$t('register.add-document')}}
        </div>
        <div class="b-register-step__input">
          <InputComponent
            :is-disabled="true"
            :icon="[clip]"
            :has-icon="true"
            :outside-title="true"
            :title="$t('register.document')"
            :title-width="0"
          />
        </div>
      </div>
    </div>
    <div class="b-register-step__buttons">
      <div 
        class="b-register-step__back-btn"
        @click="$emit('decrementStep')"
      >
        {{$t('register.return')}}
      </div>
      <GreenBtn
        :text="$t('register.next')"
        :width="156"
        :height="40"
        :icon-right="arrow_right"
        :is-icon-and-text-apart="true"
        @click-function="$emit('incrementStep')"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import GreenBtn from '../GreenBtn.vue'
import Dropdown from '../forms/Dropdown.vue'
import InputComponent from '../forms/InputComponent.vue'

import arrowRight from '../../assets/img/arrow-right-white.svg'
import clipIcon from '../../assets/img/clip.svg'

export default {
  name: 'Step5',
  components: {
    GreenBtn,
    Dropdown,
    InputComponent,
  },
  setup() {
    const profesionaLevel = ref('')
    const clip = computed(() => {
      return clipIcon
    })
    const arrow_right = computed(() => {
      return arrowRight
    })
    const isDocumentNeeded = computed(() => {
      return profesionaLevel.value === 'Професійно'
    })

    return {
      arrow_right,
      clip,
      profesionaLevel,
      isDocumentNeeded
    }
  },
}
</script>

<style lang="scss" scoped>
.b-register-step {
  padding: 44px 24px 72px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 28px 28px 0px 0px;
  @media (max-width: 576px) {
    padding: 44px 16px 72px 16px;
  }
  @media (min-width: 576px) {
    border-radius: 8px;
  }
  .b-register-step__top-part {
    .b-register-step__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: #262541;
      @media (max-width: 576px) {
        text-align: center;
      }
    }
    .b-register-step__progress-line {
      margin-top: 16px;
      margin-bottom: 28px;
      .b-register-step__sections {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 576px) {
          width: 266px;
          margin: 0 auto;
        }
        .b-register-step__section {
          width: 33%;
          height: 4px;
          background: #efeff6;
          border-radius: 2px;
          &.active {
            background: #1ab2ad;
          }
        }
      }
    }
    .b-register-step__subtitle {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #575775;
      margin-bottom: 20px;
    }
    .b-register-step__small-title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #262541;
    }
    .b-register-step__experience-block {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .radio-btn-wrapper {
        $color1: #f4f4f4;
        $color2: #148783;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 12px;
        .radio {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          background: #ffffff;
          border: 1px solid #dfdeed;
          border-radius: 6px;
          width: 186px;
          margin-top: 12px;
          @media (min-width: 576px) and (max-width: 992px) {
            width: 204px;
          }
          @media (max-width: 576px) {
            width: 49%;
          }
          input[type='radio'] {
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
              justify-content: space-between;
              &::before {
                content: '';
                border-radius: 100%;
                border: 1px solid #262541;
                display: inline-block;
                width: 13px;
                height: 13px;
                position: relative;
                top: 0px;
                vertical-align: top;
                cursor: pointer;
                text-align: center;
                transition: all 250ms ease;
                margin-right: 10px;
              }
            }
            &:checked {
              + .radio-label {
                &:before {
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
    }
    .b-register-step__input {
      margin-top: 12px;
      width: 384px;
      height: 40px;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
  }

  .b-register-step__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .b-register-step__back-btn {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #575775;
      cursor: pointer;
    }
  }
}
</style>