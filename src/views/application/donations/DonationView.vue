<template>
  <div class="b-donation">
    <div class="b-donation-img" :style="imageStyle"></div>
    <div class="b-donation-right-container">
      <div class="b-donation-title">
        {{ nameMock }}
      </div>
      <div class="b-donation-right-container-block-2">
        <div class="b-donation-right-container-block-2-left-block">
          <div class="b-donation-progress-bar-label-container">
            <span class="b-donation-progress-bar-label">{{
              t('donations.raised')
            }}</span>
            <span class="b-donation-progress-bar-label">{{
              t('donations.aim')
            }}</span>
          </div>
          <div class="b-donation-progress-bar-container">
            <LinearProgress :value="percentageMock" />
          </div>
          <div class="b-donation-progress-money-container">
            <span class="b-donation-raised">{{
              getMoneyValue(raisedMock)
            }}</span>
            <span class="b-donation-aim">{{ getMoneyValue(aimMock) }}</span>
          </div>
        </div>
        <div class="b-donation-lower-block-right-block">
          <span class="b-donation-percentage-number">{{ percentageMock }}</span>
          <span class="b-donation-percentage-sign">%</span>
        </div>
      </div>
      <div class="b-donation-default-btn-container">
        <button
          class="b-donation-default-btn"
          v-for="value in defaultButtonList"
          :key="value"
          @click="onExampletMoneyClick(value)"
        >
          <span class="b-donation-default-btn-label">{{ value }} грн</span>
        </button>
      </div>
      <div class="b-donation-input-container">
        <input
          class="b-donation-input"
          type="number"
          placeholder="Вкажіть суму, грн"
          :value="inputValue"
          @input="onInput"
        />
      </div>
      <div class="b-donation-support-btn-conatiner">
        <button class="b-donation-support-btn" @click="onSubmit">
          <span class="b-donation-support-btn-label">{{
            t('donations.support_fundraise')
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import LinearProgress from '../../../components/shared/progress/LinearProgress.vue';

import img from '../../../assets/img/donation.svg';

export default {
  name: 'DonationView',
  components: { LinearProgress },
  setup() {
    const { t } = useI18n();
    const imageStyle = { backgroundImage: `url(${img})` };
    const nameMock = 'Назва збору у декількох словах'; //NOTE: mock until EP for donation is ready
    const raisedMock = 378; //NOTE: mock until EP for donation is ready
    const aimMock = 3000; //NOTE: mock until EP for donation is ready
    const percentageMock = 30; //NOTE: mock until EP for donation is ready
    const defaultButtonList = [25, 50, 75, 100, 250];
    const inputValue = ref('');

    const getMoneyValue = (value) => `${value} ₴`;
    const onExampletMoneyClick = (value) => (inputValue.value = value);
    const onInput = (event) => (inputValue.value = event.target.value);
    const onSubmit = () => console.log({ donation: inputValue.value });

    return {
      t,
      imageStyle,
      nameMock,
      raisedMock,
      aimMock,
      percentageMock,
      defaultButtonList,
      inputValue,
      getMoneyValue,
      onExampletMoneyClick,
      onInput,
      onSubmit,
    };
  },
};
</script>

<style lang="scss">
.b-donation {
  width: 100%;
  display: flex;
}
.b-donation-img {
  width: 560px;
  height: 322px;
  flex-shrink: 0;
  border-radius: 12px;
}
.b-donation-right-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  height: 548px;
}
.b-donation-title {
  color: $--b-main-black-color;
  font-family: 'Exo 2';
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 48px; /* 133.333% */
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.b-donation-right-container-block-2 {
  padding-top: 24px;
  width: 100%;
  display: flex;
}
.b-donation-right-container-block-2-left-block {
  width: 404px;
}
.b-donation-progress-bar-label-container {
  display: flex;
  justify-content: space-between;
}
.b-donation-progress-bar-label {
  color: $--b-main-gray-color;
  text-align: center;
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
.b-donation-raised {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: $--b-main-green-color;
  text-overflow: ellipsis;
  font-family: 'Lato';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
.b-donation-aim {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: $--b-main-black-color;
  text-overflow: ellipsis;
  font-family: 'Lato';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 120% */
}
.b-donation-progress-money-container {
  display: flex;
  justify-content: space-between;
}
.b-donation-lower-block-right-block {
  padding-left: 24px;
  display: flex;
  align-items: center;
}
.b-donation-percentage-number {
  color: $--b-main-green-color;
  text-align: center;
  font-family: 'Lato';
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
}
.b-donation-percentage-sign {
  color: $--b-main-green-color;
  text-align: center;
  font-family: 'Lato';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
}
.b-donation-default-btn-container {
  display: flex;
  padding-top: 24px;
  margin-left: -8px;
}
.b-donation-default-btn {
  display: flex;
  height: 28px;
  padding: 6px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #dcdce2;
  min-width: 53px;
  margin-left: 8px;
  cursor: pointer;
  background: transparent;
  transition: all 0.25s;

  &:hover,
  &:active {
    border: 1px solid #8a8aa8;
  }
}
.b-donation-default-btn-label {
  color: $--b-main-black-color;
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
}
.b-donation-input-container {
  padding-top: 24px;
  width: 240px;
}
.b-donation-input {
  width: 100%;
  min-width: 260px;
  height: 40px;
  padding: 8px 8px 8px 12px;
  border-radius: 6px;
  border: 1px solid #dcdce2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #fff;
  outline: none;

  &:hover,
  &:active {
    border: 1px solid #8a8aa8;
    outline: none;
  }
}
.b-donation-support-btn-conatiner {
  padding-top: 24px;
}
.b-donation-support-btn {
  width: 177px;
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: $--b-main-green-color;
  outline: none;
  border: 0;
  cursor: pointer;
  transition: all 0.25s;

  &:hover,
  &:active {
    filter: brightness(1.05);
    outline: none;
  }
}
.b-donation-support-btn-label {
  color: #fff;
  text-align: center;
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
}
</style>
