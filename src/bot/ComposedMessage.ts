import { DMChannel, Message, TextChannel, User } from 'discord.js';
import Client from './Client';
import TranslationInterface from './TranslationInterface';

export default class ComposedMessage {
  private client: Client;
  private channel: Array<TextChannel | DMChannel | User>;
  private content: string;
  private alreadySent: boolean = false;
  private translationInterface: TranslationInterface = new TranslationInterface();

  constructor(client: Client, channel: Array<TextChannel | DMChannel | User>, key: string, ...args: string[]) {
    const contentKey = `commands.${key}`;

    this.content = this.translationInterface.__(contentKey, ...args);

    this.client = client;
    this.channel = channel;
  }

  public async send(): Promise<Array<(Message | Message[])>> {
    if (this.alreadySent) {
      throw new Error(this.translationInterface.__('error.messageSend'));
    }

    return await this.client.sendMessage(this.channel, this.content);
  }
}
