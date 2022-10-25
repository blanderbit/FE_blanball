import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    WebSocketMessage
} from "../../type.decorator";

import { ROUTES } from "../../../../router";
import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.NewUserOnTheEvent)
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
export class NewUserOnTheEventMessage extends InitialMessage {
    createTexts(data) {
        return [
            `Юзер ${data.sender.name} добавился на событие - для того что бы просмотреть событие нажмите кнопку "${this.actions[1].text}`
        ]
    };

    createTitle() {
        return 'Юзер добавился на событие!';
    }
}