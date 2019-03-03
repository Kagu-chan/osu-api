import Client from './Client';

import { IConfiguration } from './../interfaces';

/**
 * @class Bot
 *
 * @since 0.3.0
 */
export default class Bot {
  /**
   * @var {Client} client The discord client
   *
   * @since 0.3.0
   */
  public readonly client: Client;

  /**
   * @constructor
   * @param {IConfiguration} configuration The bot configuration
   */
  constructor(configuration: IConfiguration) {
    this.client = new Client(this, {
      discordToken: configuration.discordToken,
      discordRetryAttemps: configuration.discordRetryAttemps,
      discordRetryTimeout: configuration.discordRetryTimeout
    });
  }

  public initialize(): void {
    console.log('do stuff...');
  }

  /**
   * Log a message to the console and prefix with `INFO`
   *
   * @param {message: any[]} message The log message
   *
   * @since 0.3.0
   */
  public logInfo(...message: any) {
    console.log('[INFO]', ...message);
  }

  /**
   * Log a message to the console and prefix with `ERROR`
   *
   * @param {message: any[]} message The log message
   *
   * @since 0.3.0
   */
  public logError(...message: any) {
    console.log('[ERROR]', ...message);
  }

  /**
   * Wait a given amount of milliseconds
   *
   * @param {number} milliseconds The timeout time
   * @returns {Promise<void>}
   *
   * @since 0.3.0
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
   *
   * @since 0.3.0
   */
  public async run(): Promise<void> {
    try {
      await this.client.login(this.startInternalProcesses);
    } catch (error) {
      this.logError('Connection failure - retry limits exceed: Exit process');
      process.exit(1);
    }
  }

  /**
   * Startup internal processes like message handling and so on
   *
   * @note This method may exit the process in case of unhandled exception
   */
  private async startInternalProcesses(): Promise<void> {
    try {
      // @TODO
    } catch (error) {
      this.logError('Unhandled exception - exit process:', error);
      process.exit(1);
    }
  }
};
