import { shallowRef, triggerRef } from 'vue';

export class SignalManager {
  signals;
  watchingSignals;

  constructor() {
    this.signals = {};
    this.watchingSignals = [];
  }

  createSignal(name, initialValue) {
    if (this.getSignal(name)) {
      console.warn(`Signal "${name}" already exists. It will be overwritten.`);
    }

    this.signals[name] = shallowRef(initialValue);

    const signalProxy = new Proxy(this.signals[name], {
      get: (target, property) => {
        return target[property];
      },
      set: (target, property, value) => {
        target[property] = value;
        triggerRef(target);
        this.#handleWatchingSignalCallBack(name);
        return true;
      },
    });

    return {
      get value() {
        return signalProxy.value;
      },
      set value(newValue) {
        signalProxy.value = newValue;
      },
    };
  }

  getSignal(name) {
    return this.signals[name];
  }

  deleteSignal(name) {
    if (this.getSignal(name)) {
      delete this.signals[name];
      console.log(`Signal "${name}" has been deleted.`);
    } else {
      console.warn(`Signal "${name}" does not exist.`);
    }
  }

  #handleWatchingSignalCallBack(signalName) {
    const watchingSignalsToHandle = this.watchingSignals.filter(
      (signal) => signal.signalName === signalName
    );

    if (watchingSignalsToHandle) {
      watchingSignalsToHandle.forEach((signal) => {
        signal.callback(this.getSignal(signal.signalName).value);
      });
    }
  }

  watchSignals(signalArray) {
    signalArray.forEach((signalObject) => {
      const { signalName, callback } = signalObject;

      if (this.getSignal(signalName)) {
        console.warn(`Signal "${signalName}" doesn't exist.`);
        return;
      }

      if (typeof callback !== 'function') {
        console.warn(`Signal ${signalName} passed callback is not a function`);
        return;
      }

      if (
        this.watchingSignals.find(
          (signal) => signal.callback.name === callback.name
        )
      ) {
        console.warn(
          `The signal ${signalName} is already being viewed with this callback: ${callback.name}`
        );
        return;
      }
      this.watchingSignals.push(signalObject);
    });
  }
}
