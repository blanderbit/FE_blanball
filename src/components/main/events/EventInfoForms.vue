<template>
  <div class="b-event-info__forms">
    <div class="b-event-info__form" v-for="(item, key, index) in formsData">
      <span class="b-event-info__form-title">
        {{ $t('events.team_num', { num: index + 1 }) }}
      </span>
      <div class="b-event-info__form-content">
        <div
          v-if="formsType === 'Forms'"
          class="b-event-info__form-content-t-thirt"
        >
          <div class="b-event-info__form-item">
            <div class="b-event-info__form-item-name">
              {{ $t('events.t-shirts') }}
            </div>
            <div class="b-event-info__form-item-color">
              <img :src="mockData.colors[item.t_shirts]" alt="" />
              <div class="b-event-info__form-item-color-name">
                {{ $t(`colors.${item.t_shirts}`) }}
              </div>
            </div>
          </div>
          <div class="b-event-info__form-item">
            <div class="b-event-info__form-item-name">
              {{ $t('events.shorts') }}
            </div>
            <div class="b-event-info__form-item-color">
              <img :src="mockData.colors[item.shorts]" alt="" />
              <div class="b-event-info__form-item-color-name">
                {{ $t(`colors.${item.shorts}`) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="b-event-info__form-content-shirt-front">
          <div class="b-event-info__form-item">
            <div class="b-event-info__form-item-name">
              {{ $t('events.shirtfronts') }}
            </div>
            <div class="b-event-info__form-item-color">
              <img :src="mockData.colors[item.shirtfronts]" alt="" />
              <div class="b-event-info__form-item-color-name">
                {{ $t(`colors.${item.shirtfronts}`) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

import { CONSTS } from '../../../consts/index';

export default {
  props: {
    formsData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const mockData = computed(() => {
      return {
        colors: CONSTS.forms.colorIcons,
      };
    });

    const formsType = ref(props.formsData.type);
    delete props.formsData.type;

    return {
      mockData,
      formsType,
    };
  },
};
</script>

<style lang="scss" scoped>
// SCSS variables for hex colors
$color-f9f9fc: #f9f9fc;
$color-efeff6: #efeff6;

.b-event-info__forms {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0px;

  @media (max-width: 455px) {
    flex-direction: column;
  }

  .b-event-info__form {
    background: $color-f9f9fc;
    border-radius: 6px;
    padding: 12px;
    display: flex;
    flex-direction: column;

    @media (max-width: 455px) {
      width: 100%;
    }
    .b-event-info__form-title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;
      color: $--b-main-black-color;
    }
    .b-event-info__form-content {
      .b-event-info__form-content-t-thirt {
        @media (max-width: 455px) {
          display: flex;
          gap: 8px;
        }
      }
      .b-event-info__form-content-shirt-front {
        @media (max-width: 455px) {
          display: flex;
          gap: 8px;
        }
      }
      .b-event-info__form-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-top: 8px;

        @media (max-width: 455px) {
          flex-direction: column;
          align-items: baseline;
        }
        .b-event-info__form-item-name {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 20px;
          color: $--b-main-gray-color;
        }
        .b-event-info__form-item-color {
          background: $color-efeff6;
          border-radius: 4px;
          padding: 2px 8px;
          min-width: 115px;
          display: flex;
          align-items: center;
          gap: 8px;
          .b-event-info__form-item-color-name {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: $--b-main-black-color;
          }
        }
      }
    }
  }
}
</style>
