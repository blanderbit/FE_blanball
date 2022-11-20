import { AuthorizationService } from "./http/http-services/authorization.service";
import { NotificationService } from "./http/http-services/notification.service";
import { EventService } from "./http/http-services/events.service";
import { UserService } from "./http/http-services/user.service";

export class API {
  static AuthorizationService = AuthorizationService;
  static NotificationService = NotificationService;
  static EventService = EventService;
  static UserService = UserService;
}

