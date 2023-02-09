import Emoji_1 from '../assets/img/emojies/1.svg'
import Emoji_2 from '../assets/img/emojies/2.svg'
import Emoji_3 from '../assets/img/emojies/3.svg'
import Emoji_4 from '../assets/img/emojies/4.svg'
import Emoji_5 from '../assets/img/emojies/5.svg'

import dayjs from 'dayjs'

export default {
  steps(eventData) {

    const calculateEventEndTime = () => {
      const eventDurationMS = eventData.duration * 60 * 1000;
      const eventDateTime = new Date(eventData.date_and_time)

      eventDateTime.setTime(eventDateTime.getTime() + eventDurationMS);
      return dayjs(eventDateTime).format('DD MM YYYY HH:mm')
    }

    return [
      {
        id: 0,
        title: 'Залиште відгук про «Дружній матч»',
        subtitle: `${calculateEventEndTime()} Ви прийняли участь у події «${eventData.name}», поділіться вашими враженнями`,
        buttons: { cancel: 'Нагадати пізніше', next: 'Залишити відгук' },
        isOpened: true
      },
      {
        id: 1,
        title: 'Місце проведення',
        subtitle: `Дайте оцінку місцю проведення «${eventData.place.place_name}»`,
        emojies: [
          {'id': 1, 'emoji': Emoji_1, 'step': 1},
          {'id': 2, 'emoji': Emoji_2, 'step': 1},
          {'id': 3, 'emoji': Emoji_3, 'step': 1},
          {'id': 4, 'emoji': Emoji_4, 'step': 1},
          {'id': 5, 'emoji': Emoji_5, 'step': 1},
        ],
        buttons: { cancel: 'Назад', next: 'Оцінити' },
        isOpened: true
      },
      {
        id: 2,
        title: 'Якість роботи судді',
        subtitle: 'Чи було суддівство справедливим, на вашу думку?',
        emojies: [
          {'id': 1, 'emoji': Emoji_1, 'step': 2},
          {'id': 2, 'emoji': Emoji_2, 'step': 2},
          {'id': 3, 'emoji': Emoji_3, 'step': 2},
          {'id': 4, 'emoji': Emoji_4, 'step': 2},
          {'id': 5, 'emoji': Emoji_5, 'step': 2},
        ],
        buttons: { cancel: 'Назад', next: 'Оцінити' },
        isOpened: true
      },
      {
        id: 3,
        title: 'Рівень організації',
        subtitle: 'Вчасність початку події / відповідність події опису / якість роботи організатора заходу',
        emojies: [
          {'id': 1, 'emoji': Emoji_1, 'step': 3},
          {'id': 2, 'emoji': Emoji_2, 'step': 3},
          {'id': 3, 'emoji': Emoji_3, 'step': 3},
          {'id': 4, 'emoji': Emoji_4, 'step': 3},
          {'id': 5, 'emoji': Emoji_5, 'step': 3},
        ],
        buttons: { cancel: 'Назад', next: 'Оцінити' },
        isOpened: true
      },
      {
        id: 4,
        title: 'Бажаєте залишити коментар?',
        subtitle: 'Опишіть ваші враження, побажання стосовно відвіданої події або чогось конкретного',
        buttons: { cancel: 'Назад', next: 'Надіслати відгук' },
        isOpened: true
      },
      {
        id: 5,
        title: 'Дякуємо!',
        subtitle: 'Бали, які Ви залишили будуть враховані під час повторного влаштування події та допоможуть підняти якість майбутніх заходів.',
        last_subtitle: 'Ми стараємося ставатими кращими для вас!',
        isOpened: true
      }
    ]
  },
  players: {
    team_1: new Array(11).fill('l').map((item, idx) => {
      return {
        id: idx,
        label: 'НПЗ',
        name: 'Дмитро Горбачевський',
        rate: 3,
        color: '#D62953'
      }
    }),
    team_2: new Array(11).fill('l').map((item, idx) => {
      return {
        id: idx,
        label: 'НПЗ',
        name: 'Дмитро Горбачевський',
        rate: 3,
        color: '#2946E1'
      }
    })
  }
}