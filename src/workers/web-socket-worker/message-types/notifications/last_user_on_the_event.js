import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { NotificationImage } from '../../../../assets/img/notifications/notification.images';
import { ROUTES } from '../../../../router/router.const';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LastUserOnTheEvent)
@NotificationSetImage(NotificationImage.NotificationSuccess)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: 'Чудово',
    buttonWidth: 76,
    buttonHeight: 28,
  },
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(
        notificationInstance.data.event.id
      ),
    actionType: MessageActionDataTypes.UrlCallback,
    buttonType: 'default',
    buttonText: 'На сторінку події',
    buttonWidth: 133,
    buttonHeight: 28,
  },
])
export class LastUserOnTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Подія «${data.event.name}» вже набрала необхідну кількість учасників"`,
    ];
  }

  createTitle() {
    return 'Реєстрацію завершено';
  }
}
