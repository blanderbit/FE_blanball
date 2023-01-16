<template>
  <div class="third-step" :style="stepStyle">
    <div class="title-block">
      <span>{{$t('events.additional-info')}}</span>
    </div>
    <div class="subtitle">
      {{$t('events.add-comment')}}
    </div>
    <TextAreaComponent
      :placeholder="$t('events.event-description')"
      name="description"
    />
    <!-- <div class="contact-switcher">
      <div class="title-prize">
        {{$t('events.prize')}}
        <span>
          VIP
        </span>
      </div>
      <Switcher 
        :id="'prise'"
        :is-edit-mode="true"
        name="is_phone_shown"
        @get-value="showHidePhone"
      />
    </div>
    <div class="input">
      <InputComponent
          :placeholder="$t('events.what-prize')"
          :title-width="0"
          :icon="icons.aim"
      />
    </div> -->
    <div class="title-outfit">
      {{$t('events.need-clothes')}}
    </div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <radio-button
          name="need_form"
          :title="$t('events.yes')"
          value="true"
          :width="'auto'"
        ></radio-button>
      </div>
      <div class="radio">
        <radio-button
          name="need_form"
          :title="$t('events.manijki-available')"
          value="false"
          :width="'auto'"
        ></radio-button>
      </div>
      <!-- <div class="radio">
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
      </div> -->
    </div>
    <div class="title-outfit">
      {{$t('events.enter-colors')}}
    </div>
    <div class="outfit-colors">
      <!-- <div class="input">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Switcher from '../../components/Switcher.vue'
import RadioButton from '../../components/forms/RadioButton.vue'
import InputComponent from '../../components/forms/InputComponent.vue'
import TextAreaComponent from '../TextAreaComponent.vue'

import AimIcon from '../../assets/img/aim.svg'

export default {
  name: 'ManageEventThirdStep',
  components: {
    Switcher,
    InputComponent,
    RadioButton,
    TextAreaComponent
  },
  props: {
    currentStep: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const icons = computed(() => {
      return {
        aim: AimIcon
      }
    })

    const stepStyle = computed(() => {
      return props.currentStep === 3 ? 
            { height : 'auto' } :
            { height : '0px' }
    })

    return {
      icons,
      stepStyle
    }
  }
}
</script>

<style lang="scss" scoped>

.third-step {
  overflow: hidden;


  .radio-btn-wrapper {
    $color1: #f4f4f4;
    $color2: #148783;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .radio {
      &:first-child {
        margin-right: 8px;
      }
      flex-basis: 50%;
      ::v-deep {
        .b-radio {
          margin-right: 0;
          .b-radio-label::before {
            margin-right: 10px;
          }
        }
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
</style>