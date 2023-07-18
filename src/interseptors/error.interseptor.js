import { useToast } from 'vue-toastification';
import { TypeRequestMessageWorker } from '@workers/type-request-message-worker';

import { refreshTokens } from '@workers/token-worker/refreshTokens';
import { useTokensStore } from '@stores/tokens';

import { AxiosInstance } from '../plugins/axios.plugin';

import { i18n } from '../plugins/i18n.plugin';
import { EndpointsEnum } from '@workers/api-worker/http/http-common/prefix.enum';
import { globalSkipMesssageTypes } from '@workers/type-request-message-worker';
import { finishSpinner } from '@workers/loading-worker/loading.worker';

const toast = useToast();

const tokenStore = useTokensStore();

const showToastAfterError = (errorMessageType) => {
  toast.error(
    i18n.global.t(`responseMessageTypes.${errorMessageType.errorType}`, {
      field: i18n.global.t(
        `responseMessageTypes.fields.${errorMessageType.field}`
      ),
    })
  );
};

let retryRequest = false;

export const ErrorInterceptor = async (error) => {
  const getJsonErrorData = error.toJSON();
  const requestConfig = getJsonErrorData.config;

  const skipErrorMessageType =
    error?.response?.config?.skipErrorMessageType || [];
  error = error?.response?.data || getJsonErrorData;

  if (
    (error?.status === 401 || getJsonErrorData?.status === 401) &&
    requestConfig.url.replace(requestConfig.baseURL, '') !==
      EndpointsEnum.Authorization.RefreshTokens
  ) {
    if (!tokenStore.isTokensRefreshing) {
      retryRequest = true;
      const refreshTokensStatus = await refreshTokens();

      if (!refreshTokensStatus) {
        return;
      }
    }
    if (retryRequest) {
      return await new Promise(async (resolve, reject) => {
        requestConfig.url = requestConfig.url.replace(
          requestConfig.baseURL,
          ''
        );
        resolve(await AxiosInstance(requestConfig));
      });
    }
  }

  const errorMessageType = TypeRequestMessageWorker(error).filter(
    (item) =>
      ![...globalSkipMesssageTypes, ...skipErrorMessageType]?.includes(
        item.errorType
      )
  )[0];

  if (errorMessageType) {
    showToastAfterError(errorMessageType);
    error.errorMessageType = errorMessageType;
  }

  const rejectedError = Promise.reject(error);
  finishSpinner();
  return rejectedError;
};
