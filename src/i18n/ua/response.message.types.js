export default {
  password_change: 'успешное изменение пароля',
  phone_change: 'успешное изменение номера телефона',
  email_change: 'успешное изменение имейла',
  verified_change: ' успешная верфикация',
  account_deleted: 'успешное удаление аккаунта',
  password_reset: 'успешный сброс пароля',
  sent_code_to_email: 'было отправлено письмо с кодом на почту',
  account_already_verified: 'аккаунт уже верифицирован',
  invalid_configuration: 'Неверно введенные данные в "Конфедициальность"',
  invalid_get_planed_events: 'не правильно введенные данные в поле "Конфедициальность - запланированные события" - при изменении профиля',
  age_over_80_years: 'возраст пользователя больше 80 лет',
  age_less_6_years: 'возраст пользователя меньше 6 лет ',
  wrong_old_password: 'не правильный старый пароль аккаунта',
  passwords_do_not_match: 'пароли не совпадают',
  invalid_credentials: 'не правильные данные при входе в аккаунт',
  not_verified: 'аккаунт не верифицирован',
  no_permissions: 'нет доступа к какому либо действию',
  bad_verify_code: 'Не валидный код подтверждения',
  verify_code_expired: 'код истек',
  email_already_in_use: 'почта уже используется другим пользователем',

  event_deleted: 'событие было успешно удалено',
  event_updated: 'событие было успешно обновлено',
  sent_request_to_participation: 'запрос на участие был успешно отправлен',
  join_to_event: 'успешное подключение к событию',
  disconnect_from_event: 'успешное отключение от события',
  removed_user_from_event: 'пользователь был успешно удален с события',
  sent_invite: 'приглашение на событие было успешно отправлено',
  already_sent_request_to_participate: 'запрос на участие уже отправлен',
  author_cant_enter_his_event: 'автор не может зайти на свое событие',
  bad_event_date_and_time: 'не валидная дата начала события, дата начала должна быть больше чем текущая дата + 1 час',
  already_like_member: 'уже участвуешь на событии как игрок',
  already_like_fan: 'уже участвуешь на событии как зритель',
  not_in_event_fans_list: 'нету в списке зрителей',
  not_in_event_members_list: 'нету в списке участников',
  author_cannot_be_invited_to_his_event: 'автор не может быть приглашен на свое же  событие',
  no_place: 'на событии нету места для участия',
  no_permissions_to_invite: 'нету прав для приглашение пользователей на это событие',
  this_user_cant_be_invited: 'этот пользователь не может быть приглашен на это событие',
  price_description_required: 'при наличии стоимости события, описание к стоимости обязательно',
  cant_invite_yourself: 'нельзя пригласить самого себя на событие',
  nothing_found_for_request: 'по запросу с координатами ничего не найдено',

  maintenance_update: 'Конфигурация тех работ была успешно обновлен',
  all_notifications_deleted: 'все нотификации пользователя были успешно удалены',
  all_notifications_readed: 'все нотификации пользователя были успешно прочитаны',
  cant_update_maintenance: 'не возможно обновить конфигурацию тех работ',
  cant_get_maintenance: 'не возможно получить текущее значение тех работ ',
  cant_leave_review_about_yourself: 'Не возможно оставить отзыв самому себе',

  invalid_page: 'Такой страницы не существует!',
  not_found: '{field}" - объект не был найден!',
  required: 'Поле "{field}" обязательное!',
  does_not_exist: 'Поле "{field}" не найдено!',
  invalid_choice: 'Поле "{field}" Выбрано с неправильным значением!',
  unique: 'Поле "{field}" уникальное!',
  min_value: 'Поле "{field}" вы ввели меньше минимального значения!',
  max_value: 'Поле "{field}" вы ввели больше максимального значения!',
  blank: 'Поле "{field}" не может быть пустым!',

  authentication_credentials_were_not_provided: 'Не предоставлены учетные данные для аутентификации',
  authentication_token_not_valid: 'Не валидный токен аутентификации',
  bad_authentication_token: 'Не валидный токен аутентификации',
  avatar_max_size_1_mb: 'Загруженное фото привышает лимит в 1мб',
  profile_avatar_updated: 'Автар профиля успешно обновлен',
  code_is_valid: 'Код для сброса пароля валидный',
  method_not_allowed: 'Метод http запроса запрещен',
  email_already_in_use: 'Имейл уже используется',

  fields: {
    phone: 'Телефон',
    email: 'Почта',
    password: 'Пароль',
    re_password: 'Подтвердите пароль',
    get_planned_events: 'Запланирвоанные события',
    configuration: 'Конфидециальность',
    user: 'Пользователь',
    event: 'Ивент',
    notification: 'Нотификация',
    profile: {
      place: {
        place_name: 'Адресс',
        lat: 'Адресс',
        lon: 'Адресс',
      },
      name: 'Имя',
      last_name: 'Фамилия',
      gender: 'Пол',
      birthday: 'Дата рождения',
      height: 'Рост',
      weight: 'Вес',
      position: 'Позиция на поле',
      about_me: 'О мне',
      working_leg: 'Рабочая нога',
    },
  },
}
