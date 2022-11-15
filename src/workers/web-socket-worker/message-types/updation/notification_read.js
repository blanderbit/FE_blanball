import { InitialUpdation } from "./initial.message";
import { SetMessageType, AuthWebSocketMessage } from "../../type.decorator";
import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.BulkNotificationRead)
export class NotificationBulkReadUpdation extends InitialUpdation {
    handleUpdate(notifications, callbackAfterRead) {
        const notificationForRead = notifications.value.find(item => item.notification_id === this.data.notification.id);
        if(notificationForRead) {
            notificationForRead.isRead = true;
        }

        if(typeof callbackAfterRead === 'function') {
            callbackAfterRead()
        }
    }
}