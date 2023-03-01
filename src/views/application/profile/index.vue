<template>
  <ChangeEmailModal
    v-if="isChangeEmailModalActive"
    :user-email="userData.email"
    @closeModal="closeModals"
  />

  <DeleteAccountModal
    v-if="isDeleteAccountModalActive"
    :user-email="userData.email" 
    @closeModal="closeModals" 
  />

  <ChangePasswordModal
    v-if="isChangePasswordModalActive"
    :user-email="userData.email" 
    @closeModal="closeModals" 
  />

  <div class="b-profile">
    <div class="b-profile__header">
      <div class="b-profile__titles-block">
        <div class="b-profile__title">
          {{ $t('profile.title') }}
        </div>
        <div class="b-profile__subtitle">
          {{ $t('profile.subtitle') }}
        </div>
      </div>
      <div class="b-profile__tabs-block">
        <div
          v-for="tab in mockData.tabs"
          :key="tab.id"
          :class="[
            'b-profile__tab',
            { active: tab.isActive, disabled: tab.isDisabled },
          ]"
        >
          <img :src="tab.img" :alt="tab.name" />
          <span
            @mouseenter="hoverTab(tab.isDisabled)"
            @mouseleave="hoverTab(tab.isDisabled)"
            >{{ $t(tab.name) }}</span
          >
          <Transition>
            <TabLabel
              v-if="tab.isDisabled && isDisabledTabHover"
              :title="$t('profile.coming-soon-title')"
              :text="$t('profile.coming-soon-text')"
            />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { storeToRefs } from 'pinia';

import TabLabel from '../../../components/TabLabel.vue';
import DeleteAccountModal from '../../../components/ModalWindows/UserCabinetModalWindows/DeleteAccountModal.vue';
import ChangePasswordModal from '../../../components/ModalWindows/UserCabinetModalWindows/ChangePasswordModal.vue';
import ChangeUserDataModal from '../../../components/ModalWindows/UserCabinetModalWindows/ChangeUserDataModal.vue';
import ChangeEmailModal from '../../../components/ModalWindows/UserCabinetModalWindows/ChangeEmailModal.vue';

import { useUserDataStore } from '../../../stores/userData';

import CONSTANTS from '../../../consts';

export default {
  components: {
    TabLabel,
    DeleteAccountModal,
    ChangePasswordModal,
    ChangeEmailModal,
  },
  setup() {
    const route = useRoute();
    const userStore = useUserDataStore();
    const { user } = storeToRefs(userStore);
    const userData = ref(user.value);

    const isDisabledTabHover = ref(false);
    const isChangeEmailModalActive = ref(false);
    const isDeleteAccountModalActive = ref(true);
    const isChangePasswordModalActive = ref(false);
  

    const mockData = computed(() => {
      return {
        tabs: CONSTANTS.profile.tabs,
      };
    });

    const hoverTab = (isDisabled) => {
      if (isDisabled) {
        isDisabledTabHover.value = !isDisabledTabHover.value;
      }
    };

    const closeDeleteAccountModal = () => {
      isDeleteAccountModalActive.value = false;
    };
    const closeChangeEmailModal = () => {
      isChangeEmailModalActive.value = false;
    };
    const closeChangePasswordModal = () => {
      isChangePasswordModalActive.value = false
    }

    const closeModals = (modalType) => {
      switch (modalType) {
        case 'delete_acc':
          return closeDeleteAccountModal();
        case 'email':
          return closeChangeEmailModal();
         case 'change_password':
          return closeChangePasswordModal();
      }
    };

    return {
      mockData,
      isDisabledTabHover,
      isDeleteAccountModalActive,
      isChangeEmailModalActive,
      isChangePasswordModalActive,
      userData,

      hoverTab,
      closeModals,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;
$color-8a8aa8: #8a8aa8;

.b-profile {
  .b-profile__header {
    border-bottom: 1px solid $color-dfdeed;
    .b-profile__titles-block {
      display: flex;
      flex-direction: column;
      gap: 4px 4px;

      .b-profile__title {
        @include exo(22px, 700);
        line-height: 32px;
      }

      .b-profile__subtitle {
        @include inter(13px, 500, $--b-main-gray-color);
        line-height: 20px;
      }
    }
    .b-profile__tabs-block {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 30px;
      .b-profile__tab {
        @include inter(13px, 500, $--b-main-gray-color);
        line-height: 20px;
        padding: 8px 4px 12px 0px;
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        &.active {
          color: $--b-main-black-color;
          font-weight: 500;
          border-bottom: 2px solid $color-8a8aa8;
        }
        &.disabled {
          color: $--b-disabled-color;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
