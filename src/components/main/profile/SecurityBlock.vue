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
          <switcher
            :id="'phone'"
            :is-edit-mode="isEditMode"
            name="config_phone"
          />
        </div>
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.e-mail') }}</p>
          <switcher
            :id="'email'"
            :is-edit-mode="isEditMode"
            name="config_email"
          />
        </div>
        <div class="b-security__personal-settings">
          <p>{{ $t('profile.my-feedbacks') }}</p>
          <switcher
            :id="'feedback'"
            :is-edit-mode="isEditMode"
            name="show_reviews"
          />
        </div>
        <div class="b-hide-events__button">
          <MainInput
            :placeholder="'7 подій приховано'"
            :isDisabled="true"
            :title-width="0"
            :outside-title="true"
            :icon="sortArrowHorizontal"
            @click="$emit('openHideEventsModal')"
            name="change_email"
          />
        </div>
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
        <MainInput
          :title="$t('profile.e-mail')"
          inputMode="email"
          :placeholder="userEmail"
          :isReadOnly="true"
          :title-width="0"
          :swipeTitle="false"
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
        <img src="../../../assets/img/lock.svg" alt="" />
      </div>
    </div>
    <div class="b-security__delete-account">
      <span @click="toggleModalWindow('delete_acc')">
        {{ $t('profile.delete-account') }}</span
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

import switcher from '../../shared/switcher/Switcher.vue';
import sortArrowHorizontally from '../../../assets/img/sort-arrows-horizontal.svg';
import MainInput from '../../shared/input/MainInput.vue';

export default {
  name: 'SecurityBlock',
  components: {
    switcher,
    MainInput,
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
  emits: ['toggleModal', 'openHideEventsModal'],
  setup(props, context) {
    const checkboxForm = ref(null);

    const sortArrowHorizontal = computed(() => sortArrowHorizontally);

    function toggleModalWindow(val) {
      context.emit('toggleModal', val);
    }

    return {
      toggleModalWindow,
      sortArrowHorizontal,
      checkboxForm,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-d3f8f7: #d3f8f7;

.b-security {
  background: $--b-main-white-color;
  box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
  border-radius: 8px;
  padding: 20px 16px;
  height: fit-content;

  @media (max-width: 1200px) {
    box-shadow: none;
    padding: 16px 0px;
  }
  @include tabletAndMobile {
    padding: 0px 10px;
    margin-bottom: 50px;
  }
  .b-security__email-input {
    height: 40px;
    margin-bottom: 12px;
    margin-top: 20px;
  }
  .b-security__confidentiality {
    .b-security__title {
      margin-top: 12px;
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
      padding-bottom: 8px;
      margin-top: 20px;
      border-top: 1px solid $color-dfdeed;

      @include tabletAndMobile {
        border-top: none;
        margin-top: 0px;
      }

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

        @media (min-width: 768px) and (max-width: 1200px) {
          border-bottom: 1px solid $color-dfdeed;
        }

        @include tabletAndMobile {
          font-weight: 500;
        }
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
      background: $color-d3f8f7;
      border-radius: 6px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: $--b-main-green-color;
      cursor: pointer;
      margin-bottom: 16px;

      @media (max-width: 992px) {
        justify-content: center;
        gap: 12px;
      }
      @include tabletAndMobile {
        justify-content: center;
        flex-direction: row-reverse;
        gap: 12px;
      }
    }
  }
  .b-security__delete-account {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: $--b-main-gray-color;
    text-align: right;
    span {
      border-bottom: 1px solid $--b-main-gray-color;
      cursor: pointer;
    }
  }

  .b-hide-events__button {
    margin-top: 8px;

    @media (max-width: 1200px) {
      margin-top: 12px;
    }
  }
}
</style>
