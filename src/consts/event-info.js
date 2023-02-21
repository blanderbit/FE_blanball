import user from '../assets/img/user.png'
import smile_face from '../assets/img/smile_face.svg'
import no_user from '../assets/img/no-user-picture.svg'
import minus from '../assets/img/minus.svg'
import add_user from '../assets/img/add-user-button.svg'
import ball_icon from '../assets/img/ball-icon.svg'
import members from '../assets/img/members.svg'
import couch from '../assets/img/couch.svg'
import user_with_plus from '../assets/img/add-user.svg'

export default {
  playersList: new Array(21).fill('l').map((item, idx) => {
    if (idx <= 8) {
      return {
        id: idx,
        img: user,
        name: 'Капустин Никита',
        status: 'ПНЗ',
        icon: smile_face,
        isActive: true,
      }
    } else {
      return {
        id: idx,
        img: no_user,
        name: 'Приєднатися до команди',
        status: minus,
        icon: add_user,
        isActive: false,
      }
    }
  }),
  tabs: (eventData, userId) => {
    return [
      {
        id: 0,
        name: 'events.list-of-users',
        img: ball_icon,
        isDisabled: false,
        isShown: true
      },
      {
        id: 1,
        name: 'events.registered-fans',
        img: members,
        isDisabled: false,
        isShown: true
      },
      {
        id: 2,
        name: 'events.apps-for-participation',
        img: user_with_plus,
        isDisabled: false,
        isShown: eventData.privacy && userId === eventData.author.id,
      },
      {
        id: 3,
        name: 'events.couch-list',
        img: couch,
        isDisabled: true,
        isShown: true,
      },
    ]
  }
}
