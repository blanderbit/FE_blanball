<template>
 <div>
   <div @click="activeModal = true">
     {{region || city || address ? `${region} ${city} ${address}`: 'selectPosition'}}
   </div>
   <ModalWindow v-if="activeModal" :isTitleShown="false">
     <Form
         v-slot="data"
         :validation-schema="schema"
     >
       <div class="b-modal-position__block">
         <Dropdown
             :outside-title="true"
             :main-title="$t('register.city')"
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
         <Dropdown
             :outside-title="true"
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
         <InputComponent
             :title="$t('register.weight')"
             :placeholder="'Address'"
             v-model="address"
             :title-width="0"
             @input="changeAddress($event)"
             name="address"
         ></InputComponent>
       </div>
       <div class="b-modal-position__block">
         <InputComponent
             :title="$t('register.weight')"
             :placeholder="'dist'"
             v-model="dist"
             :title-width="0"
             name="dist"
             :immediate="true"
         ></InputComponent>
       </div>

       <div
           class="b-modal-position__block b-modal-position__map"
       >
         <position-map :coords="coords" @update:coords="updateCoords"></position-map>
       </div>
       <div class="d-flex justify-content-between align-items-center">
         <div class="b-modal-position__clear" @click="activeModal = false">
           Скасувати
         </div>
         <GreenBtn
             :text="'Зберегти'"
             :width="140"
             :height="40"
             @click-function="save(data)"
         />
       </div>
     </Form>
   </ModalWindow>
 </div>
</template>

<script>
  import PositionMap from './PositionMap.vue';
  import Dropdown from './../forms/Dropdown.vue';
  import InputComponent from './../forms/InputComponent.vue';
  import * as yup from "yup";
  import {ref, computed, watch} from "vue";
  import CONSTANTS from "../../consts";
  import ModalWindow from "../ModalWindow.vue";
  import { Form } from '@system.it.flumx.com/vee-validate'
  import { PositionMapBus } from "../../workers/event-bus-worker";
  import { API } from "../../workers/api-worker/api.worker";
  import GreenBtn from '../../components/GreenBtn.vue'
  export default {
    components: {
      ModalWindow,
      PositionMap,
      Dropdown,
      InputComponent,
      Form,
      GreenBtn
    },
    props: {
      modelValue: Object,
      default: () => ({

      })
    },
    emits: [
      'update:modelValue'
    ],
    setup(props,  {emit}) {
      const region = ref('');
      const city = ref('');
      const address = ref('');
      const dist = ref(300);
      const coords = ref({

      });
      const activeModal = ref(false);
      const schema = yup.object({
        region: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required(),
      })

      watch(
        () => props.modelValue,
        () => {
          if(!props.modelValue) return
          const [Sregion,  SCity, SAddress] = props.modelValue.place?.split?.(',') || [];
          region.value =Sregion
          city.value =SCity
          address.value =SAddress
          dist.value = props.modelValue.dist?.toString()
          coords.value = {
            lat: props.modelValue.lat,
            lng: props.modelValue.lng
          }
        },
        {
          immediate: true
        }
      )
      watch(
        () => activeModal.value,
        () => {

          if(!activeModal.value) return


          PositionMapBus.emit('update:map:by:coords', {
            data: {
              coordinates: {
                lat: props.modelValue.lat,
                lon: props.modelValue.lng
              }
            }
          })
        },
        {
          immediate: true
        }
      )
      const mockData = computed(() => {
        return {
          cities: CONSTANTS.register.jsonCityRegions.find(item => item.name.includes(region.value))?.cities || [],
          district: CONSTANTS.register.jsonCityRegions,
        }
      });

      function updateCoords (e) {

        coords.value = {
          lat: e.lat,
          lng: e.lng,
        };
        region.value = e.place.state;
        city.value = e.place.city || e.place.town|| e.place.village;
        address.value = `${e.place.neighbourhood || ''} ${e.place.road || ''} ${e.place.house_number || ''} ${e.place.postcode || ''}`;
      }

      async function getCoordsByName(str) {
        return await API.LocationService.GetPlaceByAddress(str)
      }

      let timeout;
      return {
        schema,
        mockData,
        region,
        city,
        address,
        dist,
        async changeRegions(e) {
          region.value = e;
          city.value = '';
          address.value = '';
          PositionMapBus.emit('update:map:by:coords', await getCoordsByName(region.value))
        },
        async changeCity(e) {
          city.value = e;
          address.value = ''
          PositionMapBus.emit('update:map:by:coords', await getCoordsByName(`${region.value} ${city.value}`))
        },
        async changeAddress(e) {
          address.value = e.target.value;
          clearTimeout(timeout);
          timeout = setTimeout(async () => {
            PositionMapBus.emit('update:map:by:coords', await getCoordsByName(`${region.value} ${city.value} ${address.value}`))
          }, 500)
        },
        updateCoords,
        activeModal,
        coords,
        async save(data) {
          const { valid } = await data.validate();
          debugger
          if(!valid) return;
          emit('update:modelValue', {
            ...coords.value,
            dist: dist.value,
            place: `${region.value},${city.value},${address.value}`
          });
          activeModal.value = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .b-modal-position__block {
    margin-bottom: 15px;
  }

  .b-modal-position__map {
    height: 300px
  }

  .b-modal-position__clear {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #575775;
  }
</style>