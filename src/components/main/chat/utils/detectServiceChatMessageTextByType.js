const CHAT_MESSAGE_TYPES = CONSTS.chat.CHAT_MESSAGE_TYPES;

export function detectServiceChatMessageTextByType(messageData, i18nFn) {
  switch (messageData.type) {
    case CHAT_MESSAGE_TYPES.USER_JOINED_TO_CHAT: {
      return i18nFn('chat.service_messages.user_joined_to_chat', {
        userFullName: `${messageData.sender.profile.last_name} ${messageData.sender.profile.name}`,
      });
    }
    case CHAT_MESSAGE_TYPES.GROUP_CHAT_CREATED: {
      return i18nFn('chat.service_messages.group_chat_created');
    }
  }
}
