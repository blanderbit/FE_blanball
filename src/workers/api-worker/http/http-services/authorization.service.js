import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";

export class AuthorizationService {
    static login(data) {
        return AxiosInstance.post(EndpointsEnum.Authorization.Login, data)
    }

    static register() {

    }
}
