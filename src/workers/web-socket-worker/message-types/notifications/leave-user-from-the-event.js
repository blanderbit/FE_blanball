import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    WebSocketMessage
} from "../../type.decorator";

import { MessageActionDataTypes, MessageActionTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { ROUTES } from "../../../../router";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.LeaveUserFromTheEvent)
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
export class LeaveUserFromTheEventMessage extends InitialMessage {
    createTexts(data) {
        return [
            `Юзер ${data.sender.name}, покинул событие - для того что бы просмотреть событие нажмите кнопку "${this.actions[1].text}"`
        ]
    };

    createTitle() {
        return 'Юзер покинул событие.';
    }
}