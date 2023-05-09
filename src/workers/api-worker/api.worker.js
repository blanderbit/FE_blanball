import { AuthorizationService } from './http/http-services/authorization.service';
import { NotificationService } from './http/http-services/notification.service';
import { EventService } from './http/http-services/events.service';
import { UserService } from './http/http-services/user.service';
import { ReviewService } from './http/http-services/review.service';
import { LocationService } from './http/http-services/location.service';
import { VersionsService } from './http/http-services/versions.service';
import { BugReportsService } from './http/http-services/bug-reports.service';
import { SchedulerService } from './http/http-services/scheduler.service';

export class API {
  static AuthorizationService = AuthorizationService;
  static NotificationService = NotificationService;
  static EventService = new EventService();
  static UserService = new UserService();
  static ReviewService = ReviewService;
  static LocationService = LocationService;
  static VersionsService = VersionsService;
  static BugReportsService = BugReportsService;
  static SchedulerService = SchedulerService;
}
