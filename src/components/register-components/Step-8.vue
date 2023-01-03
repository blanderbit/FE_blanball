<template>
  <step-wrapper
      :returnButton="stepConfig.returnButton"
      :nextButton="stepConfig.nextButton"
      :title="stepConfig.title"
      :stepperLines="stepConfig.stepperLines"
  >
    <template #content>
      <div class="b-register-step__small-title mb-3">
        {{$t('register.birth-date')}}
      </div>
      <div class="b-register-step__date-block mb-2">
        <div class="b-register-step__dropdown">
          <Dropdown
              :main-title="$t('register.day')"
              :placeholder="$t('register.day')"
              :options="mockData.days"
              display-name="value"
              display-value="id"
              name="day"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown
              :main-title="$t('register.month')"
              :placeholder="$t('register.month')"
              :options="mockData.months"
              display-name="value"
              display-value="id"
              name="month"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown
              :main-title="$t('register.year')"
              :placeholder="$t('register.year')"
              :options="mockData.years"
              display-name="value"
              display-value="value"
              name="year"
          />
        </div>
      </div>
      <div class="b-register-step__small-title">
        {{$t('register.you-identified-as')}}
      </div>
      <div class="b-register-step__gender-block mb-3">
        <div class="radio-btn-wrapper">
          <radio-button
              name="gender"
              :title="$t('register.men')"
              value="Man"
              :url="icons.MaleIcon"
          ></radio-button>
          <radio-button
              name="gender"
              :title="$t('register.women')"
              value="Woman"
              :url="icons.FemaleIcon"
          ></radio-button>
        </div>
      </div>

      <div class="b-register-step__small-subtitle">
        {{$t('register.you_must_have_6_or_more_years')}}
      </div>
    </template>
  </step-wrapper>
</template>

<script>
  import { computed, ref } from 'vue'

  import GreenBtn from '../GreenBtn.vue'
  import Dropdown from '../forms/Dropdown.vue'
  import RadioButton from '../forms/RadioButton.vue'

  import CONSTANTS from '../../consts/index'
  import StepWrapper from './StepWrapper.vue'
  import { useI18n } from 'vue-i18n'
  import MaleIcon from '../../assets/img/male-icon.svg';
  import FemaleIcon from '../../assets/img/female-icon.svg';

  export default {
    name: 'Step8',
    components: {
      GreenBtn,
      Dropdown,
      RadioButton,
      StepWrapper
    },
    setup() {
      const icons = computed(() => {
        return {
          MaleIcon,
          FemaleIcon
        }
      })
      const mockData = computed(() => {
        return {
          days: CONSTANTS.register.days,
          months: CONSTANTS.register.months,
          years: CONSTANTS.register.years
        }
      });
      const {t} = useI18n();
      const genderRadio = ref('');
      const stepConfig = computed(() => {
        return {
          title: t('register.get-acquainted'),
          returnButton: {
            exist: true,
            text: t('register.return')
          },
          nextButton: {
            exist: true,
            text: t('register.next')
          },
          stepperLines: {
            exist: true,
            count: 4,
            active: 2
          }
        }
      });
      return {
        icons,
        mockData,
        genderRadio,
        stepConfig
      }
    },
  }
</script>

<style lang="scss" scoped>

  ::v-deep {
    .b-radio {
      width: 40%;

    }
    .b-radio input[type=radio] + .b-radio-label {
      width: 100%;
    }
  }
  .b-register-step__small-title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #262541;
  }
  .b-register-step__small-subtitle {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #575775;
  }

  .b-register-step__date-block {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    .b-register-step__dropdown {
      margin-right: 10px;
      width: 120px;
      @media (min-width: 576px) and (max-width: 992px) {
        width: 133px;
      }
      @media (max-width: 576px) {
        width: 32.5%;
      }
    }
  }

  .b-register-step__gender-block {
    margin-top: 12px;
    .radio-btn-wrapper {
      $color1: #f4f4f4;
      $color2: #148783;
      display: flex;
      align-items: center;
    }
  }
</style>