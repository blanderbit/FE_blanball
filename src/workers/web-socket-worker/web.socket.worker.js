import { w3cwebsocket } from 'websocket';

export class WebSocketWorker {
    messages = [];
    callbacks = [];
    options = {};
    instance;

    constructor (options) {
        this.options = options;
        this.messages = WebSocketWorker.prototype.messages || this.messages;
    }

    connect (token) {
        if(!token) {
            console.warn('WebSocketWorker connect - haven`t token')
            return;
        }
        if(this.instance) {
            console.warn('WebSocketWorker connect - have instance')
            return;
        }
        this.instance = new w3cwebsocket(
            this.options.SOCKET_URL + token,
            this.options.SOCKET_ECHO_PROTOCOL
        );

        this.instance.onerror = (e) =>  {
            console.log('Connection Error', e);
        };

        this.instance.onopen =(e) => {
            console.log('WebSocket Client Connected');
        };

        this.instance.onclose = (e) =>  {
            console.log('echo-protocol Client Closed');
        };

        this.instance.onmessage = (e) => {
            this.createElementAndCallHandler(this.parseSocketData(e.data));
        };

        window.createElementAndCallHandler = this.createElementAndCallHandler.bind(this)
    }

    disconnect () {
        this.instance.disconnect()
    }

    registerMessage(message) {
        if(typeof message !== "class") {

        }
        this.messages.push(message);
        return this;
    }

    registerCallback(callback) {
        if(typeof callback !== 'function') {
            console.warn('registerCallback is not a function');
            return this;
        }
        this.callbacks.push(callback);
        return this;
    }

    handleCallback(element) {
        this.callbacks.forEach(item => item(element))
    }

    createElementAndCallHandler(message) {
        if(!message) {
            console.warn('createElementAndCallHandler = message false');
            return;
        }
        const constructor = this.messages.find(item => item.messageType === message.message_type);
        if(!constructor) {
            console.warn('createElementAndCallHandler = socket type not found');
            return;
        }
        this.handleCallback(new constructor(message))
    }

    parseSocketData(e) {
        try {
            return JSON.parse(e)
        } catch (e) {
            console.warn('e => something wrong parseSocketData', e)
            return false
        }
    }
}