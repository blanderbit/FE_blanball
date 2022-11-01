import {AxiosInstance} from "../../../../plugins/axios.plugin";
import {EndpointsEnum} from "../http-common/prefix.enum";
import { AxiosParams, AxiosQuery } from "../../../utils-worker";

export class NotificationService {
    static readNotifications (ids) {
        return AxiosInstance.post(
            EndpointsEnum.Notification.Read,
            {
                ids
            }
        )
    }

    static getNotifications(pageNumber) {
        return AxiosInstance.get(
            EndpointsEnum.Notification.Index,
            AxiosParams(
                AxiosQuery.bind(null, {
                    page: pageNumber
                })
            )
        )
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

