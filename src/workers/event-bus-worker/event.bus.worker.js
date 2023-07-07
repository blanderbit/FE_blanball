export class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, fn) {
    this.events[eventName] = fn;
  }

  off(eventName) {
    delete this.events[eventName];
  }

  emit(eventName, data) {
    const fn = this.events[eventName];
    if (fn && typeof fn === 'function') {
      fn(data);
    }
  }
}
