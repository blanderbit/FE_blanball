import { useToast } from 'vue-toastification';
import { TypeRequestMessageWorker } from '../workers/type-request-message-worker';

import { refreshTokens } from '../utils/refreshTokens';
import { useTokensStore } from '../stores/tokens';
import { useUserDataStore } from '../stores/userData';

import { AxiosInstance } from '../plugins/axios.plugin';

import { i18n } from '../main';
import { EndpointsEnum } from '../workers/api-worker/http/http-common/prefix.enum';
import { globalSkipMesssageTypes } from '../workers/type-request-message-worker';

const toast = useToast();

const tokenStore = useTokensStore();
const userStore = useUserDataStore();

let retryRequest = false;

const showToastAfterError = (errorMessageType) => {
  toast.error(
    i18n.global.t(`responseMessageTypes.${errorMessageType.errorType}`, {
      field: i18n.global.t(
        `responseMessageTypes.fields.${errorMessageType.field}`
      ),
    })
  );
};

export const ErrorInterceptor = async (error) => {
  const getJsonErrorData = error.toJSON();

  console.log(userStore.user.id)

  const requestConfig = getJsonErrorData.config;

  const skipErrorMessageType =
    error?.response?.config?.skipErrorMessageType || [];
  error = error?.response?.data || getJsonErrorData;

  if (
    (error?.status === 401 || getJsonErrorData?.status === 401) &&
    requestConfig.url.replace(requestConfig.baseURL, '') !==
      EndpointsEnum.Authorization.RefreshTokens &&
    userStore.user.id
  ) {
    if (!tokenStore.isTokensRefreshing) {
      await refreshTokens();
      retryRequest = true;
    }
    if (retryRequest) {
      return await new Promise(async (resolve) => {
        requestConfig.url = requestConfig.url.replace(
          requestConfig.baseURL,
          ''
        );
        resolve(await AxiosInstance(requestConfig));
      });
    }
  }


  const errorMessageType = TypeRequestMessageWorker(error).filter(
    (item) => ![...globalSkipMesssageTypes, ...skipErrorMessageType]?.includes(item.errorType)
  )[0];

  if (errorMessageType) {
    showToastAfterError(errorMessageType);
  }

  if (errorMessageType) {
    error.errorMessageType = errorMessageType;
  }
  return Promise.reject(error);
};
