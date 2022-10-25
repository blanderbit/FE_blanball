import { InitialMessage } from "./initial.message";

import {
    MessageDataConfiguration,
    SetActions,
    SetMessageType,
    WebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.InviteUserToEvent)
@SetActions([
    {
        type: MessageActionTypes.Action,
        text: 'Принять',
        action: () => new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, 5000)
        }),
        actionType: MessageActionDataTypes.Callback
    },
    {
        type: MessageActionTypes.Action,
        text: 'Отклонить',
        action: () => '',
        actionType: MessageActionDataTypes.Callback
    },
])
export class InviteUserToEventMessage extends InitialMessage {
    @MessageDataConfiguration(1) data;

    createTexts(data) {
        return [
            `Юзер ${data.sender.name} приглашает вас на событие "${data.event.name}", пожалуйста выбирите действие!`
            // TODO add inplementation for move to user profile
        ]
    };

    createTitle() {
        return 'Приглашение на событие.';
    }
}

// {event
// :
// {id: 5}
// id
// :
// 5
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
// sender
// :
// {id: 2, name: "string", last_name: "string"}
// id
// :
// 2
// last_name
// :
// "string"
// name
// :
// "string"}

// TODO нужно ли добавить нам просмотреть ивент этот?