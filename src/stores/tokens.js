import { defineStore } from 'pinia';

export const useTokensStore = defineStore('tokensData', {
  state: () => ({
    isTokensRefreshing: false,
    tokenSettedStoreType: null,
  }),
});
