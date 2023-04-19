<template>
  <div class="b-preview-invited-users-list-modal__wrapper">
    <div class="b-preview-invited-users-list__modal-window">
      <InvitedUsersList
        :invitedUsers="invitedUsers"
        :acceptedUsers="acceptedUsers"
        :title="$t('events.invited-members')"
        :removeAllOption="false"
        :headerIcon="closeArrowUpIcon"
        @headerIconClick="$emit('closeModal')"
        @removeInvitedUser="removeInvitedUser"
      />
    </div>
  </div>
</template>

<script>
import InvitedUsersList from '../../manageEvent/InvitedUsersList.vue';

import closeArrowUpIcon from '../../../../assets/img/close-arrow-up.svg';

export default {
  setup() {
    return {};
  },
  props: {
    invitedUsers: {
      type: Array,
      default: () => [],
    },
    acceptedUsers: {
      type: Array,
      default: () => [],
    },
    manageAction: {
      type: String,
      default: '',
    },
  },
  components: {
    InvitedUsersList,
  },
  emits: ['removeInvitedUser', 'closeModal'],
  setup(props, { emit }) {
    const removeInvitedUser = (userId) => {
      emit('removeInvitedUser', userId);
    };

    return {
      removeInvitedUser,
      closeArrowUpIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-f9f9fc: #f9f9fc;

.b-preview-invited-users-list-modal__wrapper {
  @include modal-wrapper;
  .b-preview-invited-users-list__modal-window {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    background: $color-f9f9fc;
    height: 500px;
    border-radius: 15px 15px 0px 0px;
    padding: 12px 16px;
  }

  :deep(.b-manage-event__invited-user) {
    border: none;
    background-color: $--b-main-white-color;
  }
}
</style>
