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
    return localStorage.getItem(this._getKeyName()) || sessionStorage.getItem(this._getKeyName())
  }

  clearToken() {
    localStorage.removeItem(this._getKeyName());
    sessionStorage.removeItem(this._getKeyName());
  }

  setToken(data, storage_type) {
    switch(storage_type) {
      case 'local_storage':
        localStorage.setItem(this._getKeyName(), data);
        break
      case 'session_storage':
        sessionStorage.setItem(this._getKeyName(), data);
        break
      default:
        sessionStorage.setItem(this._getKeyName(), data);
        break
    }
  }

  isToken() {
    return !!this.getToken();
  }
}
