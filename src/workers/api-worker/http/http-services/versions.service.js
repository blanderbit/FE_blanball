import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";
export class VersionsService {
  static getAllVersions() {
    return AxiosInstance.get(
      EndpointsEnum.Versions.getAllVersions
    )
  }

  static getCurrentVersion(currentVersion) {
    return AxiosInstance.get(
      EndpointsEnum.Versions.getCurrentVersion + currentVersion
    )
  }
}