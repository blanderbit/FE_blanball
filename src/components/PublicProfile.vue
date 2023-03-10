<template>
  <div class="b-public-profile">
    <div class="b-public-profile__background-image">
      <img src="../assets/img/user-page-back.svg" alt="" />
    </div>
    <div class="b-public-profile__main-side">
      <div class="b-public-profile__first-block">
        <div class="b-public-profile__profile-info">
          <Avatar
            class="b-public-profile__avatar"
            :link="userData.profile.avatar_url"
            :full-name="`${userData.profile.name} ${userData.profile.last_name}`"
          />
          <div class="b-public-profile__user-main-info">
            <div class="b-public-profile__full-name">
              {{ userData.profile.last_name }} {{ userData.profile.name }}
            </div>
            <div class="b-public-profile__role">
              {{ $t(`hashtags.${userData.role}`) }}
            </div>
            <StarRating
              :rating="1"
              :star-size="14"
              :show-rating="false"
              :read-only="true"
              :active-color="'#F57125'"
            />
          </div>
        </div>
        <div class="b-public-profile__buttons-block">
          <div class="b-public-profile__invite-button">
            {{ $t('player_page.invite') }}
          </div>
          <div class="b-public-profile__connection-buttons">
            <WhiteBtn
              class="b-connection__button b-send-email__button"
              :text="$t('player_page.write-email')"
              :icon="icons.letter"
              :height="36"
            />
            <WhiteBtn
              class="b-connection__button b-call-phone__button"
              :text="$t('player_page.call')"
              :icon="icons.phone"
              :height="36"
            />
          </div>
        </div>
        <div class="b-public-profile__bottom-block">
          <div class="b-public-profile__qualification">
            <span class="b-qualification__text">
              {{ $t('player_page.qualification') }}
            </span>
            <span class="b-qualification__status"> 
                {{ $t('player_page.approved') }}
            </span>
          </div>
          <div class="b-public-profile__description">
            <div class="b-description__title">
              {{ $t('player_page.about-yourself') }}
            </div>
            <div class="b-description__text">
              {{ userData.profile.about_me }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import Avatar from './Avatar.vue';

import StarRating from 'vue-star-rating';
import WhiteBtn from './WhiteBtn.vue';

import PhoneIcon from '../assets/img/phone-arrow.svg';
import LetterIcon from '../assets/img/letter.svg';

export default {
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Avatar,
    WhiteBtn,
    StarRating,
  },
  setup() {
    const icons = computed(() => {
      return {
        phone: PhoneIcon,
        letter: LetterIcon,
      };
    });

    return {
      icons,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-public-profile {
  position: relative;

  .b-public-profile__background-image {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    height: 180px;
    width: 100%;

    img {
      width: 100%;
    }
  }

  .b-public-profile__main-side {
    padding: 60px 32px 60px 32px;

    .b-public-profile__first-block {
      background: #ffffff;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 12px;
      width: 325px;
      min-height: 526px;
      padding: 24px;

      .b-public-profile__profile-info {
        display: flex;
        gap: 12px;

        .b-public-profile__avatar {
          height: 96px;

          ::v-deep(.b-avatar) {
            width: 96px;
            height: 96px;
            border-radius: 4px;
          }
        }

        .b-public-profile__user-main-info {
          display: flex;
          flex-direction: column;
          gap: 4px 4px;

          .b-public-profile__full-name {
            @include exo(18px, 800);
            line-height: 24px;
          }

          .b-public-profile__role {
            @include inter(12px, 500, #575775);
            line-height: 20px;
          }
        }
      }
    }

    .b-public-profile__buttons-block {
      margin-top: 16px;

      .b-public-profile__invite-button {
        @include inter(14px, 500, #fff);
        line-height: 24px;
        text-align: center;
        background: $--b-main-black-color;
        border-radius: 6px;
        padding: 6px 16px;
      }

      .b-public-profile__connection-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        gap: 8px;

        ::v-deep(.b_white-btn) {
          border: 1px solid #c5c5d3 !important;
          border-radius: 4px;
          @include inter(12px, 500);
          color: #575775 !important;
          line-height: 20px;
        }

        .b-send-email__button {
          flex-basis: 57%;
        }

        .b-call-phone__button {
          flex-basis: 43%;
        }
      }
    }

    .b-public-profile__bottom-block {
      margin-top: 16px;

      .b-public-profile__qualification {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .b-qualification__text {
          @include inter(12px, 400, #575775);
          line-height: 20px;
        }

        .b-qualification__status {
          @include inter(12px, 400, #395d09);
          line-height: 20px;
          background: #d2f6a2;
          border-radius: 4px;
          padding: 0px 4px;
        }
      }
      .b-public-profile__description {
        display: flex;
        flex-direction: column;
        gap: 4px 4px;
        margin-top: 16px;

        .b-description__title {
          @include inter(12px, 400, #6f6f77);
          line-height: 16px;
        }
        .b-description__text {
            @include inter(14px, 400);
            line-height: 20px;
            word-break: break-word;
        }
      }
    }
  }
}
</style>
