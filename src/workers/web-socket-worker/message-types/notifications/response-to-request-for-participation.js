import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    SetPushNotificationTheme,
    WebSocketMessage,
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { ROUTES } from "../../../../router/index";
import { WebSocketTypes } from "../../web.socket.types";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToRequestForParticipation)
@SetActions()
export class ResponseToRequestForParticipationMessage extends InitialMessage {

    createTexts(data) {
        return [
            data.invite.response === 'accepted'
                ? `Владелец ивента ${data.sender.name} подтвердил ваш запрос участие на ивенте;`
                : `Владелец ивента ${data.sender.name} отклонил ваш запрос участие на ивенте;`
        ]
    };

    createTitle(data) {
        return data.invite.response === 'accepted'
            ? 'Владелец подтвердил ваш запрос участие на ивенте;'
            : 'Владелец отклонил ваш запрос участие на ивенте;'
    }

    onInit() {
        this.actions = [
            {
                type: MessageActionTypes.ActionClose,
                text: 'Понятно',
            }
        ];

        if (this.data.invite.response === 'accepted') {
            this.actions.push({
                type: MessageActionTypes.Action,
                text: 'Просмотреть ивент',
                action: () => ROUTES.APPLICATION.GET_ONE.absolute(this.data.event.id),
                actionType: MessageActionDataTypes.UrlCallback
            });
            SetPushNotificationTheme('success')(this)
        } else {
            this.actions.push({
                type: MessageActionTypes.Action,
                text: 'Найти другие ивенты',
                action: ROUTES.APPLICATION.EVENTS.absolute,
                actionType: MessageActionDataTypes.Url
            });
            SetPushNotificationTheme('error')(this)
        }
    }
}