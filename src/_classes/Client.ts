import {
  Client as DiscordClient,
  TextChannel,
  User,
  Snowflake,
  Message,
} from 'discord.js';
import { Bot } from '../classes';
import { IDiscordConfiguration } from '../interfaces';
import { EventEmitter } from 'events';

/**
 * Representation of a discord connection and its client interface
 *
 * @class Client
 * @extens EventEmitter
 */
export default class Client extends EventEmitter {
  /**
   * @var {DiscordClient} client A discord.js Client instance used for this bot
   * @private
   *
   * @see <@link https://discord.js.org/#/docs/main/stable/class/Client>
   */
  private client: DiscordClient;

  /**
   * @var {IDiscordConfiguration} configuration discord related configuration
   * @private
   */
  private configuration: IDiscordConfiguration;

  /**
   * @var {Bot} bot The bot instance
   * @private
   */
  private bot: Bot;

  /**
   * @constructor
   * @param {Bot} bot The bot instance
   * @param {IDiscordConfiguration} configuration The discord configuration
   */
  constructor(bot: Bot, configuration: IDiscordConfiguration) {
    super();

    this.bot = bot;
    this.client = new DiscordClient();
    this.configuration = configuration;
  }

  /**
   * Fetch an user from discord
   *
   * @param {string | Snowflake} id Discord user id
   * @returns {Promise<User>}
   * @see <@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=fetchUser>
   */
  public getUser(id: string | Snowflake): Promise<User> {
    return this.client.fetchUser(id, true);
  }

  /**
   * Fetch the bot owner user from discord
   *
   * @returns {Promise<User>}
   */
  public getOwner(): Promise<User> {
    return this.getUser(this.configuration.discordOwnerId);
  }

  /**
   * Checks wether the bot is online or not
   *
   * @returns {boolean}
   * @see <@link https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L249>
   */
  public isOnline(): boolean {
    return this.client.status === 0
  }

  /**
   * Attach an event handler to the discord client api
   * @param {string} eventName The event name
   * @param {any} scope The handler scope
   * @param {Function} handler The event handler
   */
  public attachEvent(eventName: string, scope: any, handler: Function) {
    this.client.on(eventName, handler);
  }

  /**
   * Send message(s) to users or channels
   *
   * @param {Array<TextChannel | User>} channel Users or channels to send messages to
   * @param message One or more messages to send
   */
  public async sendMessage(
    channel: Array<TextChannel | User>,
    message: string | string[]
  ): Promise<(Message | Message[])[]> {
    // Chain channels into a promise array...
    const senders = channel.map(ch => ch.send(message));

    // ... to wait for them to be sent
    return await Promise.all(senders);
  }

  /**
   * Logs in into Discord.
   * 
   * If a login fails, it retries it several times. Between the retries,
   * a timeout takes place
   *
   * @note A login can take place multiple times, e.g. doing a reconnect
   *
   * @param {numer} [retryAttempt=0] The current retry attempt. Defaults to 0
   * @returns {Promise<void>}
   * @event login
   * @throws {Error} An error will be thrown if a login is not possible
   *
   * @see IDiscordConfiguration.discordRetryAttemps
   * @see IDiscordConfiguration.discordRetryTimeout
   */
  public async login(retryAttempt?: number): Promise<void> {
    const retryTimeout: number = this.configuration.discordRetryTimeout;

    if (!retryAttempt) {
      this.bot.logInfo('Login...');

      retryAttempt = 0;
    } else {
      this.bot.logInfo(`Login... (retry: ${retryAttempt})`);
    }

    try {
      // Wait for the discord login
      await this.client.login(this.configuration.discordLoginToken);

      // We're logged in - tell the world so
      this.emit('login', this);
    } catch (error) {
      this.bot.logError('Failed to login:', error);

      // Retry if the limit of retries not exceed
      if (retryAttempt < this.configuration.discordRetryAttemps) {
        this.bot.logInfo(`Login attempted again in ${retryTimeout}`);

        await this.bot.wait(retryTimeout * 1000);
        await this.login(retryAttempt + 1);
      } else {
        // Login was not possible
        throw error;
      }
    }
  }

  /**
   * Logs out from Discord
   *
   * @returns {Promise<void>}
   */
  public async logout(): Promise<void> {
    await this.client.destroy();
  }
}