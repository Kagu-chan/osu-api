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

  public beforeCommand(message: Message) {
    console.log('before command'); // tslint:disable-line no-console
  }

  public abstract handle(): void;
}
