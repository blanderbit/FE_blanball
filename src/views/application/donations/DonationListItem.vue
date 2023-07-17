<template>
  <div class="b-donations-item-container">
    <div
      class="b-donations-item-upper-block"
      :style="getBackgroundImageStyle(img)"
    ></div>
    <div class="b-donations-item-middle-block">
      <span class="b-donations-item-name">{{ name }}</span>
    </div>

    <div class="b-donations-item-lower-block">
      <div class="b-donations-item-lower-block-left-block">
        <div class="b-donations-item-progress-bar-label-container">
          <span class="b-donations-item-progress-bar-label">{{
            t('donations.raised')
          }}</span>
          <span class="b-donations-item-progress-bar-label">{{
            t('donations.aim')
          }}</span>
        </div>
        <div class="b-donations-item-progress-bar-container">
          <LinearProgress :value="percentage" />
        </div>
        <div class="b-donations-item-progress-money-container">
          <span class="b-donations-item-raised">{{
            getMoneyValue(raised)
          }}</span>
          <span class="b-donations-item-aim">{{ getMoneyValue(aim) }}</span>
        </div>
      </div>
      <div class="b-donations-item-lower-block-right-block">
        <span class="b-donations-item-percentage-number">{{ percentage }}</span>
        <span class="b-donations-item-percentage-sign">%</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n';

import LinearProgress from '../../../components/shared/progress/LinearProgress.vue';

export default {
  name: 'DonationListItem',
  components: {
    LinearProgress,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    percentage: {
      type: Number,
      default: 0,
    },
    raised: {
      type: Number,
      default: 0,
    },
    aim: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const { t } = useI18n();
    const getMoneyValue = (value) => `${value} ₴`;
    const getBackgroundImageStyle = (img) => ({
      backgroundImage: `url(${img})`,
    });

    return {
      getBackgroundImageStyle,
      getMoneyValue,
      t,
    };
  },
};
</script>
<style lang="scss">
.b-donations-item-container {
  width: 272px;
  height: 352px;
  border-radius: 6px;
  margin: 16px 0 0 12px;
  background: linear-gradient(
      0deg,
      $--b-main-white-color,
      $--b-main-white-color
    ),
    linear-gradient(0deg, #dfdeed, #dfdeed);
  border: 1px solid #dfdeed;
  overflow: hidden;
}
.b-donations-item-upper-block {
  width: 272px;
  height: 184px;
}

.b-donations-item-middle-block {
  width: 272px;
  height: 68px;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f4;
}
.b-donations-item-name {
  width: 100%;
  height: 48px;
  font-family: 'Exo 2';
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  text-decoration: none;
  text-transform: none;
  color: $--b-main-black-color;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.b-donations-item-lower-block {
  display: flex;
}
.b-donations-item-lower-block-left-block {
  display: flex;
  height: 96px;
  padding: 20px 12px 20px 16px;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  border-right: 1px solid #f0f0f4;
}
.b-donations-item-lower-block-left-block span {
  text-decoration: none;
  text-transform: none;
}
.b-donations-item-lower-block-right-block {
  display: flex;
  width: 68px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}
.b-donations-item-percentage-number {
  color: $--b-main-green-color;
  text-align: center;
  font-family: 'Lato';
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
}
.b-donations-item-percentage-sign {
  color: $--b-main-green-color;
  text-align: center;
  font-family: 'Lato';
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  padding-left: 2px;
}
.b-donations-item-progress-bar-label-container {
  display: flex;
  justify-content: space-between;
  width: 176px;
}
.b-donations-item-progress-bar-label {
  font-family: 'Inter';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  background: $--b-main-gray-color;
  background-clip: text;
}
.b-donations-item-progress-bar-container {
  width: 176px;
  padding: 6px 0;
}
.b-donations-item-progress-money-container {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 176px;
}
.b-donations-item-raised {
  overflow: hidden;
  color: $--b-main-green-color;
  text-overflow: ellipsis;
  font-family: 'Lato';
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.b-donations-item-aim {
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Lato';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
</style>
