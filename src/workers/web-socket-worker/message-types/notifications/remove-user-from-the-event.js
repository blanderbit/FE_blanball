import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator';

import { MessageActionTypes } from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { NotificationImage } from '@images/notifications/notification.images';
import { i18n } from '@plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.UserRemoveFromEvent)
@NotificationSetImage(NotificationImage.NotificationError)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'default',
    buttonText: i18n.global.t(
      'push_notifications.remove_user_from_the_event.first_button'
    ),
    buttonWidth: 86,
    buttonHeight: 28,
  },
])
export class RemoveUserFromTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      i18n.global.t('push_notifications.remove_user_from_the_event.text', {
        eventName: data.event.name,
      }),
    ];
  }

  createTitle() {
    return i18n.global.t('push_notifications.remove_user_from_the_event.title');
  }
}
