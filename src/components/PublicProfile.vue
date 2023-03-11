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
              :rating="userRating"
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
      <div class="b-public-profile__second-block">
        <div class="b-second-block__title">
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
        <div class="b-second-block__user-reviews">
          <div class="b-user-reviews__info">
            <div class="b-user-reviews__titles-block">
              <div class="b-user-reviews__title">
                {{ $t('player_page.feedbacks') }}
              </div>
              <div class="b-user-reviews__subtitle">
                {{ paginationTotalCount }} оцінок
              </div>
            </div>
            <div class="b-user-reviews__raiting-star">
              <div class="b-user-reviews__user-raiting">
                {{ userRating }}
              </div>
              <img :src="icons.star" alt="" />
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import dayjs from 'dayjs';
import dayjsUkrLocale from 'dayjs/locale/uk';

import StarRating from 'vue-star-rating';

import Avatar from './Avatar.vue';
import WhiteBtn from './WhiteBtn.vue';
import SimpleListWrapper from './simple-list/SimpleListWrapper.vue';

import { API } from '../workers/api-worker/api.worker';
import { PaginationWorker } from '../workers/pagination-worker';

import PhoneIcon from '../assets/img/phone-arrow.svg';
import LetterIcon from '../assets/img/letter.svg';
import FlagIcon from '../assets/img/flag.svg';
import GamingLegIcon from '../assets/img/gaming-leg.svg';
import DumbbellIcon from '../assets/img/dumbbell.svg';
import RulerIcon from '../assets/img/ruler.svg';
import StarIcon from '../assets/img/star.svg';

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
    SimpleListWrapper,
    StarRating,
  },
  setup(props) {
    const { t } = useI18n();
    const noFeatureData = '----';
    const blockScrollToTopIfExist = ref(false);
    const route = useRoute()

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

    const userRating = computed(() => {
      return Math.round(props.userData.raiting) || 0;
    });

    const playFeatures = computed(() => {
      return [
        {
          id: 1,
          name: t('player_page.position'),
          img: icons.value.flag,
          value: props.userData.profile?.position
            ? t(`hashtags.position_full.${props.userData.profile?.position}`)
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
            ? t(`hashtags.${props.userData.profile?.working_leg}`)
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

    const {
      paginationElements,
      paginationPage,
      paginationTotalCount,
      paginationLoad,
      paginationClearData,
    } = PaginationWorker({
      paginationDataRequest: (page) =>
        API.ReviewService.getUserReviews(props.userData.id, {
          page,
        }),
      dataTransformation: (item) => {
        item.metadata = {
          expanding: false,
        };
        item.time_created = dayjs(item.time_created).format('DD.MM.YYYY');
        return item;
      },
    });


    paginationPage.value = 1;
    paginationTotalCount.value = route.meta.reviewsData.data.total_count
    paginationElements.value = route.meta.reviewsData.data.results.map(
      (item) => {
        return {
          ...item,
          time_created: `${dayjs(item.time_created).format('D.MM.YYYY')}`,
        };
      }
    );

    return {
      icons,
      userRating,
      playFeatures,
      paginationElements,
      paginationPage,
      blockScrollToTopIfExist,
      paginationPage,
      paginationElements,
      paginationTotalCount,
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
    display: flex;

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
    .b-public-profile__second-block {
      background: #ffffff;
      box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
      border-radius: 12px;
      margin-left: 16px;
      padding: 24px;
      min-width: 400px;
      .b-second-block__title {
        @include exo(16px, 700);
        line-height: 24px;
        padding-bottom: 16px;
      }
      .b-second-block__user-features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        padding-top: 20px;
        border-top: 1px solid #dfdeed;
        align-items: center;
        padding-right: 30px;
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
              @include inter(12px, 400, #6f6f77);
              line-height: 20px;
            }
            .b-feature__value {
              @include inter(14px, 600);
              line-height: 20px;
            }
          }
        }
      }
      .b-second-block__user-reviews {
        .b-user-reviews__info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .b-user-reviews__titles-block {
            .b-user-reviews__title {
              @include exo(16px, 700);
              line-height: 24px;
            }
            .b-user-reviews__subtitle {
              @include inter(12px, 400, #6f6f77);
              line-height: 20px;
            }
          }
          .b-user-reviews__raiting-star {
            display: flex;
            align-items: center;
            gap: 4px;
            .b-user-reviews__user-raiting {
              @include exo(16px, 700);
              line-height: 24px;
            }
          }
          .b-user-reviews__feedbacks-block {
          }
        }
      }
    }
  }
}
</style>
