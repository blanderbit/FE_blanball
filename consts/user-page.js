export default {
  users: new Array(10).fill('l').map((item, idx) => {
    return {
      id: idx,
      img: require('../assets/img/user2.png'),
      name: 'Грищенко Віктор',
      rating: 3,
      team: 'Broocklin Team',
      status: 'Гравець',
      pnz: 'Правий напівзахисник',
      gender: 'Чоловіча',
      gender_icon: require('../assets/img/male-icon.svg'),
      isActive: false
    }
  })
}