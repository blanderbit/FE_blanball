import { AxiosInstance } from '../../../../plugins/axios.plugin';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  AxiosParams,
  AxiosQuery,
  AxiosSkipErrorMessageType,
} from '../../../utils-worker';
import { FilterParamsDecorator } from '../filter/filter.utils';
import { DETAILS_TYPE_ENUM } from '../../../type-request-message-worker';
import {
  filterConfigForReviews,
  filterConfigForUserReviews,
} from '../filter/filter.config';

export class ReviewService {
  @FilterParamsDecorator(filterConfigForUserReviews)
  static getUserReviews(options) {
    return AxiosInstance.get(
      EndpointsEnum.Reviews.GetUserReviews(options.id),
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  @FilterParamsDecorator(filterConfigForReviews)
  static getMyReviews(options) {
    return AxiosInstance.get(
      EndpointsEnum.Reviews.GetMyReviews,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([DETAILS_TYPE_ENUM.INVALID_PAGE])
      )
    );
  }

  static createEventReview(eventReviewData) {
    return AxiosInstance.post(
      EndpointsEnum.Reviews.CreateEventReview,
      eventReviewData
    );
  }
}
