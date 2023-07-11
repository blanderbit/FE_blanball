import DeleteMessageIcon from '../assets/img/trash-red.svg';
import DeleteMessagesBulkIcon from '../assets/img/notifications/trash.svg';
import ReplyToMessageIcon from '../assets/img/back-arrow.svg';
import ForwardMessagesIcon from '../assets/img/forward-arrow.svg';
import SelectMessageIcon from '../assets/img/check-mark.svg';
import SearchMessagesButtonIcon from '../assets/img/chat/search-button.svg';
import ManageChatButtonIcon from '../assets/img/chat/manage-button.svg';
import ManageChatButtonMobileIcon from '../assets/img/chat/manage-button-mobile.svg';
import EditChatButtonIcon from '../assets/img/chat/edit-button.svg';
import SetOrUnsetAdminIcon from '../assets/img/settings.svg';

const CHAT_MESSAGE_CONTEXT_MENU_ACTIONS = {
  REPLY: 'reply',
  SELECT: 'select',
  FORWARD: 'forward',
  DELETE: 'delete',
};

const CHAT_USER_CONTEXT_MENU_ACTIONS = {
  SET_ADMIN: 'set_admin',
  UNSET_ADMIN: 'unset_admin',
  DELETE: 'delete',
};

const CHAT_MESSAGE_TYPES = {
  USER_MESSAGE: 'user_message',
  USER_JOINED_TO_CHAT: 'user_joined_to_chat',
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

  chatMessageContextMenuItems: (isMessageMine) => [
    {
      text: 'Відповісти',
      img: ReplyToMessageIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.REPLY,
    },
    {
      text: 'buttons.select',
      img: SelectMessageIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.SELECT,
    },
    {
      text: 'buttons.forward',
      img: ForwardMessagesIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.FORWARD,
    },
    {
      text: 'buttons.delete',
      img: DeleteMessageIcon,
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
      action: () => 'manageChat',
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
