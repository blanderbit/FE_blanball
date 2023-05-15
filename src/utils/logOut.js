import { accessToken, refreshToken } from '../workers/token-worker';
import { ROUTES } from '../router/router.const';
import router from '../router';
import pinia from '../plugins/pinia';
import { useUserDataStore } from '../stores/userData';
import { useTokensStore } from '../stores/tokens';
import { useHeaderHeightStore } from '../stores/headerHeight';

import { API } from '../workers/api-worker/api.worker';

const userStore = useUserDataStore(pinia);
const tokensStore = useTokensStore(pinia);
const headerHeightStore = useHeaderHeightStore(pinia);

export const resetUserData = () => {
  userStore.$reset();
  tokensStore.$reset();
  headerHeightStore.$reset();
  accessToken.clearToken();
  refreshToken.clearToken();
};

export const resetUserDataAndRedirectToLogin = async () => {
  resetUserData();
  await router.push(ROUTES.AUTHENTICATIONS.LOGIN.absolute);
};

export const logOut = async () => {
  await API.AuthorizationService.Logout({
    refresh: refreshToken.getToken(),
  });
  resetUserDataAndRedirectToLogin();
};
