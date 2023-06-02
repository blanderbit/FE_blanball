import { pinia } from '../../plugins/pinia.plugin';
import { useTokensStore } from '../../stores/tokens';
import { CONSTS } from '../../consts';

const tokensStore = useTokensStore(pinia);

export class TokenServiceWorker {
  _getKeyName() {
    return this._keyName;
  }

  setKeyName(name) {
    if (typeof name !== 'string') {
      return;
    }
    this._keyName = name;
    return this;
  }

  getToken() {
    return (
      localStorage.getItem(this._getKeyName()) ||
      sessionStorage.getItem(this._getKeyName())
    );
  }

  getTokenStorageType() {
    if (localStorage.getItem(this._getKeyName())) {
      return CONSTS.storages.LOCAL_STORAGE;
    } else if (sessionStorage.getItem(this._getKeyName())) {
      return CONSTS.storages.SESSION_STORAGE;
    } else {
      return;
    }
  }

  clearToken() {
    localStorage.removeItem(this._getKeyName());
    sessionStorage.removeItem(this._getKeyName());
  }

  setToken(data, storage_type) {
    if (!tokensStore.tokenSettedStoreType) {
      tokensStore.$patch({
        tokenSettedStoreType: storage_type
          ? storage_type
          : CONSTS.storages.SESSION_STORAGE,
      });
    }
    storage_type = tokensStore.tokenSettedStoreType;
    switch (storage_type) {
      case CONSTS.storages.LOCAL_STORAGE:
        localStorage.setItem(this._getKeyName(), data);
        break;
      case CONSTS.storages.SESSION_STORAGE:
        sessionStorage.setItem(this._getKeyName(), data);
        break;
      default:
        sessionStorage.setItem(this._getKeyName(), data);
        break;
    }
  }

  isToken() {
    return !!this.getToken();
  }
}
