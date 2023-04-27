import { useToast } from 'vue-toastification';
import { TypeRequestMessageWorker } from '../workers/type-request-message-worker';

import { refreshTokens } from '../utils/refreshTokens';
import { useRefreshTokenStore } from '../stores/refresh';

import { i18n } from '../main';

const toast = useToast();

const refreshTokenStore = useRefreshTokenStore();

export const ErrorInterceptor = (error) => {
  const getJsonErrorData = error.toJSON();
  const skipErrorMessageType =
    error?.response?.config?.skipErrorMessageType || [];
  error = error?.response?.data || getJsonErrorData;

  if (error?.status === 404 || getJsonErrorData?.status === 404) {
    if (!refreshTokenStore.isTokensRefreshing) {
      refreshTokens();
    } else {
      refreshTokenStore.waitingRequests.push(getJsonErrorData);
    }
  }

  const errorMessageType = TypeRequestMessageWorker(error).filter(
    (item) => !skipErrorMessageType?.includes(item.errorType)
  )[0];

  if (errorMessageType) {
    toast.error(
      i18n.global.t(`responseMessageTypes.${errorMessageType.errorType}`, {
        field: i18n.global.t(
          `responseMessageTypes.fields.${errorMessageType.field}`
        ),
      })
    );
  }

  if (errorMessageType) {
    error.errorMessageType = errorMessageType;
  }
  return Promise.reject(error);
};
