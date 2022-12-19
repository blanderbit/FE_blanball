import { InitialMessage } from "../notifications/initial.message";

import {
  GeneralWebSocketMessage,
  SetActions,
  SetMessageType
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { ROUTES } from "../../../../router/router.const";

@SetMessageType(WebSocketTypes.ChangeMaintenance)
@GeneralWebSocketMessage()
@SetActions([
  {
    type: MessageActionTypes.Action,
    text: 'Понятно',
    action: ROUTES.WORKS.absolute,
    actionType: MessageActionDataTypes.Url,
  },
  {
    type: MessageActionTypes.Close,
    action: ROUTES.WORKS.absolute,
    actionType: MessageActionDataTypes.Url,
    buttonType: 'stroked'
  }
])
export class ChangeMaintenanceMessage extends InitialMessage {
  createTexts(data) {
    return [
      data.maintenance.type
        ? 'Мы извиняемся за временные неудобства; В скоре работа приложения будет востановленная;'
        : "Мы закончили технические работы. Спасибо за ожидание, приятного пользования!"
    ]
  };

  createTitle(data) {
    return data.maintenance.type
      ? 'Начались технические работы'
      : 'Закончились технические работы'
  }
}

