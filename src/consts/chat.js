import DeleteMessageIcon from '../assets/img/trash-red.svg';
import DeleteMessagesBulkIcon from '../assets/img/notifications/trash.svg';
import ReplyToMessageIcon from '../assets/img/back-arrow.svg';
import ForwardMessagesIcon from '../assets/img/forward-arrow.svg';
import SelectMessageIcon from '../assets/img/check-mark.svg';
import SearchMessagesButtonIcon from '../assets/img/chat/search-button.svg';
import ManageChatButtonIcon from '../assets/img/chat/manage-button.svg';
import ManageChatButtonMobileIcon from '../assets/img/chat/manage-button-mobile.svg';
import EditChatButtonIcon from '../assets/img/chat/edit-button.svg';

const CHAT_MESSAGE_CONTEXT_MENU_ACTIONS = {
  REPLY: 'reply',
  SELECT: 'select',
  FORWARD: 'forward',
  DELETE: 'delete',
};

const CHAT_MESSAGE_TYPES = {
  USER_MESSAGE: 'user_message',
  USER_JOINED_TO_CHAT: 'user_joined_to_chat',
};

const CHAT_MAX_SELECTED_MESSAGES_COUNT = 20;
const CHAT_MAX_USERS_COUNT = 100;

export default {
  CHAT_MESSAGE_CONTEXT_MENU_ACTIONS,
  CHAT_MESSAGE_TYPES,
  CHAT_MAX_SELECTED_MESSAGES_COUNT,
  CHAT_MAX_USERS_COUNT,
  chatMessageContextMenuItems: (isMessageMine) => [
    {
      id: 0,
      text: 'Відповісти',
      img: ReplyToMessageIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.REPLY,
    },
    {
      id: 1,
      text: 'buttons.select',
      img: SelectMessageIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.SELECT,
    },
    {
      id: 2,
      text: 'buttons.forward',
      img: ForwardMessagesIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.FORWARD,
    },
    {
      id: 3,
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
      action: () => 'editChat',
      text: 'buttons.forward',
    },
    {
      img: DeleteMessagesBulkIcon,
      action: () => 'manageChat',
      text: 'buttons.delete',
    },
  ],
};
