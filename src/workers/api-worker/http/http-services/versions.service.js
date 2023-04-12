import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';

export class VersionsService {
  static getAllVersions() {
    return AxiosInstance.get(EndpointsEnum.Versions.GetAllVersions);
  }

  static getCurrentVersion(currentVersion) {
    return AxiosInstance.get(
      EndpointsEnum.Versions.GetCurrentVersion + currentVersion
    );
  }
}
