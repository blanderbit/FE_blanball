import { AxiosInstance } from "../../../../plugins/axios.plugin";
import { EndpointsEnum } from "../http-common/prefix.enum";

export class ReviewService {
  static getUserReviews(payload) {
    return AxiosInstance.get(
      EndpointsEnum.Reviews.getUserReviews + payload
    )
  }
}