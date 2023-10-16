import { AxiosInstance } from '@plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';

import { AxiosParams, AxiosQuery } from '@workers/utils-worker';

export class VersionsService {
  static getAllVersions(page) {
    return AxiosInstance.get(
      EndpointsEnum.Versions.GetAllVersions,
      AxiosParams(AxiosQuery(page))
    );
  }

  static getCurrentVersion(currentVersion) {
    return AxiosInstance.get(
      EndpointsEnum.Versions.GetCurrentVersion + currentVersion
    );
  }
}
