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
@SetMessageType(WebSocketTypes.InviteUserToEvent)
@SetActions([
  {
    type: MessageActionTypes.Action,
    text: 'Принять',
    action: ({notificationInstance}) => API.EventService
      .declineOrAcceptInvites(notificationInstance.data.invite.id, true)
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
      .declineOrAcceptInvites(notificationInstance.data.invite.id, false)
      .then(() => {
        notificationInstance.data.response = false;
        notificationInstance.update(notificationInstance.data);
      })
    ,
    actionType: MessageActionDataTypes.Callback,
    buttonColor: 'error'
  },
])
export class InviteUserToEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Юзер ${data.sender.name} приглашает вас на событие "${data.event.name}", пожалуйста выбирите действие!`
      // TODO add inplementation for move to user profile
    ]
  };

  createTextsAfterAction() {
    return {
      response: this.data.response,
      text: this.data.response
        ? 'Вы добавились на событие!'
        : 'Вы откзались от участия на событии!'
    }
  }

  onInit() {
    this.textsAfterAction = typeof this.data.response === 'boolean' && this.createTextsAfterAction();
  }

  onUpdate() {
    this.textsAfterAction = typeof this.data.response === 'boolean' && this.createTextsAfterAction();
  }

  createTitle() {
    return 'Приглашение на событие.';
  }
}