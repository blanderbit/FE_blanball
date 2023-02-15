<template>
  <div id="map" style="height: 100%; width: 100%"></div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { PositionMapBackgroundStyle, PositionMapStyles } from './map.styles'
import { API } from '../../workers/api-worker/api.worker'
import { PositionMapBus } from '../../workers/event-bus-worker'
const Restrictions = {
  Ukraine: {
    east: 40.2275801,
    north: 52.3791473,
    south: 44.184598,
    west: 22.137059,
  }, // //https://gist.github.com/graydon/11198540
}

const getRestrictionCenter = (restriction) => {
  return {
    lat: (restriction.north - restriction.south) / 2 + restriction.south,
    lng: (restriction.east - restriction.west) / 2 + restriction.west,
  }
}

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
  },
  setup(props, { emit }) {
    const state = ref({
      centerOfCountry: getRestrictionCenter(Restrictions.Ukraine),
      userCenter: {},
    })

    const marker = ref({})
    let map

    function placeMarker(map, location) {
      return new google.maps.Marker({
        position: location,
        map: map,
      })
    }

    const setDataAboutPosition = async (data) => {
      emit('update:coords:loading')
      PositionMapBus.emit('update:coords:loading')
      try {
        const dataForEmit = {
          lat: data?.lat,
          lng: data?.lng,
          place: (
            await API.LocationService.GetPlaceByCoords(
              data || state.value.centerOfCountry
            )
          )?.data?.data,
        }

        emit('update:coords', dataForEmit)
        PositionMapBus.emit('update:coords', dataForEmit)
      } catch (e) {
        emit('update:coords-error')
        PositionMapBus.emit('update:coords-error')
      }

      emit('map-loaded')
      PositionMapBus.emit('map-loaded')
    }
    PositionMapBus.on('update:map:by:coords', (e) => {
      marker.value.setPosition({
        lat: +e.data.coordinates?.lat,
        lng: +e.data.coordinates?.lon,
      })
      const myLatlng = new google.maps.LatLng(
        +e.data.coordinates?.lat,
        +e.data.coordinates?.lon
      )
      map.setCenter(myLatlng)
    })

    const createMap = async (crd) => {
      state.userCenter = crd
        ? {
            lat: crd.lat,
            lng: crd.lng,
          }
        : state.value.centerOfCountry

      map = new google.maps.Map(document.getElementById('map'), {
        center: state.userCenter,
        zoom: 12,
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
      })

      map.data.setStyle(PositionMapBackgroundStyle)

      marker.value = placeMarker(map, state.userCenter)
      await setDataAboutPosition(state.userCenter)

      if (!props.disableChangeCoords) {
        google.maps.event.addListener(map, 'click', function (event) {
          marker.value.setPosition(event.latLng)
          setDataAboutPosition(event.latLng.toJSON())
        })
      }

      if (crd?.currentPosition) return

      emit('map-loaded')
      PositionMapBus.emit('map-loaded')
    }

    watch(
      () => props.coords,
      () => {
        marker.value.setPosition(props.coords)
        map.setCenter(props.coords)
      }
    )

    onMounted(() => {
      if (props?.coords?.lat && props?.coords?.lng) {
        createMap(props.coords)
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            createMap({
              currentPosition: true,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
          () => createMap()
        )
      }
    })
  },
}
</script>

<style scoped></style>
