import { InitialMessage } from './initial.message';

import dayjs from 'dayjs';
import dayjsUkrLocale from 'dayjs/locale/uk';

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

import { i18n } from '@plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.NewRequestToParticipation)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      API.EventService.declineOrAcceptParticipations(
        notificationInstance.data.request.id,
        true
      ).then(() => {
        notificationInstance.data.response = true;
        notificationInstance.update(notificationInstance.data);
      }),
    actionType: MessageActionDataTypes.Callback,
    buttonType: 'success',
    buttonText: i18n.global.t(
      'push_notifications.new_request_to_participation.first_button'
    ),
    buttonWidth: 88,
    buttonHeight: 28,
  },
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      API.EventService.declineOrAcceptParticipations(
        notificationInstance.data.request.id,
        false
      ).then(() => {
        notificationInstance.data.response = false;
        notificationInstance.update(notificationInstance.data);
      }),
    actionType: MessageActionDataTypes.Callback,
    buttonType: 'default',
    buttonText: i18n.global.t(
      'push_notifications.new_request_to_participation.second_button'
    ),
    buttonWidth: 88,
    buttonHeight: 28,
  },
])
export class NewRequestToParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.new_request_to_participation.text', {
        senderLastName: data.sender.last_name,
        senderName: data.sender.name,
        eventName: data.event.name,
        currentTime: dayjs(new Date())
          .locale(dayjsUkrLocale)
          .format('DD.MM.YYYY'),
      }),
    ];
  }

  createTitle() {
    return i18n.global.t(
      'push_notifications.new_request_to_participation.title'
    );
  }
}
