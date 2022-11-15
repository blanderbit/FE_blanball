import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
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
    console.log(verificationCode)
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
}