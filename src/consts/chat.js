import DeleteMessageIcon from '@images/trash-red.svg';
import DeleteMessagesBulkIcon from '@images/notifications/trash.svg';
import ReplyToMessageIcon from '@images/back-arrow.svg';
import ForwardMessagesIcon from '@images/forward-arrow.svg';
import SelectMessageIcon from '@images/check-mark.svg';
import SearchMessagesButtonIcon from '@images/chat/search-button.svg';
import ManageChatButtonIcon from '@images/chat/manage-button.svg';
import ManageChatButtonMobileIcon from '@images/chat/manage-button-mobile.svg';
import EditChatButtonIcon from '@images/chat/edit-button.svg';
import EditMessageButtonIcon from '@images/chat/edit-message-button.svg';
import SetOrUnsetAdminIcon from '@images/settings.svg';
import EnableChatNotificationsIcon from '@images/chat/enable-chat-push-notifications-button.svg';
import DisableChatNotificationsIcon from '@images/chat/disable-chat-push-notifications-button.svg';

const CHAT_MESSAGE_CONTEXT_MENU_ACTIONS = {
  REPLY: 'reply',
  SELECT: 'select',
  FORWARD: 'forward',
  DELETE: 'delete',
  EDIT: 'edit',
};

const CHAT_USER_CONTEXT_MENU_ACTIONS = {
  SET_ADMIN: 'set_admin',
  UNSET_ADMIN: 'unset_admin',
  DELETE: 'delete',
};

const CHAT_MESSAGE_TYPES = {
  USER_MESSAGE: 'user_message',
  USER_JOINED_TO_CHAT: 'user_joined_to_chat',
  GROUP_CHAT_CREATED: 'group_chat_created',
};

const CHAT_MAIN_CONTEXT_MENU_ACTIONS = {
  ENABLE_PUSH_NOTIFICATIONS: 'enable_push_notifications',
  DISABLE_PUSH_NOTIFICATIONS: 'disable_push_notifications',
  DELETE_CHAT: 'delete_chat',
  LEAVE_GROUP: 'leave_group',
  MANAGE_GROUP: 'edit_chat',
  SEARCH_MESSAGES: 'search_messages',
};

const CHAT_RIGHT_SIDE_SELECTED_MESSAGES_ACTIONS_NAMES = {
  REPLY: 'reply',
  DELETE: 'delete',
};

const CHAT_MAX_SELECTED_MESSAGES_COUNT = 20;
const CHAT_MAX_USERS_COUNT = 100;

export default {
  CHAT_USER_CONTEXT_MENU_ACTIONS,
  CHAT_MESSAGE_CONTEXT_MENU_ACTIONS,
  CHAT_MESSAGE_TYPES,
  CHAT_MAX_SELECTED_MESSAGES_COUNT,
  CHAT_RIGHT_SIDE_SELECTED_MESSAGES_ACTIONS_NAMES,
  CHAT_MAX_USERS_COUNT,
  CHAT_MAIN_CONTEXT_MENU_ACTIONS,
  chatUserContextMenuItems: (isUserAdmin) => [
    {
      text: `chat.buttons.${!isUserAdmin ? 'set_admin' : 'unset_admin'}`,
      img: SetOrUnsetAdminIcon,
      type: !isUserAdmin
        ? CHAT_USER_CONTEXT_MENU_ACTIONS.SET_ADMIN
        : CHAT_USER_CONTEXT_MENU_ACTIONS.UNSET_ADMIN,
    },
    {
      text: 'buttons.delete',
      img: DeleteMessageIcon,
      type: CHAT_USER_CONTEXT_MENU_ACTIONS.DELETE,
    },
  ],

  chatMainContextMenuItems: (
    isUserSendPushNotifications,
    isChatGroup,
    isMobileApp
  ) => [
    {
      text: `chat.buttons.${
        !isUserSendPushNotifications
          ? 'enable_push_notifications'
          : 'disable_push_notifications'
      }`,
      img: !isUserSendPushNotifications
        ? EnableChatNotificationsIcon
        : DisableChatNotificationsIcon,
      type: !isUserSendPushNotifications
        ? CHAT_MAIN_CONTEXT_MENU_ACTIONS.ENABLE_PUSH_NOTIFICATIONS
        : CHAT_MAIN_CONTEXT_MENU_ACTIONS.DISABLE_PUSH_NOTIFICATIONS,
    },
    {
      img: EditMessageButtonIcon,
      text: 'chat.buttons.manage_group',
      type: CHAT_MAIN_CONTEXT_MENU_ACTIONS.MANAGE_GROUP,
      hide: !isMobileApp,
    },
    {
      img: SearchMessagesButtonIcon,
      text: 'chat.buttons.search_messages',
      type: CHAT_MAIN_CONTEXT_MENU_ACTIONS.SEARCH_MESSAGES,
      hide: !isMobileApp,
    },

    {
      text: `chat.buttons.${!isChatGroup ? 'delete_chat' : 'leave_group'}`,
      img: DeleteMessageIcon,
      type: !isChatGroup
        ? CHAT_MAIN_CONTEXT_MENU_ACTIONS.DELETE_CHAT
        : CHAT_MAIN_CONTEXT_MENU_ACTIONS.LEAVE_GROUP,
    },
  ],

  chatMessageContextMenuItems: (isMessageMine) => [
    {
      text: 'buttons.reply',
      img: ReplyToMessageIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.REPLY,
    },
    {
      text: 'buttons.edit',
      img: EditMessageButtonIcon,
      hide: !isMessageMine,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.EDIT,
    },
    {
      text: 'buttons.forward',
      img: ForwardMessagesIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.FORWARD,
    },
    {
      text: 'buttons.select',
      img: SelectMessageIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.SELECT,
    },
    {
      text: 'buttons.delete',
      img: DeleteMessageIcon,
      hide: !isMessageMine,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.DELETE,
    },
  ],

  chatToptSideRightBlockButtons: [
    {
      img: EditChatButtonIcon,
      actionEmitName: 'editChat',
      disabled: false,
    },
    {
      img: SearchMessagesButtonIcon,
      actionEmitName: 'searchChatMessages',
      disabled: false,
    },
    {
      img: ManageChatButtonIcon,
      actionEmitName: 'manageChat',
      disabled: false,
    },
  ],

  chatToptSideRightBlockButtonsButtonsMobile: [
    {
      img: ManageChatButtonMobileIcon,
      actionEmitName: 'manageChat',
      disabled: false,
    },
  ],

  chatRightSideSelectedMessagesActions: [
    {
      img: ForwardMessagesIcon,
      actionName: CHAT_RIGHT_SIDE_SELECTED_MESSAGES_ACTIONS_NAMES.FORWARD,
      text: 'buttons.forward',
    },
    {
      img: DeleteMessagesBulkIcon,
      actionName: CHAT_RIGHT_SIDE_SELECTED_MESSAGES_ACTIONS_NAMES.DELETE,
      text: 'buttons.delete',
    },
  ],
};
