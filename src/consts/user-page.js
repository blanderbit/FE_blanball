import user from '../assets/img/user.png'
import maleIcon from '../assets/img/male-icon.svg'

export default {
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
  }
}