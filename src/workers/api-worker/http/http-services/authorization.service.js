import {AxiosInstance} from "../../../../plugins/axios.plugin";
import {EndpointsEnum} from "../http-common/prefix.enum";

export class AuthorizationService {
    static login () {
        AxiosInstance.get(EndpointsEnum.Authorization.Register)
    }

    static register() {

    }
}

// example AuthorizationService.login()