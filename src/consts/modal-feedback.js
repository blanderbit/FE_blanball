import Emoji_1 from '../assets/img/emojies/1.svg'
import Emoji_2 from '../assets/img/emojies/2.svg'
import Emoji_3 from '../assets/img/emojies/3.svg'
import Emoji_4 from '../assets/img/emojies/4.svg'
import Emoji_5 from '../assets/img/emojies/5.svg'

export default {
  steps: [
    {
      id: 0,
      title: 'Залиште відгук про «Дружній матч»',
      subtitle:
        '11 липня Ви прийняли участь у події «Назва події», поділіться вашими враженнями',
      buttons: { cancel: 'Нагадати пізніше', next: 'Залишити відгук' },
      isOpened: true,
    },
    {
      id: 1,
      title: 'Місце проведення',
      subtitle: 'Дайте оцінку стадіону «Назва», адреса',
      emojies: [Emoji_1, Emoji_2, Emoji_3, Emoji_4, Emoji_5],
      buttons: { cancel: 'Назад', next: 'Оцінити' },
      isOpened: true,
    },
    {
      id: 2,
      title: 'Якість роботи судді',
      subtitle: 'Чи було суддівство справедливим, на вашу думку?',
      emojies: [Emoji_1, Emoji_2, Emoji_3, Emoji_4, Emoji_5],
      buttons: { cancel: 'Назад', next: 'Оцінити' },
      isOpened: true,
    },
    {
      id: 3,
      title: 'Рівень організації',
      subtitle:
        'Вчасність початку події / відповідність події опису / якість роботи організатора заходу',
      emojies: [Emoji_1, Emoji_2, Emoji_3, Emoji_4, Emoji_5],
      buttons: { cancel: 'Назад', next: 'Оцінити' },
      isOpened: true,
    },
    {
      id: 4,
      title: 'Дякуємо!',
      subtitle:
        'Бали, які Ви залишили будуть враховані під час повторного влаштування події та допоможуть підняти якість майбутніх заходів.',
      last_subtitle: 'Ми стараємося ставатими кращими для вас!',
      isOpened: true,
    },
  ],
  players: {
    team_1: new Array(11).fill('l').map((item, idx) => {
      return {
        id: idx,
        label: 'НПЗ',
        name: 'Дмитро Горбачевський',
        rate: 3,
        color: '#D62953',
      }
    }),
    team_2: new Array(11).fill('l').map((item, idx) => {
      return {
        id: idx,
        label: 'НПЗ',
        name: 'Дмитро Горбачевський',
        rate: 3,
        color: '#2946E1',
      }
    }),
  },
}
