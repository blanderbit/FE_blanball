<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';

import { API } from '../../workers/api-worker/api.worker';
import { PositionMapBus } from '../../workers/event-bus-worker';

import {
  PositionMapBackgroundStyle,
  PositionMapStyles,
} from '../../workers/map-worker/map.styles';
import {
  finishSpinner,
  startSpinner,
} from '../../workers/loading-worker/loading.worker';

const Restrictions = {
  Ukraine: {
    east: 40.2275801,
    north: 52.3791473,
    south: 44.184598,
    west: 22.137059,
  }, // //https://gist.github.com/graydon/11198540
};

const getRestrictionCenter = (restriction) => {
  return {
    lat: (restriction.north - restriction.south) / 2 + restriction.south,
    lng: (restriction.east - restriction.west) / 2 + restriction.west,
  };
};

export default {
  name: 'PositionMap',
  props: {
    coords: {
      type: Object,
    },
    disableChangeCoords: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const state = ref({
      centerOfCountry: getRestrictionCenter(Restrictions.Ukraine),
      userCenter: {},
    });
    let circle;

    const marker = ref({});
    let map;

    function placeMarker(map, location) {
      return new google.maps.Marker({
        position: location,
        map: map,
      });
    }

    const setDataAboutPosition = async (data) => {
      startSpinner();
      try {
        const dataForEmit = {
          lat: data?.lat,
          lng: data?.lng,
          place: (
            await API.LocationService.GetPlaceByCoords(
              data || state.value.centerOfCountry
            )
          )?.data,
        };

        emit('update:coords', dataForEmit);
        PositionMapBus.emit('update:coords', dataForEmit);
      } catch (e) {
        emit('update:coords-error');
        PositionMapBus.emit('update:coords-error');
      }
      finishSpinner();
    };
    PositionMapBus.on('update:map:by:coords', (e) => {
      marker.value.setPosition({
        lat: +e.data.coordinates?.lat,
        lng: +e.data.coordinates?.lon,
      });
      const myLatlng = new google.maps.LatLng(
        +e.data.coordinates?.lat,
        +e.data.coordinates?.lon
      );
      map.setCenter(myLatlng);
    });

    const createMap = async (crd) => {
      state.userCenter = crd
        ? {
            lat: crd.lat,
            lng: crd.lng,
          }
        : state.value.centerOfCountry;

      map = new google.maps.Map(document.getElementById('map'), {
        center: state.userCenter,
        zoom: 12,
        language: 'uk',
        overviewMapControlOptions: {
          opened: false,
        },
        restriction: {
          latLngBounds: Restrictions.Ukraine,
          strictBounds: true,
        },
        styles: PositionMapStyles,
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: false,
      });

      if (props?.radius) {
        circle = new google.maps.Circle({
          center: state.userCenter,
          radius: props?.radius,
          strokeColor: '#fff',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#fff',
          fillOpacity: 0.35,
          map: map,
        });
        circle.setMap(map);
      }

      map.data.setStyle(PositionMapBackgroundStyle);

      marker.value = placeMarker(map, state.userCenter);
      await setDataAboutPosition(state.userCenter);

      if (!props.disableChangeCoords) {
        google.maps.event.addListener(map, 'click', function (event) {
          marker.value.setPosition(event.latLng);
          if (props?.radius) {
            circle.setCenter(event.latLng);
          }
          setDataAboutPosition(event.latLng.toJSON());
        });
      }

      if (crd?.currentPosition) return;
      finishSpinner();
    };

    watch(
      () => props.coords,
      () => {
        if (marker.value.length) {
          marker.value.setPosition(props.coords);
          map.setCenter(props.coords);
        }
      }
    );

    watch(
      () => props.radius,
      () => {
        if (props.radius) {
          circle.setRadius(parseFloat(props.radius));
        } else {
          circle.setRadius(null);
        }
      }
    );

    onMounted(() => {
      if (props?.coords?.lat && props?.coords?.lng) {
        createMap(props.coords);
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            createMap({
              currentPosition: true,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
          () => createMap()
        );
      }
    });
  },
};
</script>

<style scoped></style>
