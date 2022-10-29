import {AxiosInstance} from "../../../../plugins/axios.plugin";
import {EndpointsEnum} from "../http-common/prefix.enum";
import { AxiosParams, AxiosQuery } from "../../../utils-worker";

export class EventService {
    static declineOrAcceptInvites(id, isAccept) {
        return AxiosInstance.post(
            EndpointsEnum.Events.DeclineOrAcceptInvites,
            {
                ids: [id],
                type: isAccept
            }
        )
    }
    static declineOrAcceptParticipations(id, isAccept) {
        return AxiosInstance.post(
            EndpointsEnum.Events.DeclineOrAcceptParticipations,
            {
                ids: [id],
                type: isAccept
            }
        )
    }

    static getAllEvents(pageNumber) { // TODO should add filters
        return AxiosInstance.get(
            EndpointsEnum.Events.GetAllEvents,
            AxiosParams(
                AxiosQuery.bind(null, {
                    page: pageNumber
                })
            )
        )
    }

    static getAllMyEvents(pageNumber) {
        return AxiosInstance.get(
            EndpointsEnum.Events.GetAllMyEvents,
            AxiosParams(
                AxiosQuery.bind(null, {
                    page: pageNumber
                })
            )
        )
    }
}
