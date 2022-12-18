<template>
  <div class="second-step">
    <div class="title-block">
      <span>{{ $t('events.confidentiality') }}</span>
      <div class="vip-only">{{ $t('events.vip-only') }}</div>
    </div>
    <div class="subtitle">
      {{ $t('events.agree-to-get-requests') }}
    </div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <input
          id="radio-3"
          v-model="isOpened"
          name="openness"
          type="radio"
          :value="$t('events.join')"
          checked
        />
        <label for="radio-3" class="radio-label">
          <img src="../../assets/img/lock-closed.svg" alt="" />
          {{$t('events.free')}}
        </label>
      </div>
      <div class="radio">
        <input
          id="radio-4"
          v-model="isOpened"
          name="openness"
          type="radio"
          :value="$t('events.apply')"
        />
        <label for="radio-4" class="radio-label">
          <img src="../../assets/img/lock-opened.svg" alt="" />
          {{ $t('events.closed') }}
        </label>
      </div>
    </div>
    <div class="title">{{ $t('events.is-event-free') }}</div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <input
          id="radio-5"
          v-model="payment"
          name="payment"
          type="radio"
          :value="$t('events.for-free')"
          checked
        />
        <label for="radio-5" class="radio-label"> {{ $t('events.for-free') }} </label>
      </div>
      <div class="radio">
        <input
          id="radio-6"
          v-model="payment"
          name="payment"
          type="radio"
          :value="$t('events.payed')"
        />
        <label for="radio-6" class="radio-label"> {{ $t('events.payed') }} </label>
      </div>
    </div>
    <div v-if="payment === $t('events.payed')" class="input">
      <InputComponent
        :outside-title="true"
        :title="$t('events.payed')"
        :placeholder="'45₴'"
        :title-width="0"
      />
    </div>
    <div class="contact-switcher">
      <span>{{$t('events.show-my-contacts')}}</span>
      <Switcher :id="'contacts'" />
    </div>
    <div class="input">
      <InputComponent
        :placeholder="'+38 025 67 98'"
        :title-width="0"
        :icon="icons.arrow"
      />
    </div>
    <div class="title">{{$t('events.invite-users')}}</div>
    <div class="input">
      <InputComponent
        :placeholder="$t('events.search-users')"
        :title-width="30"
        :icon-left="icons.addUser"
        :icon="icons.search"
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

import InputComponent from '../forms/InputComponent.vue'
import Switcher from '../../components/Switcher.vue'
import SearchBlockAll from '../SearchBlockAll.vue'

import HorizontalArrow from '../../assets/img/sort-arrows-horizontal.svg'
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
  },
  components: {
    InputComponent,
    Switcher,
    SearchBlockAll
  },
  emit: ['choseCategory'],
  setup(props, { emit }) {
    const isOpened = ref(null)
    const payment = ref(null)

    const icons = computed(() => {
      return {
        arrow: HorizontalArrow,
        addUser: AddUser,
        search: Search,
        plus: PlusIcon
      }
    })

    watch(isOpened, (newVal, oldVal) => {
      if (!(newVal === oldVal)) {
        emit('setEventData', 'isOpened', newVal)
      }
    })
    watch(payment, (newVal, oldVal) => {
      if (!(newVal === oldVal)) {
        emit('setEventData', 'payment', newVal)
      }
    })

    return {
      isOpened,
      payment,
      icons
    }
  },
}
</script>

<style lang="scss" scoped>
.second-step {
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
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 6px 12px;
      background: #ffffff;
      border: 1px solid #dfdeed;
      border-radius: 6px;
      min-width: 154px;
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
    .vip-only {
      width: 93px;
      height: 20px;
      background: #efeff6;
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