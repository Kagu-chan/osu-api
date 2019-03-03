import { Client } from '../classes';

export default class BotEventHandler {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}