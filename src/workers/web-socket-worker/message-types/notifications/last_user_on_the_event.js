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
import { ROUTES } from "../../../../router/router.const";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LastUserOnTheEvent)
@NotificationSetImage(NotificationImage.NotificationSuccess)
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
export class LastUserOnTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.event.name} - на событие добавился последний учасник! Вас ждет что то чудесное:)"`
    ]
  };

  createTitle() {
    return 'Набраны все учасники!';
  }
}
