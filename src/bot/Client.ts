import {
  Client as DiscordClient,
  TextChannel,
  User,
  Snowflake,
  Message,
  Collection,
  Guild,
  GuildChannel,
} from 'discord.js';
import Bot from './Bot';
import EventEmitter from './EventEmitter';
import IDiscordConfiguration from './interfaces/IDiscordConfiguration';
import DiscordEvent from './eventHandler/discordEvent/DiscordEvent';

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
   * @var {Collection<Snowflake, TextChannel>} relevantChannels Cached relevant bot channels
   * @private
   */
  private relevantChannels: Collection<Snowflake, TextChannel>;

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
   * Get the bot user if logged in
   *
   * @returns {User}
   * @see <@link https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=user>
   */
  public getBotUser(): User {
    if (this.isOnline()) {
      return this.client.user;
    }
    return undefined;
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
   * Fetch relevant discord channels
   *
   * Channels are cached upon methods calls
   * A channels is considered as relevant, it its name corresponds to the bot configuration
   *
   * @param {boolean} [refetch=false] Refetch channels or use cache
   * @returns {Collection<Snowflake, TextChannel>} The channels relevant for the bot
   */
  public getRelevantDiscordChannels(refetch?: boolean): Collection<Snowflake, TextChannel> {
    const guilds: Collection<Snowflake, Guild> = this.client.guilds

    if (refetch || !this.relevantChannels) {
      this.relevantChannels = new Collection<Snowflake, TextChannel>();

      guilds.forEach((guild: Guild) => {
        const channels: Collection<Snowflake, GuildChannel> = guild.channels;

        channels.forEach((channel: GuildChannel, channelId: Snowflake) => {
          if (this.isChannelRelevant(channel)) {
            this.relevantChannels.set(channelId, channel as TextChannel);
          }
        }, this);
      }, this);
    }

    return this.relevantChannels;
  }

  public isChannelRelevant(channel: GuildChannel): boolean {
    return channel.type === 'text' && !!channel.name.match(/dev/);
  }

  /**
   * Checks wether the bot is online or not
   *
   * @returns {boolean}
   * @see <@link https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L249>
   */
  public isOnline(): boolean {
    return this.client.status === 0;
  }

  /**
   * Attach an event handler to the discord client api
   *
   * @param {type} type The generic type
   * @returns {T extends DiscordEvent} The discord event instance
   * @template T
   */
  public attachEvent<T extends DiscordEvent>(type: { new (c: Client): T; }): T {
    const eventInstance = new type(this);
    this.emit('registerEvent', this, eventInstance.eventName);

    this.client.on(eventInstance.eventName, (...args: any) => {
      eventInstance.handler(...args);
    });

    return eventInstance;
  }

  /**
   * Attach a discord channel manually
   *
   * @param {TextChannel} channel The channel
   */
  public attachChannel(channel: TextChannel) {
    this.relevantChannels.set(channel.id, channel);
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
   * @emits beforeLogin(sender: Client, retry: number)
   * @emits login(sender: Client)
   * @emits loginFailed(sender: Client, error: Error, retryAttempt: number, attemptsToMade: number, attemptTimeout: number)
   *
   * @see IDiscordConfiguration.discordRetryAttemps
   * @see IDiscordConfiguration.discordRetryTimeout
   */
  public async login(retryAttempt?: number): Promise<void> {
    const attempt = retryAttempt || 0;

    this.emit('beforeLogin', this, attempt);

    try {
      // Wait for the discord login
      await this.client.login(this.configuration.discordLoginToken);

      // We're logged in - tell the world so
      this.emit('login', this);
    } catch (error) {
      this.emit('loginFailed', this, error, attempt, this.configuration.discordRetryAttemps, this.configuration.discordRetryTimeout);
    }
  }

  /**
   * Logs out from Discord
   *
   * @returns {Promise<void>}
   */
  public async logout(): Promise<void> {
    await this.client.destroy();

    this.emit('logout');
  }
}