import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class DocsCommand extends Command {
  public command: string = 'docs';
  protected scope: CommandScope = CommandScope.STANDARD;

  public handle(message: Message): ComposedMessage[] {
    return [new ComposedMessage(this.bot.client, [message.channel], 'https://github.com/ppy/osu-api/wiki')];
  }
}
