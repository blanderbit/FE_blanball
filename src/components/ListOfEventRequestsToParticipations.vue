<template>
  <div class="b-list-of-event-requests-to-participations">
    <div class="b-list-item" v-for="request in requestsToParticipationsData">
      <div class="b-list-item-left__side">
        <div class="b-list-item__picture">
          <Avatar
            class="b-list-item__avatar"
            :border="true"
            :link="request.sender.profile.avatar_url"
            :full-name="`${request.sender.profile.name} ${request.sender.profile.last_name}`"
          ></Avatar>
        </div>
        <span class="b-list-item__name">
          {{ request.sender.profile.name }} {{ request.sender.profile.last_name }}
        </span>
      </div>
      <div class="b-list-item-right__side">
        <img :src="request.sender.emoji" alt="" />

        <div class="b-list-item-right__side-buttons">
          <WhiteBtn
            class="b-list-item__cancel-button"
            :width="44"
            :icon="GrayCrossIcon"
            :height="24"
            @click-function="clickDeclineButton(request.id)"
          />
          <GreenBtn
            class="b-list-item__accept-button"
            :width="44"
            :icon="NikeIcon"
            :height="24"
            @click-function="clickAcceptButton(request.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue';
import GreenBtn from './GreenBtn.vue';
import WhiteBtn from './WhiteBtn.vue';

import GrayCrossIcon from '../assets/img/gray-cross.svg';
import NikeIcon from '../assets/img/nike-icon.svg';

export default {
  components: {
    Avatar,
    WhiteBtn,
    GreenBtn,
  },
  props: {
    requestsToParticipationsData: {
      type: Object,
      default: () => {},
    },
  },
  setup(_, { emit }) {

    const clickDeclineButton = (requestId) => {
      emit('declineRequest', requestId)
    }

    const clickAcceptButton = (requestId) => {
      emit('acceptRequest', requestId)
    }

    return {
      GrayCrossIcon,
      NikeIcon,
      clickAcceptButton,
      clickDeclineButton,
    };
  },
};
</script>

<style lang="scss" scoped>

// SCSS variables for hex colors
 $color-dfdeed: #dfdeed;
 $color-efeff6: #efeff6;


.b-list-of-event-requests-to-participations {
  display: flex;
  flex-direction: column;
  gap: 12px 0px;

  .b-list-item {
    background: $--b-main-white-color;
    border: 1px solid $color-dfdeed;
    border-radius: 4px;
    padding: 4px 16px;
    height: 60px;
    max-width: 490px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .b-list-item-left__side {
      display: flex;
      align-items: center;
      gap: 12px;
      .b-list-item__picture {
        .b-list-item__avatar {
          min-width: 32px;
          max-width: 32px;
          height: 32px;
        }
      }

      .b-list-item__name {
        @include inter(14px, 400);
        line-height: 20px;
      }
    }
    .b-list-item-right__side {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .b-list-item-right__side-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        padding-left: 20px;
        border-left: 1px solid $color-efeff6;
        margin-left: 12px;

        .b-list-item__cancel-button {
          border: 1px solid $color-dfdeed !important;
          ::v-deep(img) {
            margin: 0;
          }
        }

        .b-list-item__accept-button {
          ::v-deep(img) {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
