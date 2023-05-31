import { API } from '../workers/api-worker/api.worker';
import { refreshToken, accessToken } from '../workers/token-worker';
import { useTokensStore } from '../stores/tokens';
import { AuthWebSocketWorkerInstance } from '../workers/web-socket-worker';
import { sessionExpired } from './sessionExpired';

import { pinia } from '../plugins/pinia.plugin';

const tokensStore = useTokensStore(pinia);

export async function refreshTokens() {
  let isRefreshSuccess;

  tokensStore.$patch({
    isTokensRefreshing: true,
  });
  AuthWebSocketWorkerInstance?.disconnect();

  try {
    const response = await API.AuthorizationService.refreshTokens({
      refresh: refreshToken.getToken(),
    });

    const refreshTokenStorageType = refreshToken.getTokenStorageType();
    const accessTokenStorageType = accessToken.getTokenStorageType();

    accessToken.clearToken();
    refreshToken.clearToken();
    accessToken.setToken(response.data.access, accessTokenStorageType);
    refreshToken.setToken(response.data.refresh, refreshTokenStorageType);

    AuthWebSocketWorkerInstance.connect({
      token: accessToken.getToken(),
    });
    tokensStore.$patch({
      isTokensRefreshing: false,
    });

    isRefreshSuccess = true;
  } catch {
    tokensStore.$patch({
      isTokensRefreshing: false,
    });
    sessionExpired();

    isRefreshSuccess = false;
  } finally {
    return isRefreshSuccess;
  }
}
