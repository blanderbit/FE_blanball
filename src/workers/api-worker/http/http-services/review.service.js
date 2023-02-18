import { AxiosInstance } from '../../../../plugins/axios.plugin'
import { EndpointsEnum } from '../http-common/prefix.enum'
import { AxiosParams, AxiosQuery, AxiosSkipErrorMessageType } from "../../../utils-worker";
import { FilterParamsDecorator } from "../filter/filter.utils";
import { DETAILS_TYPE_ENUM } from "../../../type-request-message-worker";
import { filterConfigForReviews } from  '../filter/filter.config'

export class ReviewService {
  static getUserReviews(payload) {
    return AxiosInstance.get(EndpointsEnum.Reviews.getUserReviews + payload)
  }

  @FilterParamsDecorator(filterConfigForReviews)
  static getMyReviews(options) {
    return AxiosInstance.get(
      EndpointsEnum.Reviews.getMyReviews,
      AxiosParams(
        AxiosQuery(options),
        AxiosSkipErrorMessageType([
          DETAILS_TYPE_ENUM.INVALID_PAGE
        ])
      )
    )
  }

  static createEventReview(eventReviewData) {
    return AxiosInstance.post(
      EndpointsEnum.Reviews.createEventReview,
      eventReviewData
    )
  }
}
