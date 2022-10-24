import { InitialMessage } from "./initial.message";

import { SetActions, SetMessageType, WebSocketMessage } from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { ROUTES } from "../../../../router/index";
import { WebSocketTypes } from "../../web.socket.types";

@SetMessageType(WebSocketTypes.ChangeMaintenance)
@WebSocketMessage()
@SetActions([
    {
        type: MessageActionTypes.Action,
        text: 'Понятно',
        action: ROUTES.WORKS.absolute,
        actionType: MessageActionDataTypes.Url
    },
    {
        type: MessageActionTypes.Close,
        action: ROUTES.WORKS.absolute,
        actionType: MessageActionDataTypes.Url
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

    createTitle() {
        return data.maintenance.type
            ? 'Начались технические работы'
            : 'Закончились технические работы'
    }
}

