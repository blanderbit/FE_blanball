<template>
  <InviteUserToEventModal
    v-if="isInviteUserModalOpened"
    :userData="userData"
    @closeModal="closeInviteUserModal"
  />
  <div
    :class="[
      { 'b-public-profile__top-wrapper': isPersonalPreview },
      'b-wrapper-scroll',
    ]"
  >
    <div :class="{ 'b-public-profile__wrapper': isPersonalPreview }">
      <div
        v-if="isPersonalPreview"
        class="b-public-profile__wrapper-edit-buttons"
      >
        <div
          class="b-public-profile__continue"
          @click="$emit('closeModal', 'public_profile')"
        >
          <span>{{ $t('buttons.keep-editing') }}</span>
          <img src="../../assets/img/arrow-left-small.svg" alt="" />
        </div>
        <div @click="$emit('saveChanges')" class="b-public-profile__exit">
          <span>{{ $t('buttons.save-and-out') }}</span>
          <img src="../../assets/img/cross-white.svg" alt="" />
        </div>
      </div>
      <div class="b-public-profile">
        <div class="b-public-profile__background-image">
          <img :src="backgroundTop" alt="" />
        </div>
        <div class="b-public-profile__main-side">
          <div class="b-public-profile__first-block">
            <div
              v-if="userData.is_verified"
              class="b-public-profile__verified-status"
            >
              {{ $t('player_page.verified') }}
              <img src="../../assets/img/profile-ball.svg" alt="" />
            </div>
            <div v-else class="b-public-profile__verified-status not-verified">
              {{ $t('player_page.not_verified') }}
              <img src="../../assets/img/profile-ball.svg" alt="" />
            </div>
            <div class="b-public-profile__profile-info">
              <Avatar
                class="b-public-profile__avatar"
                :avatarType="avatarType"
                :link="userData.profile.avatar_url"
                :full-name="`${userData.profile.name} ${userData.profile.last_name}`"
              />
              <div class="b-public-profile__user-main-info">
                <div class="b-public-profile__full-name">
                  {{ userData.profile.last_name }} <br />
                  {{ userData.profile.name }}
                </div>
                <div class="b-user-role-raiting">
                  <div class="b-public-profile__role">
                    {{ $t(`hashtags.${userData.role}`) }}
                  </div>
                  <StarRating
                    :rating="userRating"
                    :star-size="14"
                    :show-rating="false"
                    :read-only="true"
                    :active-color="'#F57125'"
                  />
                </div>
              </div>
            </div>
            <div class="b-public-profile__qualification tablet">
              <span class="b-qualification__text">
                {{ $t('player_page.qualification') }}
              </span>
              <span class="b-qualification__status">
                {{ $t('player_page.approved') }}
              </span>
            </div>
            <div class="b-public-profile__buttons-block">
              <div
                class="b-public-profile__invite-button"
                @click="openInviteUserModal"
              >
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
              <div class="b-public-profile__qualification desktop">
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
          <div class="b-public-profile__main-side-left-block">
            <div class="b-public-profile__second-block">
                <div class="b-second-block__user-features-block">
                <div class="b-user-features__title">
                  {{ $t('profile.game-features') }}
                </div>
                <div class="b-second-block__user-features">
                  <div
                    v-for="feature in playFeatures"
                    class="b-second-block__user-feature"
                  >
                    <img class="b-feature__image" :src="feature.img" alt="" />
                    <div class="b-feature__info">
                      <div class="b-feature__name">{{ feature.name }}</div>
                      <div class="b-feature__value">{{ feature.value }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <PublicProfileReviews
                :userRating="userRating"
                :userId="userData.id"
                :userShowReviews="userData.configuration.show_reviews"
              />
            </div>
            <PublicProfilePlannedEvents :userId="userData.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

import StarRating from 'vue-star-rating';

import Avatar from '../Avatar.vue';
import WhiteBtn from '../WhiteBtn.vue';
import PublicProfileReviews from './PublicProfileReviews.vue';
import PublicProfilePlannedEvents from './PublicProfilePlannedEvents.vue';
import InviteUserToEventModal from '../ModalWindows/InviteUserToEventModal.vue';

import useWindowWidth from '../../utils/widthScreen';

import PhoneIcon from '../../assets/img/phone-arrow.svg';
import LetterIcon from '../../assets/img/letter.svg';
import FlagIcon from '../../assets/img/flag.svg';
import GamingLegIcon from '../../assets/img/gaming-leg.svg';
import DumbbellIcon from '../../assets/img/dumbbell.svg';
import RulerIcon from '../../assets/img/ruler.svg';
import StarIcon from '../../assets/img/star.svg';
import BackgroundTop from '../../assets/img/user-page-back.svg'

export default {
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
    emits: ['saveChanges', 'closeModal'],
    pageMode: {
      type: String,
      default: 'look',
      validator(value) {
        return ['look', 'preview'].includes(value);
      },
    },
  },
  components: {
    Avatar,
    WhiteBtn,
    PublicProfilePlannedEvents,
    PublicProfileReviews,
    InviteUserToEventModal,
    StarRating,
  },
  setup(props) {
    const { t } = useI18n();
    const noFeatureData = '----';
    const isInviteUserModalOpened = ref(false);
    const isPersonalPreview = ref(false);

    switch (props.pageMode) {
      case 'look':
        isPersonalPreview.value = false;
        break;
      case 'preview':
        isPersonalPreview.value = true;
        break;
    }

    const { onResize, isBetweenTabletAndDesktop, isMobile, isTablet } =
      useWindowWidth();


    const backgroundTop = computed(() => {
        return BackgroundTop
    })

    const icons = computed(() => {
      return {
        phone: PhoneIcon,
        letter: LetterIcon,
        flag: FlagIcon,
        gaming_leg: GamingLegIcon,
        dumbbell: DumbbellIcon,
        ruler: RulerIcon,
        star: StarIcon,
      };
    });

    onMounted(() => {
      window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', onResize);
    });

    const userRating = computed(() => {
      return Math.round(props.userData.raiting) || 0;
    });

    const avatarType = computed(() => {
      if (isMobile.value || isTablet.value) {
        return 'big-circle';
      } else {
        return 'square';
      }
    });

    const openInviteUserModal = () => {
      if (!isPersonalPreview.value) {
        isInviteUserModalOpened.value = true;
      }
    };

    const closeInviteUserModal = () => {
      isInviteUserModalOpened.value = false;
    };

    const playFeatures = computed(() => {
      return [
        {
          id: 1,
          name: t('player_page.position'),
          img: icons.value.flag,
          value: props.userData.profile?.position
            ? t(
                !isPersonalPreview.value
                  ? `hashtags.position_full.${props.userData.profile?.position}`
                  : props.userData.profile?.position
              )
            : noFeatureData,
        },
        {
          id: 2,
          name: t('player_page.weight'),
          img: icons.value.dumbbell,
          value: props.userData.profile?.weight
            ? `${props.userData.profile?.weight} ${t('player_page.kg')}`
            : noFeatureData,
        },
        {
          id: 3,
          name: t('profile.main-leg'),
          img: icons.value.gaming_leg,
          value: props.userData.profile?.working_leg
            ? t(
                !isPersonalPreview.value
                  ? `hashtags.${props.userData.profile?.working_leg}`
                  : props.userData.profile?.working_leg
              )
            : noFeatureData,
        },
        {
          id: 4,
          name: t('player_page.height'),
          img: icons.value.ruler,
          value: props.userData.profile?.height
            ? `${props.userData.profile?.height} ${t('player_page.sm')}`
            : noFeatureData,
        },
      ];
    });

    return {
      icons,
      avatarType,
      isInviteUserModalOpened,
      userRating,
      playFeatures,
      backgroundTop,
      isPersonalPreview,
      openInviteUserModal,
      closeInviteUserModal,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-e2e2e9: #e2e2e9;
$color-efeff6: #efeff6;
$color-c5c5d3: #c5c5d3;
$color-6f6f77: #6f6f77;
$color-dfdeed: #dfdeed;
$color-395d09: #395d09;
$color-d2f6a2: #d2f6a2;

.b-public-profile__top-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(38, 37, 65, 0.2);
  z-index: 999;
}

.b-wrapper-scroll {
  @media (max-width: 1200px) {
    overflow: scroll;
  }
}
.b-public-profile__wrapper {
  background: $--b-main-white-color;
  border-radius: 20px 20px 0px 0px;
  padding: 20px;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1200px) {
    top: 90%;
  }

  @include beforeDesktop {
    top: 75%;
  }

  @include tabletAndMobile {
    top: 100%;
  }

  @media (max-width: 430px) {
    width: 100%;
  }
}

.b-public-profile__wrapper-edit-buttons {
  position: absolute;
  top: -40px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  .b-public-profile__continue {
    @include inter(12px, 400, $color-e2e2e9);
    line-height: 24px;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
  .b-public-profile__exit {
    @include inter(12px, 500, $--b-main-white-color);
    line-height: 24px;
    text-align: center;
    background: $color-6f6f77;
    border-radius: 6px;
    padding: 2px 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }
}

.b-public-profile {
  position: relative;

  @include beforeDesktop {
    overflow: scroll;
  }

  .b-public-profile__background-image {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    height: 180px;
    width: 100%;

    @include tabletAndMobile {
      z-index: 2;
    }

    @include bigTablet {
      z-index: 2;
    }

    img {
      width: 100%;
    }
  }

  .b-public-profile__main-side {
    padding: 60px 32px;
    display: flex;
    justify-content: center;

    @media (max-width: 1200px) {
      padding: 40px 20px;
    }

    @include tabletAndMobile {
      padding: 40px 0px;
    }

    @include tabletAndMobile {
      flex-direction: column;
      align-items: center;
    }

    .b-public-profile__first-block {
      background: $--b-main-white-color;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 12px;
      width: 325px;
      height: max-content;
      padding: 24px;
      position: relative;

      @media (max-width: 1200px) {
        padding: 16px;
        width: 300px;
      }

      @include beforeDesktop {
        padding: 16px;
        margin-top: 5px;
      }

      @include tabletAndMobile {
        width: 400px;
        margin-top: -30px;
      }

      @media (max-width: 430px) {
        width: 100%;
      }

      .b-public-profile__verified-status {
        @include inter(12px, 400);
        width: max-content;
        line-height: 20px;
        background: $color-efeff6;
        border-radius: 4px;
        padding: 2px 4px;
        position: absolute;
        top: 90px;
        right: 22px;
        display: flex;
        gap: 4px;

        @include tablet {
          top: 65px;
        }

        @media (max-width: 500px) {
          top: 65px;
        }

        @media (max-width: 350px) {
          top: 50px;
        }
      }

      .b-public-profile__profile-info {
        display: flex;
        gap: 12px;

        @include beforeDesktop {
          flex-direction: column;
          gap: 4px;
        }

        .b-public-profile__avatar {
          @include desktop {
            ::v-deep(.b-avatar) {
              width: 96px;
              height: 96px;
              border-radius: 4px;
            }
          }
        }

        .b-public-profile__user-main-info {
          display: flex;
          flex-direction: column;
          gap: 4px 4px;

          @include beforeDesktop {
            flex-direction: row;
            justify-content: space-between;
          }

          .b-public-profile__full-name {
            @include exo(18px, 800);
            line-height: 24px;
            word-break: break-all;

            @include tabletAndMobile {
              @include exo(20px, 800);
              margin-top: 8px;
            }
          }

          .b-user-role-raiting {
            @include beforeDesktop {
              display: flex;
              flex-direction: column-reverse;
              align-items: flex-end;
            }
          }

          .b-public-profile__role {
            @include inter(12px, 500, $--b-main-gray-color);
            line-height: 20px;

            @include tabletAndMobile {
              @include inter(14px, 500, $--b-main-gray-color);
            }
          }
        }
      }
    }

    .b-public-profile__buttons-block {
      margin-top: 16px;

      .b-public-profile__invite-button {
        @include inter(14px, 500, $--b-main-white-color);
        line-height: 24px;
        text-align: center;
        background: $--b-main-black-color;
        border-radius: 6px;
        padding: 6px 16px;
        cursor: pointer;
      }

      .b-public-profile__connection-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
        gap: 8px;

        ::v-deep(.b_white-btn) {
          border: 1px solid $color-c5c5d3 !important;
          border-radius: 4px;
          @include inter(12px, 500);
          color: $--b-main-gray-color !important;
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

      .b-public-profile__description {
        display: flex;
        flex-direction: column;
        gap: 4px 4px;
        margin-top: 16px;

        .b-description__title {
          @include inter(12px, 400, $color-6f6f77);
          line-height: 16px;
        }
        .b-description__text {
          @include inter(14px, 400);
          line-height: 20px;
          word-break: break-word;
        }
      }
    }
    .b-public-profile__main-side-left-block {
      display: flex;

      @media (max-width: 1200px) {
        flex-direction: column;
      }

      @include beforeDesktop {
        flex-direction: column;
        align-items: center;
      }

      @media (max-width: 430px) {
        width: 100%;
      }

      .b-public-profile__second-block {
        background: $--b-main-white-color;
        box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
        border-radius: 12px 0px 0px 12px;
        margin-left: 16px;
        padding: 24px;
        width: 450px;
        border-right: 1px solid $color-efeff6;
        overflow: hidden;

        @include desktop {
          height: calc(100vh - 90px - 70px);
        }

        ::-webkit-scrollbar {
          display: none;
        }


        @media (max-width: 1400px) {
          width: 350px;
        }

        @media (max-width: 1200px) {
          padding: 16px;
          width: 400px;
          border-radius: 12px;
        }

        @include beforeDesktop {
          padding: 5px;
          background: transparent;
          box-shadow: none;
          border: none;
          width: 310px;
        }

        @include tabletAndMobile {
          margin-left: 0px;
          width: 410px;
        }

        @include bigTablet {
          z-index: 3;
        }

        @media (max-width: 430px) {
          width: 100%;
        }

        .b-second-block__user-features-block {
          @include beforeDesktop {
            padding: 16px;
            box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
            background: $--b-main-white-color;
            border-radius: 12px;
          }
          @include bigTablet {
            // position: absolute;
            // left: 35px;
            // width: 300px;
            // bottom: 130px;
          }
          .b-user-features__title {
            @include exo(16px, 700);
            line-height: 24px;
            padding-bottom: 16px;
          }
          .b-second-block__user-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            justify-content: space-between;
            padding-top: 20px;
            border-top: 1px solid $color-dfdeed;
            align-items: center;
            padding-right: 30px;

            @include beforeDesktop {
              padding-right: 0px;
              padding-top: 16px;
              border-top: 1px dashed $color-dfdeed;
            }
            .b-second-block__user-feature {
              display: flex;
              gap: 8px;
              margin-bottom: 16px;
              &:nth-child(2) {
                justify-content: flex-end;
              }
              &:nth-child(4) {
                justify-content: flex-end;
              }
              .b-feature__info {
                .b-feature__name {
                  @include inter(12px, 400, $color-6f6f77);
                  line-height: 20px;
                }
                .b-feature__value {
                  @include inter(14px, 600);
                  line-height: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}

.b-public-profile__qualification {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.desktop {
    @include beforeDesktop {
      display: none;
    }
  }

  &.tablet {
    display: none;
    @include beforeDesktop {
      display: flex;
      margin-top: 8px;
    }
  }

  .b-qualification__text {
    @include inter(12px, 400, $--b-main-gray-color);
    line-height: 20px;
  }

  .b-qualification__status {
    @include inter(12px, 400, $color-395d09);
    line-height: 20px;
    background: $color-d2f6a2;
    border-radius: 4px;
    padding: 0px 4px;
  }
}
</style>
