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

import { i18n } from '@plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.NewUserOnTheEvent)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: i18n.global.t(
      'push_notifications.new_user_on_the_event.first_button'
    ),
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
    buttonText: i18n.global.t(
      'push_notifications.new_user_on_the_event.second_button'
    ),
    buttonWidth: 160,
    buttonHeight: 28,
  },
])
export class NewUserOnTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.new_user_on_the_event.text', {
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
    return i18n.global.t('push_notifications.new_user_on_the_event.title');
  }
}
