<template>
  <div>
    <div class="b-modal-position__address-text" @click="activeModal = true">
      <img :src="icons.tick" alt="" />
      <span>
        {{
          region || city ? `${region} ${city}` : $t('events.select-position')
        }}
      </span>
    </div>
    <ModalWindow v-if="activeModal" :isTitleShown="false">
      <loader :is-loading="loading" />
      <Form v-slot="data" @submit="disableSubmit" :validation-schema="schema">
        <div class="b-modal-position__block">
          <dropdown
            :outside-title="true"
            :placeholder="$t('register.district')"
            :main-title="$t('register.district')"
            :options="mockData.district"
            v-model="region"
            taggable
            @new-value="changeRegions"
            display-name="name"
            display-value="name"
            name="region"
          />
        </div>
        <div class="b-modal-position__block">
          <dropdown
            :outside-title="true"
            :placeholder="$t('register.city')"
            :main-title="$t('register.city')"
            :options="mockData.cities"
            v-model="city"
            taggable
            @new-value="changeCity"
            display-name="name"
            display-value="name"
            name="city"
          />
        </div>

        <div class="b-modal-position__block">
          <MainInput
            :outside-title="true"
            :title="$t('register.search-radius')"
            :placeholder="$t('register.search-radius')"
            v-model="dist"
            :title-width="0"
            name="dist"
            :immediate="true"
          ></MainInput>
        </div>

        <div class="b-modal-position__block b-modal-position__map">
          <position-map
            :coords="coords"
            :radius="dist"
            @update:coords="updateCoords"
            @map-loaded="loading = false"
          ></position-map>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="b-modal-position__clear" @click="activeModal = false">
            {{ $t('buttons.cancel') }}
          </div>
          <GreenBtn
            :text="$t('buttons.save')"
            :width="140"
            :height="40"
            :disabled="nextButton"
            @click-function="save(data)"
          />
        </div>
      </Form>
    </ModalWindow>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

import { Form } from '@system.it.flumx.com/vee-validate';

import PositionMap from './PositionMap.vue';
import dropdown from '../shared/dropdown/Dropdown.vue';
import MainInput from '../shared/input/MainInput.vue';
import ModalWindow from '../ModalWindows/ModalWindow.vue';
import GreenBtn from '../shared/button/GreenBtn.vue';
import loader from '../shared/loader/Loader.vue';

import { PositionMapBus } from '../../workers/event-bus-worker';
import { API } from '../../workers/api-worker/api.worker';

import CONSTANTS from '../../consts';

import tickIcon from '../../assets/img/location-point.svg';
import SCHEMAS from '../../validators/schemas';

export default {
  components: {
    ModalWindow,
    PositionMap,
    dropdown,
    MainInput,
    Form,
    GreenBtn,
    loader,
  },
  props: {
    modelValue: Object,
    default: () => ({}),
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const region = ref('');
    const city = ref('');
    const dist = ref(300);
    const nextButton = ref(false);
    const coords = ref({});
    const loading = ref(true);
    const activeModal = ref(false);

    const schema = computed(() => {
      return SCHEMAS.positionMap.schema(true);
    });

    const icons = computed(() => {
      return {
        tick: tickIcon,
      };
    });
    function setValue() {
      if (!props.modelValue) return;
      const [Sregion, SCity] = props.modelValue.place?.split?.(',') || [];
      region.value = Sregion ? new String(Sregion) : '';
      city.value = SCity ? new String(SCity) : '';
      coords.value = {
        lat: props.modelValue.lat,
        lng: props.modelValue.lng,
      };
    }
    watch(
      () => props.modelValue,
      () => {
        setValue();
      },
      {
        immediate: true,
      }
    );
    watch(
      () => activeModal.value,
      () => {
        if (!activeModal.value) return;
        PositionMapBus.emit('update:map:by:coords', {
          data: {
            coordinates: {
              lat: props.modelValue.lat,
              lon: props.modelValue.lng,
            },
          },
        });
        setValue();
      },
      {
        immediate: true,
      }
    );
    const mockData = computed(() => {
      return {
        cities:
          CONSTANTS.register.jsonCityRegions.find((item) =>
            item.name.includes(region.value)
          )?.cities || [],
        district: CONSTANTS.register.jsonCityRegions,
      };
    });
    function updateCoords(e) {
      coords.value = {
        lat: e.lat,
        lng: e.lng,
      };
      region.value = e.place.region;
      city.value = e.place.village || e.place.city;
      nextButton.value = !region.value || !city.value;
    }
    async function getCoordsByName(str) {
      return await API.LocationService.GetPlaceByAddress(str);
    }
    let timeout;
    return {
      schema,
      mockData,
      region,
      city,
      dist,
      loading,
      nextButton,
      icons,
      async changeRegions(e) {
        region.value = e;
        city.value = '';
        loading.value = true;
        try {
          PositionMapBus.emit(
            'update:map:by:coords',
            await getCoordsByName(region.value)
          );
          nextButton.value = !region.value || !city.value;
        } catch (e) {
          nextButton.value = true;
        }
        loading.value = false;
      },
      async changeCity(e) {
        city.value = e;
        loading.value = true;
        try {
          PositionMapBus.emit(
            'update:map:by:coords',
            await getCoordsByName(`${region.value} ${city.value}`)
          );
          nextButton.value = !region.value || !city.value;
        } catch (e) {
          nextButton.value = true;
        }
        loading.value = false;
      },
      updateCoords,
      activeModal,
      coords,
      async save(data) {
        const { valid } = await data.validate();
        if (!valid) return;
        emit('update:modelValue', {
          ...coords.value,
          dist: dist.value,
          place: `${region.value},${city.value}`,
        });
        activeModal.value = false;
      },
      disableSubmit: (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
    };
  },
};
</script>
<style scoped lang="scss">
.b-modal-position__address-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  width: 100%;
  color: $--b-main-black-color;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    margin-right: 10px;
  }
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
}
.b-modal-position__block {
  margin-bottom: 15px;
}
.b-modal-position__map {
  height: 300px;
}
.b-modal-position__clear {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: $--b-main-gray-color;
}
</style>
