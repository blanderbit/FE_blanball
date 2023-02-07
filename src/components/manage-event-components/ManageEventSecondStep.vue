<template>
  <div class="second-step" :style="stepStyle">
    <div class="title-block">
      <span>{{ $t('events.confidentiality') }}</span>
    </div>
    <div class="subtitle">
      {{ $t('events.agree-to-get-requests') }}
    </div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <radio-button
          :title="$t('events.free')"
          value="true"
          :width="'auto'"
          :is-disabled="true"
        ></radio-button>
      </div>
      <div class="radio">
        <radio-button
          :title="$t('events.closed')"
          value="false"
          :width="'auto'"
          :is-disabled="true"
        ></radio-button>
      </div>
    </div>
    <div class="title">{{ $t('events.is-event-free') }}</div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <radio-button
          name="is_price"
          :title="$t('events.for-free')"
          value="false"
          :width="'auto'"
          @get-radio-value="getRadioValue"
        ></radio-button>
      </div>
      <div class="radio">
        <radio-button
          name="is_price"
          :title="$t('events.payed')"
          value="true"
          :width="'auto'"
          @get-radio-value="getRadioValue"
        ></radio-button>
      </div>
    </div>
    <div v-show="isEventPayment" class="input">
      <InputComponent
        :outside-title="true"
        :title="$t('events.payed')"
        :placeholder="'45₴'"
        :title-width="0"
        name="price"
      />
    </div>
    <div class="contact-switcher">
      <span>{{ $t('events.show-my-contacts') }}</span>
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
      >
      </InputComponent>
    </div>
    <div class="title">{{ $t('events.invite-users') }}</div>
    <div class="input">
      <InputComponent
        :placeholder="$t('events.search-users')"
        :title-width="30"
        :icon-left="icons.addUser"
        :icon="icons.search"
        name="user_search"
      />
    </div>

    <SearchBlockAll
      :tags="tags"
      :filtered-teams="filteredTeams"
      :list-item-icon="icons.plus"
      @chose-tab-category="$emit('choseCategory')"
      @item-list-click="inviteUser"
    />
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useUserDataStore } from '../../stores/userData'

import InputComponent from '../forms/InputComponent.vue'
import Switcher from '../../components/Switcher.vue'
import SearchBlockAll from '../SearchBlockAll.vue'
import RadioButton from '../forms/RadioButton.vue'

import HorArrow from '../../assets/img/sort-arrows-down.svg'
import AddUser from '../../assets/img/add-user.svg'
import Search from '../../assets/img/search.svg'
import PlusIcon from '../../assets/img/plus.svg'

export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    filteredTeams: {
      type: Array,
      default: () => [],
    },
    currentStep: {
      type: Number,
      default: null,
    },
  },
  components: {
    InputComponent,
    Switcher,
    SearchBlockAll,
    RadioButton,
  },
  emit: ['choseCategory'],
  setup(props, { emit }) {
    const store = useUserDataStore()
    const isEventPayment = ref(false)
    const isPhoneShown = ref(false)

    const icons = computed(() => {
      return {
        arrow: HorArrow,
        addUser: AddUser,
        search: Search,
        plus: PlusIcon,
      }
    })

    const userPhoneNumber = computed(() => store.getUserPhone)

    const stepStyle = computed(() => {
      return props.currentStep === 2 ? { height: 'auto' } : { height: '0px' }
    })

    function getRadioValue(val) {
      isEventPayment.value = val === 'true' ? true : false
    }

    function showHidePhone(val) {
      isPhoneShown.value = val
    }

    return {
      icons,
      isEventPayment,
      stepStyle,
      isPhoneShown,
      userPhoneNumber,
      showHidePhone,
      getRadioValue,
    }
  },
}
</script>

<style lang="scss" scoped>
.second-step {
  overflow: hidden;
  .input {
    width: 100%;
    height: 40px;
    margin-top: 16px;
  }
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
      color: #7f7db5;
    }
  }
  .subtitle {
    margin-top: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #7f7db5;
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
  .contact-switcher {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 8px;
    span {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #262541;
    }
  }
}
</style>
