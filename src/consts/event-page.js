import circleTick from '../assets/img/tick-in-circle.svg'
import bucket from '../assets/img/bucket.svg'
import pin from '../assets/img/pin.svg'

export default {
  event_cards: [
    {
      id: 0,
      url: '/my-events/friendly-match',
      date: 14,
      time: '12:00 – 14:00',
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      main_text:
        'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
      name: 'В’ячеслав Залізняк',
      play_dates: '10 / 22',
      visitor_dates: '17 / 30',
    },
    {
      id: 1,
      url: '/my-events/friendly-match',
      date: 14,
      time: '12:00 – 14:00',
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      main_text:
        'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
      name: 'В’ячеслав Залізняк',
      play_dates: '10 / 22',
      visitor_dates: '17 / 30',
    },
    {
      id: 2,
      url: '/my-events/friendly-match',
      date: 14,
      time: '12:00 – 14:00',
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      main_text:
        'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
      name: 'В’ячеслав Залізняк',
      play_dates: '10 / 22',
      visitor_dates: '17 / 30',
    },
    {
      id: 3,
      url: '/my-events/friendly-match',
      date: 14,
      time: '12:00 – 14:00',
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      main_text:
        'Aliquam a dui vel justo fringilla euismod id id enim. Nunc non semper tellus. Pellentesque vitae tellus non dui fermentum hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus shdsjhd',
      name: 'В’ячеслав Залізняк',
      play_dates: '10 / 22',
      visitor_dates: '17 / 30',
    },
  ],
  my_events: [
    {
      id: 0,
      title: 'Дружній матч',
      isActive: true,
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      date: '7 липня',
      time: '18:00 – 22:00',
      labels: ['Футбол', 'Чоловіки', 'Без розряду'],
    },
    {
      id: 1,
      title: 'Дружній матч',
      isActive: true,
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      date: '7 липня',
      time: '18:00 – 22:00',
      labels: ['Футбол', 'Чоловіки', 'Без розряду'],
    },
    {
      id: 2,
      title: 'Дружній матч',
      isActive: false,
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      date: '7 липня',
      time: '18:00 – 22:00',
      labels: ['Футбол', 'Чоловіки', 'Без розряду'],
    },
    {
      id: 3,
      title: 'Дружній матч',
      isActive: false,
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      date: '7 липня',
      time: '18:00 – 22:00',
      labels: ['Футбол', 'Чоловіки', 'Без розряду'],
    },
    {
      id: 4,
      title: 'Дружній матч',
      isActive: true,
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      date: '7 липня',
      time: '18:00 – 22:00',
      labels: ['Футбол', 'Чоловіки', 'Без розряду'],
    },
    {
      id: 5,
      title: 'Дружній матч',
      isActive: true,
      address: 'Запоріжжя, Центральна, стадіон «Торпеда»',
      date: '7 липня',
      time: '18:00 – 22:00',
      labels: ['Футбол', 'Чоловіки', 'Без розряду'],
    },
  ],
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
  cities_dropdown: [
    {
      id: 0,
      value: 'Запорожье',
    },
    {
      id: 1,
      value: 'Мелитополь',
    },
    {
      id: 2,
      value: 'Киев',
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
  menu_text: [
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
      text: 'Закріпити',
      img: pin,
      type: 'pin'
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
