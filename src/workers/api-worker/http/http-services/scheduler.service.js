import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  AxiosParams,
  AxiosQuery,
  AxiosSkipErrorMessageType,
} from '../../../utils-worker';
import { FilterParamsDecorator } from '../filter/filter.utils';
import { filterConfigForScheduler } from '../filter/filter.config';
import { DETAILS_TYPE_ENUM } from '../../../type-request-message-worker';

export class SchedulerService {
  static getScheduledEventsData(data) {
    return AxiosInstance.post(
      EndpointsEnum.Scheduler.GetScheduledEventsData,
      data
    );
  }

  @FilterParamsDecorator(filterConfigForScheduler)
  static getScheduledEventsDataOnSpecificDay(options) {
    return AxiosInstance.get(
      EndpointsEnum.Scheduler.getScheduledEventsDataOnSpecificDay,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }
}
