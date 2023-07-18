import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator';
import { i18n } from '../../../../plugins/i18n.plugin';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { NotificationImage } from '@images/notifications/notification.images';
import { NotificationsBus } from '../../../event-bus-worker';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventHasBeenEnded)
@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonText: i18n.global.t(
      'push_notifications.event_has_been_ended.first_button'
    ),
    buttonType: 'success',
    buttonWidth: 91,
    buttonHeight: 28,
  },
  {
    type: MessageActionTypes.Action,
    buttonText: i18n.global.t(
      'push_notifications.event_has_been_ended.second_button'
    ),
    action: ({ notificationInstance }) => {
      NotificationsBus.emit('openEventReviewModal', notificationInstance);
    },
    actionType: MessageActionDataTypes.Callback,
    buttonType: 'default',
    buttonWidth: 150,
    buttonHeight: 28,
  },
])
export class EventHasBeenEndedMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.event_has_been_ended.text', {
        eventName: data.event.name,
      }),
    ];
  }

  createTitle() {
    return i18n.global.t('push_notifications.event_has_been_ended.title');
  }
}
