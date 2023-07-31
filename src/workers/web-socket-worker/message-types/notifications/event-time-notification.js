import { InitialMessage } from './initial.message';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator';

import { MessageActionTypes } from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { NotificationImage } from '@images/notifications/notification.images'
import Duration from 'dayjs/plugin/duration';
import { i18n } from '../../../../plugins/i18n.plugin';

dayjs.extend(Duration)

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventTimeNotification)
@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: i18n.global.t(
      'push_notifications.event_time_notification.first_button'
    ),
    buttonWidth: 88,
    buttonHeight: 28,
  },
])
export class EventTimeNotificationMessage extends InitialMessage {
  createTexts(data) {
    const time_to_start = dayjs
      .duration({
        minutes: data.event.time_to_start,
      })
      .asHours();

    return [
      i18n.global.t('push_notifications.event_time_notification.text', {
        recipientName: data.recipient.name,
        eventName: data.event.name,
        timeToStart: time_to_start,
      }),
    ];
  }

  createTitle() {
    return i18n.global.t('push_notifications.event_time_notification.title');
  }
}
