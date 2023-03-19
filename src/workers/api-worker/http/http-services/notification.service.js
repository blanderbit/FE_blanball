import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  AxiosParams,
  AxiosQuery,
  AxiosSkipErrorMessageType,
} from '../../../utils-worker';
import { DETAILS_TYPE_ENUM } from '../../../type-request-message-worker';

export class NotificationService {
  static readNotifications(ids) {
    return AxiosInstance.post(EndpointsEnum.Notification.Read, {
      ids,
    });
  }

  static getNotifications({ page, skipids }) {
    return AxiosInstance.get(
      EndpointsEnum.Notification.Index,
      AxiosParams(
        AxiosQuery({
          page,
          skipids: skipids?.join(','),
        }),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  static getMaintenance() {
    return AxiosInstance.get(EndpointsEnum.Notification.Maintenance);
  }

  static getNotificationsCount() {
    return AxiosInstance.get(EndpointsEnum.Notification.Count);
  }

  static deleteNotifications(ids) {
    return AxiosInstance.post(EndpointsEnum.Notification.Delete, {
      ids,
    });
  }

  static deleteAllMyNotifications() {
    return AxiosInstance.delete(
      EndpointsEnum.Notification.DeleteAllMyNotifications
    );
  }

  static readAllMyNotifications() {
    return AxiosInstance.get(EndpointsEnum.Notification.ReadAllMyNotifications);
  }

  static getAllMyNotificationsIds() {
    return AxiosInstance.get(EndpointsEnum.Notification.GetAllMyNotificationsIds);
  }
}
