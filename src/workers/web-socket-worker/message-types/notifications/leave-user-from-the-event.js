import { InitialMessage } from './initial.message';

import dayjs from 'dayjs';
import dayjsUkrLocale from 'dayjs/locale/uk';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage,
} from '../../type.decorator';

import {
  MessageActionDataTypes,
  MessageActionTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '../../../../router/router.const';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LeaveUserFromTheEvent)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.Action,
    action: ROUTES.WORKS.absolute,
    actionType: MessageActionDataTypes.Url,
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
])
export class LeaveUserFromTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.sender.last_name} ${data.sender.name} вийшов зі списку учасників «${data.event.name}, ${dayjs(
        new Date()
      ).locale(dayjsUkrLocale).format('DD.MM.YYYY o HH:MM')}»`,
    ];
  }

  createTitle() {
    return 'Учасник відкликав свою участь у події'
  }
}
