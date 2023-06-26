export class ChatWebSocketTypes {
  static CreateMessage = 'create_message';
  static NewRequestForChat = 'new_request_for_chat';
  static AddUserToChat = 'add_user_to_chat';
  static CreateGroupOrEventGroupChat = 'create_group_or_event_group_chat';
  static CreatePersonalChat = 'create_personal_chat';
  static DeleteChat = 'delete_chat';
  static DeleteMesssages = 'delete_messages';
  static DisableChat = 'disable_chat';
  static EditChat = 'edit_chat';
  static EditMessage = 'edit_message';
  static GetChatMessagesList = 'get_chat_messages_list';
  static GetChatUsersList = 'get_chat_users_list';
  static GetChatLists = 'get_chats_list';
  static ReadOrUnreadMessages = 'read_or_unread_messages';
  static RemoveUserFromChat = 'remove_user_from_chat';
  static SetOrUnsetChatAdmin = 'set_or_unset_chat_admin_admin';
}
