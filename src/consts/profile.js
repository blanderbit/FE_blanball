
import userIcon from '../assets/img/user-icon.svg'
import databaseDisabled from '../assets/img/database-disabled.svg'
import notification from '../assets/img/notification-small.svg'
import { ROUTES } from "../router/router.const";

export default {
  mainLeg: [
    {
      value: 'Права',
      name: 'Права',
      id: 'Right'  
    },
    {
      value: 'Ліва',
      name: 'Ліва',
      id: 'Left'
    }
  ],
  position: [
    { 
      value: 'GK',
      name: 'Вратарь'
    },
    { 
      value: 'LB',
      name: 'Левый защитник'
    },
    { 
      value: 'RB',
      name: 'Правый защитник'
    },
    { 
      value: 'CB',
      name: 'Центральный защитник'
    },
    { 
      value: 'LWB',
      name: 'Левый фланговый защитник'
    },
    { 
      value: 'RWB',
      name: 'Правый фланговый защитник'
    },
    { 
      value: 'CDM',
      name: 'Опорный полузащитник'
    },
    { 
      value: 'CM',
      name: 'Центральный полузащитник'
    },
    { 
      value: 'CAM',
      name: 'Атакующий полузащитник'
    },
    { 
      value: 'RM',
      name: 'Правый крайний полузащитник'
    },
    { 
      value: 'LM',
      name: 'Левый крайний полузащитник'
    },
    { 
      value: 'RW',
      name: 'Правый фланговый атакующий'
    },
    { 
      value: 'LW',
      name: 'Левый фланговый атакующий'
    },
    { 
      value: 'RF',
      name: 'Правый форвард'
    },
    { 
      value: 'CF',
      name: 'Центральный форвард'
    },
    { 
      value: 'LF',
      name: 'Левый форвард'
    },
    { 
      value: 'ST',
      name: 'Форвард страйкер'
    }
  ],
  tabs: [
    {
      id: 0,
      name: 'profile.my-profile',
      img: userIcon,
      url: ROUTES.APPLICATION.PROFILE.MY_PROFILE.absolute,
      isActive: true,
      isDisabled: false
    },
    // {
    //   id: 1,
    //   name: 'profile.rate-plan',
    //   img: databaseDisabled,
    //   url: ROUTES.APPLICATION.PROFILE.RATE_PLAN.absolute,
    //   isActive: false,
    //   isDisabled: true
    // }
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