import Client from "../../Client";

export default abstract class DiscordEvent {
  protected client: Client;

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