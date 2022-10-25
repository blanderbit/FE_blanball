import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";

export class AuthorizationService {
    static login(data) {
        return AxiosInstance.post(EndpointsEnum.Authorization.Login, data)
    }
}

export class EventService {
    static getAllEvents(pageNumber) {
        return AxiosInstance.get(EndpointsEnum.Events.getAllEvents + `?page=${pageNumber}`) // TODO query params shoud be set in the config ,  second parametr  + `?page=${pageNumber}`
    }
    static getAllMyEvents(pageNumber) {
        return AxiosInstance.get(EndpointsEnum.Events.getAllMyEvents + `?page=${pageNumber}`)
    }
} // TODO add new service for this 
