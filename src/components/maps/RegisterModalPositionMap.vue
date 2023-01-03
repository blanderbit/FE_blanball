<template>
 <div>
   <div @click="activeModal = true">
     <img src="../../assets/img/location-point.svg"/>
   </div>
   <ModalWindow v-show="activeModal" :isTitleShown="false">
     <Loading
         :is-loading="loading"
     />
       <div
           class="b-modal-position__block b-modal-position__map"
       >
         <position-map @map-loaded="loading = false" :coords="coords" @update:coords="updateCoords"></position-map>
       </div>
       <div class="d-flex justify-content-between align-items-center">
         <GreenBtn
             :text="'Зберегти'"
             :width="140"
             :height="40"
             @click-function="save(data)"
         />
       </div>
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
  export default {
    components: {
      ModalWindow,
      PositionMap,
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
    setup(props) {
      const coords = ref({

      });
      const activeModal = ref(false);
      function updateCoords (e) {

        coords.value = {
          lat: e.lat,
          lng: e.lng,
        };
      }

      return {
        async save(data) {
          activeModal.value = false
        },
        coords,
        updateCoords,
        activeModal
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