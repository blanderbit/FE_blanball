<template>
  <div class="third-step">
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
      <Switcher :id="'contacts'"/>
    </div>
    <div class="input">
      <InputComponent
          :placeholder="$t('events.what-prize')"
          :title-width="0"
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
</template>

<script>
import { computed } from 'vue'
import Switcher from '../../components/Switcher.vue'
import InputComponent from '../../components/forms/InputComponent.vue'

import AimIcon from '../../assets/img/aim.svg'

export default {
  name: 'ManageEventThirdStep',
  components: {
    Switcher,
    InputComponent
  },
  setup() {
    const icons = computed(() => {
      return {
        aim: AimIcon
      }
    })

    return {
      icons
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>