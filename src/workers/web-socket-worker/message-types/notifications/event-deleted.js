import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    SetPushNotificationTheme,
    WebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { ROUTES } from "../../../../router/index";
import { WebSocketTypes } from "../../web.socket.types";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.EventDeleted)
@SetPushNotificationTheme('error')
@SetActions([
    {
        type: MessageActionTypes.ActionClose,
        text: 'Понятно'
    },
    {
        type: MessageActionTypes.Action,
        text: 'Найти ивенты',
        action: ROUTES.APPLICATION.EVENTS.absolute,
        actionType: MessageActionDataTypes.Url,
        buttonType: 'stroked'
    }
])
export class EventDeletedMessage extends InitialMessage {
    createTexts(data) {
        return [
            `Событие было удалено. Для того что бы подобрать другое событие нажмите кнопку "${this.actions[1].text}."`
        ]
    };

    createTitle() {
        return 'Событие удалено!';
    }
}

// data
// :
// {recipient: {id: 1, name: "string", last_name: "string"},…}
// event
// :
// {id: 1, start_time: null, time_to_start: null}
// id
// :
// 1
// start_time
// :
// null
// time_to_start
// :
// null
// recipient
// :
// {id: 1, name: "string", last_name: "string"}
// id
// :
// 1
// last_name
// :
// "string"
// name
// :
// "string"
// date_time
// :
// "2022-10-23 15:25:06.060757+00:00"
// message_type
// :
// "event_deleted"
