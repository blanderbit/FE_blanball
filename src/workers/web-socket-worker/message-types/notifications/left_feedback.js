import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage,
} from '../../type.decorator';

import {
  MessageActionTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.LeftFeedback)
@NotificationSetUserImage()
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'success',
    buttonText: 'Зрозуміло',
    buttonWidth: 88,
    buttonHeight: 28,
  },
])
export class LeftFeedbackMessage extends InitialMessage {
  createTexts(data) {
    return [
    ];
    // TODO Максим не работает вот эта нотификация 
  }

  createTitle() {
    return 'Новий відгук про вас';
  }
}
