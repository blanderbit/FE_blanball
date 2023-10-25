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
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '../../../../router/router.const';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.NewUserOnTheEvent)
@NotificationSetUserImage()
@SetActions([
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
])
export class NewUserOnTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.sender.last_name} ${data.sender.name} 
       долучився до «${data.event.name}, ${dayjs(new Date())
        .locale(dayjsUkrLocale)
        .format('DD.MM.YYYY')}» як гравець`,
    ];
  }

  createTitle() {
    return 'Новий учасник події';
  }
}
