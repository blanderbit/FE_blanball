import User from '../assets/img/user.png'

export default {
  type_of_event_dropdown: [
    {
      id: 0,
      name: 'Дружній матч',
      value: 'Friendly match'
    },
    {
      id: 1,
      name: 'Тренировка',
      value: 'Training'
    }
  ],
  type_of_sport_dropdown: [
    {
      id: 0,
      name: 'Футбол',
      value: 'Football'
    }
  ],
  tags: [
    {
      id: 0,
      text: 'Всі',
      isActive: true
    },
    {
      id: 1,
      text: 'Гравці',
      isActive: false
    },
    {
      id: 2,
      text: 'Події',
      isActive: false
    },
    {
      id: 3,
      text: 'Організатори',
      isActive: false
    },
    {
      id: 4,
      text: 'Тренери',
      isActive: false
    },
    {
      id: 5,
      text: 'Рефері',
      isActive: false
    },
    {
      id: 6,
      text: 'Команди',
      isActive: false
    }
  ],
  teams: [
    {
      id: 1,
      category_name: 'Гравці',
      users: [
        {
          id: 0,
          img: User,
          name: 'Oganez Gurgenovich',
          category: 'Гравці',
          isChosen: false
        },
        {
          id: 1,
          img: User,
          name: 'Rubik Joraevich',
          category: 'Гравці',
          isChosen: false
        },
        {
          id: 2,
          img: User,
          name: 'Ogli Timurlanovich',
          category: 'Гравці',
          isChosen: false
        }
      ]
    },
    {
      id: 2,
      category_name: 'Події',
      users: [
        {
          id: 11,
          img: User,
          name: 'Rubik Joraevich',
          category: 'Події',
          isChosen: false
        },
        {
          id: 21,
          img: User,
          name: 'Ogli Timurlanovich',
          category: 'Події',
          isChosen: false
        },
        {
          id: 101,
          img: User,
          name: 'Oganez Gurgenovich',
          category: 'Події',
          isChosen: false
        }
      ]
    },
    {
      id: 3,
      category_name: 'Організатори',
      users: [
        {
          id: 12,
          img: User,
          name: 'Rubik Joraevich',
          category: 'Організатори',
          isChosen: false
        },
        {
          id: 22,
          img: User,
          name: 'Ogli Timurlanovich',
          category: 'Організатори',
          isChosen: false
        }
      ]
    },
    {
      id: 4,
      category_name: 'Тренери',
      users: [
        {
          id: 3023,
          img: User,
          name: 'Oganez Gurgenovich',
          category: 'Тренери',
          isChosen: false
        },
        {
          id: 223,
          img: User,
          name: 'Ogli Timurlanovich',
          category: 'Тренери',
          isChosen: false
        }
      ]
    },
    {
      id: 5,
      category_name: 'Рефері',
      users: [
        {
          id: 4024,
          img: User,
          name: 'Oganez Gurgenovich',
          category: 'Рефері',
          isChosen: false
        },
        {
          id: 124,
          img: User,
          name: 'Rubik Joraevich',
          category: 'Рефері',
          isChosen: false
        },
      ]
    },
    {
      id: 6,
      category_name: 'Команди',
      users: [
        {
          id: 125,
          img: User,
          name: 'Rubik Joraevich',
          category: 'Команди',
          isChosen: false
        },
        {
          id: 225,
          img: User,
          name: 'Ogli Timurlanovich',
          category: 'Команди',
          isChosen: false
        },
        {
          id: 5025,
          img: User,
          name: 'Oganez Gurgenovich',
          category: 'Команди',
          isChosen: false
        }
      ]
    },
  ]
}