import user from '../assets/img/user.png'
import maleIcon from '../assets/img/male-icon.svg'

export default {
  rateBlock: [
    {
      id: 0,
      name: 'Дмитро Горбачевський',
      date: '13.07.2022',
    },
    {
      id: 1,
      name: 'Захар Беркут',
      date: '13.07.2022',
    },
    {
      id: 2,
      name: 'Василь Величко',
      date: '13.07.2022',
    },
    {
      id: 3,
      name: 'Дмитро Горбачевський',
      date: '13.07.2022',
    },
  ],
  users: new Array(10).fill('l').map((item, idx) => {
    return {
      id: idx,
      img: user,
      name: 'Грищенко Віктор',
      rating: 3,
      team: 'Broocklin Team',
      status: 'Гравець',
      pnz: 'Правий напівзахисник',
      gender: 'Чоловіча',
      gender_icon: maleIcon,
      isActive: false
    }
  }),
  userInfo: {
    id: 3,
    img: user,
    name: 'Віктор',
    surname: 'Грищенко',
    about: 'Щось там, щось тут, грала, бігала стрибала і медаль собі придбала',
    birth_date: '13 травня 1997 р.',
    height: 154,
    weight: 67,
    main_leg: 'Права',
    position: 'Правий напівзахисник',
    phone: '+380 (95) 390 86 50',
    location: 'Львів, Залізничний р-н.'
  },
  months: {
    monthFromNumber: {
      '01': 'Січня',
      '02': 'Лютого',
      '03': 'Березня',
      '04': 'Квітня',
      '05': 'Травня',
      '06': 'Червня',
      '07': 'Липня',
      '08': 'Серпня',
      '09': 'Вересня',
      '10': 'Жовтня',
      '11': 'Листопада',
      '12': 'Грудня'
    },
    numberFromMonth: {
      'Січня' : '01',
      'Лютого' : '02',
      'Березня' : '03',
      'Квітня' : '04',
      'Травня' : '05',
      'Червня' : '06',
      'Липня' : '07',
      'Серпня' : '08',
      'Вересня' : '09',
      'Жовтня' : '10',
      'Листопада' : '11',
      'Грудня' : '12'
    }
  }
}