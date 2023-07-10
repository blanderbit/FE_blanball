<template>
  <div class="b-donations">
    <div class="b-donations-header">
      <div class="b-donations-header-left-container">
        <span class="b-donations-title">Ваші донати</span>
        <span class="b-donations-description"
          >Тут ви можете допомогти нам у розвитку проекту</span
        >
      </div>
      <div class="b-donations-header-right-container">
        <!-- language select -->
      </div>
    </div>
    <div class="b-donations-list-container">
      <Route
        v-for="{ id, name, img } in list"
        :key="id"
        :to="{ name: donationItemRoute, params: { id } }"
      >
        <div class="b-donations-list-item">
          <div
            class="b-donations-list-item-upper-block"
            :style="{ 'background-image': 'url(' + img + ')' }"
          ></div>

          <span>{{ name }}</span>
        </div>
      </Route>
    </div>
  </div>
</template>

<script>
import Route from '../../../components/shared/route/Route.vue';

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
];

export default {
  name: 'DonationList',
  components: {
    Route,
  },
  setup() {
    const list = listMock;
    const donationItemRoute = ROUTES.APPLICATION.DONATIONS.ITEM.name;

    const getDonationItemBgImage = (img) => `url(${img})`;

    return {
      list,
      donationItemRoute,
      getDonationItemBgImage,
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
.b-donations-header-right-container {
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
  margin-top: 16px;
}
.b-donations-list-item {
  width: 272px;
  height: 352px;
  border-radius: 6px;
  margin-left: 12px;
  background: linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, #dfdeed, #dfdeed);
  border: 1px solid #dfdeed;
}
.b-donations-list-item-upper-block {
  width: 272px;
  height: 184px;
}
</style>
