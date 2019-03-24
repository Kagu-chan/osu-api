import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class GetUserCommand extends Command {
  public command: string = 'getUser';
  public readonly scope: CommandScope = CommandScope.STANDARD;

  public async handle(message: Message): Promise<ComposedMessage[]> {
    return [new ComposedMessage(this.bot.client, [message.channel], 'empty', 'lala')];
  }
}
