import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
import mockData from '../../../../consts/index'

let config = {
    headers: {
        'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3NDYzMzI2LCJpYXQiOjE2NjU3MzUzMjYsImp0aSI6ImJjNzkxOTMzZGFmYjRjMjU5NTRlNmJhZmRiZTcyODM1IiwidXNlcl9pZCI6NH0.rOUvqfUWQAzaBPn9dz4ir4fZbgzHr31K9jp0y1i3jv0"
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