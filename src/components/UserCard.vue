<template>
  <collapsible-panel v-model:expanding="expanding">
    <!--TODO сделать так что бы работал експанлдбл как на нотификациях, логика уже есть, нужно сделать
     так что бы был тайтл и был контент у строки -->
    <template #title>
      <div
          class="b_user_card"
      >
        <div class="b_user_card_top-line">
          <div class="b_user_card_picture_name">
            <div class="b_user_card_picture">
              <avatar
                :link="userData.profile.avatar_url"
                :full-name="userData.profile.name + ' ' + userData.profile.last_name"
              ></avatar>
            </div>
            <div class="b_user_card_name_pnz">
              <div class="b_user_card_top_line_name_rating">
                <div class="b_user_card_name">{{userData.profile.name}} {{userData.profile.last_name}}</div>
                <div class="b_user_card_team_rating_mob">
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
          <div class="b_user_card_rating_team">
            <div class="b_user_card_top_line_rating_status">
              <div class="b_user_card_team_rating">
                <star-rating
                    :rating="userData.raiting || 0"
                    :star-size="14"
                    :show-rating="false"
                    :read-only="true"
                    :active-color="'#148783'"
                >
                </star-rating>
              </div>
              <div class="b_user_card_team_status">
                <div class="b_user_card_team">Какая-то команда</div>
                <div class="b_user_card_status_mob">{{userData.role}}</div>
              </div>
            </div>
            <div class="b_user_card_bottom-line">
              <span class="title">{{$t('users.gender')}}</span>
              <span class="icon">
                <img :src="userData.gender_icon" alt="">
              </span>
              <span>{{userData.profile.gender}}</span>
            </div>
          </div>
          <div class="b_user_card_user_status">
            <img src="../assets/img/runner.svg" alt="">
            <div class="b_user_card_status">{{userData.role}}</div>
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
      <div class="b_user_card_pnz">
        {{userData.profile.position}} 
        <span>{{userData.profile.position}}</span>
      </div>
    </template>
  </collapsible-panel>
</template>

<script>
  import CONSTANTS from '../consts'
  import StarRating from 'vue-star-rating'
  import Avatar from './../components/Avatar.vue'
  import CollapsiblePanel from './../components/collapsible/CollapsiblePanel.vue'

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
    data() {
      return {
        rating: 3,
      }
    },
    computed: {
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
  .b_user_card {
    padding: 8px 12px;
    background: #FFFFFF;
    border-bottom: 1px solid #EFEFF6;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 8px;
    overflow: hidden;
    width: 100%;

    &_top-line {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &_picture_name {
      display: flex;
      align-items: flex-start;
      @media (max-width: 768px) {
        position: relative;
      }
      .b_user_card_picture {
        img {
          display: block;
        }
      }
      .b_user_card_name_pnz {
        margin-left: 12px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #262541;
        .b_user_card_top_line_name_rating {
          height: 32px;
          .b_user_card_name {
            display: flex;
            align-items: center;
            @media (max-width: 768px) {
              font-size: 13px;
              line-height: 16px;
            }
          }
          .b_user_card_team_rating_mob {
            display: none;
            @media (max-width: 768px) {
              height: auto;
              display: block;
            }
          }
        }

        .b_user_card_pnz {
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

    &_rating_team {
      .b_user_card_top_line_rating_status {
        display: flex;
        align-items: center;
        height: 32px;
        .b_user_card_team_rating {
          // .star-rating {
          @media (max-width: 768px) {
            display: none;
          }
          // }

        }
        .b_user_card_team_status {
          .b_user_card_team {
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
          .b_user_card_status_mob {
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
      .b_user_card_bottom-line {
        display: flex;
        align-items: center;
        margin-top: 6px;
        @media (max-width: 768px) {
        }
        .title {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #262541;
          @media (max-width: 768px) {
            display: none;
          }
        }
        .icon {
          display: none;
          width: 20px;
          height: 20px;
          background: #F7F7FC;
          border-radius: 4px;
          @media (max-width: 768px) {
            display: flex;
          }
          img {
            margin: auto;
            width: 10px;
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

    &_user_status {
      display: flex;
      align-items: center;
      height: 32px;
      @media (max-width: 768px) {
        display: none;
      }

      .b_user_card_status {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #262541;
        margin-left: 8px;
      }
    }
    &_arrow {
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
</style>