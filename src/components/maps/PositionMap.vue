<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script>
  import { onMounted, ref, watch } from 'vue';
  import { PositionMapBackgroundStyle, PositionMapStyles } from "./map.styles";
  import { API } from "../../workers/api-worker/api.worker";
  import { PositionMapBus } from "../../workers/event-bus-worker";
  const Restrictions = {
    Ukraine: {
      east: 40.2275801,
      north: 52.3791473,
      south: 44.184598,
      west: 22.137059
    }// //https://gist.github.com/graydon/11198540
  };

  const getRestrictionCenter = (restriction) => {
    return {
      lat: ((restriction.north - restriction.south) / 2) + restriction.south,
      lng:((restriction.east - restriction.west) / 2) + restriction.west
    }
  };

  export default {
    name: "PositionMap",
    props: {
      coords: {
        type: Object
      }
    },
    setup(props, {emit}) {
      const state = ref({
        centerOfCountry: getRestrictionCenter(Restrictions.Ukraine),
        userCenter: {},
      });

      const marker = ref({});

      function placeMarker(map, location) {
        return new google.maps.Marker({
          position: location,
          map: map
        });
      }

      const setDataAboutPosition = async (data) => {
        const dataForEmit = {
          lat: data?.lat,
          lng: data?.lng,
          place: await API.LocationService.GetPlaceByCoords(data || state.value.centerOfCountry)
        };

        emit('update:coords', dataForEmit);
        PositionMapBus.emit('update:coords', dataForEmit)
      };
      PositionMapBus.on('update:map:by:coords', (e) => {
        debugger
        setDataAboutPosition({
          lat: +e.data.coordinates?.lat,
          lng: +e.data.coordinates?.lon,
        });
        marker.value.setPosition({
          lat: +e.data.coordinates?.lat,
          lng: +e.data.coordinates?.lon,
        })
      });

      const createMap = (crd) => {
        state.userCenter = crd ? {
          lat: crd.latitude,
          lng: crd.longitude
        } : state.value.centerOfCountry;

        const map = new google.maps.Map(document.getElementById("map"), {
          center: state.userCenter,
          zoom: 12,
          overviewMapControlOptions: {
            opened: false,
          },
          restriction: {
            latLngBounds: Restrictions.Ukraine,
            strictBounds: true
          },
          styles: PositionMapStyles
        });

        map.data.setStyle(PositionMapBackgroundStyle);

        marker.value = placeMarker(map, state.userCenter);
        setDataAboutPosition(state.userCenter);

        google.maps.event.addListener(map, 'click', function (event) {
          marker.value.setPosition(event.latLng);
          setDataAboutPosition(event.latLng.toJSON())
        });
      };

      watch(
        () => props.coords,
        () => marker.value.setPosition(event.latLng)
      );

      onMounted(() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => createMap(pos.coords),
          () => createMap()
        )
      })
    }
  }
</script>

<style scoped>

</style>