import DeleteIcon from '../assets/img/trash-red.svg';
import ReplyIcon from '../assets/img/back-arrow.svg';
import SelectIcon from '../assets/img/check-mark.svg';

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

export default {
  CHAT_MESSAGE_CONTEXT_MENU_ACTIONS,
  CHAT_MESSAGE_TYPES,
  chatMessageContextMenuItems: (isMessageMine) => [
    {
      id: 0,
      text: 'Відповісти',
      img: ReplyIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.REPLY,
    },
    {
      id: 1,
      text: 'Виділити',
      img: SelectIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.SELECT,
    },
    {
      id: 2,
      text: 'Переслати',
      img: ReplyIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.FORWARD,
    },
    {
      id: 3,
      text: 'Видалити',
      img: DeleteIcon,
      type: CHAT_MESSAGE_CONTEXT_MENU_ACTIONS.DELETE,
    },
  ],

  chatMessagesList: [
    {
      id: 1,
      sender: {
        id: 42,
        profile: {
          name: 'Андрей',
          last_name: 'Артуров',
        },
      },
      text: 'dffffffffffffffffffffffffffffffffffffffff',
      type: CHAT_MESSAGE_TYPES.USER_MESSAGE,
      time_created: new Date(),
      edited: false,
      readed_by: [],
      reply_to: null,
    },
    {
      id: 2,
      sender: {
        id: 43,
        profile: {
          name: 'Андрей',
          last_name: 'Артуров',
        },
      },
      text: 'fdddddddddddddddddddddddfddddddddddddddddddfdddddddddddddddddddddddfddddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfddddddddddddddddddddddd',
      time_created: new Date(),
      type: CHAT_MESSAGE_TYPES.USER_MESSAGE,
      edited: false,
      readed_by: [],
      reply_to: null,
    },
    {
      id: 3,
      sender: {
        id: 42,
        profile: {
          name: 'Андрей',
          last_name: 'Артуров',
        },
      },
      text: 'fdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfddddddddddddddddddddddd',
      time_created: new Date(),
      type: CHAT_MESSAGE_TYPES.USER_MESSAGE,
      edited: false,
      readed_by: [],
      reply_to: null,
    },
    {
      id: 5,
      sender: {
        id: 42,
        profile: {
          name: 'Андрей',
          last_name: 'Артуров',
        },
      },
      type: CHAT_MESSAGE_TYPES.USER_JOINED_TO_CHAT,
    },
    {
      id: 4,
      sender: {
        id: 42,
        profile: {
          name: 'Андрей',
          last_name: 'Артуров',
        },
      },
      text: 'fdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfdddddddddddddddddddddddfddddddddddddddddddddddd',
      time_created: new Date(),
      type: CHAT_MESSAGE_TYPES.USER_MESSAGE,
      edited: false,
      readed_by: [],
      reply_to: null,
    },
  ],
};
