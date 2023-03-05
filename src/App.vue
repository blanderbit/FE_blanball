<template>
  <div>
    <ModalVersion v-if="isModalActive" @close-modal-click="closeModal" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ModalVersion from './components/ModalWindows/ModalVersion.vue'

import { GeneralSocketWorkerInstance } from './workers/web-socket-worker'
import { createQueryStringFromObject } from './workers/utils-worker'
import { VersionDetectorWorker } from './workers/version-detector-worker'
import { API } from './workers/api-worker/api.worker'

import { WebSocketTypes } from './workers/web-socket-worker/web.socket.types'
import { ROUTES } from './router/router.const'

const router = useRouter()
const isModalActive = ref(false)

const handleMessageGeneral = (instance) => {
  switch (instance.messageType) {
    case WebSocketTypes.ChangeMaintenance: {
      const maintenance = instance.data.maintenance.type
      const ifCurrentRouteMaintenance = location.pathname.includes(
        ROUTES.WORKS.absolute
      )
      const ifCurrentRouteApplication = location.pathname.includes(
        ROUTES.APPLICATION.index.name
      )

      if (ifCurrentRouteMaintenance && maintenance) {
        return
      } else if (!ifCurrentRouteMaintenance && maintenance) {
        const query = createQueryStringFromObject({
          redirectUrl: window.location.pathname,
        })

        return router.push(
          `${ROUTES.WORKS.absolute}${query ? '?' + query : query}`
        )
      } else if (!maintenance && !ifCurrentRouteApplication) {
        const ifAuthentication = location.pathname.includes('authentication')

        if (ifAuthentication) return
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        const redirectUrl = params.redirectUrl

        const resolveRouter = redirectUrl && router.resolve(redirectUrl)
        if (
          !redirectUrl ||
          resolveRouter?.matched?.find((match) =>
            match?.path?.includes('pathMatch')
          )
        ) {
          return router.push(ROUTES.APPLICATION.EVENTS.absolute)
        }
        return router.push(redirectUrl)
      }
    }
  }
}

const VersionHandling = {
  handleDifferentVersion: () => {
    isModalActive.value = true
  },
  closeVersionModal: () => (isModalActive.value = false),
}

API.NotificationService.getMaintenance().then((result) =>
  handleMessageGeneral({
    messageType: WebSocketTypes.ChangeMaintenance,
    data: {
      maintenance: {
        type: result.data.isMaintenance,
      },
    },
  })
)

GeneralSocketWorkerInstance.registerCallback(handleMessageGeneral).connect()

VersionDetectorWorker(VersionHandling.handleDifferentVersion)

function closeModal() {
  VersionHandling.closeVersionModal()
}
</script>
