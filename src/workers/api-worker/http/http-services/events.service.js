import {AxiosInstance} from "../../../../plugins/axios.plugin";
import {EndpointsEnum} from "../http-common/prefix.enum";

export class NotificationService {
    static readNotifications (notifications) {
        return AxiosInstance.post(
            EndpointsEnum.Notification.Read,
            {
                notifications
            }
        )
    }

    static getNotifications() {
        return AxiosInstance.get(EndpointsEnum.Notification.Index)
    }

    static deleteNotifications(notifications) {
        return AxiosInstance.get(
            EndpointsEnum.Notification.Delete,
            {
                notifications
            }
        )
    }

    static deleteAllMyNotifications() {
        return AxiosInstance.get(
            EndpointsEnum.Notification.DeleteAllMyNotifications
        )
    }
}

