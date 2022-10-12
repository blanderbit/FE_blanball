import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
import mockData from '../../../../consts/index'

export class AuthorizationService {
    static login() {
        return AxiosInstance.get(EndpointsEnum.Authorization.Register)
    }

    static register() {

    }
}

export class EventService {
    static getAllEvents() {
        // return AxiosInstance.get(EndpointsEnum.Events.getEvents)
        return Promise.resolve(mockData.events.mockEventData.page_1)
    }
}

// example AuthorizationService.login()