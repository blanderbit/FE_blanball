import { InitialMessage } from "./initial.message";

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage
} from "../../type.decorator";

import { MessageActionTypes, MessageActionDataTypes } from "../../message.action.types";
import { WebSocketTypes } from "../../web.socket.types";
import { API } from "../../../api-worker/api.worker";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.NewRequestToParticipation)
@SetActions([
  {
    type: MessageActionTypes.Action,
    text: 'Принять',
    action: ({notificationInstance}) => API.EventService
      .declineOrAcceptParticipations(notificationInstance.data.request.id, true)
      .then(() => {
        notificationInstance.data.response = true;
        notificationInstance.update(notificationInstance.data);
      })
    ,
    actionType: MessageActionDataTypes.Callback,
    buttonColor: 'success'
  },
  {
    type: MessageActionTypes.Action,
    text: 'Отклонить',
    action: ({notificationInstance}) => API.EventService
      .declineOrAcceptParticipations(notificationInstance.data.request.id, false)
      .then(() => {
        notificationInstance.data.response = false;
        notificationInstance.update(notificationInstance.data);
      })
    ,
    actionType: MessageActionDataTypes.Callback,
    buttonColor: 'error'
  },
])
export class NewRequestToParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Юзер ${data.sender.name} хочет добавится на ваше событие, выбирите пожалуйста действие!`
    ]
  };

  createTextsAfterAction() {
    return {
      response: this.data.response,
      text: this.data.response
        ? 'Вы позволили добавится учаснику на событие!'
        : 'Вы отказали учаснику в добавлении на событие!'
    }
  }

  onInit() {
    this.textsAfterAction = typeof this.data.response === 'boolean' && this.createTextsAfterAction();
  }

  onUpdate() {
    this.textsAfterAction = typeof this.data.response === 'boolean' && this.createTextsAfterAction();
  }

  createTitle() {
    return 'Юзер хочет добавится на ивент.';
  }
}