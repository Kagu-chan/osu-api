import Client from "../../Client";

/**
 * Represents an event fired by discord.js
 *
 * @class DiscordEvent
 * @abstract
 * @see {discord.js.Client}
 */
export default abstract class DiscordEvent {
  /**
   * @var {Client} client The client
   */
  protected client: Client;

  /**
   * @param {Client} client The client
   * @constructor
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * @var {string} eventName The discord event name this event class handles
   */
  public abstract eventName: string;

  /**
   * @var {Function} handler The event handler
   */
  public abstract handler: Function;
}