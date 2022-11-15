import { InitialUpdation } from "./initial.message";
import { SetMessageType, AuthWebSocketMessage } from "../../type.decorator";
import { WebSocketTypes } from "../../web.socket.types";
import { NotificationsBus } from "../../../event-bus-worker";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.AllDeletedNotifications)
export class NotificationAllDeletedNotificationsUpdation extends InitialUpdation {
  handleUpdate(notifications, callbackAfterAction) {
    let find = 0;
    notifications.value = [];

    if (typeof callbackAfterAction === 'function') {
      callbackAfterAction()
    }

    if(find) {
      NotificationsBus.emit('SidebarClearData')
    }
  }
}