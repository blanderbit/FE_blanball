import { EventsRequest } from "./requests/events.request";

console.log('api file')

export const $api = {
  EventsRequest: new EventsRequest()
};