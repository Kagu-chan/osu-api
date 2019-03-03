import Client from './Client';
import Process from './Process';

import { IConfiguration } from './../interfaces';

/**
 * @class Bot
 */
export default class Bot {
  /**
   * @var {Client} client The discord client
   */
  public readonly client: Client;

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
      discordToken: configuration.discordToken,
      discordRetryAttemps: configuration.discordRetryAttemps,
      discordRetryTimeout: configuration.discordRetryTimeout,
      discordOwnerId: configuration.discordOwnerId
    });

    this.process = new Process(this);

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
    console.log('C');
    try {
      // @TODO
      await this.client.sendMessage(
        [await this.client.getOwner()],
        'Hallo'
      );
    } catch (error) {
      this.logError('Unhandled exception - exit process:', error);

      if (this.client.isOnline()) {
        await this.client.logout();
      }

      process.exit(1);
    }
  }
};
