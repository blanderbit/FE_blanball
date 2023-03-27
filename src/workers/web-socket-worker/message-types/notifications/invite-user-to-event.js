import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { API } from '../../../api-worker/api.worker';
import dayjs from 'dayjs';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.InviteUserToEvent)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      API.EventService.declineOrAcceptInvites(
        notificationInstance.data.invite.id,
        true
      ).then(() => {
        notificationInstance.data.response = true;
        notificationInstance.update(notificationInstance.data);
      }),
    actionType: MessageActionDataTypes.Callback,
    buttonType: 'success',
    buttonText: 'Прийняти',
    buttonWidth: 88,
    buttonHeight: 28,
  },
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      API.EventService.declineOrAcceptInvites(
        notificationInstance.data.invite.id,
        false
      ).then(() => {
        notificationInstance.data.response = false;
        notificationInstance.update(notificationInstance.data);
      }),
    actionType: MessageActionDataTypes.Callback,
    buttonType: 'default',
    buttonText: 'Відхилити',
    buttonWidth: 88,
    buttonHeight: 28,
  },
])
export class InviteUserToEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.sender.last_name} ${
        data.sender.name
      } запросив вас на дружній матч «${data.event.name}» о ${dayjs(
        data.event?.date_and_time
      ).format('MM:DD o HH:mm')}`,
    ];
  }

  createTextsAfterAction() {
    return {
      response: this.data.response,
      text: this.data.response
        ? 'Вы добавились на событие!'
        : 'Вы откзались от участия на событии!',
    };
  }

  onInit() {
    this.textsAfterAction =
      typeof this.data.response === 'boolean' && this.createTextsAfterAction();
  }

  onUpdate() {
    this.textsAfterAction =
      typeof this.data.response === 'boolean' && this.createTextsAfterAction();
  }

  createTitle() {
    return 'Запрошення на подію';
  }
}
