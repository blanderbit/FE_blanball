<template>
  <div>
    <router-view />
    <!--{{VersionHandling.version}}-->
    <!--<transition>-->
      <!--<modal-window-->
          <!--v-if="VersionHandling.version"-->
          <!--@close-modal="VersionHandling.closeVersionModal()"-->
      <!--&gt;-->
        <!--<template #version-modal>-->
         <!--wqdwedwedwedwedwe-->
        <!--</template>-->
      <!--</modal-window>-->
    <!--</transition>-->
  </div>

</template>

<script setup>
  import { GeneralSocketWorkerInstance } from "./workers/web-socket-worker";
  import { useRouter } from "vue-router";
  import { ROUTES } from "./router";
  import { WebSocketTypes } from "./workers/web-socket-worker/web.socket.types";
  import { API } from "./workers/api-worker/api.worker";
  import { createQueryStringFromObject } from "./workers/utils-worker";
  import { VersionDetectorWorker } from "./workers/version-detector-worker";
  import { ref } from "vue";
  import ModalWindow from './components/ModalWindow.vue'

  const router = useRouter();

  const handleMessageGeneral = (instance) => {
    switch (instance.messageType) {
      case WebSocketTypes.ChangeMaintenance: {
        const maintenance = instance.data.maintenance.type;
        const ifCurrentRouteMaintenance = location.pathname.includes(ROUTES.WORKS.absolute);
        const ifCurrentRouteApplication = location.pathname.includes(ROUTES.APPLICATION.index.name);

        if(ifCurrentRouteMaintenance && maintenance) {
          return
        } else if (!ifCurrentRouteMaintenance && maintenance) {
          const query = createQueryStringFromObject({
            redirectUrl: window.location.pathname
          });

          return router.push(`${ROUTES.WORKS.absolute}${query ? '?' + query : query}`)
        } else if (!maintenance && !ifCurrentRouteApplication) {
          const redirectUrl = router.currentRoute.value.query.redirectUrl;
          const resolveRouter = redirectUrl && router.resolve(redirectUrl);
          if (
            !redirectUrl || resolveRouter?.matched?.find((match) =>
              match?.path?.includes('pathMatch')
            )
          ) {
            return router.push(ROUTES.APPLICATION.EVENTS.absolute)
          }
          return router.push(redirectUrl)
        }
      }
    }
  };

  const VersionHandling = {
    handleDifferentVersion: () => {
      VersionHandling.version.value = true
    },
    closeVersionModal: () => VersionHandling.version.value = false,
    version: ref(false)
  };

  API.NotificationService
    .getMaintenance()
    .then((result) => handleMessageGeneral({
      messageType: WebSocketTypes.ChangeMaintenance,
      data: {
        maintenance: {
          type: result.data.isMaintenance
        }
      }
    }));

  GeneralSocketWorkerInstance
    .registerCallback(handleMessageGeneral)
    .connect();

  VersionDetectorWorker(VersionHandling.handleDifferentVersion)
</script>