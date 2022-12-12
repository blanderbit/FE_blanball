<template>
  <div class="b-register-step">
    <div class="b-register-step__top-part">
      <div class="b-register-step__title">
        {{$t('register.locations')}}
      </div>
      <div class="b-register-step__progress-line">
        <div class="b-register-step__sections">
          <div
            v-for="item of 3"
            :key="item"
            class="b-register-step__section active"
          ></div>
        </div>
      </div>
      <div class="b-register-step__subtitle">
        {{$t('register.which-areas')}}
      </div>
      <div class="b-register-step__small-title">
        {{$t('register.your-city')}}
      </div>
      <div class="b-register-step__dropdown">
        <Dropdown
            :outside-title="true"
            :main-title="$t('register.city')"
            :options="mockData.district"
            :value="region"
            taggable
            @new-value="changeRegions"
            display-name="name"
            display-value="name"
            name="region"
        />
      </div>
      <div class="b-register-step__dropdown">
        <Dropdown
            :outside-title="true"
            :main-title="$t('register.city')"
            :options="mockData.cities"
            :value="city"
            taggable
            @new-value="changeCity"
            display-name="name"
            display-value="name"
            name="city"
        />
      </div>
      <div class="b-register-step__dropdown">
        <InputComponent
            :title="$t('register.weight')"
            :placeholder="'Address'"
            :value="address"
            :title-width="0"
            @input="changeAddress($event)"
            name="address"
        ></InputComponent>
      </div>
    </div>
    <div class="b-register-step__buttons">
      <div 
        class="b-register-step__back-btn" 
        @click="$emit('decrementStep')"
      >
        {{$t('register.return')}}
      </div>
      <GreenBtn
        :text="$t('register.finish')"
        :width="156"
        :height="40"
        :icon-right="tick"
        :is-icon-and-text-apart="true"
        @click-function="$emit('incrementStep')"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import GreenBtn from '../GreenBtn.vue'
import Dropdown from '../forms/Dropdown.vue'
import InputComponent from '../forms/InputComponent.vue'
import tickIcon from '../../assets/img/tick-white.svg'

import CONSTANTS from '../../consts/index'
import { PositionMapBus } from "../../workers/event-bus-worker";
import { API } from "../../workers/api-worker/api.worker";

export default {
  name: 'Step6',
  components: {
    GreenBtn,
    Dropdown,
    InputComponent
  },
  setup() {
    const region = ref('');
    const city = ref('');
    const address = ref('');
    const mockData = computed(() => {
      return {
        cities: CONSTANTS.register.jsonCityRegions.find(item => item.name.includes(region.value))?.cities || [],
        district: CONSTANTS.register.jsonCityRegions,
      }
    });
    const tick = computed(() => {
      return tickIcon
    })

    async function getCoordsByName(str) {
      return await API.LocationService.GetPlaceByAddress(str)
    }
    PositionMapBus.on('update:coords', (e) => {
      debugger
      console.log(e.place);
      region.value = e.place.state;
      city.value = e.place.city;
      address.value = `${e.place.neighbourhood || ''} ${e.place.road || ''} ${e.place.house_number || ''} ${e.place.postcode || ''}`;
    })
    let timeout;
    return {
      mockData,
      tick,
      region,
      city,
      address,
      async changeRegions(e) {
        region.value = e;
        PositionMapBus.emit('update:map:by:coords', await getCoordsByName(region.value))
      },
      async changeCity(e) {
        city.value = e;
        PositionMapBus.emit('update:map:by:coords', await getCoordsByName(`${region.value} ${city.value}`))
      },
      async changeAddress(e) {
        address.value = e.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
          PositionMapBus.emit('update:map:by:coords', await getCoordsByName(`${region.value} ${city.value} ${address.value}`))
        }, 500)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.b-register-step {
  padding: 44px 24px 72px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 28px 28px 0px 0px;
  @media (max-width: 576px) {
    padding: 44px 16px 72px 16px;
  }
  @media (min-width: 576px) {
    border-radius: 8px;
  }
  .b-register-step__top-part {
    .b-register-step__title {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: #262541;
      @media (max-width: 576px) {
        text-align: center;
      }
    }
    .b-register-step__progress-line {
      margin-top: 16px;
      margin-bottom: 28px;
      .b-register-step__sections {
        display: flex;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 576px) {
          width: 266px;
          margin: 0 auto;
        }
        .b-register-step__section {
          width: 33%;
          height: 4px;
          background: #efeff6;
          border-radius: 2px;
          &.active {
            background: #1ab2ad;
          }
        }
      }
    }
    .b-register-step__subtitle {
      font-family: 'Exo 2';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #575775;
      margin-bottom: 20px;
    }
    .b-register-step__small-title {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #262541;
    }
    .b-register-step__dropdown {
      width: 384px;
      height: 40px;
      @media (max-width: 992px) {
        width: 100%;
      }
    }
  }

  .b-register-step__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .b-register-step__back-btn {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      color: #575775;
      cursor: pointer;
    }
  }
}
</style>