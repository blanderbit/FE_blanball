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
              :placeholder="$t('register.day')"
              :options="mockData.days"
              display-name="value"
              display-value="id"
              name="day"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown
              :placeholder="$t('register.month')"
              :options="mockData.months"
              display-name="value"
              display-value="id"
              name="month"
          />
        </div>
        <div class="b-register-step__dropdown">
          <Dropdown
              :placeholder="$t('register.year')"
              :options="mockData.years"
              display-name="value"
              display-value="value"
              name="year"
          />
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
  import { useI18n } from 'vue-i18n'

  import GreenBtn from '../GreenBtn.vue'
  import Dropdown from '../forms/Dropdown.vue'
  import StepWrapper from './StepWrapper.vue'

  import CONSTANTS from '../../consts/index'
  
  export default {
    name: 'Step8',
    components: {
      GreenBtn,
      Dropdown,
      StepWrapper
    },
    setup() {
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
            count: 3,
            active: 1
          }
        }
      });
      return {
        mockData,
        genderRadio,
        stepConfig
      }
    },
  }
</script>

<style lang="scss" scoped>
@import '../../assets/styles/mixins/device.scss';

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
      @include tablet {
        width: 133px;
      }
      @include mobile {
        width: 32.5%;
      }
    }
  }
</style>