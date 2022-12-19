import { InitialMessage } from "./initial.message";

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage
} from "../../type.decorator";

import { MessageActionDataTypes, MessageActionTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { ROUTES } from "../../../../router/router.const";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LeaveUserFromTheEvent)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    text: 'Понятно'
  },
  {
    type: MessageActionTypes.Action,
    text: 'Просмотреть ивент',
    action: ({notificationInstance}) => ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(notificationInstance.data.event.id),
    actionType: MessageActionDataTypes.UrlCallback,
    buttonType: 'stroked'
  },
])
export class LeaveUserFromTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Юзер ${data.sender.name}, покинул событие - для того что бы просмотреть событие нажмите кнопку "${this.actions[1].text}"`
    ]
  };

  createTitle() {
    return 'Юзер покинул событие.';
  }
}