import { UpdateWebSocketMessage } from '../../type.decorator';

@UpdateWebSocketMessage()
export class InitialUpdation {
  constructor(data) {
    console.log(data)
    this.data = data;
  }

  handleUpdate(notifications) {}
}
