<template>
  <div 
    class="b-search-block"
    :style="windowStyle"
  >
    <div class="b-search-block__title">{{$t('events.search-among')}}</div>
    <div class="b-search-block__tegs-block">
      <div
        v-for="tag in tags"
        :key="tag.id"
        :class="['b-search-block__teg', { active: tag.isActive }]"
        @click="$emit('choseTabCategory', tag.id)"
      >
        {{ tag.text }}
      </div>
    </div>
    <div class="b-search-block__users-window">
      <div
        v-for="team of filteredTeams"
        :key="team.id"
        class="b-search-block__category-block"
      >
        <div class="b-search-block__category-name">
          {{ team.category_name }}
        </div>
        <div class="b-search-block__users-list">
          <div
            v-for="user of team.users"
            :key="user.id"
            :class="['b-search-block__user', { 'b-search-block__taken': user.isChosen }]"
          >
            <div class="b-search-block__user-data">
              <div class="b-search-block__user-img">
                <img :src="user.img" alt="" />
              </div>
              <div class="b-search-block__user-name">
                {{ user.name }}
              </div>
            </div>
            <div
              v-if="!user.isChosen"
              class="b-search-block__add-user"
              @click="$emit('itemListClick', team.id, user.id)"
            >
              <img
                :class="{ taken: user.isChosen }"
                :src="listItemIcon"
                alt=""
              />
            </div>
            <div v-else class="b-search-block__invited">{{$t('events.requested')}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-search-block__show-more-results">{{$t('events.show-more')}}</div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SearchBlockAll',
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    filteredTeams: {
      type: Array,
      default: () => []
    },
    listItemIcon: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 'auto'
    }
  },
  emits: ['choseTabCategory', 'itemListClick'],
  setup(props) {
    const windowStyle = computed(() => {
      if (String(props.width).split('').includes('%')) {
        return { width: props.width }
      } else {
        return { width: `${props.width}px` }
      }
    })

    return {
      windowStyle
    }
  }
}
</script>

<style lang="scss" scoped>
  .b-search-block {
    padding: 12px;
    height: 418px;
    background: #ffffff;
    box-shadow: 2px 2px 10px rgba(56, 56, 251, 0.1);
    border-radius: 6px;
    margin-top: 8px;
    .b-search-block__title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      color: #262541;
    }
    .b-search-block__tegs-block {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #dfdeed;
      padding-bottom: 14px;
      margin-top: 8px;
      .b-search-block__teg {
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #8a8aa8;
        cursor: pointer;
        &.active {
          color: #262541;
          background: #f0f0f4;
        }
      }
    }
    .b-search-block__users-window {
      overflow: hidden;
      height: 268px;
      .b-search-block__category-block {
        .b-search-block__category-name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: #8a8aa8;
          margin: 8px 0;
        }
        .b-search-block__users-list {
          .b-search-block__user {
            padding: 4px;
            border-radius: 0px 6px 6px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &.b-search-block__taken {
              border: 1px solid #e2e2e9;
              img {
                opacity: 0.5;
              }
            }
            .b-search-block__user-data {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .b-search-block__user-img {
                img {
                  display: block;
                }
              }
              .b-search-block__user-name {
                margin-left: 8px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 20px;
                color: #262541;
                user-select: none;
              }
            }
            .b-search-block__add-user {
              cursor: pointer;
              img {
                margin-right: 12px;
              }
            }
            .b-search-block__invited {
              font-family: 'Inter';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              color: #8a8aa8;
            }
            &:hover {
              background: #f0f0f4;
              .b-search-block__add-user img {
                filter: invert(61%) sepia(21%) saturate(354%) hue-rotate(202deg)
                  brightness(87%) contrast(90%);
              }
            }
          }
        }
      }
    }
    .b-search-block__show-more-results {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: #8a8aa8;
      margin-top: 12px;
      cursor: pointer;
    }
  }
</style>