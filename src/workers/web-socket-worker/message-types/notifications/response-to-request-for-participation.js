import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage,
  SetPushNotificationTheme,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '../../../../router/router.const';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToRequestForParticipation)
@NotificationSetUserImage()
@SetActions()
export class ResponseToRequestForParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      data.request.response
        ? `Владелец ивента ${data.sender.name} подтвердил ваш запрос участие на ивенте;`
        : `Владелец ивента ${data.sender.name} отклонил ваш запрос участие на ивенте;`,
    ];
  }

  createTitle(data) {
    return data.request.response
      ? 'Автор події прийняв вашу заявку на участь'
      : 'Автор події відхилив вашу заявку на участь';
  }

  onInit() {
    this.actions = [
      {
        type: MessageActionTypes.ActionClose,
        text: 'Зрозуміло',
      },
    ];

    if (this.data.request.response) {
      this.actions.push({
        type: MessageActionTypes.Action,
        text: 'Переглянути подію',
        action: ({ notificationInstance }) =>
          ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(
            notificationInstance.data.event.id
          ),
        actionType: MessageActionDataTypes.UrlCallback,
        buttonType: 'stroked',
      });
      SetPushNotificationTheme('success')(this);
    } else {
      this.actions.push({
        type: MessageActionTypes.Action,
        text: 'Знайти інші події',
        action: ROUTES.APPLICATION.EVENTS.absolute,
        actionType: MessageActionDataTypes.Url,
        buttonType: 'stroked',
      });
      SetPushNotificationTheme('error')(this);
    }
  }
}
