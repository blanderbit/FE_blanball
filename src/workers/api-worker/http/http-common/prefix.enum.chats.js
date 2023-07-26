export const ChatsEnpointsEnum = {
  GetChatMessages: (chatId) => `/chat/client/chat/messages/list/${chatId}`,
  CreateChatMessage: '/chat/client/create/message',
  GetChatUsers: (chatId) => `/chat/client/chat/users/list/${chatId}`,
  SetOrUnsetChatAdmin: '/chat/client/chat/set/or/unset/admin',
  RemoveUserFromChat: '/chat/client/remove/user/from/chat',
  DeleteChatMessages: '/chat/client/delete/chat/messages',
  EditChatMessage: '/chat/client/edit/chat/message',
  EditChat: '/chat/client/edit/chat',
  OffOrOnnChatPushNotifications: '/chat/client/off/or/on/chat/push/notifications',
  GetAllMyChatsCount: '/chat/client/get/all/my/chats/count',
  GetMyChatsList: '/chat/client/get/chats/list',
  GetChatDetailData: (chatId) =>
    `/chat/client/get/chat/detail/data/${chatId}`,
};
