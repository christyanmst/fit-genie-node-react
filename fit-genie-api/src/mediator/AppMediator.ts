/* eslint-disable @typescript-eslint/no-explicit-any */
type EventListener = (...args: any[]) => Promise<any> | any;

class SimpleMediator {
  private events: { [key: string]: EventListener[] } = {};

  on(event: string, listener: EventListener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  async publish<T = any>(event: string, ...args: any[]): Promise<T | null> {
    if (!this.events[event] || this.events[event].length === 0) {
        return null;
    }

    const results = await Promise.all(this.events[event].map(listener => listener(...args)));

    return results[0] as T;
}
}

export const mediator = new SimpleMediator();
