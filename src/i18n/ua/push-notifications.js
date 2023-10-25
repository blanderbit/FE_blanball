export default {
  event_has_been_ended: {
    first_button: 'Зрозуміло',
    second_button: 'Залишити відгук',
    title: 'Подія закінчилася',
    text: 'Подія "{eventName}" була закінчена, ви можете залишити відгук про подію та її учасників',
  },
  event_deleted: {
    first_button: 'Зрозуміло',
    second_button: 'Знайти інші події',
    title: 'Подію, на яку ви зареєструвались, було скасовано',
    text: '{senderLastName} {senderName} скасував проведення події «{eventName}, {currentTime}»',
  },
  event_time_notification: {
    first_button: 'Зрозуміло',
    title: 'Нагадування про майбутню подію',
    text: '{recipientName}, початок запланованої події «{eventName}» за {timeToStart} годин',
  },
  event_updated: {
    first_button: 'На сторінку події',
    title: 'Змінення умов участі у події',
    text: 'Організатор події «{eventName}» вніс зміни до умов участі в заході. За детальною інформацією зверніться до сторінки події',
  },
  invite_user_to_event: {
    first_button: 'Прийняти',
    second_button: 'Відхилити',
    title: 'Запрошення на подію',
    text: '{senderLastName} {senderName} запросив вас на дружній матч «{eventName}» {eventDateTime}',
  },
  last_user_on_the_event: {
    first_button: 'Чудово',
    second_button: 'На сторінку події',
    title: 'Реєстрацію завершено',
    text: 'Подія «{eventName}» вже набрала необхідну кількість учасників',
  },
  leave_user_from_the_event: {
    first_button: 'Зрозуміло',
    second_button: 'Переглянути профіль',
    title: 'Учасник відкликав свою участь у події',
    text: '{senderLastName} {senderName} вийшов зі списку учасників «{eventName}, {currentTime}»',
  },
  left_feebback: {
    first_button: 'Зрозуміло',
    title: 'Новий відгук про вас',
  },
  new_request_to_participation: {
    first_button: 'Прийняти',
    second_button: 'Відхилити',
    title: 'Новий запит на участь у події',
    text: '{senderLastName} {senderName} хоче долучитися до події «{eventName}, {currentTime}»',
  },
  new_user_on_the_event: {
    first_button: 'Зрозуміло',
    second_button: 'Переглянути профіль',
    title: 'Новий учасник події',
    text: '{senderLastName} {senderName} долучився до «{eventName}, {currentTime}» як гравець',
  },
  remove_user_from_the_event: {
    first_button: 'Зрозуміло',
    title: 'Вас було виключено з переліку учасників',
    text: 'Шкода, але організатори «{eventName}» відкликали вашу участь у події',
  },
  response_to_invite_for_participation: {
    first_button: 'Зрозуміло',
    second_button: 'На сторінку події',
    success_title:
      '{senderLastName} {senderName} прийняв ваше запрошення на участь у події',
    error_title:
      '{senderLastName} {senderName} відхилив ваше запрошення на участь у події',
    success_text:
      '{senderLastName} {senderName} прийняв ваше запрошення на участь у «{eventName}»',
    error_text:
      '{senderLastName} {senderName} відхилив ваше запрошення на участь у «{eventName}»',
  },
  response_to_request_for_participation: {
    first_button: 'Зрозуміло',
    second_button: 'На сторінку події',
    success_title: 'Ваша заявка на участь у події прийнята',
    error_title: 'Ваша заявка на участь у події відхилена',
    success_text:
      '{senderLastName} {senderName} підтвердив вашу участь у події «{eventName}, {currentTime}»',
    error_text:
      '{senderLastName} {senderName} відхилив вашу участь у події «{eventName}, {currentTime}»',
  },
};
