
import userIcon from '../assets/img/user-icon.svg'
import database from '../assets/img/database.svg'
import notification from '../assets/img/notification-small.svg'
import { ROUTES } from "../router/router.const";

export default {
  mainLeg: [
    { value: 'Права', id: 'Right'  },
    { value: 'Ліва', id: 'Left'}
  ],
  position: [
    { value: 'GK' },
    { value: 'LB' },
    { value: 'RB' },
    { value: 'CB' },
    { value: 'LWB' },
    { value: 'RWB' },
    { value: 'CDM' },
    { value: 'CM' },
    { value: 'CAM' },
    { value: 'RM' },
    { value: 'LM' },
    { value: 'RW' },
    { value: 'LW' },
    { value: 'RF' },
    { value: 'CF' },
    { value: 'LF' },
    { value: 'ST' }
  ],
  cities: [
    { value: 'Sinaya' },
    { value: 'Bucharest' },
    { value: 'Stanbul' },
    { value: 'Tbilisi' }
  ],
  district: [
    { value: 'Бабурка' },
    { value: 'Космос' },
    { value: 'Шевчик' },
    { value: 'Бородок' }
  ],
  tabs: [
    {
      id: 0,
      name: 'profile.my-profile',
      img: userIcon,
      url: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
      isActive: true,
    },
    {
      id: 1,
      name: 'profile.rate-plan',
      img: database,
      url: ROUTES.APPLICATION.PROFILE.RATE_PLAN.absolute,
      isActive: false,
    },
    {
      id: 2,
      name: 'profile.notifications',
      img: notification,
      url: ROUTES.APPLICATION.PROFILE.NOTIFICATIONS.absolute,
      isActive: false,
    },
  ],
  tabTitles: [
    { id: 0, title: 'Про мене', width: '119px' },
    { id: 1, title: 'Ігрові характеристики', width: '186px' },
    { id: 2, title: 'Контакти', width: '119px' },
  ],
  labels: [
    { title: 'asdfkj' },
    { title: 'asdf' },
    { title: 'as' },
    { title: 'asdfk' },
  ]
}