import { AxiosInstance } from '../../../../plugins/axios.plugin'
import { EndpointsEnum } from '../http-common/prefix.enum'

export class BugReportsService {
  static CreateBugReport(data) {
    return AxiosInstance.post(EndpointsEnum.BugReports.createBugReport, data)
  }
}
