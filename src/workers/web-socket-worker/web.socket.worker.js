import { w3cwebsocket } from 'websocket';

export class WebSocketWorker {
  messages = [];
  callbacks = [];
  options = {};
  instance;

  constructor(options) {
    this.options = options;
  }

  connect(params) {
    if (this.instance) {
      console.warn('WebSocketWorker connect - have instance');
      return;
    }
    this.instance = new w3cwebsocket(
      this.options.SOCKET_URL + this._createQueryParametrs(params),
      this.options.SOCKET_ECHO_PROTOCOL
    );

    this.instance.onerror = (e) => {
      console.log('Connection Error', e);
    };

    this.instance.onopen = (e) => {
      console.log('WebSocket Client Connected');
    };

    this.instance.onclose = (e) => {
      console.log('echo-protocol Client Closed');
    };

    this.instance.onmessage = (e) => {
      this._createElementAndCallHandler(this._parseSocketData(e.data).message);
    };

    window.createElementAndCallHandler = this._createElementAndCallHandler.bind(this)
  }

  disconnect() {
    this.instance.close();
    this.instance = null
  }

  registerCallback(callback) { // callback should be unique
    if (typeof callback !== 'function') {
      console.warn('registerCallback is not a function');
      return this;
    }

    if(this.callbacks.find(func => func.name === callback.name)) {
      console.warn('registerCallback already use');
      return
    }

    this.callbacks.push(callback);

    return this;
  }

  _handleCallback(element) {
    this.callbacks.forEach(item => item(element))
  }

  _createElementAndCallHandler(message) {
    if (!message) {
      console.warn('_createElementAndCallHandler = message false');
      return;
    }
    const constructor = this.messages.find(item => item.messageType === message.message_type || item.messageType === message.new_message_type);// TODO delete new_message_type
    if (!constructor) {
      console.warn('_createElementAndCallHandler = socket type not found');
      return;
    }
    this._handleCallback(new constructor(message))
  }

  _parseSocketData(e) {
    try {
      return JSON.parse(e)
    } catch (e) {
      console.warn('e => something wrong parseSocketData', e);
      return false
    }
  }

  _createQueryParametrs(obj) {
    if (typeof obj !== 'object') {
      return '';
    }

    const elements = Object
      .keys(obj)
      .map(key => `${key}=${obj[key]}`);

    return elements.length
      ? '?' + elements.join('&')
      : ''
  }
}

export class AuthWebSocketWorker extends WebSocketWorker {
  constructor(options) {
    super(options);
    this.messages = AuthWebSocketWorker.messages || this.messages;
  }
}

export class GeneralWebSocketWorker extends WebSocketWorker {
  constructor(options) {
    super(options);
    this.messages = GeneralWebSocketWorker.messages || this.messages;
  }
}