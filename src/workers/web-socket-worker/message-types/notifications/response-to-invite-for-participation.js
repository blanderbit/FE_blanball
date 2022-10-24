import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    SetPushNotificationTheme,
    WebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { ROUTES } from "../../../../router/index";
import { WebSocketTypes } from "../../web.socket.types";

@WebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToInviteForEvent)
@SetActions()
export class ResponseToInviteForParticipationMessage extends InitialMessage {
    actions = [];

    createTexts(data) {
        return [
            data.invite.response === 'accepted'
                ? `Юзер ${data.sender.name} подтвердил свое участие на ивенте;`
                : `Юзер ${data.sender.name} отклонил свое участие на ивенте;`
        ]
    };

    createTitle(data) {
        return data.invite.response === 'accepted'
            ? 'Юзер подтвердил свое участие на ивенте;'
            : 'Юзер отклонил свое участие на ивенте;'
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
            SetPushNotificationTheme('error')(this)
        }
    }
}