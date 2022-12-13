<template>
  <collapsible-panel v-model:expanding="expanding">
    <!--TODO сделать так что бы работал експанлдбл как на нотификациях, логика уже есть, нужно сделать
     так что бы был тайтл и был контент у строки -->
    <template #title>
      <div
          class="b-user-card"
      >
        <div class="b-user-card__top-line">
          <div class="b-user-card__picture-name">
            <div class="b-user-card__picture">
              <avatar
                :link="userData.profile.avatar_url"
                :full-name="userData.profile.name + ' ' + userData.profile.last_name"
              ></avatar>
            </div>
            <div class="b-user-card__name-pnz">
              <div class="b-user-card__top-line-name-rating">
                <div class="b-user-card__name">{{userData.profile.name}} {{userData.profile.last_name}}</div>
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
                <div class="b-user-card__team">Какая-то команда</div>
                <div class="b-user-card__status-mob">{{userData.role}}</div>
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
            <img src="../assets/img/runner.svg" alt="runner icon">
            <div class="b-user-card__status">{{userData.role}}</div>
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
        <div class="b-user-card__pnz">
          {{userData.profile.position}} 
          <span>
            {{ userPosition[userData.profile.position] }}
          </span>
        </div>
        <div class="b-user-card__gender">
          <span class="title">{{$t('users.gender')}}</span>
          <span class="icon">
            <img src="../assets/img/unisex-icon2.svg" alt="gender icon">
          </span>
          <span>{{userData.profile.gender}}</span>
        </div>
      </div>
    </template>
  </collapsible-panel>
</template>

<script>
  import StarRating from 'vue-star-rating'

  import Avatar from './../components/Avatar.vue'
  import CollapsiblePanel from './../components/collapsible/CollapsiblePanel.vue'

  import CONSTANTS from '../consts/index'

  export default {
    name: "UserCard",
    components: {
      StarRating,
      Avatar,
      CollapsiblePanel
    },
    props: {
      userData: {
        type: Object,
        default: () => {
        }
      }
    },
    computed: {
      userPosition() {
        return CONSTANTS.users_page.user_position
      },
      expanding: {
        set() {
          this.$emit('update:expanding', !this.userData?.metadata?.expanding);
        },
        get() {
          return !!this.userData?.metadata?.expanding
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .b-user-card {
    padding: 8px 12px;
    /* background: #FFFFFF; */
    /* border-bottom: 1px solid #EFEFF6; */
    /* box-shadow: 2px 2px 10px rgb(56 56 251 / 10%); */
    /* border-radius: 8px; */
    /* overflow: hidden; */
    width: 100%;
    @media (max-width: 768px) {
      padding: 8px 12px 8px 0;
    }

    &__top-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__picture-name {
      display: flex;
      align-items: center;
      @media (max-width: 768px) {
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
        color: #262541;
        @media (max-width: 576px) {
          width: 110px;
        }
        .b-user-card__top-line-name-rating {
          .b-user-card__name {
            display: flex;
            align-items: center;
            @media (max-width: 768px) {
              font-size: 13px;
              line-height: 16px;
            }
          }
          .b-user-card__team-rating-mob {
            display: none;
            @media (max-width: 768px) {
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
          color: #262541;
          @media (max-width: 768px) {
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
            color: #575775;
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
          @media (max-width: 768px) {
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
            color: #575775;
            margin-left: 30px;
            @media (max-width: 768px) {
              margin-left: 0;
              font-size: 12px;
              line-height: 16px;
            }
          }
          .b-user-card__status-mob {
            display: none;
            @media (max-width: 768px) {
              display: block;
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 13px;
              line-height: 16px;
              color: #262541;
            }
          }
        }

      }
      // .b-user-card__bottom-line {
      //   display: flex;
      //   align-items: center;
      //   margin-top: 6px;
      //   @media (max-width: 768px) {
      //   }
      //   .title {
      //     font-family: 'Inter';
      //     font-style: normal;
      //     font-weight: 500;
      //     font-size: 12px;
      //     line-height: 20px;
      //     color: #262541;
      //     @media (max-width: 768px) {
      //       display: none;
      //     }
      //   }
      //   .icon {
      //     display: none;
      //     width: 20px;
      //     height: 20px;
      //     background: #F7F7FC;
      //     border-radius: 4px;
      //     @media (max-width: 768px) {
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
      //     color: #575775;
      //     @media (max-width: 768px) {
      //       font-weight: 500;
      //       color: #262541;
      //     }
      //   }
      // }
    }

    &__user-status {
      display: flex;
      align-items: center;
      height: 32px;
      @media (max-width: 768px) {
        display: none;
      }

      .b-user-card__status {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #262541;
        margin-left: 8px;
      }
    }
    &__flipping-part {
      display: flex;
      margin-left: 60px;
      @media (max-width: 768px) {
        margin-left: 0;
      }
      .b-user-card__pnz {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #262541;
        margin-right: 34px;
        span {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
        }
      }

      .b-user-card__gender {
        display: flex;
        align-items: center;
        @media (max-width: 768px) {
        }
        .title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #262541;
          margin-right: 3px;
          @media (max-width: 768px) {
            display: none;
          }
        }
        .icon {
          display: none;
          margin-right: 4px;
          @media (max-width: 768px) {
            display: inherit;
          }
        }
        span {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #575775;
          @media (max-width: 768px) {
            font-weight: 500;
            color: #262541;
          }
        }
      }

    }
  }
</style>