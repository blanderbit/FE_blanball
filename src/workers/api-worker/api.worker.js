import { AuthorizationService } from "./http/http-services/authorization.service";
import { NotificationService } from "./http/http-services/notification.service";
import { EventService } from "./http/http-services/events.service";

export class API {
    static AuthorizationService = AuthorizationService;
    static NotificationService = NotificationService;
    static EventService = EventService;
}

