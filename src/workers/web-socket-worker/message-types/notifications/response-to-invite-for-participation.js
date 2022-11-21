import { InitialMessage } from "./initial.message";

import {
  SetActions,
  SetMessageType,
  SetPushNotificationTheme,
  AuthWebSocketMessage,
  NotificationSetUserImage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { ROUTES } from "../../../../router/index";
import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToInviteForEvent)
@NotificationSetUserImage()
@SetActions()
export class ResponseToInviteForParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      data.invite.response
        ? `Юзер ${data.sender.name} подтвердил свое участие на ивенте;`
        : `Юзер ${data.sender.name} отклонил свое участие на ивенте;`
    ]
  };

  createTitle(data) {
    return data.invite.response
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

    if (this.data.invite.response) {
      this.actions.push({
        type: MessageActionTypes.Action,
        text: 'Просмотреть ивент',
        action: () => ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(this.data.event.id),
        actionType: MessageActionDataTypes.UrlCallback,
        buttonType: 'stroked'
      });
      SetPushNotificationTheme('success')(this)
    } else {
      this.actions.push({
        type: MessageActionTypes.Action,
        text: 'Найти юзеров',
        action: ROUTES.APPLICATION.USERS.absolute,
        actionType: MessageActionDataTypes.Url,
        buttonType: 'stroked'
      });
      SetPushNotificationTheme('error')(this)
    }
  }
}