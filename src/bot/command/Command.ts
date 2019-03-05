import Bot from '../Bot';
import Message from '../Message';
import { CommandScope } from '../Types';

export default abstract class Command {
  public abstract command: string;
  protected abstract scope: CommandScope;

  protected bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  public async beforeCommand(message: Message): Promise<boolean> {
    // Check if the scope is standard - in this case everything is allowed
    if (this.scope === CommandScope.STANDARD) {
      return true;
    }

    const wrongPlace = !this.isValidChannel(message);
    const notAllowed = !(await this.isCommandAllowed(message));

    const isValidCommand = !(wrongPlace || notAllowed);

    if (!isValidCommand) {
      this.handleInvalidCommand(message, wrongPlace, notAllowed);
    }

    return isValidCommand;
  }

  public abstract handle(message: Message, args: string[]): void;

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

    // Check if the scope is internal
    if (this.scope & CommandScope.ONLY_INTERNAL) {
      return message.isInitiatedInternal;
    }

    // Check is the scope is owner scope
    if (this.scope & CommandScope.ONLY_INTERNAL) {
      return owner.id === message.author.id;
    }

    return true;
  }

  private handleInvalidCommand(message: Message, wasInvalidChannel: boolean, wasNotAllowed: boolean) {
    const informPerDm = this.scope & CommandScope.SECRET_ON_ERROR;

    if (informPerDm && !message.isDm) {
      // send pm details to user and trigger message to channel as well
    }
  }
}
