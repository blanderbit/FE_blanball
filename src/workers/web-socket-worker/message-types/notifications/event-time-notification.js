import { InitialMessage } from './initial.message';
import * as dayjs from 'dayjs';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator';

import { MessageActionTypes } from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { NotificationImage } from '../../../../assets/img/notifications/notification.images';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventTimeNotification)
@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    text: 'Зрозуміло',
  },
])
export class EventTimeNotificationMessage extends InitialMessage {
  createTexts(data) {
    const start_time = dayjs
      .duration({
        minutes: data.start.start_time,
      })
      .format('MM.DD HH:mm');

    const time_to_start = dayjs
      .duration({
        minutes: data.start.time_to_start,
      })
      .asHours();

    return [
      `Команда Blanball нагадує вам, що подія "${data.recipient.name}" почнеться через ${time_to_start}`,
    ];
  }

  createTitle() {
    return 'Не пропустіть подію';
  }
}
