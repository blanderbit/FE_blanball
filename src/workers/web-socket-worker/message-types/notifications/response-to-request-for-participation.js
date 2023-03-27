import { InitialMessage } from './initial.message';

import dayjs from 'dayjs';
import dayjsUkrLocale from 'dayjs/locale/uk';

import {
  SetActions,
  SetMessageType,
  AuthWebSocketMessage,
  NotificationSetUserImage,
  SetPushNotificationTheme,
} from '../../type.decorator';

import {
  MessageActionTypes,
  MessageActionDataTypes,
} from '../../message.action.types';
import { WebSocketTypes } from '../../web.socket.types';
import { ROUTES } from '../../../../router/router.const';

@AuthWebSocketMessage()
@SetMessageType(WebSocketTypes.ResponseToRequestForParticipation)
@NotificationSetUserImage()
@SetActions()
export class ResponseToRequestForParticipationMessage extends InitialMessage {
  createTexts(data) {
    return [
      data.request.response
        ? `${data.sender.last_name} ${data.sender.name} 
          підтвердив вашу участь у події «${data.event.name}, ${dayjs(
            new Date()
          )
            .locale(dayjsUkrLocale)
            .format('DD.MM.YYYY')}»`
        : `${data.sender.last_name} ${data.sender.name} 
        відхилив вашу участь у події «${data.event.name}, ${dayjs(new Date())
            .locale(dayjsUkrLocale)
            .format('DD.MM.YYYY')}»`,
    ];
  }

  createTitle(data) {
    return data.request.response
      ? 'Ваша заявка на участь у події прийнята'
      : 'Ваша заявка на участь у події відхилена';
  }

  onInit() {
    this.actions = [
      {
        type: MessageActionTypes.ActionClose,
        buttonType: 'success',
        buttonText: 'Зрозуміло',
        buttonWidth: 88,
        buttonHeight: 28,
      },
    ];

    if (this.data.request.response) {
      SetPushNotificationTheme('error')(this);
    } else {
      this.actions.push({
        type: MessageActionTypes.Action,
        action: ({ notificationInstance }) =>
          ROUTES.APPLICATION.EVENTS.GET_ONE.absolute(
            notificationInstance.data.event.id
          ),
        actionType: MessageActionDataTypes.UrlCallback,
        buttonType: 'default',
        buttonText: 'На сторінку події',
        buttonWidth: 133,
        buttonHeight: 28,
      });
    }
  }
}
