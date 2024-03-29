<template>
  <div class="second-step">
    <div class="title-block">
      <span>{{ $t('events.confidentiality') }}</span>
    </div>
    <div class="subtitle">
      {{ $t('events.agree-to-get-requests') }}
    </div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <radio-button
          name="privacy"
          :title="$t('events.join-free')"
          :value="false"
          :width="'auto'"
        ></radio-button>
      </div>
      <div class="radio">
        <radio-button
          name="privacy"
          :title="$t('events.closed')"
          :value="true"
          :width="'auto'"
        ></radio-button>
      </div>
    </div>
    <div class="title">{{ $t('events.is-event-free') }}</div>
    <div class="radio-btn-wrapper">
      <div class="radio">
        <radio-button
          name="is_price"
          :title="$t('events.for-free')"
          :value="false"
          :width="'auto'"
          @get-radio-value="toggleEventPayment"
        ></radio-button>
      </div>
      <div class="radio">
        <radio-button
          name="is_price"
          :title="$t('events.payed')"
          :value="true"
          :width="'auto'"
          @get-radio-value="toggleEventPayment"
        ></radio-button>
      </div>
    </div>
    <div v-if="isEventPayment" class="input enter-sum-input">
      <MainInput
        :outside-title="true"
        :swipeTitle="false"
        :title="$t('events.enter-sum')"
        inputMode="numeric"
        :placeholder="'45₴'"
        v-maska="'#####'"
        :title-width="0"
        name="price"
      />
    </div>
    <div v-if="isEventPayment" class="input describe-sum-input">
      <mainTextArea
        :outside-title="true"
        :title="$t('events.describe-sum')"
        :height="80"
        :title-width="0"
        :maxTextValue="265"
        name="price_description"
      />
    </div>
    <div class="title">{{ $t('events.invite-users') }}</div>
    <div class="subtitle">{{ $t('events.enter-amount-members') }}</div>
    <div class="input">
      <MainInput
        :placeholder="$t('events.max-50')"
        inputMode="numeric"
        v-maska="'##'"
        :icon="icons.users"
        :title-width="0"
        name="amount_members"
      />
    </div>
    <div class="input">
      <MainInput
        :placeholder="$t('events.search-users')"
        inputMode="search"
        :title-width="30"
        v-model="searchValue"
        :icon-left="icons.addUser"
        :icon="icons.search"
        name="user_search"
      />
    </div>
    <SearchBlockAll
      :usersList="filteredUsersList"
      :loading="loading"
      :itemIcon="icons.plus"
      :itemDisabledText="$t('events.invited')"
      :disabladUsersIDSList="invitedUsersIDS"
      @item-list-click="inviteUser"
      @item-image-click="openUserProfile"
    />
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';

import MainInput from '../../shared/input/MainInput.vue';
import mainTextArea from '../../shared/textArea/MainTextArea.vue';
import switcher from '../../shared/switcher/Switcher.vue';
import SearchBlockAll from '../../SearchBlockAll.vue';
import radioButton from '../../shared/radioButton/RadioButton.vue';

import { ROUTES } from '../../../router/router.const';

import HorArrow from '../../../assets/img/sort-arrows-down.svg';
import AddUser from '../../../assets/img/add-user.svg';
import Users from '../../../assets/img/members.svg';
import Search from '../../../assets/img/search.svg';
import PlusIcon from '../../../assets/img/gray-plus.svg';

export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    filteredUsersList: {
      type: Array,
      default: () => [],
    },
    filterUsersListLoading: {
      type: Boolean,
      default: false,
    },
    invitedUsersList: {
      type: Array,
      default: () => [],
    },
    initialValues: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    MainInput,
    switcher,
    SearchBlockAll,
    radioButton,
    mainTextArea,
  },

  setup(props, { emit }) {
    const isEventPayment = ref(props.initialValues.is_price);
    const searchValue = ref('');
    const router = useRouter();
    const loading = ref(props.filterUsersListLoading);

    const invitedUsersIDS = computed(() => {
      return props.invitedUsersList.map((user) => user.id);
    });

    const inviteUser = (user_id, user_data) => {
      emit('invite-user', user_data);
    };

    watch(
      () => props.filterUsersListLoading,
      (newData, oldData) => {
        loading.value = newData;
      }
    );

    watch(
      () => searchValue.value,
      () => {
        emit('searchUsers', searchValue.value);
      }
    );

    const icons = computed(() => {
      return {
        arrow: HorArrow,
        addUser: AddUser,
        search: Search,
        plus: PlusIcon,
        users: Users,
      };
    });


    const openUserProfile = (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId));
    };

    function toggleEventPayment(val) {
      isEventPayment.value = val ? true : false;

      if (!isEventPayment.value) {
        emit('changedEventPrivacyToFree');
      }
    }

    return {
      icons,
      isEventPayment,
      searchValue,
      loading,
      invitedUsersIDS,
      toggleEventPayment,
      openUserProfile,
      inviteUser,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f4f4f4: #f4f4f4;

.second-step {
  overflow: scroll;
  .input {
    width: 100%;
    margin-top: 16px;
  }
  .enter-sum-input {
    margin-bottom: 35px;
  }

  .describe-sum-input {
    margin-bottom: 10px;
  }
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
      :deep {
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
    color: $--b-main-black-color;
    margin-bottom: 20px;
  }
  .title {
    margin-top: 20px;
    margin-bottom: 8px;
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: $--b-main-black-color;
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
      color: $--b-main-black-color;
    }
  }
}
</style>
