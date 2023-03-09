<template>
  <div class="b-invited-users-list-modal__wrapper">
    <div class="b-invited-users-list__modal-window">
      <InvitedUsersList
        :invitedUsers="invitedUsers"
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
import InvitedUsersList from '../manage-event-components/InvitedUsersList.vue';

import closeArrowUpIcon from '../../assets/img/close-arrow-up.svg'

export default {
  setup() {
    return {};
  },
  props: {
    invitedUsers: {
        type: Array,
        default: () => []
    }
  },
  components: {
    InvitedUsersList,
  },
  emits: [
    'removeInvitedUser',
    'closeModal'
  ],
  setup(_, { emit }) {
    const removeInvitedUser = (userId) => {
        emit('removeInvitedUser', userId)
    }

    return {
        removeInvitedUser,
        closeArrowUpIcon,
    }
  }
};
</script>

<style lang="scss" scoped>
.b-invited-users-list-modal__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 37, 65, 0.2);
  z-index: 999;
  .b-invited-users-list__modal-window {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 2px 2px 10px rgb(56 56 251 / 10%);
    border-radius: 6px;
    background: #F9F9FC;
    height: 500px;
    border-radius: 15px 15px 0px 0px;
    padding: 12px 16px;
  }

  ::v-deep(.b-manage-event__invited-user) {
    border: none;
    background-color: $--b-main-white-color;
  }
}
</style>
