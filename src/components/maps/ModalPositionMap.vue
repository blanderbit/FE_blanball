<template>
 <div>
   <div 
    class="b-modal-position__address-text"
    @click="activeModal = true"
   >
      <img :src="icons.tick" alt="">
      <span>
        {{region || city  ? `${region} ${city}`: $t('events.select-position')}}
      </span>
   </div>
   <ModalWindow v-if="activeModal" :isTitleShown="false">
     <Loading
         :is-loading="loading"
     />
     <Form
         v-slot="data"
         @submit="disableSubmit"
         :validation-schema="schema"
     >
       <div class="b-modal-position__block">
         <Dropdown
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
         <Dropdown
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
         <position-map @map-loaded="loading = false" :coords="coords" @update:coords="updateCoords"></position-map>
       </div>
       <div class="d-flex justify-content-between align-items-center">
         <div class="b-modal-position__clear" @click="activeModal = false">
           Скасувати
         </div>
         <GreenBtn
             :text="'Зберегти'"
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
  import Loading from '../../workers/loading-worker/Loading.vue'
  import tickIcon from '../../assets/img/location-point.svg'

  export default {
    components: {
      ModalWindow,
      PositionMap,
      Dropdown,
      InputComponent,
      Form,
      GreenBtn,
      Loading
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
      const dist = ref(300);
      const nextButton = ref(false);
      const coords = ref({

      });
      const loading = ref(true);
      const activeModal = ref(false);
      const schema = yup.object({
        region: yup.string().required('errors.required'),
        city: yup.string().required('errors.required'),
      });

      const icons = computed(() => {
        return {
          tick: tickIcon
        }
      });

      function setValue() {
        if(!props.modelValue) return
        const [Sregion,  SCity] = props.modelValue.place?.split?.(',') || [];
        region.value = Sregion ? new String(Sregion) : ''
        city.value = SCity ? new String(SCity) : ''
        dist.value = props.modelValue.dist?.toString()
        coords.value = {
          lat: props.modelValue.lat,
          lng: props.modelValue.lng
        }
      }
      watch(
        () => props.modelValue,
        () => {
          setValue()
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
          setValue()
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
        nextButton.value = !region.value || !city.value
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
        dist,
        loading,
        nextButton,
        icons,
        async changeRegions(e) {
          region.value = e;
          city.value = '';
          loading.value = true
          try {
            PositionMapBus.emit('update:map:by:coords', await getCoordsByName(region.value))
            nextButton.value = !region.value || !city.value

          } catch (e) {
            nextButton.value = true

          }

          loading.value = false

        },
        async changeCity(e) {
          city.value = e;
          loading.value = true
          try {
            PositionMapBus.emit('update:map:by:coords', await getCoordsByName(`${region.value} ${city.value}`))
            nextButton.value = !region.value || !city.value

          } catch (e) {
            nextButton.value = true
          }
          loading.value = false
        },
        updateCoords,
        activeModal,
        coords,
        async save(data) {
          const { valid } = await data.validate();
          if(!valid) return;  
          emit('update:modelValue', {
            ...coords.value,
            dist: dist.value,
            place: `${region.value},${city.value}`
          });
          activeModal.value = false
        },
        disableSubmit: (e) => {
          e.stopPropagation()
          e.preventDefault()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .b-modal-position__address-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: #262541;
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
      width: 120px;
      display: block;
    }
  }
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