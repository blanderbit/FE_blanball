import { defineStore } from 'pinia';

export const useRefreshTokenStore = defineStore('refreshTokenData', {
  state: () => ({
    isTokensRefreshing: false,
    waitingRequests: []
  }),
});
