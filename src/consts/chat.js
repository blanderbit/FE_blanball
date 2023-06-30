import DeleteIcon from '../assets/img/trash-red.svg';
import ReplyIcon from '../assets/img/back-arrow.svg';
import SelectIcon from '../assets/img/check-mark.svg';

const CHAT_MESSAGE_CONTEXT_MENU_ACTIONS = {
  REPLY: 'reply',
  SELECT: 'select',
  FORWARD: 'forward',
  DELETE: 'delete',
};

export default {
  CHAT_MESSAGE_CONTEXT_MENU_ACTIONS,
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
};
