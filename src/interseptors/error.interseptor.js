import { TokenWorker } from "../workers/token-worker";
import router, { ROUTES } from "../router";
import { resolverFunctions } from "../workers/resolver-worker/resolver.functions";
import { useToast } from "vue-toastification";
import { TypeRequestMessageWorker } from "../workers/type-request-message-worker";
import { i18n } from "../main";

const toast = useToast();

export const ErrorInterceptor = (error) => {

  const getJsonErrorData = error.toJSON();
  const skipErrorMessageType = error?.response?.config?.skipErrorMessageType || [];
  error = error?.response?.data || getJsonErrorData;

  if (error?.status === 401 || getJsonErrorData?.status === 401) {
    const findCurRouteFromList = window.location.pathname.includes('application');
    TokenWorker.clearToken();

    router.push(
      findCurRouteFromList
        ? resolverFunctions._createLoginPath(window.location.pathname)
        : ROUTES.AUTHENTICATIONS.LOGIN.absolute
    );
  }

  const errorMessageType = TypeRequestMessageWorker(error)
    .filter(item => !skipErrorMessageType?.includes(item.errorType))[0];

  if(errorMessageType) {
    toast.error(
      i18n.global.t(
        `responseMessageTypes.${errorMessageType.errorType}`,
        {
          field: i18n.global.t(
            `responseMessageTypes.fields.${errorMessageType.field}`,
          )
        }
      )
    );
  }

  error.errorMessageType = errorMessageType;

  return Promise.reject(error)
};