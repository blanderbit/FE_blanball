import { InitialUpdation } from "./initial.message";
import { SetMessageType, AuthWebSocketMessage } from "../../type.decorator";
import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.AllReadedNotifications)
export class NotificationAllReadedNotificationsUpdation extends InitialUpdation {
  handleUpdate(notifications, callbackAfterRead) {
    notifications.value = notifications.value.map(notificationForRead => {
      notificationForRead.isRead = true;
      return notificationForRead;
    });

    if (typeof callbackAfterRead === 'function') {
      callbackAfterRead()
    }
  }
}