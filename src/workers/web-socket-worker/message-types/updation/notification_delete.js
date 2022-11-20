import { InitialUpdation } from "./initial.message";

import { SetMessageType, AuthWebSocketMessage } from "../../type.decorator";

import { WebSocketTypes } from "../../web.socket.types";

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.BulkNotificationDelete)
export class NotificationBulkDeleteUpdation extends InitialUpdation {
  handleUpdate({ paginationElements, paginationLoad, paginationPage }, callbackAfterAction) {
    const itemsPerPage = 10;
    const deletedItems = this.data.objects;

    paginationElements.value = paginationElements.value.filter(item => {
      return !deletedItems.includes(item.notification_id);
    });

    if (typeof callbackAfterAction === 'function') {
      callbackAfterAction()
    }

    const pageNumber = Math.floor(paginationElements.value.length / itemsPerPage);

    paginationLoad({pageNumber, forceUpdate: true})
  }
}
