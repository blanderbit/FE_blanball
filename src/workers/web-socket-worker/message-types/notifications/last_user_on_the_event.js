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
import { NotificationImage } from '@images/notifications/notification.images';

import { i18n } from '@plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LastUserOnTheEvent)
@NotificationSetImage(NotificationImage.NotificationSuccess)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: i18n.global.t(
      'push_notifications.last_user_on_the_event.first_button'
    ),
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
    buttonText: i18n.global.t(
      'push_notifications.last_user_on_the_event.second_button'
    ),
    buttonWidth: 133,
    buttonHeight: 28,
  },
])
export class LastUserOnTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.last_user_on_the_event.text', {
        eventName: data.event.name,
      }),
    ];
  }

  createTitle() {
    return i18n.global.t('push_notifications.last_user_on_the_event.title');
  }
}
