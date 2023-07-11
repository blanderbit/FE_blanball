import { ChatWebSocketMessage } from '../../type.decorator';

@ChatWebSocketMessage()
export class InitialChatMessage {
  isError;

  constructor(data) {
    this.data = data.data;
    this.isError = this.data.status == 'error';
    if (this.isError) {
      this.onError();
    }
  }

  onError(errorType, callback) {
    if (typeof callback !== 'function') {
      return console.error(
        'InitialChatMessage onError callback is not a function'
      );
    }

    if (errorType === this.data.data) {
      callback();
    }
  }
}
