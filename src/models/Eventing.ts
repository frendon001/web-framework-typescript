type Callback = () => void;

export class Eventing {
  // don't know what properties the object will contain [key: string]
  events: { [key: string]: Callback[] } = {};

  on(eventName: string, callback: Callback) {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }

    for (const callback of handlers) {
      callback();
    }
  }
}
