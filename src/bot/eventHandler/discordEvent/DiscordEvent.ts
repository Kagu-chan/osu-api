import Client from '../../Client';
import Bot from '../../Bot';

/**
 * Represents an event fired by discord.js
 *
 * @class DiscordEvent
 * @abstract
 * @see {discord.js.Client}
 */
export default abstract class DiscordEvent {
  /**
   * @var {Bot} bot The bot
   */
  protected readonly bot: Bot;

  /**
   * @var {Client} client The client
   */
  protected readonly client: Client;

  /**
   * @param {Bot} bot The bot
   * @constructor
   */
  constructor(bot: Bot) {
    this.bot = bot;
    this.client = bot.client;
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