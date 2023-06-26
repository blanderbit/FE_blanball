import { UpdateWebSocketMessage } from '../../type.decorator';

@UpdateWebSocketMessage()
export class InitialChatMessage {
  constructor(data) {
    this.data = data;
  }

  handleUpdate(notifications) {}
}