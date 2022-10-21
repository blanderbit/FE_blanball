import user from '../assets/img/user.png'
import smile_face from '../assets/img/smile_face.svg'
import no_user from '../assets/img/no-user-picture.svg'
import minus from '../assets/img/minus.svg'
import add_user from '../assets/img/add-user-button.svg'

export default {
  playersList: new Array(21).fill('l').map((item, idx) => {
    if(idx <= 8) {
      return {
        id: idx,
        img: user,
        name: 'Капустин Никита',
        status: 'ПНЗ',
        icon: smile_face,
        isActive: true
      }
    } else {
      return {
        id: idx,
        img: no_user,
        name: 'Приєднатися до команди',
        status: minus,
        icon: add_user,
        isActive: false
      }
    }
  }),
  trainer: [{
    id: 0,
    img: user,
    name: 'Капустин Никита',
    status: 'ПНЗ',
    icon: smile_face,
    isActive: true,
    duty: 'Тренерська категорія'
  }],
  judge: [{
    id: 0,
    img: user,
    name: 'Капустин Никита',
    status: 'ПНЗ',
    icon: smile_face,
    isActive: true,
    duty: 'Суддівська категорія'
  }],
  ciefs: [
    {
      id: 0,
      img: user,
      name: 'Сергій Білецький',
      phone: '+380 66 873 05 75',
      status: 'Організатор'
    },
    {
      id: 1,
      img: user,
      name: 'Ярослав Бойко',
      phone: '+380 97 773 05 81',
      status: 'Тренер'
    }
  ],
  labels: [
    {
      id: 0,
      text: 'Футбол'
    },
    {
      id: 1,
      text: 'Чоловіки'
    },
    {
      id: 2,
      text: 'Без розряду'
    },
  ]
}