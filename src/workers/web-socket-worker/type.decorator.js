import {WebSocketWorker} from "./web.socket.worker";

export function SetMessageType(e) {
    return (a) => {
        a.messageType = e;
        a.prototype.messageType = e;
    }
}

export function SetPushNotificationTheme(e) {
    return (a) => {
        a.pushNotificationTheme = e;
        a.getPushNotificationTheme = () => `notification-${e}`;

        if(a.prototype) {
            a.prototype.pushNotificationTheme = e;
            a.prototype.getPushNotificationTheme = () => `notification-${e}`;
        }
    }
}

export function PushNotification() {
    return (a) => {
        a.pushNotification = true;
        a.prototype.pushNotification = true;
    }
}

export function Notification() {
    return (a) => {
        a.notification = true;
        a.prototype.notification = true;
    }
}

export function ReadAfterActiveAction(callBack) {
    return (a) => {
        a.readAfterActiveAction = true;
        a.prototype.readAfterActiveAction = true;
        a.prototype.readAfterActiveActionCallBack = callBack;
    }
}


export function TimeForCloseIfInactive(e) {
    return (a) => {
        a.timeForClose = e;
        a.prototype.timeForClose = e;
    }
}

export function SetActions(e = []) {
    return (a) => {
        a.actions = e;
        a.prototype.actions = e;
    }
}

export function MessageDataConfiguration (data) {
    return (a, b) => {
        // e.prototype[b] = new Proxy(
        //     data,
        // )
    }

    // Object.defineProperty(user, "fullName", {
    //     get: () {
    //         return this.firstName + ' ' + this.surname;
    //     }
    // });

}

export function WebSocketMessage() {
    return (a) => {
        if(!WebSocketWorker.prototype.messages) {
            WebSocketWorker.prototype.messages = [];
        }
        WebSocketWorker.prototype.messages.push(a);
    }
}