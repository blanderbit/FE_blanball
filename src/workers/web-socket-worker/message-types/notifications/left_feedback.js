import { InitialMessage } from "./initial.message";

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { ROUTES } from "../../../../router";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LeftFeedback)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    text: 'Понятно'
  },
  {
    type: MessageActionTypes.Action,
    text: 'Просмотреть все отзывы', // TODO should add right button
    action: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
    actionType: MessageActionDataTypes.Url,
    buttonType: 'stroked'
  },
])
export class LeftFeedbackMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Один из учасников события оставил вам отзыв! Что бы просмотреть все отзывы нажмите на кнопку "${this.actions[1].text}"`
    ]
  };

  createTitle() {
    return 'Вам оставили отзыв!';
  }
}
