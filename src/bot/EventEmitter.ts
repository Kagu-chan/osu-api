import { EventEmitter as NodeEventEmitter } from 'events';

/**
 * @class EventEmitter
 */
export default abstract class EventEmitter extends NodeEventEmitter {
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