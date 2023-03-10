import circleTick from '../assets/img/tick-in-circle.svg'
import bucket from '../assets/img/bucket.svg'
import pin from '../assets/img/pin.svg'
import unpin from '../assets/img/unpin.svg'
import edit from '../assets/img/edit-gray.svg'

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
      name: 'Футсал',
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
  calendar: [
    {
      id: 0,
      week: [
        { id: 0, day: 'Пн', number: 13, isActive: false },
        { id: 1, day: 'Вт', number: 14, isActive: false },
        { id: 2, day: 'Ср', number: 15, isActive: false },
        { id: 3, day: 'Чт', number: 16, isActive: false },
        { id: 4, day: 'Пт', number: 17, isActive: false },
        { id: 5, day: 'Сб', number: 18, isActive: false },
        { id: 6, day: 'Вс', number: 19, isActive: true },
      ],
    },
    {
      id: 1,
      week: [
        { id: 0, day: 'Пн', number: 20, isActive: false },
        { id: 1, day: 'Вт', number: 21, isActive: false },
        { id: 2, day: 'Ср', number: 22, isActive: true },
        { id: 3, day: 'Чт', number: 23, isActive: false },
        { id: 4, day: 'Пт', number: 24, isActive: false },
        { id: 5, day: 'Сб', number: 25, isActive: false },
        { id: 6, day: 'Вс', number: 26, isActive: false },
      ],
    },
    {
      id: 2,
      week: [
        { id: 0, day: 'Пн', number: 27, isActive: true },
        { id: 1, day: 'Вт', number: 28, isActive: false },
        { id: 2, day: 'Ср', number: 29, isActive: false },
        { id: 3, day: 'Чт', number: 30, isActive: false },
        { id: 4, day: 'Пт', number: 31, isActive: false },
        { id: 5, day: 'Сб', number: 1, isActive: false },
        { id: 6, day: 'Вс', number: 2, isActive: false },
      ],
    },
  ],
  menu_text: (eventPinned) => [
    {
      id: 0,
      text: 'Виділити',
      img: circleTick,
      type: 'select'
    },
    {
      id: 1,
      text: 'Видалити',
      img: bucket,
      type: 'delete'
    },
    {
      id: 2,
      text: !eventPinned ? 'Закріпити' : 'Відкріпити',
      img: !eventPinned ? pin : unpin,
      type: !eventPinned ? 'pin' : 'unpin'
    },
    {
      id: 3,
      text: 'Редагувати',
      img: edit,
      type: 'edit'
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
}
