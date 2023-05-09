import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';

export class SchedulerService {
  static getScheduledEventsData(data) {
    return AxiosInstance.post(
      EndpointsEnum.Scheduler.GetScheduledEventsData,
      data
    );
  }
}
