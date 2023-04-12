import { InitialMessage } from './initial.message';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetImage,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { NotificationImage } from '../../../../assets/img/notifications/notification.images';
import { ROUTES } from '../../../../router/router.const';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.EventUpdated)
@NotificationSetImage(NotificationImage.NotificationInfo)
@SetActions([
  {
    type: MessageActionTypes.Action,
    action: ({ notificationInstance }) =>
      ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(
        notificationInstance.data.event.id
      ),
    actionType: MessageActionDataTypes.UrlCallback,
    buttonType: 'success',
    buttonText: 'На сторінку події',
    buttonWidth: 134,
    buttonHeight: 28,
  },
])
export class EventUpdatedMessage extends InitialMessage {
  createTexts(data) {
    return [
      `Організатор події «${data.event.name}» вніс зміни до умов участі в заході. 
      За детальною інформацією зверніться до сторінки події`,
    ];
  }

  createTitle() {
    return 'Змінення умов участі у події';
  }
}
