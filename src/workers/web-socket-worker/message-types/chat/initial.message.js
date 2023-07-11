import { ChatWebSocketMessage } from '../../type.decorator';

@ChatWebSocketMessage()
export class InitialChatMessage {
  isError;

  constructor(data) {
    this.data = data.data;
    this.isError = this.data.status == 'error';
  }
}
