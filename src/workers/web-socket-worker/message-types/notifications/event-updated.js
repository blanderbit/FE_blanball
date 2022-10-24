import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    WebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { ROUTES } from "../../../../router";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.EventUpdated)
@SetActions([
    {
        type: MessageActionTypes.ActionClose,
        text: 'Понятно',
    },
    {
        type: MessageActionTypes.Action,
        text: 'Просмотреть ивент',
        action: (instance) => ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(instance.data.event.id),
        actionType: MessageActionDataTypes.UrlCallback
    },
])
export class EventUpdatedMessage extends InitialMessage {
    createTexts(data) {
        return [
            `${data.recipient.name} - событие обновилось. Для того что бы просмотреть подробности обновления нажмите кнопку "${this.actions[1].text}"`
        ]
    };

    createTitle() {
        return 'Ивент был обновлен!';
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
// "2022-10-23 15:22:41.274298+00:00"
// message_type
// :
// "event_updated"