import { AuthorizationService } from "./http/http-services/authorization.service";
import { NotificationService } from "./http/http-services/notification.service";
import { EventService } from "./http/http-services/events.service";
import { UserService } from "./http/http-services/user.service";
import { ReviewService } from "./http/http-services/review.service";
import { LocationService } from "./http/http-services/location.service";
import { VersionsService } from "./http/http-services/versions.service";

export class API {
  static AuthorizationService = AuthorizationService;
  static NotificationService = NotificationService;
  static EventService = EventService;
  static UserService = UserService;
  static ReviewService = ReviewService;
  static LocationService = LocationService;
  static VersionsService = VersionsService;
}
