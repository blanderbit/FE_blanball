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
@SetMessageType(WebSocketTypes.EventDeleted)
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
    action: ROUTES.APPLICATION.EVENTS.absolute,
    actionType: MessageActionDataTypes.Url,
    buttonType: 'default',
    buttonText: 'Знайти інші події',
    buttonWidth: 150,
    buttonHeight: 28,
  },
])
export class EventDeletedMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.sender.last_name} ${
        data.sender.name
      } скасував проведення події «${data.event.name}, 
      ${dayjs(new Date()).locale(dayjsUkrLocale).format('DD.MM.YYYY')}»"`,
    ];
  }

  createTitle() {
    return 'Подію, на яку ви зареєструвались, було скасовано';
  }
}
