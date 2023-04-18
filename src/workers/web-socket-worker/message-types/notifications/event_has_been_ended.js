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
import { NotificationImage } from '../../../../assets/img/notifications/notification.images';
import { NotificationsBus } from '../../../event-bus-worker';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventHasBeenEnded)
@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonText: 'Зрозуміло',
    buttonType: 'success',
    buttonWidth: 91,
    buttonHeight: 28,
  },
  {
    type: MessageActionTypes.Action,
    buttonText: 'Залишити відгук',
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
      `Подія "${data.event.name}" була закінчена, ви можете залишити відгук про подію та її учасників"`,
    ];
  }

  createTitle() {
    return 'Подія закінчилася';
  }
}
