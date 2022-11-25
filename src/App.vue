<template>
  <div>
    <router-view />
  </div>

</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import { GeneralSocketWorkerInstance } from "./workers/web-socket-worker";
  import { createQueryStringFromObject } from "./workers/utils-worker";
  import { VersionDetectorWorker } from "./workers/version-detector-worker";
  import { API } from "./workers/api-worker/api.worker";

  import { ROUTES } from "./router";
  import { WebSocketTypes } from "./workers/web-socket-worker/web.socket.types";

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

  // API.NotificationService
  //   .getMaintenance()
  //   .then((result) => handleMessageGeneral({
  //     messageType: WebSocketTypes.ChangeMaintenance,
  //     data: {
  //       maintenance: {
  //         type: result.data.isMaintenance
  //       }
  //     }
  //   }));

  GeneralSocketWorkerInstance
    .registerCallback(handleMessageGeneral)
    .connect();

  VersionDetectorWorker(VersionHandling.handleDifferentVersion)
</script>