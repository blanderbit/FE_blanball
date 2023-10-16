import { accessToken, refreshToken } from '@workers/token-worker';
import router from '../router';
import { pinia } from '@plugins/pinia.plugin';
import { useUserDataStore } from '@stores/userData';
import { useTokensStore } from '@stores/tokens';
import { useHeaderHeightStore } from '@stores/headerHeight';
import { useChatDataStore } from '@stores/chatData';

const userStore = useUserDataStore(pinia);
const tokensStore = useTokensStore(pinia);
const headerHeightStore = useHeaderHeightStore(pinia);
const chatStore = useChatDataStore(pinia);

export const resetUserData = () => {
  userStore.$reset();
  tokensStore.$reset();
  headerHeightStore.$reset();
  chatStore.$reset();
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
