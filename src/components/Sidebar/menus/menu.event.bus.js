import { EventBus } from "../../../workers/event-bus-worker/event.bus.worker";

export const MenuTabsConfigEventBus = new EventBus();

export const SupportTabsBusEvents = {
  LoaTabData: {
    event: 'loadNewData',
    handler: 'loadNewData'
  },

};