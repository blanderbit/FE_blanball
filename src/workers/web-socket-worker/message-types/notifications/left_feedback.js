import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage,
} from '../../type.decorator';

import { MessageActionTypes } from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { i18n } from '@plugins/i18n.plugin';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LeftFeedback)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: i18n.global.t('push_notifications.left_feebback.first_button'),
    buttonWidth: 88,
    buttonHeight: 28,
  },
])
export class LeftFeedbackMessage extends InitialMessage {
  createTexts(data) {
    return [data.review.text];
  }
  createTitle() {
    return i18n.global.t('push_notifications.left_feebback.title');
  }
}
