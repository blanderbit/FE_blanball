import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    WebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.NewRequestToParticipation)
@SetActions([
    {
        type: MessageActionTypes.Action,
        text: 'Принять',
        action: () => '',
        actionType: MessageActionDataTypes.Callback
    },
    {
        type: MessageActionTypes.Action,
        text: 'Отклонить',
        action: () => '',
        actionType: MessageActionDataTypes.Callback
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