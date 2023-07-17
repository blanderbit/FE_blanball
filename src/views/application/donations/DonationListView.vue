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
        <DonationListItem
          :name="name"
          :img="img"
          :percentage="percentage"
          :raised="raised"
          :aim="aim"
        />
      </Route>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

import Route from '../../../components/shared/route/Route.vue';
import LinearProgress from '../../../components/shared/progress/LinearProgress.vue';
import DonationListItem from './DonationListItem.vue';
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
  name: 'DonationListView',
  components: {
    Route,
    LinearProgress,
    DonationListItem,
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
</style>
