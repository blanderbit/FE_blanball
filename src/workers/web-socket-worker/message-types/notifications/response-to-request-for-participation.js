import { InitialMessage } from './initial.message';

import dayjs from 'dayjs';
import dayjsUkrLocale from 'dayjs/locale/uk';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage,
  SetPushNotificationTheme,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '@routes/router.const';
import { i18n } from '@plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToRequestForParticipation)
@NotificationSetUserImage()
@SetActions()
export class ResponseToRequestForParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      data.invite.response
        ? i18n.global.t(
            'push_notifications.response_to_request_for_participation.success_text',
            {
              senderLastName: data.sender.last_name,
              senderName: data.sender.name,
              eventName: data?.event.name,
              currentTime: dayjs(new Date())
                .locale(dayjsUkrLocale)
                .format('DD.MM.YYYY'),
            }
          )
        : i18n.global.t(
            'push_notifications.response_to_request_for_participation.error_text',
            {
              senderLastName: data.sender.last_name,
              senderName: data.sender.name,
              eventName: data?.event.name,
              currentTime: dayjs(new Date())
                .locale(dayjsUkrLocale)
                .format('DD.MM.YYYY'),
            }
          ),
    ];
  }

  createTitle(data) {
    return data.request.response
      ? i18n.global.t(
          'push_notifications.response_to_request_for_participation.success_title'
        )
      : i18n.global.t(
          'push_notifications.response_to_request_for_participation.error_title'
        );
  }

  onInit() {
    this.actions = [
      {
        type: MessageActionTypes.ActionClose,
        buttonType: 'success',
        buttonText: i18n.global.t(
          'push_notifications.response_to_request_for_participation.first_button'
        ),
        buttonWidth: 88,
        buttonHeight: 28,
      },
    ];

    if (this.data.request.response) {
      SetPushNotificationTheme('error')(this);
    } else {
      this.actions.push({
        type: MessageActionTypes.Action,
        action: ({ notificationInstance }) =>
          ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(
            notificationInstance.data.event.id
          ),
        actionType: MessageActionDataTypes.UrlCallback,
        buttonType: 'default',
        buttonText: i18n.global.t(
          'push_notifications.response_to_request_for_participation.second_button'
        ),
        buttonWidth: 133,
        buttonHeight: 28,
      });
    }
  }
}
