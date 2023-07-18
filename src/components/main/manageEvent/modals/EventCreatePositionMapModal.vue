<template>
  <div>
    <div class="b-modal-position__address-text" @click="activeModal = true">
      <img :src="icons.tick" alt="" />
      <span>
        {{
          region || city
            ? `${region} ${city} ${address}`
            : $t('events.select-position')
        }}
      </span>
    </div>
    <Teleport to="body">
      <ModalWindow v-if="activeModal" :isTitleShown="false">
        <Form v-slot="data" @submit="disableFormSubmit" :validation-schema="schema">
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

          <div class="b-modal-position__block b-modal-position__map">
            <position-map
              :coords="coords"
              @update:coords="updateCoords"
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
    </Teleport>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

import { Form } from '@system.it.flumx.com/vee-validate';

import PositionMap from '@components/maps/PositionMap.vue';
import dropdown from '@sharedComponents/dropdown/Dropdown.vue';
import MainInput from '@sharedComponents/input/MainInput.vue';
import ModalWindow from '@sharedComponents/modals/ModalWindow.vue';
import GreenBtn from '@sharedComponents/button/GreenBtn.vue';

import { PositionMapBus } from '@workers/event-bus-worker';
import { API } from '@workers/api-worker/api.worker';
import { startSpinner, finishSpinner } from '@workers/loading-worker/loading.worker';
import { disableFormSubmit } from '@utils/disableFormSubmit';

import { CONSTS } from '@consts';

import tickIcon from '@images/location-point.svg';
import { SCHEMAS } from '@/validators/schemas';

export default {
  components: {
    ModalWindow,
    PositionMap,
    dropdown,
    MainInput,
    Form,
    GreenBtn,
  },
  props: {
    modelValue: Object,
    default: () => ({}),
    mode: {
      type: String,
      default: 'aggressive',
    },
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const region = ref('');
    const city = ref('');
    const address = ref('');
    const nextButton = ref(false);
    const coords = ref({});
    const activeModal = ref(false);

    const schema = computed(() => {
      return SCHEMAS.positionMap.schema;
    });

    const icons = computed(() => {
      return {
        tick: tickIcon,
      };
    });
    function setValue() {
      if (!props.modelValue) return;
      const [Sregion, SCity, Saddress] =
        props.modelValue.place?.split?.(',') || [];
      region.value = Sregion ? new String(Sregion) : '';
      city.value = SCity ? new String(SCity) : '';
      address.value = Saddress ? new String(Saddress) : '';
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
          CONSTS.register.jsonCityRegions.find((item) =>
            item.name.includes(region.value)
          )?.cities || [],
        district: CONSTS.register.jsonCityRegions,
      };
    });
    function updateCoords(e) {
      coords.value = {
        lat: e.lat,
        lng: e.lng,
      };
      region.value = e.place.region;
      city.value = e.place.village || e.place.city;
      address.value = e.place.street;
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
      nextButton,
      address,
      icons,
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
          nextButton.value = !region.value || !city.value;
        } catch (e) {
          nextButton.value = true;
        }
        finishSpinner();
      },
      async changeCity(e) {
        city.value = e;
        startSpinner();
        try {
          PositionMapBus.emit(
            'update:map:by:coords',
            await getCoordsByName(
              `${region.value} ${city.value} ${address.value}`
            )
          );
          nextButton.value = !region.value || !city.value;
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
      updateCoords,
      activeModal,
      coords,
      async save(data) {
        const { valid } = await data.validate();
        if (!valid) return;
        emit('update:modelValue', {
          ...coords.value,
          place: `${region.value},${city.value},${address.value}`,
        });
        activeModal.value = false;
      },
      disableFormSubmit
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
  cursor: pointer;
}
</style>
