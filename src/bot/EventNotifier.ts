import { EventEmitter } from "events";

export default abstract class EventNotifier extends EventEmitter {
  /**
   * Emit an event, but attach a sender argument to the event
   *
   * @param {string} eventName The event name
   * @param {any[]} args Event arguments
   */
  public notify(eventName: string, ...args: any) {
    this.emit(eventName, this, ...args);
  }
}