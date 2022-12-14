import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
import { AxiosParams, AxiosQuery, AxiosSkipErrorMessageType } from "../../../utils-worker";
import { DETAILS_TYPE_ENUM } from "../../../type-request-message-worker";
export class UserService {
  static getMyProfile() {
    return AxiosInstance.get(
      EndpointsEnum.Users.getMyProfile
    )
  }

  static deleteMyProfile() {
    return AxiosInstance.delete(
      EndpointsEnum.Users.deleteMyProfile
    )
  }

  static sendApproveCode(verificationCode) {
    return AxiosInstance.post(
      EndpointsEnum.Users.sendApproveCode,
      verificationCode
    )
  }

  static changePassword(passwordsData) {
    return AxiosInstance.post(
      EndpointsEnum.Users.changePassword,
      passwordsData
    )
  }

  static updateProfileData(payload) {
    return AxiosInstance.put(
      EndpointsEnum.Users.updateProfileData,
      payload
    )
  }

  static getAllUsers(options) {
    const { page } = options || {};
    return AxiosInstance.get(
      EndpointsEnum.Users.getAllUsers,
      AxiosParams(
        AxiosQuery({
          page
        }),
      )
    )
  }

  static changeUserEmail(payload) {
    return AxiosInstance.post(
      EndpointsEnum.Users.changeUserEmail,
      payload
    )
  }
}