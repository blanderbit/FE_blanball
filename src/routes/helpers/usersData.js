import { API } from '@workers/api-worker/api.worker';
import { useUserDataStore } from '@stores/userData';
import { pinia } from '@/plugins/pinia.plugin';

const userStore = useUserDataStore(pinia);

export const usersData = () => {
  if (!Object.keys(userStore.user).length) {
    return API.UserService.getMyProfile().then((res) => {
      userStore.$patch({
        user: res.data,
      });
      return res.data;
    });
  } else {
    return userStore.user;
  }
};
