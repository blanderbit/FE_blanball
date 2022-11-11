import { InitialMessage } from "./initial.message";

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage, NotificationSetImage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { NotificationImage } from "../../../../assets/img/notifications/notification.images";

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
            modals.review.data = notificationInstance;
            modals.review.active = true
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
