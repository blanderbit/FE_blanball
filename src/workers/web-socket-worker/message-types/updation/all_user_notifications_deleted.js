import { InitialUpdation } from './initial.message';

import { SetMessageType, AuthWebSocketMessage } from '../../type.decorator';
import { NotificationsBus } from '../../../event-bus-worker';

import { WebSocketTypes } from '../../web.socket.types';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.AllDeletedNotifications)
export class NotificationAllDeletedNotificationsUpdation extends InitialUpdation {
  handleUpdate({ paginationElements }, callbackAfterAction) {
    paginationElements.value = [];

    if (typeof callbackAfterAction === 'function') {
      callbackAfterAction();
    }

    NotificationsBus.emit('SidebarClearData');
  }
}