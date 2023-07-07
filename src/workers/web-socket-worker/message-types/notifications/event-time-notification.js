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
import Duration from 'dayjs/plugin/duration';
dayjs.extend(Duration)
@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventTimeNotification)
@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: 'Зрозуміло',
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
      `${data.recipient.name}, початок запланованої події «${data.event.name}» за ${time_to_start} годин`,
    ];
  }

  createTitle() {
    return 'Нагадування про майбутню подію';
  }
}
