import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { API } from "../../../api-worker/api.worker";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.InviteUserToEvent)
@SetActions([
    {
        type: MessageActionTypes.Action,
        text: 'Принять',
        action: (instance) => API.EventService.declineOrAcceptInvites(instance.data.invite.id, true),
        actionType: MessageActionDataTypes.Callback,
        buttonColor: 'success'
    },
    {
        type: MessageActionTypes.Action,
        text: 'Отклонить',
        action: (instance) => API.EventService.declineOrAcceptInvites(instance.data.invite.id, false),
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