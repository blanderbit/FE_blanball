<template>
  <div class="c-no-schduled-events">
    <img src="../../../assets/img/info-black.svg" alt="" />
    <span v-if="userStore.user.id === userData.id">{{
      $t('scheduler.no-scheduled-events-me')
    }}</span>
    <span v-else>{{
      $t('scheduler.no-scheduled-events-friend', { fullName: userFullName })
    }}</span>
  </div>
  <GreenBtn
    :text="$t('player_page.invite')"
    :icon="icons.inviteToEvent"
    :height="32"
    :width="206"
  />
</template>

<script>
import { computed } from 'vue';

import GreenBtn from '../../shared/button/GreenBtn.vue';

import { useUserDataStore } from '../../../stores/userData';

import inviteToEventIcon from '../../../assets/img/add-user-white.svg';

export default {
  components: {
    GreenBtn,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const userStore = useUserDataStore();
    const userFullName = computed(() => {
      return `${props.userData.profile.name} ${props.userData.profile.last_name}`;
    });

    const icons = computed(() => {
      return {
        inviteToEvent: inviteToEventIcon,
      };
    });

    return {
      userFullName,
      userStore,
      icons,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-no-schduled-events {
  padding: 8px;
  background: #f9f9fc;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0px;

  span {
    @include inter(14px, 400);
    line-height: 20px;
  }
}
</style>
