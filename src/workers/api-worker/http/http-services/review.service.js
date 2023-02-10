import { AxiosInstance } from '../../../../plugins/axios.plugin'
import { EndpointsEnum } from '../http-common/prefix.enum'

export class ReviewService {
  static getUserReviews(payload) {
    return AxiosInstance.get(EndpointsEnum.Reviews.getUserReviews + payload)
  }

  static getMyReviews() {
    return AxiosInstance.get(EndpointsEnum.Reviews.getMyReviews)
  }

  static createEventReview(eventReviewData) {
    return AxiosInstance.post(
      EndpointsEnum.Reviews.createEventReview,
      eventReviewData
    )
  }
}
