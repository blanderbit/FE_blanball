import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
import { AxiosParams, AxiosSkipErrorMessageType } from "../../../utils-worker";
import { DETAILS_TYPE_ENUM } from "../../../type-request-message-worker";

export class AuthorizationService {
  static login(data) {
    return AxiosInstance.post(
      EndpointsEnum.Authorization.Login,
      data,
      AxiosParams(
        AxiosSkipErrorMessageType([
          DETAILS_TYPE_ENUM.INVALID_PAGE
        ])
      )
    )
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
