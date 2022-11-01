import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    AuthWebSocketMessage
} from "../../type.decorator";

import { ROUTES } from "../../../../router";
import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.UserRemoveFromEvent)
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
export class RemoveUserFromTheEventMessage extends InitialMessage {
    createTexts(data) {
        return [
            `${data.recipient.name} - вас удалили с события. По причине - "${data.reason.text}"`,
            `Для того что бы подобрать другое событие нажмите кнопку "${this.actions[1].text}"`
        ]
    };

    createTitle() {
        return 'Вы удалены с ивента!';
    }
}