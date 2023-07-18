import circleTick from '@images/tick-in-circle.svg';
import bucket from '@images/bucket.svg';
import pin from '@images/pin.svg';
import unpin from '@images/unpin.svg';
import edit from '@images/edit-gray.svg';

export default {
  sport_type_dropdown: [
    {
      id: 1,
      value: 'Football',
      name: 'Футбол',
    },
    {
      id: 2,
      value: 'Futsal',
      name: 'Фут-зал',
    },
  ],
  gender_dropdown: [
    {
      id: 0,
      value: 'men',
    },
    {
      id: 1,
      value: 'women',
    },
    {
      id: 2,
      value: 'all',
    },
  ],
  menu_text: (eventPinned) => [
    {
      id: 0,
      text: 'Виділити',
      img: circleTick,
      type: 'select',
    },
    {
      id: 1,
      text: 'Видалити',
      img: bucket,
      type: 'delete',
    },
    {
      id: 2,
      text: !eventPinned ? 'Закріпити' : 'Відкріпити',
      img: !eventPinned ? pin : unpin,
      type: !eventPinned ? 'pin' : 'unpin',
    },
    {
      id: 3,
      text: 'Редагувати',
      img: edit,
      type: 'edit',
    },
  ],
  status_ropdown: [
    {
      value: 'Planned',
      name: 'Запланованi',
    },
    {
      value: 'Active',
      name: 'Активнi',
    },
    {
      value: 'Finished',
      name: 'Завершенi',
    },
  ],
};
