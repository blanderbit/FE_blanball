import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
import mockData from '../../../../consts/index'

let config = {
    headers: {
        'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4MDcxMDAyLCJpYXQiOjE2NjYzNDMwMDIsImp0aSI6IjNiZTk2NzY2ODk5YjRiZGU4NTQ0M2E4NjJmYmM4ZTc2IiwidXNlcl9pZCI6MX0.HK6poufMlIloTcx1y1DftRsQtclTwiMI-weFOWI3UtE"
    }
}
export class AuthorizationService {
    static login() {
        return AxiosInstance.get(EndpointsEnum.Authorization.Register)
    }

    static register() {

    }
}

export class EventService {
    static getAllEvents(pageNumber) {
        return AxiosInstance.get(EndpointsEnum.Events.getEvents + `?page=${pageNumber}`, config)
        // return Promise.resolve(mockData.events.biggerData)
    }
}

// example AuthorizationService.login()