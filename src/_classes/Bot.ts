import Client from './Client';

import { IConfiguration } from './../interfaces';

/**
 * @class Bot
 */
export default class Bot {
  /**
   * @var {Client} client The discord client
   */
  public readonly client: Client;

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

  public logInfo(...message: any) {
    console.log('[INFO]', ...message);
  }

  public logError(...message: any) {
    console.log('[ERROR]', ...message);
  }

  public wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }

  public async run(): Promise<void> {
    try {
      await this.client.login(this.afterLogin);
    } catch (error) {
      this.logError('Connection failure - retry limits exceed: Exit process');
      process.exit(1);
    }
  }

  private async afterLogin(): Promise<void> {
    return new Promise((resolve) => {
      // do stuff

      // on failure: error not catched where ever - exit process
    });
  }
};
