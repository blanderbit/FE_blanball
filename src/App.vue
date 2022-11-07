<template>
  <router-view />
</template>

<script setup>
  import { GeneralSocketWorkerInstance } from "./workers/web-socket-worker";
  import { useRouter } from "vue-router";
  import { ROUTES } from "./router";
  import { WebSocketTypes } from "./workers/web-socket-worker/web.socket.types";
  import { API } from "./workers/api-worker/api.worker";
  import { createQueryStringFromObject } from "./workers/utils-worker";

  const router = useRouter();

  const handlerGeneral = (instance) => {
    switch (instance.messageType) {
      case WebSocketTypes.ChangeMaintenance: {
        const maintenance = instance.data.maintenance.type;

        if(maintenance) {
          const query = createQueryStringFromObject({
            redirectUrl: window.location.pathname
          });

          return router.push(`${ROUTES.WORKS.absolute}${query ? '?' + query : query}`)
        } else {
          // TODO dublicate with login
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

  API.NotificationService
    .getMaintenance()
    .then((result) => handlerGeneral({
      messageType: WebSocketTypes.ChangeMaintenance,
      data: {
        maintenance: {
          type: result.data.isMaintenance
        }
      }
    }));

  GeneralSocketWorkerInstance
    .registerCallback(handlerGeneral)
    .connect()
</script>