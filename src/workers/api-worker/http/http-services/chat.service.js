import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';
import { AxiosParams, AxiosQuery } from '../../../utils-worker';
import { FilterParamsDecorator } from '../filter/filter.utils';
import {
  filterConfigForChatMessages,
  filterConfigForChatUsers,
} from '../filter/filter.config';

export class ChatService {
  @FilterParamsDecorator(filterConfigForChatMessages)
  static getChatMessages(options) {
    return AxiosInstance.get(
      EndpointsEnum.Chats.GetChatMessages(options.chat_id),
      AxiosParams(AxiosQuery(options))
    );
  }

  @FilterParamsDecorator(filterConfigForChatUsers)
  static getChatUsers(options) {
    return AxiosInstance.get(
      EndpointsEnum.Chats.GetChatUsers(options.chat_id),
      AxiosParams(AxiosQuery(options))
    );
  }

  static createChatMessage(messageData) {
    return AxiosInstance.post(
      EndpointsEnum.Chats.CreateChatMessage,
      messageData
    );
  }

  static setOrUnsetAdmin(data) {
    return AxiosInstance.post(EndpointsEnum.Chats.SetOrUnsetChatAdmin, data);
  }

  static removeUserFromChat(data) {
    return AxiosInstance.post(EndpointsEnum.Chats.RemoveUserFromChat, data);
  }

  static deleteChatMessages(data) {
    return AxiosInstance.post(EndpointsEnum.Chats.DeleteChatMessages, data);
  }

  static editChatMessage(data) {
    return AxiosInstance.post(EndpointsEnum.Chats.EditChatMessage, data);
  }

  static getInfoAboutMeInChat(chatId) {
    return AxiosInstance.get(EndpointsEnum.Chats.GetInfoAboutMeInChat(chatId));
  }

  static editChat(data) {
    return AxiosInstance.post(EndpointsEnum.Chats.EditChat, data);
  }
}
