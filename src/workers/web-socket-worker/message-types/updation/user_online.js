import { InitialUpdation } from './initial.message';
import { SetMessageType, GeneralWebSocketMessage } from '../../type.decorator';
import { WebSocketTypes } from '../../web.socket.types';

@GeneralWebSocketMessage()
@SetMessageType(WebSocketTypes.UpdateMessageUserOnline)
export class UpdateMessageUserOnline extends InitialUpdation {
  handleUpdate(
    { paginationElements, paginationLoad, paginationPage },
    callbackAfterAction
  ) {
    const itemsPerPage = 10;
    
    if (typeof callbackAfterAction === 'function') {
      callbackAfterAction();
    }

    const pageNumber = Math.floor(
      paginationElements.value.length / itemsPerPage
    );

    paginationLoad({ pageNumber, forceUpdate: true })
  }
}
