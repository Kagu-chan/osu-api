import {
  Client as DiscordClient,
  Collection,
  DMChannel,
  Guild,
  GuildChannel,
  Message,
  Snowflake,
  TextChannel,
  User,
} from 'discord.js';
import Bot from './Bot';
import EventEmitter from './EventEmitter';
import DiscordEvent from './eventHandler/discordEvent/DiscordEvent';
import IDiscordConfiguration from './interfaces/IDiscordConfiguration';

/**
 * Representation of a discord connection and its client interface
 *
 * @class Client
 * @extends EventEmitter
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
  public constructor(bot: Bot, configuration: IDiscordConfiguration) {
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
   * Fetch all guilds this bot is connected to
   *
   * @returns {Collection<Snowflake, Guild>}
   */
  public getConnectedGuilds(): Collection<Snowflake, Guild> {
    return this.client.guilds;
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
    const guilds: Collection<Snowflake, Guild> = this.client.guilds;

    if (refetch || !this.relevantChannels) {
      this.relevantChannels = new Collection<Snowflake, TextChannel>();

      guilds.forEach((guild: Guild) => {
        const channels: Collection<Snowflake, TextChannel> = this.getRelevantGuildChannels(guild);

        this.attachChannels(channels);
      }, this);
    }

    return this.relevantChannels;
  }

  /**
   * Fetch relevant channels from a guild
   *
   * @param {Guild} guild The guild
   * @returns {Collection<string, TextChannel>}
   */
  public getRelevantGuildChannels(guild: Guild): Collection<string, TextChannel> {
    const channels: Collection<Snowflake, GuildChannel> = guild.channels.filter(this.isChannelRelevant, this);
    const resultChannels: Collection<string, TextChannel> = new Collection<string, TextChannel>();

    channels.forEach((channel: GuildChannel, id: Snowflake) => {
      resultChannels.set(id, channel as TextChannel);
    });

    return resultChannels;
  }

  /**
   * Checks whether a channel is relevant or not
   *
   * @param {GuildChannel} channel The channel to check
   * @returns {boolean}
   */
  public isChannelRelevant(channel: GuildChannel): boolean {
    return channel.type === 'text'
      && !!channel.name.match(this.configuration.discordChannelRegexp);
  }

  /**
   * Checks whether the bot is online or not
   *
   * @returns {boolean}
   * @see <@link https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js#L249>
   */
  public isOnline(): boolean {
    return this.client.status === 0;
  }

  /**
   * Checks if a channel is considered as relevant
   *
   * @param {Snowflake} channelId The channel id
   * @returns {boolean}
   */
  public hasChannel(channelId: Snowflake): boolean {
    return this.relevantChannels.has(channelId);
  }

  /**
   * Attach an event handler to the discord client api
   *
   * @param {type} type The generic type
   * @returns {T extends DiscordEvent} The discord event instance
   * @template T
   */
  public attachEvent<T extends DiscordEvent>(type: { new (b: Bot): T; }): T { // tslint:disable-line callable-types
    const eventInstance = new type(this.bot);
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
   * Attach multiple discord channels at once
   *
   * @param {Collection<string, TextChannel>} channels The channels
   */
  public attachChannels(channels: Collection<string, TextChannel>) {
    channels.forEach(this.attachChannel, this);
  }

  /**
   * Detach a registered channel
   *
   * @param {TextChannel} channel The channel to remove
   */
  public detachChannel(channel: TextChannel) {
    this.relevantChannels.delete(channel.id);
  }

  /**
   * Send message(s) to users or channels
   *
   * @param {Array<TextChannel | DMChannel | User>} channel user channels or channels to send messages to
   * @param message One or more messages to send
   */
  public async sendMessage(
    channel: Array<TextChannel | DMChannel | User>,
    message: string | string[]
  ): Promise<Array<(Message | Message[])>> {
    const msgToSend = typeof message === 'object' ? message : [message];
    const promises = [];

    // Chain channels and messages into a promise array...
    channel.map((ch: TextChannel | DMChannel | User) => {
      msgToSend.forEach((msg) => {
        promises.push(ch.send(msg));
      });
    });

    // ... to wait for them to be sent
    return await Promise.all(promises);
  }

  public setPresence(alternativeText?: string): void {
    this.client.user.setPresence({
      status: 'online',
      game: {
        name: alternativeText || `@${this.client.user.username} help`,
      },
    });
  }

  /**
   * Logs in into Discord.
   *
   * If a login fails, it retries it several times. Between the retries,
   * a timeout takes place
   *
   * @note A login can take place multiple times, e.g. doing a reconnect
   *
   * @param {number} [retryAttempt=0] The current retry attempt. Defaults to 0
   * @returns {Promise<void>}
   * @emits beforeLogin(sender: Client, retry: number)
   * @emits login(sender: Client)
   * @emits loginFailed(sender: Client, error: Error,
   *                    retryAttempt: number, attemptsToMade: number, attemptTimeout: number)
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
      this.emit(
        'loginFailed',
        this,
        error,
        attempt,
        this.configuration.discordRetryAttemps,
        this.configuration.discordRetryTimeout
      );
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
