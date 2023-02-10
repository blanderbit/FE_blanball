import { UpdateWebSocketMessage } from '../../type.decorator'

@UpdateWebSocketMessage()
export class InitialUpdation {
  constructor(data) {
    this.data = data
  }

  handleUpdate(notifications) {}
}
