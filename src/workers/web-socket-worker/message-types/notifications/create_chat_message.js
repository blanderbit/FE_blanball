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
import { ChatWebSocketTypes } from '../chat/web.socket.types';
import { NotificationImage } from '../../../../assets/img/notifications/notification.images';
import { ROUTES } from '../../../../router/router.const';
import { i18n } from '../../../../plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(ChatWebSocketTypes.EventUpdated)
@SetActions([
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(
        notificationInstance.data.event.id
      ),
    actionType: MessageActionDataTypes.UrlCallback,
    buttonType: 'success',
    buttonText: i18n.global.t('push_notifications.event_updated.first_button'),
    buttonWidth: 134,
    buttonHeight: 28,
  },
])
export class EventUpdatedMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.event_updated.text', {
        eventName: data.event.name,
      }),
    ];
  }

  createTitle() {
    return i18n.global.t('push_notifications.event_updated.title');
  }
}