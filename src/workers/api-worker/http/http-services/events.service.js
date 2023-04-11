import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  AxiosParams,
  AxiosQuery,
  AxiosSkipErrorMessageType,
} from '../../../utils-worker';
import { FilterParamsDecorator } from '../filter/filter.utils';
import {
  filterConfigForEvents,
  filterConfigForUsers,
} from '../filter/filter.config';
import { DETAILS_TYPE_ENUM } from '../../../type-request-message-worker';

export class EventService {
  declineOrAcceptInvites(id, isAccept) {
    return AxiosInstance.post(EndpointsEnum.Events.DeclineOrAcceptInvites, {
      ids: [id],
      type: isAccept,
    });
  }

  requestsToParticipations(eventId) {
    return AxiosInstance.get(
      EndpointsEnum.Events.EventRequestsToParticipations(eventId)
    );
  }

  declineOrAcceptParticipations(id, isAccept) {
    return AxiosInstance.post(
      EndpointsEnum.Events.DeclineOrAcceptParticipations,
      {
        ids: [id],
        type: isAccept,
      }
    );
  }

  pinEvents(ids) {
    return AxiosInstance.post(EndpointsEnum.Events.PinEvents, {
      ids: ids,
    });
  }

  unPinEvents(ids) {
    return AxiosInstance.post(EndpointsEnum.Events.UnPinEvents, {
      ids: ids,
    });
  }

  deleteEvents(ids) {
    return AxiosInstance.post(EndpointsEnum.Events.DeleteEvents, {
      ids: ids,
    });
  }

  eventJoinAsPlayer(eventId) {
    return AxiosInstance.post(EndpointsEnum.Events.EventJoinAsPlayer, {
      event_id: eventId,
    });
  }

  eventLeaveAsPlayer(eventId) {
    return AxiosInstance.post(EndpointsEnum.Events.EventLeaveAsPlayer, {
      event_id: eventId,
    });
  }

  eventLeaveAsFan(eventId) {
    return AxiosInstance.post(EndpointsEnum.Events.EventLeaveAsFan, {
      event_id: eventId,
    });
  }

  eventJoinAsFan(eventId) {
    return AxiosInstance.post(EndpointsEnum.Events.EventJoinAsFan, {
      event_id: eventId,
    });
  }

  @FilterParamsDecorator(filterConfigForEvents)
  getAllEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetAllEvents,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  @FilterParamsDecorator(filterConfigForEvents)
  getAllMyEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetAllMyEvents,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  @FilterParamsDecorator(filterConfigForEvents)
  getMyTopicalEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetMyTopicalEvents,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  @FilterParamsDecorator(filterConfigForEvents)
  getMyFinishedEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetMyFinishedEvents,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  getOneEvent(eventId) {
    return AxiosInstance.get(EndpointsEnum.Events.GetOneEvent(eventId));
  }

  createOneEvent(eventData) {
    return AxiosInstance.post(EndpointsEnum.Events.CreateOneEvent, eventData);
  }

  editOneEvent(eventID, eventData) {
    return AxiosInstance.put(
      EndpointsEnum.Events.EditOneEvent(eventID),
      eventData
    );
  }

  inviteUsersToEvent(inviteUsersIds, event_id) {
    return AxiosInstance.post(EndpointsEnum.Events.InviteUsersToEvent, {
      ids: inviteUsersIds,
      event_id: event_id
    });
  }


  showOrHideMyEvents(ids) {
    return AxiosInstance.post(EndpointsEnum.Events.ShowOrHideMyEvents, {
      ids: ids
    })
  }

  getCountPinnedEvents() {
    return AxiosInstance.get(EndpointsEnum.Events.GetCountPinnedEvents);
  }

  @FilterParamsDecorator(filterConfigForEvents)
  getPlannedUserEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetPlannedUserEvents(options.id),
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }


  @FilterParamsDecorator(filterConfigForEvents)
  getMyPlannedEvents(options) {
    return AxiosInstance.get(
      EndpointsEnum.Events.GetMyPlannedEvents,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  getPopularEventsListEvents() {
    return AxiosInstance.get(EndpointsEnum.Events.PopularEventsList);
  }
}
