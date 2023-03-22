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
import { API } from '../../../api-worker/api.worker';

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
    buttonText: 'Прийняти',
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
    buttonText: 'Відхилити',
    buttonWidth: 88,
    buttonHeight: 28,
  },
])
export class NewRequestToParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      `${data.sender.last_name} ${data.sender.name} хоче долучитися до події «${
        data.event.name
      }», 
      ${dayjs(new Date()).locale(dayjsUkrLocale).format('DD.MM.YYYY')}`,
    ];
  }

  createTitle() {
    return 'Новий запит на участь у події';
  }
}
