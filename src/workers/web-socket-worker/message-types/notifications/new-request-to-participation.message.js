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
@SetMessageType(WebSocketTypes.NewRequestToParticipation)
@SetActions([
    {
        type: MessageActionTypes.Action,
        text: 'Принять',
        action: (instance) => API.EventService.declineOrAcceptParticipations(instance.data.request.id, true),
        actionType: MessageActionDataTypes.Callback,
        buttonColor: 'success'
    },
    {
        type: MessageActionTypes.Action,
        text: 'Отклонить',
        action: (instance) => API.EventService.declineOrAcceptParticipations(instance.data.request.id, false),
        actionType: MessageActionDataTypes.Callback,
        buttonColor: 'error'
    },
])
export class NewRequestToParticipationMessage extends InitialMessage {
    createTexts(data) {
        return [
            `Юзер ${data.sender.name} хочет добавится на ваше событие, выбирите пожалуйста действие!`
        ]
    };

    createTitle() {
        return 'Юзер хочет добавится на ивент.';
    }
}