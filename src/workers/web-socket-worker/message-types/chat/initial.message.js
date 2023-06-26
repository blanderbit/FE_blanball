import { ChatWebSocketMessage } from '../../type.decorator';

@ChatWebSocketMessage()
export class InitialChatMessage {
  constructor(data) {
    this.data = data;
  }

  handleUpdate(notifications) {}
}