import { TextChannel } from 'discord.js';
import Bot from '../Bot';
import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';

export default abstract class Command {
  public abstract command: string;
  protected abstract scope: CommandScope;

  protected bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  public abstract handle(message: Message, args: string[]): ComposedMessage[];

  public async beforeCommand(message: Message): Promise<boolean> {
    // Check if the scope is standard - in this case everything is allowed
    if (this.scope === CommandScope.STANDARD) {
      return true;
    }

    const wrongPlace = !this.isValidChannel(message);
    const notAllowed = !(await this.isCommandAllowed(message));
    const wasInternal = !this.isCommandNotInternal(message);

    const isValidCommand = !(wrongPlace || notAllowed || wasInternal);

    if (!isValidCommand) {
      this.handleInvalidCommand(message, wrongPlace, notAllowed, wasInternal);
    }

    return isValidCommand;
  }

  private isValidChannel(message: Message): boolean {
    // Check if the scope is an only-dm scope
    if (this.scope & CommandScope.ONLY_DM) {
      return message.isDm;
    }

    // Check if the scope is an only-channel scope
    if (this.scope & CommandScope.ONLY_CHANNEL) {
      return !message.isDm;
    }

    return true;
  }

  private async isCommandAllowed(message: Message): Promise<boolean> {
    const owner = await this.bot.client.getOwner();

    // Check is the scope is owner scope
    if (this.scope & CommandScope.ONLY_INTERNAL) {
      return owner.id === message.author.id;
    }

    return true;
  }

  private isCommandNotInternal(message: Message): boolean {
    // Check if the scope is internal
    if (this.scope & CommandScope.ONLY_INTERNAL) {
      return message.isInitiatedInternal;
    }

    return true;
  }

  private handleInvalidCommand(
    message: Message,
    wasInvalidChannel: boolean,
    wasNotAllowed: boolean,
    wasInternal: boolean
  ) {
    const informPerDm = this.scope & CommandScope.SECRET_ON_ERROR;

    let generalEvent;
    let channelEvent;
    let dmEvent;

    if (wasInternal) {
      generalEvent = 'commandCommandNotFound';
    } else if (wasNotAllowed) {
      generalEvent = 'commandCommandNotPermitted';
    } else if (wasInvalidChannel) {
      generalEvent = 'commandCommandWronglyPosted';
    }

    if (message.isDm || !informPerDm) {
      channelEvent = generalEvent;
    } else {
      channelEvent = 'commandCommandNotFound';
      dmEvent = generalEvent;
    }

    message.isInitiatedInternal = true;
    if (channelEvent) {
      this.bot.commandDispatcher.emit(channelEvent, message);
    }
    if (dmEvent) {
      message.channel = message.author.dmChannel;
      this.bot.commandDispatcher.emit(dmEvent, message);
    }
  }
}
