import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class DocsCommand extends Command {
  public command: string = 'docs';
  public readonly scope: CommandScope = CommandScope.STANDARD;

  public handle(message: Message): ComposedMessage[] {
    return [new ComposedMessage(this.bot.client, [message.channel], 'docs')];
  }
}
