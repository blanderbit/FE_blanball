import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  SetPushNotificationTheme,
  AuthWebSocketMessage,
  NotificationSetUserImage,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '@routes/router.const';
import { i18n } from '@plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToInviteForEvent)
@NotificationSetUserImage()
@SetActions()
export class ResponseToInviteForParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      data.invite.response
        ? i18n.global.t(
            'push_notifications.response_to_invite_for_participation.success_text',
            {
              senderLastName: data.sender.last_name,
              senderName: data.sender.name,
              eventName: data?.event.name,
            }
          )
        : i18n.global.t(
            'push_notifications.response_to_invite_for_participation.error_text',
            {
              senderLastName: data.sender.last_name,
              senderName: data.sender.name,
              eventName: data?.event.name,
            }
          ),
    ];
  }

  createTitle(data) {
    return data.invite.response
      ? i18n.global.t(
          'push_notifications.response_to_invite_for_participation.success_title',
          {
            senderLastName: data.sender.last_name,
            senderName: data.sender.name,
          }
        )
      : i18n.global.t(
          'push_notifications.response_to_invite_for_participation.error_title',
          {
            senderLastName: data.sender.last_name,
            senderName: data.sender.name,
          }
        );
  }

  onInit() {
    this.actions = [
      {
        type: MessageActionTypes.ActionClose,
        buttonType: 'success',
        buttonText: i18n.global.t(
          'push_notifications.response_to_invite_for_participation.first_button'
        ),
        buttonWidth: 88,
        buttonHeight: 28,
      },
      {
        type: MessageActionTypes.Action,
        action: ({ notificationInstance }) =>
          ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(
            notificationInstance.data.event.id
          ),
        actionType: MessageActionDataTypes.UrlCallback,
        buttonType: 'default',
        buttonText: i18n.global.t(
          'push_notifications.response_to_invite_for_participation.second_button'
        ),
        buttonWidth: 133,
        buttonHeight: 28,
      },
    ];

    if (!this.data.invite.response) {
      SetPushNotificationTheme('error')(this);
    }
  }
}
