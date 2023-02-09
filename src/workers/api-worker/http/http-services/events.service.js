import { AxiosInstance } from '../../../../plugins/axios.plugin'
import { EndpointsEnum } from '../http-common/prefix.enum'
import {
  AxiosParams,
  AxiosQuery,
  AxiosSkipErrorMessageType,
} from '../../../utils-worker'
import { FilterParamsDecorator } from '../filter/filter.utils'
import {
  filterConfigForEvents,
  filterConfigForUsers,
} from '../filter/filter.config'
import { DETAILS_TYPE_ENUM } from '../../../type-request-message-worker'

export class EventService {
  declineOrAcceptInvites(id, isAccept) {
    return AxiosInstance.post(EndpointsEnum.Events.DeclineOrAcceptInvites, {
      ids: [id],
      type: isAccept,
    })
  }

  declineOrAcceptParticipations(id, isAccept) {
    return AxiosInstance.post(
      EndpointsEnum.Events.DeclineOrAcceptParticipations,
      {
        ids: [id],
        type: isAccept,
      }
    )
  }

  @FilterParamsDecorator(filterConfigForEvents)
  getAllEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetAllEvents,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    )
  }

  @FilterParamsDecorator(filterConfigForEvents)
  getAllMyEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetAllMyEvents,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    )
  }

  getPlannedUserEvents(userId) {
    return AxiosInstance.get(EndpointsEnum.Events.getPlannedUserEvents(userId))
  }
  getPopularEventsListEvents() {
    return AxiosInstance.get(EndpointsEnum.Events.PopularEventsList)
  }
}
