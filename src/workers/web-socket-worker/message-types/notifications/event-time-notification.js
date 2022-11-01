import { InitialMessage } from "./initial.message";


import {
    SetActions,
    SetMessageType,
    AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventTimeNotification)
@SetActions([
    {
        type: MessageActionTypes.ActionClose,
        text: 'Понятно'
    }
])
export class EventTimeNotificationMessage extends InitialMessage {
    createTexts(data) {
        return [
            `Напоминаем, ${data.recipient.name} - событие начинается в ${data.start.start_time}, время до старта ${data.event.time_to_start}`
        ]
    };

    createTitle() {
        return 'Напоминание о старте события.';
    }
}