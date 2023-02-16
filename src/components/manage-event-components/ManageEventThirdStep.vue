<template>
  <div class="third-step" :style="stepStyle">
    <div class="title-block">
      <span>{{ $t('events.additional-info') }}</span>
    </div>
    <div class="subtitle">
      {{ $t('events.add-comment') }}
    </div>
    <TextAreaComponent
      :placeholder="$t('events.event-description')"
      :height="92"
      name="description"
    />
    <div class="contact-switcher">
      <span class="title">{{ $t('events.show-my-contacts') }}</span>
      <Switcher
        :id="'contacts'"
        :is-edit-mode="true"
        name="is_phone_shown"
        @get-value="showHidePhone"
      />
    </div>
    <div class="input" v-show="isPhoneShown">
      <InputComponent
        :placeholder="userPhoneNumber"
        :title-width="0"
        name="contact_number"
        v-maska="'+38 (0##) ### ## ##'"
      >
      </InputComponent>
    </div>

    <div class="prize-switcher">
      <div class="title title-margin">
      Чи буде розіграно приз? <span>ViP</span>
    </div>
      <Switcher
        :is-edit-mode="false"
        name="is_prize"
        @get-value="showHidePhone"
      />
    </div>

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
    <div v-if="needForm !== null" class="forms-block"
      @click="openSelectFormsModal">
      <div class="forms-select-form">
        <span>Призначте кольори форми команд</span>
        <img src="../../assets/img/set-filter.svg" alt="">
      </div>
      <SelectionSuitModal 
        v-if="false"
        :selectedCategory="selectedFormType"
        @closeModal="closeSelectFormsModal"/>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import { useUserDataStore } from '../../stores/userData'

import Switcher from '../../components/Switcher.vue'
import RadioButton from '../../components/forms/RadioButton.vue'
import SelectionSuitModal from '../suit/SelectionSuitModal.vue'
import InputComponent from '../../components/forms/InputComponent.vue'
import TextAreaComponent from '../TextAreaComponent.vue'

import AimIcon from '../../assets/img/aim.svg'

export default {
  name: 'ManageEventThirdStep',
  components: {
    Switcher,
    InputComponent,
    RadioButton,
    TextAreaComponent,
    SelectionSuitModal,
  },
  props: {
    currentStep: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const isPhoneShown = ref(false)
    const store = useUserDataStore()
    const userPhoneNumber = computed(() => store.getUserPhone)
    const needForm = ref(null)
    const selectedFormType = ref('')
    const isSelectFormColarModalOpened = ref(false)

    const icons = computed(() => {
      return {
        aim: AimIcon,
      }
    })

    function showHidePhone(val) {
      isPhoneShown.value = val
    }

    const selectForms = (value) => {
      needForm.value = value
      if (value) {
        selectedFormType.value = 'T-Shirt'
      } else if (!value) {
        selectedFormType.value = 'Shirt-Front'
      }
    }

    const openSelectFormsModal = () => {
      isSelectFormColarModalOpened.value = true
    }

    const closeSelectFormsModal = () => {
      debugger
      isSelectFormColarModalOpened.value = false
    }


    const stepStyle = computed(() => {
      return props.currentStep === 3 ? { height: 'auto' } : { height: '0px' }
    })

    return {
      icons,
      stepStyle,
      needForm,
      userPhoneNumber,
      isSelectFormColarModalOpened,
      isPhoneShown,
      selectedFormType,
      showHidePhone,
      selectForms,
      openSelectFormsModal,
      closeSelectFormsModal,
    }
  },
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
    margin-bottom: 8px;
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #262541;
  }
  .title-margin {
    margin-top: 20px;
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

    span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      padding: 0px 4px;
      background: #EFEFF6;
      border-radius: 4px;
  }
}
.forms-block {
  .forms-select-form {
    border: 1px solid #DFDEED;
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
      color: #262541;
    }
  }
}
</style>
