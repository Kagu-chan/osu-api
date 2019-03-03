import { Client as DiscordClient } from 'discord.js';
import { IDiscordConfiguration } from './../interfaces';

export default class Client {
  private client: DiscordClient;
  private configuration: IDiscordConfiguration;

  constructor(configuration: IDiscordConfiguration) {
    this.client = new DiscordClient();
    this.configuration = configuration;
  }

  login(): Promise<string> {
    return this.client.login(this.configuration.discordToken);
  }

  logout(): Promise<void> {
    return this.client.destroy();
  }
}