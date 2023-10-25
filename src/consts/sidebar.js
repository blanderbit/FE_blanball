import trashRed from '../assets/img/trash-red.svg';
import doubleCheck from '../assets/img/notifications/double-check.svg';
import selected from '../assets/img/selected.svg';

export default {
  menu_text: [
    {
      id: 0,
      text: 'Виділити',
      img: selected,
      type: 'select',
    },
    {
      id: 1,
      text: 'Видмітити прочитаним',
      img: doubleCheck,
      type: 'read',
    },
    {
      id: 2,
      text: 'Видалити',
      img: trashRed,
      type: 'delete',
    },
  ],
};
