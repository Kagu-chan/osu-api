import {
  Client as DiscordClient,
  User,
  Snowflake
} from 'discord.js';
import { Bot } from '../classes';
import { IDiscordConfiguration } from '../interfaces';

/**
 * Representation of a discord connection and its client interface
 *
 * @class Client
 */
export default class Client {
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
   * Logs in into Discord.
   * 
   * If a login fails, it retries it several times. Between the retries,
   * a timeout takes place
   *
   * @note A login can take place multiple times, e.g. doing a reconnect
   *
   * @param {() => Promise<void>} callback The action to do after login.
   * @param {numer} [retryAttempt=0] The current retry attempt. Defaults to 0
   * @returns {Promise<void>}
   * @throws {Error} An error will be thrown if a login is not possible
   *
   * @see IDiscordConfiguration.discordRetryAttemps
   * @see IDiscordConfiguration.discordRetryTimeout
   */
  public async login(callback: () => Promise<void>, retryAttempt?: number): Promise<void> {
    const retryTimeout: number = this.configuration.discordRetryTimeout;

    if (!retryAttempt) {
      this.bot.logInfo('Login...');

      retryAttempt = 0;
    } else {
      this.bot.logInfo(`Login... (retry: ${retryAttempt})`);
    }

    try {
      // Wait for the discord login
      await this.client.login(this.configuration.discordToken);

      // Call the given callback when the login was successfull
      return callback();
    } catch (error) {
      this.bot.logError('Failed to login:', error);

      // Retry if the limit of retries not exceed
      if (retryAttempt < this.configuration.discordRetryAttemps) {
        this.bot.logInfo(`Login attempted again in ${retryTimeout}`);

        await this.bot.wait(retryTimeout * 1000);
        await this.login(callback, retryAttempt + 1);
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