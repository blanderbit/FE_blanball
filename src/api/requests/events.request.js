import {
  REQUEST_CLIENT_NAME,
  REQUEST_END_POINT,
  REQUEST_VERSIONS,
} from "../request.key/request.const";
import { ApiRequest } from "../http/request";

console.log('event request file')

export class EventsRequest extends ApiRequest {
  $endPoint = REQUEST_END_POINT.EVENTS;

  $defaultVersion = REQUEST_VERSIONS.V1;

  $defaultClient = REQUEST_CLIENT_NAME.CLIENT;
}