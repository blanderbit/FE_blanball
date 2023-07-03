import DeleteIcon from '../assets/img/trash-red.svg';
import ReplyIcon from '../assets/img/back-arrow.svg';
import SelectIcon from '../assets/img/check-mark.svg';

export default {
  chatMessageContextMenuItems: (isMessageMine) => [
    {
      id: 0,
      text: 'Відповісти',
      img: ReplyIcon,
      type: 'reply',
    },
    {
      id: 1,
      text: 'Виділити',
      img: SelectIcon,
      type: 'select',
    },
    {
      id: 2,
      text: 'Переслати',
      img: ReplyIcon,
      type: 'forward',
    },
    {
      id: 3,
      text: 'Видалити',
      img: DeleteIcon,
      type: 'delete',
    },
  ],
};
