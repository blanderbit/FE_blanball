import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
import { AxiosParams, AxiosQuery } from "../../../utils-worker";

export class NotificationService {
  static readNotifications(ids) {
    return AxiosInstance.post(
      EndpointsEnum.Notification.Read,
      {
        ids
      }
    )
  }

  static getNotifications({ page, skipids }) {
    return AxiosInstance.get(
      EndpointsEnum.Notification.Index,
      AxiosParams(
        AxiosQuery.bind(null, {
          page,
          skipids: skipids?.join(',')
        })
      )
    )
  }

  static getMaintenance() {
    return AxiosInstance.get(EndpointsEnum.Notification.Maintenance)
  }

  static getNotificationsCount() {
    return AxiosInstance.get(EndpointsEnum.Notification.Count)
  }

  static deleteNotifications(ids) {
    return AxiosInstance.get(
      EndpointsEnum.Notification.Delete,
      {
        ids
      }
    )
  }

  static deleteAllMyNotifications() {
    return AxiosInstance.delete(
      EndpointsEnum.Notification.DeleteAllMyNotifications
    )
  }

  static readAllMyNotifications() {
    return AxiosInstance.delete(
      EndpointsEnum.Notification.ReadAllMyNotifications
    )
  }
}

