import profilePic from '../assets/img/my-profile-pic.svg'
import arrowDown from '../assets/img/arrow-down.svg'

export default {
  letters: Array.from({length: 10}, (v,idx) => {
    return {
      id: idx,
      sender: 'Відправник',
      time: '18 хв',
      topic: 'Тема листа',
      userImg: profilePic,
      icon: arrowDown
    }
  })
}