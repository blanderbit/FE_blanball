import { InitialMessage } from "./initial.message";

import {
    SetActions,
    SetMessageType,
    AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { ROUTES } from "../../../../router";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventHasBeenEnded)
@SetActions([
    {
        type: MessageActionTypes.ActionClose,
        text: 'Понятно'
    },
    {
        type: MessageActionTypes.Action,
        text: 'Оставить отзыв',
        action: (instance, modals) => {
            modals.review.data = instance;
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
