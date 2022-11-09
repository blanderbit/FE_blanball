import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
export class UserService {
  static getMyProfile() {
    return AxiosInstance.get(
      EndpointsEnum.Users.getMyProfile
    )
  }
}