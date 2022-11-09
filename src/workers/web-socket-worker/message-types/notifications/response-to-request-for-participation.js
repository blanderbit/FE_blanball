import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { ROUTES } from "../../../../router/index";
import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToRequestForParticipation)
@SetActions()
export class ResponseToRequestForParticipationMessage extends InitialMessage {
    createTexts(data) {
        return [
            data.invite.response
                ? `Владелец ивента ${data.sender.name} подтвердил ваш запрос участие на ивенте;`
                : `Владелец ивента ${data.sender.name} отклонил ваш запрос участие на ивенте;`
        ]
    };

    createTitle(data) {
        return data.invite.response
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

        if (this.data.request.response) {
            this.actions.push({
                type: MessageActionTypes.Action,
                text: 'Просмотреть ивент',
                action: ({ notificationInstance }) => ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(notificationInstance.data.event.id),
                actionType: MessageActionDataTypes.UrlCallback,
                buttonType: 'stroked'
            });
            SetPushNotificationTheme('success')(this)
        } else {
            this.actions.push({
                type: MessageActionTypes.Action,
                text: 'Найти другие ивенты',
                action: ROUTES.APPLICATION.EVENTS.absolute,
                actionType: MessageActionDataTypes.Url,
                buttonType: 'stroked'
            });
            SetPushNotificationTheme('error')(this)
        }
    }
}