<template>
  <Teleport v-if="isInvitedUsersListModalOpened" to="body">
    <InvitedUsersListModal
      :invitedUsers="invitedUsers"
      @closeModal="closeInvitedUsersListModal"
      @removeUser="removeInvitedUser"
    />
  </Teleport>
  <Teleport v-if="isSubmitModalOpened" to="body">
    <SubmitModal
      v-if="isSubmitModalOpened"
      :config="submitModalConfig"
      @cancelInvites="$emit('closeModal')"
      @closeModal="closeSubmitModal"
    />
  </Teleport>
  <div class="b-invite-users-to-event-modal__wrapper">
    <div class="b-invite-users-to-event-modal__modal-window">
      <div class="b-invite-users-to-event-modal__header">
        <img
          class="b-invite-users-to-event-modal__close"
          src="@images/cross.svg"
          alt=""
          @click="closeModal"
        />
        <div class="b-invite-users-to-event-modal__title">
          {{ $t('modals.invite_users_to_event.title') }}
        </div>
      </div>
      <div class="b-invite-users-to-event-modal__main-side">
        <div
          v-if="invitedUsers.length"
          class="b-invite-users-to-event-modal__invited-users-block"
        >
          <div class="b-invited-users-block__title">
            {{ $t('modals.invite_users_to_event.invited') }}
          </div>
          <div class="b-invited-users-block__avatars-list-block">
            <div class="b-invited-users-block__avatars-list">
              <div
                v-for="user in invitedUsers.slice(0, showUserAvatarCount)"
                :style="`margin-left: ${
                  user.id !== invitedUsers[0]?.id ? -12 : 0
                }px`"
              >
                <userAvatar
                  :link="user.profile.avatar_url"
                  :avatarType="'small-circle'"
                  :full-name="`${user.profile.last_name} ${user.profile.name}`"
                />
              </div>
            </div>
            <div
              v-if="invitedUsers.length > showUserAvatarCount"
              class="b-invited-users-block__plus-users"
              @click="showInvitedUsersListModal"
            >
              {{
                $t('modals.invite_users_to_event.plus_users', {
                  count: plusUsersCount,
                })
              }}
            </div>
          </div>
        </div>
        <div class="b-invite-users-to-event-modal__send-invite-block">
          <MainInput
            :placeholder="$t('events.search-users')"
            inputMode="search"
            :title-width="0"
            v-model="searchValue"
            :icon="SearchIcon"
            name="user_search"
          />
        </div>
        <SearchBlockAll
          :usersList="relevantUsersList"
          :loading="loading"
          :itemDisabledText="$t('events.invited')"
          :disabladUsersIDSList="invitedUsersIDS"
          @item-list-click="inviteUserToTheEvent"
          @item-image-click="openUserProfile"
        />
      </div>
      <div class="b-invite-users-to-event-modal__bottom-side">
        <WhiteBtn
          :text="$t('buttons.cancel')"
          :width="73"
          :height="24"
          :mainColor="'#575775'"
          :isBorder="false"
          @click-function="closeModal"
        />
        <GreenBtn
          v-if="invitedUsers.length"
          :text="$t('buttons.invite')"
          :width="115"
          :height="32"
          @click-function="$emit('inviteUsers', invitedUsersIDS)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import SearchBlockAll from '@mainComponents/header/SearchBlockAll.vue';
import MainInput from '@sharedComponents/input/MainInput.vue';
import userAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';
import WhiteBtn from '@sharedComponents/button/WhiteBtn.vue';
import InvitedUsersListModal from './InvitedUsersListModal.vue';
import SubmitModal from '@sharedComponents/modals/SubmitModal.vue';

import { API } from '@workers/api-worker/api.worker';
import { useUserDataStore } from '@/stores/userData';

import SearchIcon from '@images/search.svg';

export default {
  components: {
    SearchBlockAll,
    MainInput,
    userAvatar,
    GreenBtn,
    InvitedUsersListModal,
    WhiteBtn,
    SubmitModal,
  },
  props: {
    eventData: {
      type: Object,
      required: true,
    },
  },
  emits: ['closeModal', 'inviteUsers'],
  setup(props, { emit }) {
    const showUserAvatarCount = ref(5);
    const invitedUsers = ref([]);
    const relevantUsersList = ref([]);
    const { t } = useI18n();
    const loading = ref(false);
    const isInvitedUsersListModalOpened = ref(false);
    const userStore = useUserDataStore();
    const searchValue = ref('');
    const isSubmitModalOpened = ref(false);
    let searchTimeout;

    const invitedUsersIDS = computed(() => {
      return invitedUsers.value.map((user) => user.id);
    });

    const plusUsersCount = computed(() => {
      return invitedUsers.value.length - showUserAvatarCount.value;
    });

    const submitModalConfig = computed(() => {
      return {
        title: t('modals.cancel_invite_users.title'),
        description: t('modals.cancel_invite_users.main-text', {
          count: invitedUsers.value.length,
        }),
        button_1: t('modals.cancel_invite_users.button-1-text'),
        button_2: t('modals.cancel_invite_users.button-2-text'),
        left_btn_action: 'closeModal',
        right_btn_action: 'cancelInvites',
        btn_with_1: 130,
        btn_with_2: 110,
      };
    });

    const SKIPIDS = [
      props.eventData.author?.id
        ? props.eventData.author.id
        : userStore.user.id,
      ...(props.eventData.current_users?.map((user) => user.id) ?? []),
      ...(props.eventData.current_fans?.map((fan) => fan.id) ?? []),
    ];

    const showInvitedUsersListModal = () => {
      isInvitedUsersListModalOpened.value = true;
    };

    const closeInvitedUsersListModal = () => {
      isInvitedUsersListModalOpened.value = false;
    };

    const showSubmitModal = () => {
      isSubmitModalOpened.value = true;
    };

    const closeSubmitModal = () => {
      isSubmitModalOpened.value = false;
    };

    const getRelevantUsers = async (options) => {
      loading.value = true;
      let response = await API.UserService.getRelevantUsers({
        search: options?.search,
        skipids: options?.skipids,
      });
      relevantUsersList.value = response.data.results;
      loading.value = false;
    };

    const inviteUserToTheEvent = (user_id, user_data) => {
      invitedUsers.value.push(user_data);
    };

    const searchRelevantUsers = (searchValue) => {
      clearTimeout(searchTimeout);
      loading.value = true;
      const relevantSearch = () => {
        getRelevantUsers({ search: searchValue, skipids: SKIPIDS });
      };
      searchTimeout = setTimeout(relevantSearch, 500);
    };

    const closeModal = () => {
      if (!invitedUsers.value.length) {
        emit('closeModal');
      } else {
        showSubmitModal();
      }
    };

    getRelevantUsers({ skipids: SKIPIDS });

    const removeInvitedUser = (user_id) => {
      invitedUsers.value = invitedUsers.value.filter(function (item) {
        return item.id !== user_id;
      });
    };

    watch(
      () => searchValue.value,
      () => {
        searchRelevantUsers(searchValue.value);
      }
    );

    watch(
      () => invitedUsers.value,
      () => {
        if (!invitedUsers.value.length) {
          closeInvitedUsersListModal();
        }
      }
    );

    return {
      SearchIcon,
      loading,
      relevantUsersList,
      invitedUsersIDS,
      searchValue,
      invitedUsers,
      plusUsersCount,
      isInvitedUsersListModalOpened,
      showUserAvatarCount,
      isSubmitModalOpened,
      submitModalConfig,
      closeModal,
      closeSubmitModal,
      inviteUserToTheEvent,
      removeInvitedUser,
      closeInvitedUsersListModal,
      showInvitedUsersListModal,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-efeff6: #efeff6;

:deep(.b-avatar) {
  border: 1.5px solid #efeff6;
}
.b-invite-users-to-event-modal__wrapper {
  @include modal-wrapper;

  .b-invite-users-to-event-modal__modal-window {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    width: 385px;
    transform: translate(-50%, -50%);
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    background: $--b-main-white-color;
    padding: 20px 20px 28px 24px;
    overflow: scroll;

    .b-invite-users-to-event-modal__header {
      .b-invite-users-to-event-modal__close {
        position: absolute;
        right: 20px;
        cursor: pointer;
      }

      .b-invite-users-to-event-modal__title {
        @include exo(22px, 700);
        line-height: 32px;
      }
    }
    .b-invite-users-to-event-modal__main-side {
      margin-top: 16px;

      .b-invite-users-to-event-modal__invited-users-block {
        .b-invited-users-block__title {
          @include inter(12px, 400, $--b-main-gray-color);
          line-height: 20px;
        }
        .b-invited-users-block__avatars-list-block {
          display: flex;
          align-items: center;
          gap: 12px;
          .b-invited-users-block__avatars-list {
            display: flex;
            align-items: center;
            margin: 8px 0px 16px 0px;
          }
          .b-invited-users-block__plus-users {
            @include inter(12px, 400, $--b-main-gray-color);
            line-height: 20px;
            padding: 0px 0px 2px;
            border-bottom: 1px dashed $--b-main-gray-color;
            cursor: pointer;
          }
        }
      }
    }
    .b-invite-users-to-event-modal__bottom-side {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 28px;
    }
  }
}
</style>
