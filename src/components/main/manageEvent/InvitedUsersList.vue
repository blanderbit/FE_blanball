<template>
  <div>
    <div v-if="invitedUsers.length" class="b-manage-event__invited-users__list">
      <span class="b-user-what-you__invited">
        {{ title ? title : $t('events.invited-people') }}
        <img
          v-if="headerIcon"
          :src="headerIcon"
          alt=""
          @click="$emit('headerIconClick')"
        />
      </span>
      <span
        v-if="removeAllOption"
        class="b-remove-all__invited-users"
        @click="$emit('openRemoveUsersModal')"
        >{{ $t('buttons.remove-all') }}</span
      >
      <div class="b-manage-event__invited-users">
        <div class="b-manage-event__invited-user" v-for="user in invitedUsers">
          <div class="b-manage-event__invited-user-left__side">
            <userAvatar
              class="b-invited-user__avatar"
              :link="user.profile.avatar_url"
              :avatarType="'small-square'"
              :full-name="`${user.profile.last_name} ${user.profile.name}`"
            />
            <span class="b-invited-user__position">
              {{ user.profile.position ? $t(`hashtags.${user.profile.position}`) : '----' }}
            </span>
            <span class="b-invited-user__full-name">
              {{ user.profile.last_name }} {{ user.profile.name }}
            </span>
          </div>
          <div class="b-invited-user-right__side">
            <img
              class="b-remove-invited__user"
              src="../../assets/img/gray-cross.svg"
              alt="gray-cross"
              @click="$emit('removeInvitedUser', user.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="acceptedUsers.length"
      class="b-manage-event__invited-users__list"
    >
      <span class="b-user-what-you__invited">
        {{ $t('my_events.already-accepted') }}
      </span>
      <span
        v-if="removeAllOption"
        class="b-remove-all__invited-users"
        @click="$emit('openRemoveUsersModal')"
        >{{ $t('buttons.remove-all') }}</span
      >
      <div class="b-manage-event__invited-users">
        <div class="b-manage-event__invited-user" v-for="user in acceptedUsers">
          <div class="b-manage-event__invited-user-left__side">
            <userAvatar
              class="b-invited-user__avatar"
              :link="user.profile.avatar_url"
              :avatarType="'small-square'"
              :full-name="`${user.profile.last_name} ${user.profile.name}`"
            />
            <span v-if="user.profile.position" class="b-invited-user__position">
              {{ $t(`hashtags.${user.profile.position}`) }}
            </span>
            <span class="b-invited-user__full-name">
              {{ user.profile.last_name }} {{ user.profile.name }}
            </span>
          </div>
          <div class="b-invited-user-right__side">
            <img
              class="b-remove-invited__user"
              src="../../assets/img/gray-cross.svg"
              alt="gray-cross"
              @click="$emit('removeInvitedUser', user.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import userAvatar from '../../shared/userAvatar/UserAvatar.vue';

export default {
  props: {
    invitedUsers: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
    headerIcon: {
      type: String,
      default: '',
    },
    removeAllOption: {
      type: Boolean,
      default: true,
    },
    acceptedUsers: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['removeInvitedUser', 'openRemoveUsersModal'],
  components: {
    userAvatar,
  },
};
</script>

<style lang="scss" scoped>
$color-dfdeed: #dfdeed;
$color-8a8aa8: #8a8aa8;

.b-manage-event__invited-users__list {
  overflow: auto;
  margin-top: 10px;
  position: relative;
}
.b-manage-event__invited-user {
  padding: 8px;
  border-bottom: 1px solid $color-dfdeed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:first-of-type {
    margin-top: 30px;
    border-top: 1px solid $color-dfdeed;
  }
}
.b-user-what-you__invited {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: $--b-main-black-color;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.b-manage-event__invited-user-left__side {
  display: flex;
  align-items: center;
  gap: 8px;
}
.b-invited-user__avatar {
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  border-radius: 4px;
}
.b-invited-user__full-name {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: $--b-main-black-color;
}
.b-invited-user__position {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: $color-8a8aa8;
}
.b-remove-invited__user {
  cursor: pointer;
}
.b-manage-event-preview__block {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.b-remove-all__invited-users {
  position: absolute;
  right: 0;
  top: 30px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: $--b-main-gray-color;
  cursor: pointer;
}
.b-manage-event__invited-users {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
