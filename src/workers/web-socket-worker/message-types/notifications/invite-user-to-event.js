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
import { i18n } from '../../../../plugins/i18n.plugin';
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
    buttonText: i18n.global.t(
      'push_notifications.invite_user_to_event.first_button'
    ),
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
    buttonText: i18n.global.t(
      'push_notifications.invite_user_to_event.second_button'
    ),
    buttonWidth: 88,
    buttonHeight: 28,
  },
])
export class InviteUserToEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.invite_user_to_event.text', {
        senderLastName: data.sender.last_name,
        senderName: data.sender.name,
        eventName: data.event.name,
        eventDateTime: dayjs(data.event?.date_and_time).format('DD.MM o HH:mm'),
      }),
    ];
  }

  createTitle() {
    return i18n.global.t('push_notifications.invite_user_to_event.title');
  }
}
