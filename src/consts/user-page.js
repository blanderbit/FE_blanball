import user2 from '../assets/img/user2.png'
import maleIcon from '../assets/img/male-icon.svg'

export default {
  users: new Array(10).fill('l').map((item, idx) => {
    return {
      id: idx,
      img: user2,
      name: 'Грищенко Віктор',
      rating: 3,
      team: 'Broocklin Team',
      status: 'Гравець',
      pnz: 'Правий напівзахисник',
      gender: 'Чоловіча',
      gender_icon: maleIcon,
      isActive: false
    }
  })
}