import { InitialMessage } from "./initial.message";


import {
    SetActions,
    SetMessageType,
    AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import * as dayjs from "dayjs";

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
        const start_time = dayjs.duration({
          minutes: data.start.start_time
        }).format('MM.DD HH:mm');

        const time_to_start = dayjs.duration({
          minutes: data.start.time_to_start
        }).asHours();

        return [
            `Напоминаем, ${data.recipient.name} - событие начинается в ${start_time}, время до старта ${time_to_start}`
        ]
    };

    createTitle() {
        return 'Напоминание о старте события.';
    }
}