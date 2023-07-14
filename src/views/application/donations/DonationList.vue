<template>
  <div class="b-donations">
    <div class="b-donations-header">
      <div class="b-donations-header-left-container">
        <span class="b-donations-title">{{
          t('donations.your_donations')
        }}</span>
        <span class="b-donations-description">{{
          t('donations.you_can_help')
        }}</span>
      </div>
      <div class="b-donations-header-right-container">
        <!-- language select -->
      </div>
    </div>
    <div class="b-donations-list-container">
      <Route
        v-for="{ id, name, img, percentage, raised, aim } in list"
        :key="id"
        :to="{ name: donationItemRoute, params: { id } }"
      >
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
                <span class="b-donations-item-aim">{{
                  getMoneyValue(aim)
                }}</span>
              </div>
            </div>
            <div class="b-donations-item-lower-block-right-block">
              <span class="b-donations-item-percentage-number">{{
                percentage
              }}</span>
              <span class="b-donations-item-percentage-sign">%</span>
            </div>
          </div>
        </div>
      </Route>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

import Route from '../../../components/shared/route/Route.vue';
import LinearProgress from '../../../components/shared/progress/LinearProgress.vue';

import { ROUTES } from '../../../router/router.const';

import _img from '../../../assets/img/light-bulb.svg';

const listMock = [
  {
    id: 1,
    name: 'Назва збору у декількох словах',
    currency: '₴',
    aim: 3000,
    raised: 378,
    percentage: 30,
    img: _img,
  },
  {
    id: 2,
    name: 'Назва збору у декількох словах',
    currency: '₴',
    aim: 3000,
    raised: 378,
    percentage: 30,
    img: _img,
  },
  {
    id: 3,
    name: 'Назва збору у декількох словах',
    currency: '₴',
    aim: 3000,
    raised: 378,
    percentage: 30,
    img: _img,
  },
  {
    id: 4,
    name: 'Назва збору у декількох словах',
    currency: '₴',
    aim: 3000,
    raised: 378,
    percentage: 30,
    img: _img,
  },
  {
    id: 5,
    name: 'Назва збору у декількох словах',
    currency: '₴',
    aim: 3000,
    raised: 378,
    percentage: 30,
    img: _img,
  },
  {
    id: 6,
    name: 'Назва збору у декількох словах',
    currency: '₴',
    aim: 3000,
    raised: 378,
    percentage: 30,
    img: _img,
  },
];

export default {
  name: 'DonationList',
  components: {
    Route,
    LinearProgress,
  },
  setup() {
    const { t } = useI18n();
    const list = listMock;
    const donationItemRoute = ROUTES.APPLICATION.DONATIONS.ITEM.name;

    const getMoneyValue = (value) => `${value} ₴`;
    const getBackgroundImageStyle = (img) => ({
      backgroundImage: `url(${img})`,
    });

    return {
      list,
      donationItemRoute,
      getBackgroundImageStyle,
      getMoneyValue,
      t,
    };
  },
};
</script>

<style lang="scss">
.b-donations {
  display: flex;
  flex-direction: column;
}
.b-donations-header {
  display: flex;
}
.b-donations-header-left-container {
  display: flex;
  flex-direction: column;
}
.b-donations-title {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  color: $--b-main-black-color;
  margin-bottom: 4px;
}
.b-donations-description {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: $--b-main-gray-color;
}
.b-donations-list-container {
  display: flex;
  flex-wrap: wrap;
  width: 1136px;
  height: 720px;
  margin-left: -12px;
}
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
