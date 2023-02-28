<template>
  <div class="b-security">
    <div class="b-security__confidentiality">
      <div class="b-security__title">
        {{ $t('profile.confidentiality') }}
      </div>
      <div class="b-security__subtitle">
        {{ $t('profile.set-personal-details') }}
      </div>
      <div class="b-security__settings-block">
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.phone-number') }}</p>
          <Switcher
            :id="'phone'"
            :is-edit-mode="isEditMode"
            name="config_phone"
          />
        </div>
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.e-mail') }}</p>
          <Switcher
            :id="'email'"
            :is-edit-mode="isEditMode"
            name="config_email"
          />
        </div>
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.my-feedbacks') }}</p>
          <Switcher
            :id="'feedback'"
            :is-edit-mode="isEditMode"
            name="show_reviews"
          />
        </div>
        <!-- <div class="b-security__personal-settings">
          <p>{{ $t('profile.planed-events') }}</p>
          <Switcher
            :id="'events'"
            :is-edit-mode="isEditMode"
            name="planned_events"
          />
        </div> -->
      </div>
    </div>
    <div class="b-security__top-table">
      <div class="b-security__title">
        {{ $t('profile.safety') }}
      </div>
      <div class="b-security__subtitle-security">
        {{ $t('profile.change-login&password') }}
      </div>
      <div class="b-security__email-input">
        <InputComponent
          :title="$t('profile.e-mail')"
          :placeholder="userEmail"
          :isDisabled="true"
          :title-width="0"
          :outside-title="true"
          :icon="sortArrowHorizontal"
          @icon-click="toggleModalWindow('email')"
          name="change_email"
        />
      </div>
      <div
        class="b-security__change-pass-btn"
        @click="toggleModalWindow('change_password')"
      >
        <span>{{ $t('profile.change-password') }}</span>
        <img src="../assets/img/lock.svg" alt="" />
      </div>
    </div>
    <div
      class="b-security__delete-account"
      @click="toggleModalWindow('delete_acc')"
    >
      {{ $t('profile.delete-account') }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

import Switcher from '../components/Switcher.vue'
import sortArrowHorizontally from '../assets/img/sort-arrows-horizontal.svg'
import InputComponent from './forms/InputComponent.vue'

export default {
  name: 'SecurityBlock',
  components: {
    Switcher,
    InputComponent,
  },
  props: {
    userEmail: {
      type: String,
      default: '',
    },
    checkboxData: {
      type: Object,
      default: () => {},
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggleModal'],
  setup(props, context) {
    const checkboxForm = ref(null)

    const sortArrowHorizontal = computed(() => sortArrowHorizontally)

    function toggleModalWindow(val) {
      context.emit('toggleModal', val)
    }

    return {
      toggleModalWindow,
      sortArrowHorizontal,
      checkboxForm,
    }
  },
}
</script>

<style lang="scss" scoped>
.b-security {
  background: #ffffff;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 8px;
  padding: 20px 16px;
  height: fit-content;

  @media (max-width: 768px) {
    box-shadow: none;
  }

  .b-security__email-input {
    height: 40px;
    margin-bottom: 12px;
    margin-top: 20px;
  }
  .b-security__confidentiality {
    .b-security__title {
      margin-bottom: 4px;
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: $--b-main-black-color;
    }
    .b-security__subtitle {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: $--b-main-gray-color;
    }
    .b-security__settings-block {
      padding-top: 8px;
      padding-bottom: 8px;
      margin-top: 20px;
      border-top: 1px solid #dfdeed;
      .b-security__personal-settings {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: $--b-main-black-color;
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .b-security__top-table {
    .b-security__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: $--b-main-black-color;
    }
    .b-security__subtitle-security {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: $--b-main-gray-color;
    }
    .b-security__change-pass-btn {
      padding-left: 16px;
      padding-right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      background: #d3f8f7;
      border-radius: 6px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #148783;
      cursor: pointer;
      margin-bottom: 16px;
    }
  }
  .b-security__delete-account {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    text-decoration-line: underline;
    color: $--b-main-gray-color;
    text-align: right;
    cursor: pointer;
  }
}
</style>
