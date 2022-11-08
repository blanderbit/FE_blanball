import { InitialUpdation } from "./initial.message";
import { SetMessageType, AuthWebSocketMessage } from "../../type.decorator";
import { WebSocketTypes } from "../../web.socket.types";


@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.UpdateMessageAcceptOrDeclineInviteToEvent)
export class UpdateMessageAcceptOrDeclineInviteToEventsUpdation extends InitialUpdation {
    handleUpdate(notifications) {
        const notificationForUpdate = notifications.value.find(item => item.notification_id === this.data.notification.id);
        if(notificationForUpdate) {
            notificationForUpdate.data.response = this.data.notification.response;
        }
    }
}