import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';
import { AxiosParams, AxiosQuery } from '../../../utils-worker';
import { FilterParamsDecorator } from '../filter/filter.utils';
import { filterConfigForChatMessages } from '../filter/filter.config';

export class ChatService {
  @FilterParamsDecorator(filterConfigForChatMessages)
  static getChatMessages(options) {
    return AxiosInstance.get(
      EndpointsEnum.Chats.GetChatMessages(options.id),
      AxiosParams(AxiosQuery(options))
    );
  }

  static createChatMessage(messageData) {
    return AxiosInstance.post(
      EndpointsEnum.Chats.CreateChatMessage,
      messageData
    );
  }
}
