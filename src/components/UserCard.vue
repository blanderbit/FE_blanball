<template>
  <collapsible-panel v-model:expanding="expanding">
    <!--TODO сделать так что бы работал експанлдбл как на нотификациях, логика уже есть, нужно сделать
     так что бы был тайтл и был контент у строки -->
    <template #title>
      <div class="b-user-card">
        <div class="b-user-card__top-line">
          <div class="b-user-card__picture-name">
            <div class="b-user-card__picture">
              <avatar
                @clickByAvatar="$emit('openUserProfile')"
                :link="userData.profile.avatar_url"
                :full-name="`${userData.profile.last_name} ${userData.profile.name}`"
              ></avatar>
            </div>
            <div class="b-user-card__name-pnz">
              <div class="b-user-card__top-line-name-rating">
                <div class="b-user-card__name">
                  {{ userData.profile.last_name }} {{ userData.profile.name }}
                </div>
                <div class="b-user-card__team-rating-mob">
                  <star-rating
                    :rating="userData.raiting || 0"
                    :star-size="14"
                    :show-rating="false"
                    :read-only="true"
                    :active-color="'#148783'"
                  >
                  </star-rating>
                </div>
              </div>
            </div>
          </div>
          <div class="b-user-card__rating-team">
            <div class="b-user-card__top-line-rating-status">
              <div class="b-user-card__team-rating">
                <star-rating
                  :rating="userData.raiting || 0"
                  :star-size="14"
                  :show-rating="false"
                  :read-only="true"
                  :active-color="'#148783'"
                >
                </star-rating>
              </div>
              <div class="b-user-card__team-status">
                <div class="b-user-card__team">BlanBall Team</div>
                <div class="b-user-card__status-mob">
                  {{ $t(`hashtags.${userData.role}`) }}
                </div>
              </div>
            </div>
            <!-- <div class="b-user-card__bottom-line">
              <span class="title">{{$t('users.gender')}}</span>
              <span class="icon">
                <img :src="userData .gender_icon" alt="">
              </span>
              <span>{{userData.profile.gender}}</span>
            </div> -->
          </div>
          <div class="b-user-card__user-status">
            <img src="../assets/img/runner.svg" alt="runner icon" />
            <div class="b-user-card__status">
              {{ $t(`hashtags.${userData.role}`) }}
            </div>
          </div>
          <!--<div-->
          <!--:class="['b_user_card_arrow', {active: userData.isActive}]"-->
          <!--&gt;-->
          <!--<img src="../assets/img/arrow-down.svg" alt="">-->
          <!--</div>-->
        </div>
      </div>
    </template>

    <template #content>
      <div class="b-user-card__flipping-part">
        <div v-if="userData.profile.position" class="b-user-card__pnz">
          {{ $t(`hashtags.${userData.profile.position}`) }}
          <span>
            {{ $t(`hashtags.position_full.${userData.profile.position}`) }}
          </span>
        </div>
        <div v-if="userData.profile.gender" class="b-user-card__gender">
          <span class="title">{{ $t('users.gender') }}</span>
          <span>: {{ $t(`hashtags.${userData.profile.gender}`) }}</span>
        </div>
      </div>
    </template>
  </collapsible-panel>
</template>

<script>
import StarRating from 'vue-star-rating';

import Avatar from './../components/Avatar.vue';
import CollapsiblePanel from './../components/collapsible/CollapsiblePanel.vue';

import CONSTANTS from '../consts/index';

export default {
  name: 'UserCard',
  components: {
    StarRating,
    Avatar,
    CollapsiblePanel,
  },
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['openUserProfile'],
  computed: {
    userPosition() {
      return CONSTANTS.users_page.user_position;
    },
    expanding: {
      set() {
        this.$emit('update:expanding', !this.userData?.metadata?.expanding);
      },
      get() {
        return !!this.userData?.metadata?.expanding;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-efeff6: #efeff6;
$color-f7f7fc: #f7f7fc;

@import '../assets/styles/mixins/device.scss';
.b-user-card {
  width: 100%;
  &__top-line {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    @include tabletAndMobile {
      display: flex;
      justify-content: space-between;
    }
  }

  &__picture-name {
    display: flex;
    align-items: center;
    @include tabletAndMobile {
      position: relative;
    }
    .b-user-card__picture {
      img {
        display: block;
      }
    }
    .b-user-card__name-pnz {
      margin-left: 12px;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: $--b-main-black-color;
      @include mobile {
        width: 110px;
      }
      .b-user-card__top-line-name-rating {
        .b-user-card__name {
          display: flex;
          align-items: center;
          @include tabletAndMobile {
            font-size: 13px;
            line-height: 16px;
          }
        }
        .b-user-card__team-rating-mob {
          display: none;
          @include tabletAndMobile {
            height: auto;
            display: block;
          }
        }
      }

      .b-user-card__pnz {
        margin-top: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: $--b-main-black-color;
        @include tabletAndMobile {
          position: absolute;
          left: 0;
          width: max-content;
        }
        span {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: $--b-main-gray-color;
        }
      }
    }
  }

  &__rating-team {
    .b-user-card__top-line-rating-status {
      display: flex;
      align-items: center;
      height: 32px;
      .b-user-card__team-rating {
        // .star-rating {
        @include tabletAndMobile {
          display: none;
        }
        // }
      }
      .b-user-card__team-status {
        .b-user-card__team {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: $--b-main-gray-color;
          margin-left: 30px;
          @include tabletAndMobile {
            margin-left: 0;
            font-size: 12px;
            line-height: 16px;
          }
        }
        .b-user-card__status-mob {
          display: none;
          @include tabletAndMobile {
            display: block;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 16px;
            color: $--b-main-black-color;
          }
        }
      }
    }
    // .b-user-card__bottom-line {
    //   display: flex;
    //   align-items: center;
    //   margin-top: 6px;
    //   @include tabletAndMobile {
    //   }
    //   .title {
    //     font-family: 'Inter';
    //     font-style: normal;
    //     font-weight: 500;
    //     font-size: 12px;
    //     line-height: 20px;
    //     color: $--b-main-black-color;
    //     @include tabletAndMobile {
    //       display: none;
    //     }
    //   }
    //   .icon {
    //     display: none;
    //     width: 20px;
    //     height: 20px;
    //     background: #F7F7FC;
    //     border-radius: 4px;
    //     @include tabletAndMobile {
    //       display: flex;
    //     }
    //     img {
    //       margin: auto;
    //       width: 10px;
    //     }
    //   }
    //   span {
    //     font-family: 'Inter';
    //     font-style: normal;
    //     font-weight: 400;
    //     font-size: 12px;
    //     line-height: 20px;
    //     color: $--b-main-gray-color;
    //     @include tabletAndMobile {
    //       font-weight: 500;
    //       color: $--b-main-black-color;
    //     }
    //   }
    // }
  }

  &__user-status {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 32px;
    @include tabletAndMobile {
      display: none;
    }

    .b-user-card__status {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      color: $--b-main-black-color;
      margin-left: 8px;
    }
  }
  &__flipping-part {
    display: flex;
    margin-left: 60px;
    @include tabletAndMobile {
      margin-left: 0;
    }
    .b-user-card__pnz {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: $--b-main-black-color;
      margin-right: 34px;
      span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: $--b-main-gray-color;
      }
    }

    .b-user-card__gender {
      display: flex;
      align-items: center;
      @include tabletAndMobile {
      }
      .title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: $--b-main-black-color;
        margin-right: 3px;
      }

      span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: $--b-main-gray-color;
        @include tabletAndMobile {
          font-weight: 500;
          color: $--b-main-black-color;
        }
      }
    }
  }
}
</style>
