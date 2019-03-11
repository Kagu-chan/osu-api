import { DMChannel, Message, TextChannel } from 'discord.js';
import Client from './Client';
import TranslationInterface from './TranslationInterface';

export default class ComposedMessage {
  private client: Client;
  private channel: Array<TextChannel | DMChannel>;
  private content: string;
  private alreadySent: boolean = false;
  private translationInterface: TranslationInterface = new TranslationInterface();

  constructor(client: Client, channel: Array<TextChannel | DMChannel>, key: string, ...args: string[]) {
    const contentKey = `commands.${key}`;

    this.content = this.translationInterface.__(contentKey, ...args);

    this.client = client;
    this.channel = channel;
  }

  public async send(): Promise<Array<(Message | Message[])>> {
    if (this.alreadySent) {
      throw new Error('Message is already sent');
    }

    return await this.client.sendMessage(this.channel, this.content);
  }
}
