import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";

export class AuthorizationService {
  static login(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.Login, data)
  }

  static ResetPasswordRequest(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.ResetPasswordRequest, data)
  }

  static VerifyCode(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.VerifyCode, data)
  }

  static ResetComplete(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.ResetComplete, data)
  }

  static Register(data) {
    return AxiosInstance.post(EndpointsEnum.Authorization.Register, data)
  }
}
