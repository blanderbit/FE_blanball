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
import { i18n } from '../../../../plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventDeleted)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: i18n.global.t('push_notifications.event_deleted.first_button'),
    buttonWidth: 88,
    buttonHeight: 28,
  },
  {
    type: MessageActionTypes.Action,
    action: ROUTES.APPLICATION.EVENTS.absolute,
    actionType: MessageActionDataTypes.Url,
    buttonType: 'default',
    buttonText: i18n.global.t('push_notifications.event_deleted.second_button'),
    buttonWidth: 150,
    buttonHeight: 28,
  },
])
export class EventDeletedMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.event_deleted.text', {
        senderLastName: data.sender.last_name,
        senderName: data.sender.name,
        eventName: data.event.name,
        currentTime: dayjs(new Date())
          .locale(dayjsUkrLocale)
          .format('DD.MM.YYYY'),
      }),
    ];
  }

  createTitle() {
    return i18n.global.t('push_notifications.event_deleted.title');
  }
}
