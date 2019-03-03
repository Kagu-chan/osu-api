import Client from './Client';

export default class BotLifetime {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}