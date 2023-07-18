import trashRed from '@images/trash-red.svg';
import doubleCheck from '@images/notifications/double-check.svg';
import selected from '@images/selected.svg';

export default {
  notificationsContextMenuItems: [
    {
      id: 0,
      text: 'Виділити',
      img: selected,
      action: ({ id }) => console.log(id),
    },
    {
      id: 1,
      text: 'Видмітити прочитаним',
      img: doubleCheck,
      action: ({ id }) => console.log(id),
    },
    {
      id: 2,
      text: 'Видалити',
      img: trashRed,
      action: ({ id }) => console.log(id),
    },
  ],
};
