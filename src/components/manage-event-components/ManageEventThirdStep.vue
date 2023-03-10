<template>
  <div class="third-step" :style="stepStyle">
    <div class="title">
      {{ $t('events.need-clothes') }}
    </div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <radio-button
          name="need_form"
          :title="$t('events.yes')"
          :value="true"
          :width="'auto'"
          @get-radio-value="selectForms"
        ></radio-button>
      </div>
      <div class="radio">
        <radio-button
          name="need_form"
          :title="$t('events.manijki-available')"
          :value="false"
          :width="'auto'"
          @get-radio-value="selectForms"
        ></radio-button>
      </div>
    </div>

    <div
      v-if="needForm !== null && Object.keys(formsValue).length == 0"
      class="forms-block"
      @click="openSelectFormsModal"
    >
      <div class="forms-select-form"
        @click="$emit('setForms')">
        <span>{{ $t('events.set-forms-colors') }}</span>
        <img src="../../assets/img/set-filter.svg" alt="" />
      </div>
    </div>
    <ErrorMessage class="b-forms-block-error-message" name="forms"/>   
    
    <EventCreateForms
      v-if="formsValue"
      :formsData="formsValue"
      @changeForms="changeForms"/>

    <div class="prize-switcher">
      <div class="title">
        {{ $t('events.prize') }} <span>{{ $t('events.vip') }}</span>
      </div>
      <Switcher
        :is-edit-mode="false"
        name="is_prize"
        @get-value="showHidePhone"
      />
    </div>

    <div class="need-ball-switcher">
      <span class="title">{{ $t('events.is-ball-need') }}</span>
      <Switcher :id="'need_ball'" :is-edit-mode="true" name="need_ball" />
    </div>
    <span class="subtitle">
      {{ $t('events.need-ball-subtitle') }}
    </span>

    <div class="phone-block">
      <span class="title">{{ $t('events.my-contacts') }}</span>
      <div class="input"
      :class="{'phone-read': !isEditPhone}">
      <InputComponent
        ref="phoneValue"
        :placeholder="phoneValue?.staticModelValue"
        :title-width="0"
        :readonly="!isEditPhone"
        name="contact_number"
        v-maska="'+38 (0##) ### ## ##'"
        :icon="icons.editPhone"
        @icon-click="changeEditPhoneMode"
      >
      </InputComponent>
    </div>
    </div>
    
    <div class="title-block">
      <span class="title-margin">{{ $t('events.additional-info') }}</span>
    </div>
    <div class="subtitle">
      {{ $t('events.add-comment') }}
    </div>
    <TextAreaComponent
      :placeholder="$t('events.event-description')"
      :height="92"
      name="description"
    />
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import { ErrorMessage } from '@system.it.flumx.com/vee-validate'

import { useUserDataStore } from '../../stores/userData'

import Switcher from '../../components/Switcher.vue'
import RadioButton from '../../components/forms/RadioButton.vue'
import InputComponent from '../../components/forms/InputComponent.vue'
import TextAreaComponent from '../TextAreaComponent.vue'
import EventCreateForms from '../buildedForms/EventCreateForms.vue'

import AimIcon from '../../assets/img/aim.svg'
import { storeToRefs } from 'pinia'

import editPhoneIcon from '../../assets/img/sort-arrows-horizontal.svg'
import checkMarkIcon from '../../assets/img/check-mark.svg'

export default {
  name: 'ManageEventThirdStep',
  components: {
    Switcher,
    InputComponent,
    RadioButton,
    TextAreaComponent,
    ErrorMessage,

    EventCreateForms,
  },
  props: {
    currentStep: {
      type: Number,
      default: null,
    },
    formsValue: {
      type: Object,
      default: () => {},
    },
    initialValues: {
      type: Object,
      default: () => {},
    }
  },
  setup(props, { emit }) {
    const store = useUserDataStore();
    const { user } = storeToRefs(store);
    const needForm = ref(props.initialValues?.need_form);
    const phoneValue = ref(null);
    const isEditPhone = ref(false);

    const icons = computed(() => {
      return {
        aim: AimIcon,
        editPhone: isEditPhone.value ? editPhoneIcon : checkMarkIcon,
      }
    })

    function showHidePhone(val) {
      isPhoneShown.value = val
    }

    const selectForms = (value) => {
      needForm.value = value
      emit('selectNeedForm', needForm.value)
    }

    const changeForms = () => {
      emit('changeForms')
    }

    function changeEditPhoneMode() {
      isEditPhone.value = !isEditPhone.value
    }

    const stepStyle = computed(() => {
      if (props?.currentStep) {
        return props?.currentStep === 3 ? { height: 'auto' } : { height: '0px' }
      }
    })

    return {
      icons,
      needForm,
      stepStyle,
      isEditPhone,
      user,
      phoneValue,
      showHidePhone,
      changeEditPhoneMode,
      changeForms,
      selectForms,
    }
  },
}
</script>

<style lang="scss" scoped>

// SCSS variables for hex colors
 $color-f4f4f4: #f4f4f4;
 $color-efeff6: #efeff6;
 $color-dfdeed: #dfdeed;


.third-step {
  overflow: hidden;

  .radio-btn-wrapper {
    $color1: $color-f4f4f4;
    $color2: $--b-main-green-color;
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
          color: $--b-main-black-color;
          img {
            margin-right: 4px;
          }
          &:after {
            content: '';
            border-radius: 100%;
            border: 1px solid $--b-main-black-color;
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
      color: $--b-main-black-color;
    }
  }
  .subtitle {
    margin-top: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: $--b-main-gray-color;
    margin-bottom: 20px;
  }
  .title {
    margin-bottom: 8px;
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: $--b-main-black-color;
  }
  .title-margin {
    margin-top: 20px;
  }
  .need-ball-switcher {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
  }
  .contact-switcher {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 8px;
  }
}
.prize-switcher {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  opacity: 0.6;
  margin-top: 20px;

  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    padding: 0px 4px;
    background: $color-efeff6;
    border-radius: 4px;
  }
}
.forms-block {
  .forms-select-form {
    border: 1px solid $color-dfdeed;
    border-radius: 6px;
    margin: 20px 0px;
    padding: 8px 8px 8px 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 24px;
      width: 100%;
      color: $--b-main-black-color;
    }
  }
}
.b-forms-block-error-message {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: $--b-error-color;
}
.phone-block {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  .phone-value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F9F9FC;
    border-radius: 6px;
    padding: 8px;
    line-height: 20px;
    @include inter(13px, 500);

    img {
      cursor: pointer;
    }
  }
}
.phone-read {
  ::v-deep(input) {
    background: #F9F9FC;
  }
  ::v-deep(.b-input__wrapper) {
    border: none;
  }
}
</style>
