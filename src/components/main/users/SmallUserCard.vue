<template>
  <div :class="['b-small-player-card', { inactive: !dataPlayer.isActive }]">
    <div class="b-small-player-card__left-side">
      <div class="b-small-player-card__picture">
        <userAvatar
          :border="true"
          :link="dataPlayer.profile.avatar_url"
          :full-name="`${dataPlayer.profile.last_name} ${dataPlayer.profile.name}`"
          @clickByAvatar="goToUserProfile(dataPlayer.id)"
        />
      </div>
      <div class="b-small-player-card__name-duty">
        <div class="b-small-player-card__name">
          {{ dataPlayer.profile.last_name }} {{ dataPlayer.profile.name }}
        </div>
        <div class="b-small-player-card__duty">
          {{ dataPlayer.duty }}
        </div>
      </div>
    </div>
    <div class="b-small-player-card__right-side">
      <div
        class="b-small-player-card__status"
      >
        {{ dataPlayer.profile.position ? $t(`hashtags.${dataPlayer.profile.position}`) : '----' }}
      </div>
      <div class="b-small-player-card__icon">
        <img :src="dataPlayer.emoji" alt="" />
      </div>
    </div>
  </div>
</template>

<script>


 import userAvatar from '@sharedComponents/userAvatar/UserAvatar.vue';

import { ROUTES } from '@routes/router.const';

export default {
  components: {
    userAvatar,
  },
  props: {
    dataPlayer: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const router = useRouter();

    const goToUserProfile = (userId) => {
      router.push(ROUTES.APPLICATION.USERS.GET_ONE.absolute(userId));
    };

    return {
      goToUserProfile,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-dfdeed: #dfdeed;

.b-small-player-card {
  padding: 14px 20px;
  width: 48%;
  border: 1px solid $color-dfdeed;
  border-radius: 4px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: $--b-main-black-color;

  @include tabletAndMobile {
    width: 100%;
  }
  &.inactive {
    font-size: 13px;
    color: $--b-main-gray-color;
  }
  .b-small-player-card__left-side {
    display: flex;
    align-items: center;
    .b-small-player-card__picture {
      margin-right: 16px;
      cursor: pointer;

      .b-small-player-card__avatar {
        min-width: 32px;
        max-width: 32px;
        height: 32px;
      }
    }
    .b-small-player-card__name-duty {
      .b-small-player-card__duty {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: $--b-main-gray-color;
      }

      .b-small-player-card__name {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: $--b-main-black-color;
      }
    }
  }
  .b-small-player-card__right-side {
    display: flex;
    align-items: center;
    .b-small-player-card__status {
      margin-right: 50px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: $--b-main-black-color;
    }
    .b-small-player-card__inactive {
      margin-right: 24px;
    }
  }
}
</style>
