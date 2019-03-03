import { Client } from '../classes';

export default class BotEventLifeCycle {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}