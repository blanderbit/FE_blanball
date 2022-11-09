import { InitialUpdation } from "./initial.message";
import { SetMessageType, AuthWebSocketMessage } from "../../type.decorator";
import { WebSocketTypes } from "../../web.socket.types";
import { NotificationsBus } from "../../../event-bus-worker";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.NotificationDelete)
export class NotificationDeleteUpdation extends InitialUpdation {
  handleUpdate(notifications, callbackAfterAction) {
    let find = 0;
    notifications.value = notifications.value.filter(item => {
      const check = item.notification_id !== this.data.notification.id;
      if(!check && !find) {
        find = 1;
      }
      return check;
    });

    if (typeof callbackAfterAction === 'function') {
      callbackAfterAction()
    }

    if(find) {
      NotificationsBus.emit('SidebarReloadLastLoadedPage')
    }
  }
}