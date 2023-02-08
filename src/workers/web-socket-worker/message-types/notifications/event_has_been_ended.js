import { InitialMessage } from "./initial.message";

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { NotificationImage } from "../../../../assets/img/notifications/notification.images";
import { NotificationsBus } from '../../../event-bus-worker' 

// FIXME NOTIFICATIONS
@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventHasBeenEnded)
@NotificationSetImage(NotificationImage.NotificationSuccess)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    text: 'Понятно'
  },
  {
    type: MessageActionTypes.Action,
    text: 'Оставить отзыв',
    action: ({notificationInstance, modals}) => {
      NotificationsBus.emit('openEventReviewModal', notificationInstance)
    },
    actionType: MessageActionDataTypes.Callback,
    buttonType: 'stroked'
  },
])
export class EventHasBeenEndedMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.event.name} - событие закончилось! Вы можете оставить отзыв о событии и учасниках, надеемся Вам все понравилось!"`
    ]
  };

  createTitle() {
    return 'Событие закончилось!';
  }
}
