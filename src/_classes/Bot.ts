import { IConfiguration } from './../interfaces';
import { BotEventHandler, Client, Process } from '../classes';

/**
 * @class Bot
 */
export default class Bot {
  /**
   * @var {Client} client The discord client
   */
  public readonly client: Client;

  /**
   * @var {BotLifetime} botLifetime The bot event life cycle
   */
  private readonly botEventLifeCycle: BotEventHandler;

  /**
   * @var {Process} process The process mapper instance
   */
  private process: Process;

  /**
   * @constructor
   * @param {IConfiguration} configuration The bot configuration
   */
  constructor(configuration: IConfiguration) {
    this.client = new Client(this, {
      discordLoginToken: configuration.discordLoginToken,
      discordRetryAttemps: configuration.discordRetryAttemps,
      discordRetryTimeout: configuration.discordRetryTimeout,
      discordOwnerId: configuration.discordOwnerId
    });

    this.process = new Process(this);
    this.botEventLifeCycle = new BotEventHandler(this.client);

    this.client.on('login', this.onClientLogin.bind(this));
  }

  public initialize(): void {
    this.process.registerEvents();
    console.log('do stuff...');
  }

  /**
   * Log a message to the console and prefix with `INFO`
   *
   * @param {message: any[]} message The log message
   */
  public logInfo(...message: any) {
    console.log('[INFO]', ...message);
  }

  /**
   * Log a message to the console and prefix with `ERROR`
   *
   * @param {message: any[]} message The log message
   */
  public logError(...message: any) {
    console.log('[ERROR]', ...message);
  }

  /**
   * Wait a given amount of milliseconds
   *
   * @param {number} milliseconds The timeout time
   * @returns {Promise<void>}
   */
  public wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  /**
   * Login and trigger the bot processing
   *
   * @note This method may exit the process in case of connection issues
   * @returns {Promise<void>}
   */
  public async run(): Promise<void> {
    try {
      await this.client.login();
    } catch (error) {
      this.logError('Connection failure - retry limits exceed: Exit process');
      process.exit(1);
    }
  }

  /**
   * Event handler for login. Start internal processes
   *
   * @note This method may exit the process in case of unhandled exception
   * @returns {Promise<void>}
   */
  private async onClientLogin(sender: Client): Promise<void> {
    try {
      // @TODO
      await sender.sendMessage(
        [await sender.getOwner()],
        'Hallo'
      );
    } catch (error) {
      this.logError('Unhandled exception - exit process:', error);

      if (sender.isOnline()) {
        await sender.logout();
      }

      process.exit(1);
    }
  }
};
