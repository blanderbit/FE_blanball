import {AxiosInstance} from "../../../../plugins/axios.plugin";
import {EndpointsEnum} from "../http-common/prefix.enum";

export class NotificationService {
    static readNotifications (ids) {
        return AxiosInstance.post(
            EndpointsEnum.Notification.Read,
            {
                ids
            }
        )
    }

    static getNotifications() {
        return AxiosInstance.get(EndpointsEnum.Notification.Index)
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
        return AxiosInstance.get(
            EndpointsEnum.Notification.DeleteAllMyNotifications
        )
    }
}

