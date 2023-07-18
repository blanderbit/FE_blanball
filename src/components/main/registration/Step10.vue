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
        {{ $t('register.your-city') }}
      </div>
      <div class="b-register-step__dropdown">
        <dropdown
          :outside-title="true"
          :main-title="$t('register.district')"
          :placeholder="$t('register.district')"
          :options="mockData.district"
          :model-value="region"
          :height="40"
          taggable
          @new-value="changeRegions"
          display-name="name"
          display-value="name"
          name="region"
        />
      </div>
      <div class="b-register-step__dropdown">
        <dropdown
          :outside-title="true"
          :main-title="$t('register.city')"
          :placeholder="$t('register.city')"
          :options="mockData.cities"
          :model-value="city"
          :height="40"
          taggable
          @new-value="changeCity"
          display-name="name"
          display-value="name"
          name="city"
        />
      </div>
      <div class="b-register-step__dropdown">
        <MainInput
          :title="$t('register.address')"
          :swipeTitle="false"
          :placeholder="$t('register.address-placeholder')"
          :model-value="address"
          :title-width="0"
          outsideTitle
          :height="40"
          @input="changeAddress($event)"
          name="address"
        ></MainInput>
      </div>
      <div class="b-register-step__map">
        <RegisterModalPositionMap
          v-if="isMobile"
          :title="$t('register.select-position-on-map')"
        >
        </RegisterModalPositionMap>
      </div>
    </template>
  </step-wrapper>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

import dropdown from '@sharedComponents/dropdown/Dropdown.vue';
import MainInput from '@sharedComponents/input/MainInput.vue';
import RegisterModalPositionMap from './modals/RegisterModalPositionMap.vue';
import StepWrapper from './StepWrapper.vue';

import { PositionMapBus } from '@/workers/event-bus-worker';
import { API } from '@/workers/api-worker/api.worker';
import { useDevice } from 'next-vue-device-detector';
import { useWindowWidth } from '@/workers/window-size-worker/widthScreen';

import { CONSTS } from '@/consts/index';

import tickIcon from '@images/tick-white.svg';
import nikeIcon from '@images/nike-icon.svg';
import {
  finishSpinner,
  startSpinner,
} from '@/workers/loading-worker/loading.worker';

export default {
  name: 'Step10',
  components: {
    dropdown,
    MainInput,
    StepWrapper,
    RegisterModalPositionMap,
  },
  setup() {
    const { isMobile } = useWindowWidth();
    const region = ref('');
    const city = ref('');
    const address = ref('');
    const nextButton = ref(false);
    const mockData = computed(() => {
      return {
        cities:
          CONSTS.register.jsonCityRegions.find((item) =>
            item.name.includes(region.value)
          )?.cities || [],
        district: CONSTS.register.jsonCityRegions,
      };
    });
    const tick = computed(() => {
      return tickIcon;
    });
    async function getCoordsByName(str) {
      return await API.LocationService.GetPlaceByAddress(str);
    }
    PositionMapBus.on('update:coords', (e) => {
      region.value = e.place.region;
      city.value = e.place.village || e.place.city;
      loading.value = false;
      nextButton.value = !region.value || !city.value || !address.value;
    });
    let timeout;
    const { t } = useI18n();
    const device = useDevice();
    const stepConfig = computed(() => ({
      title: t('register.locations'),
      subTitle: t('register.which-areas'),
      returnButton: {
        exist: true,
        text: t('register.return'),
      },
      nextButton: {
        exist: true,
        text: t('register.finish'),
        disabled: nextButton.value,
        icon: nikeIcon,
      },
      stepperLines: {
        exist: true,
        count: 3,
        active: 3,
      },
    }));
    PositionMapBus.on('update:coords-error', () => {
      nextButton.value = true;
      region.value = '';
      city.value = '';
      address.value = '';
    });
    return {
      mockData,
      tick,
      region,
      city,
      address,
      stepConfig,
      nextButton,
      device,
      isMobile,
      async changeRegions(e) {
        region.value = e;
        city.value = '';
        address.value = '';
        startSpinner();
        try {
          PositionMapBus.emit(
            'update:map:by:coords',
            await getCoordsByName(region.value)
          );
          nextButton.value = !region.value || !city.value || !address.value;
        } catch (e) {
          nextButton.value = true;
        }
        finishSpinner();
      },
      async changeCity(e) {
        city.value = e;
        address.value = '';
        startSpinner();
        try {
          PositionMapBus.emit(
            'update:map:by:coords',
            await getCoordsByName(`${region.value} ${city.value}`)
          );
          nextButton.value = !region.value || !city.value || !address.value;
        } catch (e) {
          nextButton.value = true;
        }
        finishSpinner();
      },
      async changeAddress(e) {
        address.value = e.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          startSpinner();
          try {
            PositionMapBus.emit(
              'update:map:by:coords',
              await getCoordsByName(
                `${region.value} ${city.value} ${address.value}`
              )
            );
            nextButton.value = !region.value || !city.value || !address.value;
          } catch (e) {
            nextButton.value = true;
          }
          finishSpinner();
        }, 500);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.b-register-step__title {
  font-family: 'Exo 2';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  color: $--b-main-black-color;
  @include mobile {
    text-align: center;
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
.b-register-step__dropdown {
  width: 384px;
  margin-bottom: 15px;
  @media (max-width: 992px) {
    width: 100%;
  }
}
.b-register-step__map {
  display: flex;
  gap: 8px;
}
</style>
