import { DMChannel, Message, TextChannel } from 'discord.js';
import Client from './Client';

export default class ComposedMessage {
  private client: Client;
  private channel: Array<TextChannel | DMChannel>;
  private content: string;
  private alreadySent: boolean = false;

  constructor(client: Client, channel: Array<TextChannel | DMChannel>, content: string) {
    this.client = client;
    this.channel = channel;
    this.content = content;
  }

  public async send(): Promise<Array<(Message | Message[])>> {
    if (this.alreadySent) {
      throw new Error('Message is already sent');
    }

    return await this.client.sendMessage(this.channel, this.content);
  }
}
