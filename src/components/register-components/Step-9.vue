<template>
  <step-wrapper
    :returnButton="stepConfig.returnButton"
    :nextButton="stepConfig.nextButton"
    :title="stepConfig.title"
    :subTitle="stepConfig.subTitle"
    :stepperLines="stepConfig.stepperLines"
  >
    <template #content>
      <div class="b-register-step__small-title mb-3">
        {{ $t('register.you-played-params') }}
      </div>

      <div
        class="b-sport-info d-flex justify-content-between align-baseline mb-3"
      >
        <mainInput
          v-model="height"
          :outside-title="true"
          :title="$t('register.height')"
          :placeholder="$t('register.height')"
          :title-width="0"
          type="number"
          name="height"
          v-maska="'###'"
        ></mainInput>
        <mainInput
          v-model="weight"
          :outside-title="true"
          :title="$t('register.weight')"
          :placeholder="$t('register.weight')"
          :title-width="0"
          type="number"
          name="weight"
          v-maska="'###'"
        ></mainInput>
        <dropdown
          v-model="workingLeg"
          :placeholder="$t('register.main-leg')"
          :outside-title="true"
          :main-title="$t('register.main-leg')"
          :options="mockData.main_lag"
          :width="200"
          :height="40"
          display-name="value"
          display-value="id"
          name="working_leg"
        />
      </div>
      <div class="b-register-step__small-title mb-3">
        {{ $t('register.you-played-position') }}
      </div>
      <div class="b-register-step__dropdown">
        <dropdown
          v-model="position"
          :placeholder="$t('register.position')"
          :outside-title="true"
          :main-title="$t('register.position')"
          :options="mockData.position"
          :width="200"
          :height="40"
          display-name="name"
          display-value="value"
          name="position"
        />
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GreenBtn from '../GreenBtn.vue';
import dropdown from '../shared/dropdown/dropdown.vue';
import mainInput from '../shared/input/mainInput.vue';
import StepWrapper from './StepWrapper.vue';

import CONSTANTS from '../../consts';

import arrowRight from '../../assets/img/arrow-right-white.svg';
import clipIcon from '../../assets/img/clip.svg';

export default {
  name: 'Step9',
  components: {
    GreenBtn,
    dropdown,
    mainInput,
    StepWrapper,
  },
  setup() {
    const position = ref(null);
    const height = ref(null);
    const weight = ref(null);
    const workingLeg = ref(null);

    const profesionaLevel = ref('');
    const clip = computed(() => {
      return clipIcon;
    });
    const isDocumentNeeded = computed(() => {
      return profesionaLevel.value === 'Професійно';
    });
    const mockData = computed(() => {
      return {
        main_lag: CONSTANTS.profile.mainLeg,
        position: CONSTANTS.profile.position,
      };
    });
    const { t } = useI18n();
    const stepConfig = computed(() => {
      return {
        title: t('register.sportData'),
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
          active: 2,
        },
      };
    });
    return {
      clip,
      profesionaLevel,
      isDocumentNeeded,
      mockData,
      stepConfig,
      position,
      height,
      weight,
      workingLeg,
    };
  },
};
</script>

<style lang="scss" scoped>
.b-register-step__small-title {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 10px;
  color: $--b-main-black-color;
}
:deep {
  .b-input__input-component {
    width: 20%;
  }
  .b-sport-info .b-dropdown {
    width: 55%;
  }
}
</style>
