import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  SetPushNotificationTheme,
  AuthWebSocketMessage,
  NotificationSetUserImage,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '../../../../router/router.const';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToInviteForEvent)
@NotificationSetUserImage()
@SetActions()
export class ResponseToInviteForParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      data.invite.response
        ? `${data.sender.last_name} ${data.sender.name} прийняв ваше запрошення на участь у «${data?.event.name}»`
        : `${data.sender.last_name} ${data.sender.name} відхилив ваше запрошення на участь у «${data?.event.name}»`,
    ];
  }

  createTitle(data) {
    return data.invite.response
      ? `${data.sender.last_name} ${data.sender.name} прийняв ваше запрошення на участь у події`
      : `${data.sender.last_name} ${data.sender.name} відхилив ваше запрошення на участь у події`;
  }

  onInit() {
    this.actions = [
      {
        type: MessageActionTypes.ActionClose,
        buttonType: 'success',
        buttonText: 'Зрозуміло',
        buttonWidth: 88,
        buttonHeight: 28,
      },
      {
        type: MessageActionTypes.Action,
        action: ({ notificationInstance }) =>
          ROUTES.APPLICATION.USERS.GET_ONE.absolute(
            notificationInstance.data.sender.id
          ),
        actionType: MessageActionDataTypes.UrlCallback,
        buttonType: 'default',
        buttonText: 'Переглянути профіль',
        buttonWidth: 160,
        buttonHeight: 28,
      },
    ];

    if (!this.data.invite.response) {
      SetPushNotificationTheme('error')(this);
    }
  }
}
