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
    this.client = new Client({ discordToken: configuration.discordToken });
  }

  public initialize(): void {
    console.log('do stuff...');
  }
};
