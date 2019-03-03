import ClientEventHandler from './ClientEventHandler';
import ProcessEventHandler from './ProcessEventHandler';
import Client from './Client';
import IConfiguration from './interfaces/IConfiguration';

/**
 * @class Bot
 */
export default class Bot {
  /**
   * @var {Client} client The discord client
   */
  public readonly client: Client;

  /**
   * @var {ClientEventHandler} clientEventHandler
   */
  private readonly clientEventHandler: ClientEventHandler;

  /**
   * @var {ProcessEventHandler} processEventHandler
   */
  private readonly processEventHandler: ProcessEventHandler;

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

    this.clientEventHandler = new ClientEventHandler(this);
    this.processEventHandler = new ProcessEventHandler(this);
  }

  public initialize(): void {
    this.clientEventHandler.registerEvents();
    this.processEventHandler.registerEvents();
  }

  /**
   * Login and trigger the bot processing
   *
   * @note This method may exit the process in case of connection issues
   * @returns {Promise<void>}
   */
  public async run(): Promise<void> {
    await this.client.login();
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
};
