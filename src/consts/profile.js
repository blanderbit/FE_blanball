
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
      name: 'вратарь'
    },
    { 
      value: 'LB',
      name: 'левый защитник'
    },
    { 
      value: 'RB',
      name: 'правый защитник'
    },
    { 
      value: 'CB',
      name: 'центральный защитник'
    },
    { 
      value: 'LWB',
      name: 'левый фланговый защитник'
    },
    { 
      value: 'RWB',
      name: 'правый фланговый защитник'
    },
    { 
      value: 'CDM',
      name: 'опорный полузащитник'
    },
    { 
      value: 'CM',
      name: 'центральный полузащитник'
    },
    { 
      value: 'CAM',
      name: 'атакующий полузащитник'
    },
    { 
      value: 'RM',
      name: 'правый крайний полузащитник'
    },
    { 
      value: 'LM',
      name: 'левый крайний полузащитник'
    },
    { 
      value: 'RW',
      name: 'правый фланговый атакующий'
    },
    { 
      value: 'LW',
      name: 'левый фланговый атакующий'
    },
    { 
      value: 'RF',
      name: 'правый форвард'
    },
    { 
      value: 'CF',
      name: 'центральный форвард'
    },
    { 
      value: 'LF',
      name: 'левый форвард'
    },
    { 
      value: 'ST',
      name: 'форвард-страйкер'
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