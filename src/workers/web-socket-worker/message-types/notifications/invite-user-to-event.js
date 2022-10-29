import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    WebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { API } from "../../../api-worker/api.worker";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.InviteUserToEvent)
@SetActions([
    {
        type: MessageActionTypes.Action,
        text: 'Принять',
        action: (instance) => API.EventService.declineOrAcceptInvites(instance.data.recipient.id, true),
        actionType: MessageActionDataTypes.Callback,
        buttonColor: 'success'
    },
    {
        type: MessageActionTypes.Action,
        text: 'Отклонить',
        action: (instance) => API.EventService.declineOrAcceptInvites(instance.data.recipient.id, false),
        actionType: MessageActionDataTypes.Callback,
        buttonColor: 'error'
    },
])
export class InviteUserToEventMessage extends InitialMessage {
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