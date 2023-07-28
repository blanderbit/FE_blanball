<template>
  <div class="b-donation">
    <div class="b-donation-left-container">
      <div class="b-donation-title">
        {{ nameMock }}
      </div>
      <div class="b-donation-description">
        {{ descriptionMock }}
      </div>
      <form @submit="submitForm">
        <div class="b-donation-select-amount-container">
          <span class="b-donation-select-amount">Оберіть сумму</span>
          <div class="b-donation-currency-toggle-container">
            <div class="b-donation-currency-toggle-item">
              <RadioButton
                class="b-donation-currency-toggle-item-input"
                type="radio"
                id="uah"
                name="currency"
                :value="currencyDict.UAH"
                title="UAH"
                v-model="currencyValue"
              />
            </div>
            <div class="b-donation-currency-toggle-item">
              <RadioButton
                class="b-donation-currency-toggle-item-input"
                type="radio"
                id="usd"
                name="currency"
                :value="currencyDict.USD"
                title="USD"
                v-model="currencyValue"
              />
            </div>
          </div>
        </div>
        <div class="b-donation-amount-option-button-group">
          <WhiteBtn
            class="b-donation-amount-option-button"
            v-for="value in amountOptions"
            :key="value"
            :text="getAmountOptionValue(value)"
            :height="46"
            :width="90"
            @click="onAmountOptionClick(value)"
          />
        </div>
        <div class="b-donation-enter-your-amount-container">
          <div></div>
          <span>або введіть власну суму</span>
          <div></div>
        </div>
        <div class="b-donation-input-container">
          <MainInput
            placeholder="Сума переказу"
            name="amount"
            type="number"
            :titleWidth="0"
            :height="48"
            :modelValue="amountValue"
          />
          <GreenBtn
            class="b-donation-support-button"
            text="Підтримати збір"
            type="submit"
            :height="48"
            :width="177"
          />
        </div>
        <!-- <div class="b-donation-anonymous-container">
          <span class="b-donation-anonymous-title"
            >Відправити кошти анонімно</span
          >
          <Switcher
            class="b-donation-anonymous-switcher"
            :modelValue="isAnonymous"
            @update:modelValue="isAnonymous = !isAnonymous"
            name="switcher"
          />
        </div> -->
      </form>
    </div>

    <div class="b-donation-img" :style="imageStyle">
      <div class="b-donation-fund-container">
        <div class="b-donation-fund-top-container">
          <img src="../../../assets/img/circle-download.svg" />
          <span class="b-donation-fund-raised-amount">378 ₴</span>
          <span class="b-donation-fund-raised-text">Зібрано грошей</span>

          <div class="b-donation-fund-top-container-circle">
            <div class="b-donation-fund-aim-percentage">
              <span>30</span><span>%</span>
            </div>
            <span class="b-donation-fund-raised-text">Збору закрито</span>
          </div>
        </div>

        <div class="b-donation-fund-aim-container">
          <img src="../../../assets/img/group.svg" />
          <span class="b-donation-fund-raised-amount">3 000 ₴</span>
          <span class="b-donation-fund-raised-text">Ціль збору</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import LinearProgress from '../../../components/shared/progress/LinearProgress.vue';
import RadioButton from '../../../components/shared/radioButton/RadioButton.vue';
import WhiteBtn from '../../../components/shared/button/WhiteBtn.vue';
import GreenBtn from '../../../components/shared/button/GreenBtn.vue';
import MainInput from '../../../components/shared/input/MainInput.vue';
// import Switcher from '../../../components/shared/switcher/Switcher.vue';

import img from '../../../assets/img/donation.svg';

//NOTE: mock until EP for donation is ready
const nameMock = 'Розширення можливостей BlanBall';
const descriptionMock = `Підтримайте розробку нової функції спортивного додатку BlanBall! Перед вами відкривається можливість зробити внесок у розмірі 5000 грн, щоб підтримати розробку цікавої та корисної функціональності. Ваша підтримка допоможе нам забезпечити ще більше можливостей для наших користувачів. Приєднуйтесь до нас у цьому захоплюючому шляху розвитку BlanBall! Дякуємо за вашу підтримку!`;
const raisedMock = 378;
const aimMock = 3000;
const percentageMock = 30;

const amountOptions = [25, 50, 75, 100, 250];
const currencyDict = {
  UAH: 'uah',
  USD: 'usd',
};
const currencySignDict = {
  [currencyDict.UAH]: '₴',
  [currencyDict.USD]: '$',
};

export default {
  name: 'DonationView',
  components: {
    LinearProgress,
    RadioButton,
    WhiteBtn,
    GreenBtn,
    MainInput,
    // Switcher,
  },
  setup() {
    const { t } = useI18n();
    const imageStyle = { backgroundImage: `url(${img})` };
    const inputValue = ref('');
    const currencyValue = ref(currencyDict.UAH);
    const amountValue = ref('');
    const isAnonymous = ref(true);

    const currencySign = computed(() => currencySignDict[currencyValue.value]);

    const getAmountOptionValue = (value) => `${value} ${currencySign.value}`;
    const onAmountOptionClick = (value) => (amountValue.value = Number(value));
    const submitForm = (value) => {
      console.log(value);
    };

    return {
      t,
      imageStyle,
      nameMock,
      descriptionMock,
      raisedMock,
      aimMock,
      percentageMock,
      inputValue,
      amountOptions,
      currencyValue,
      currencyDict,
      currencySign,
      amountValue,
      isAnonymous,
      getAmountOptionValue,
      onAmountOptionClick,
      submitForm,
    };
  },
};
</script>

<style lang="scss">
.b-donation {
  width: 100%;
  display: flex;
}
.b-donation-left-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-width: 480px;
  margin-right: 88px;
}
.b-donation-title {
  color: $--b-main-black-color;
  font-family: 'Exo 2';
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: 48px; /* 150% */
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  margin-bottom: 20px;
}
.b-donation-description {
  margin-bottom: 20px;
  color: $--b-main-black-color;
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 20px;
}
.b-donation-select-amount-container {
  display: flex;
  justify-content: space-between;
}
.b-donation-select-amount {
  color: $--b-main-black-color;
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
}
.b-donation-currency-toggle-container {
  display: flex;
}
.b-donation-currency-toggle-item {
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.b-donation-currency-toggle-item-input {
  width: 56px;
  height: 20px;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;

  & input {
    width: 20px;
    height: 20px;
  }

  & label > span {
    color: $--b-main-black-color;
    font-family: 'Inter';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  & label::before {
    width: 16px !important;
    height: 16px !important;
  }
}

.b-donation-amount-option-button-group {
  display: flex;
  margin-top: 6px;
  justify-content: space-between;
}

.b-donation-amount-option-button {
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  height: 46px;
  width: 90px;
  max-width: 90px;
  border: 1px solid #dcdce2 !important;
  color: $--b-main-black-color !important;
  transition: all 0.25s !important;

  &:hover,
  &:active {
    border: 1px solid #8a8aa8 !important;
  }
}

.b-donation-enter-your-amount-container {
  display: flex;
  margin-top: 12px;

  & div {
    height: 10px;
    flex-grow: 1;
    border-bottom: 1px solid #f0f0f4;
  }

  & span {
    color: #575775;
    text-align: center;
    font-family: 'Inter';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin: 0 8px;
  }
}

.b-donation-input-container {
  margin-top: 12px;
  display: flex;

  & .b-input__wrapper {
    transition: all 0.25s !important;
  }
}

.b-donation-support-button {
  margin-left: 8px;
  min-width: 177px;
}

.b-donation-anonymous-container {
  margin-top: 12px;
  display: flex;
  align-items: center;
}

.b-donation-anonymous-title {
  color: #575775;
  font-family: 'Inter';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.b-donation-anonymous-switcher {
  margin-left: 8px;
}

.b-donation-img {
  width: 568px;
  height: 568px;
  flex-shrink: 0;
  border-radius: 12px;
  background-position-x: -8px;
  background-position-y: -8px;
  position: relative;
}

.b-donation-fund-container {
  width: 140px;
  height: 468px;
  position: absolute;
  top: 28px;
  left: -40px;
  border-radius: 8px;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
  display: flex;
  flex-direction: column;
}

.b-donation-fund-top-container {
  width: 140px;
  height: 296px;
  border-radius: 70px;
  background: #fafaff;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.b-donation-fund-raised-amount {
  color: #262541;
  font-family: 'Lato';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  margin-top: 12px;
}

.b-donation-fund-raised-text {
  color: #262541;
  font-family: 'Inter';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}

.b-donation-fund-top-container-circle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 140px;
  height: 140px;
  padding: 16px;
  border-radius: 100px;
  border: 1.5px solid #fafaff;
  background: #e3fbfa;
  bottom: 0;
}
.b-donation-fund-aim-percentage {
  display: flex;

  & > span {
    color: #148783;
    font-family: 'Lato';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
  }

  & > span:last-child {
    font-size: 24px;
  }
}

.b-donation-fund-aim-container {
  display: flex;
  width: 140px;
  height: 156px;
  padding: 20px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1.5px solid #148783;
  background: #e3fbfa;
  margin-top: 16px;
}
</style>
