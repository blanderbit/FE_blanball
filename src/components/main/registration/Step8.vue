<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :title="stepConfig.title"
    :stepperLines="stepConfig.stepperLines"
  >
    <template #content>
      <div class="b-register-step__small-title mb-3">
        {{ $t('register.birth-date') }}
      </div>
      <div class="b-register-step__date-block mb-2">
        <div class="b-register-step__dropdown">
          <dropdown
            v-model="day"
            :placeholder="$t('register.day')"
            :mainTitle="$t('register.day')"
            :options="mockData.days"
            display-name="value"
            display-value="id"
            name="day"
          />
        </div>
        <div class="b-register-step__dropdown">
          <dropdown
            v-model="month"
            :placeholder="$t('register.month')"
            :mainTitle="$t('register.month')"
            :options="mockData.months"
            display-name="value"
            display-value="id"
            name="month"
          />
        </div>
        <div class="b-register-step__dropdown">
          <dropdown
            v-model="year"
            :placeholder="$t('register.year')"
            :mainTitle="$t('register.year')"
            :options="mockData.years"
            display-name="value"
            display-value="value"
            name="year"
          />
        </div>
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GreenBtn from '../../shared/button/GreenBtn.vue';
import dropdown from '../../shared/dropdown/Dropdown.vue';
import StepWrapper from './StepWrapper.vue';

import CONSTANTS from '../../../consts/index';

import arrowRight from '../../../assets/img/arrow-right-white.svg';

export default {
  name: 'Step8',
  components: {
    GreenBtn,
    dropdown,
    StepWrapper,
  },
  setup() {
    const day = ref(null);
    const month = ref(null);
    const year = ref(null);

    const mockData = computed(() => {
      return {
        days: CONSTANTS.dates.days,
        months: CONSTANTS.dates.months,
        years: CONSTANTS.dates.years,
      };
    });
    const { t } = useI18n();
    const genderRadio = ref('');
    const stepConfig = computed(() => {
      return {
        title: t('register.get-acquainted'),
        returnButton: {
          exist: true,
          text: t('register.return'),
        },
        nextButton: {
          exist: true,
          text: t('register.next'),
          icon: arrowRight,
        },
        stepperLines: {
          exist: true,
          count: 3,
          active: 1,
        },
      };
    });
    return {
      mockData,
      genderRadio,
      stepConfig,
      day,
      month,
      year,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep {
  .b-radio {
    width: 40%;
  }
  .b-radio input[type='radio'] + .b-radio-label {
    width: 100%;
  }
}
.b-register-step__small-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: $--b-main-black-color;
}
.b-register-step__small-subtitle {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: $--b-main-gray-color;
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
