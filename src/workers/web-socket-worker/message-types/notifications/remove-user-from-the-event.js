import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator';

import {
  MessageActionTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { NotificationImage } from '../../../../assets/img/notifications/notification.images';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.UserRemoveFromEvent)
@NotificationSetImage(NotificationImage.NotificationError)
@SetActions([
  {
    type: MessageActionTypes.ActionClose,
    buttonType: 'default',
    buttonText: 'Зрозуміло',
    buttonWidth: 86,
    buttonHeight: 28,
  },
])
export class RemoveUserFromTheEventMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Шкода, але організатори «${data?.event.name}» відкликали вашу участь у події`,
    ];
  }

  createTitle() {
    return 'Вас було виключено з переліку учасників';
  }
}
