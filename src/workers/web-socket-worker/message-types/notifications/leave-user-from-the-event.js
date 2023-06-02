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
  MessageActionDataTypes,
  MessageActionTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '../../../../router/router.const';
import { i18n } from '../../../../plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LeaveUserFromTheEvent)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: i18n.global.t(
      'push_notifications.leave_user_from_the_event.first_button'
    ),
    buttonWidth: 86,
    buttonHeight: 28,
  },
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      ROUTES.APPLICATION.USERS.GET_ONE.absolute(
        notificationInstance.data.sender.id
      ),
    actionType: MessageActionDataTypes.UrlCallback,
    buttonType: 'default',
    buttonText: i18n.global.t(
      'push_notifications.leave_user_from_the_event.second_button'
    ),
    buttonWidth: 160,
    buttonHeight: 28,
  },
])
export class LeaveUserFromTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.leave_user_from_the_event.text', {
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
    return i18n.global.t('push_notifications.leave_user_from_the_event.title');
  }
}
