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
  })
}