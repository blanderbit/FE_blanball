import { InitialMessage } from './initial.message'

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator'

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { NotificationImage } from "../../../../assets/img/notifications/notification.images";
import { NotificationsBus } from '../../../event-bus-worker' 


@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventHasBeenEnded)
@NotificationSetImage(NotificationImage.NotificationSuccess)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    text: 'Зрозуміло',
  },
  {
    type: MessageActionTypes.Action,
    text: 'Залишити відгук',
    action: ({notificationInstance}) => {
      NotificationsBus.emit('openEventReviewModal', notificationInstance)
    },
    actionType: MessageActionDataTypes.Callback,
    buttonType: 'stroked',
  },
])
export class EventHasBeenEndedMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Подія "${data.event.name}" була закінчена, ви можете залишити відгук про подію та її учасників"`,
    ]
  }

  createTitle() {
    return 'Подія закінчилася'
  }
}
