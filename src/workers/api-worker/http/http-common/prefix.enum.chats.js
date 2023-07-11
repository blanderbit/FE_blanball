export const ChatsEnpointsEnum = {
  GetChatMessages: (chatId) => `/chat/client/chat/messages/list/${chatId}`,
  CreateChatMessage: '/chat/client/create/message',
  GetChatUsers: (chatId) => `/chat/client/chat/users/list/${chatId}`,
  SetOrUnsetChatAdmin: '/chat/client/chat/set/or/unset/admin',
  RemoveUserFromChat: '/chat/client/remove/user/from/chat',
  DeleteChatMessages: '/chat/client/delete/chat/messages',
};
