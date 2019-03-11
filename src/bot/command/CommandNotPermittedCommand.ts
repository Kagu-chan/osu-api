import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandNotPermittedCommand extends Command {
  public command: string = 'commandNotPermitted';
  public readonly scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message, args: string[]): ComposedMessage[] {
    return [new ComposedMessage(
      this.bot.client,
      [message.channel],
      'commandNotPermitted',
      args[0]
    )];
  }
}
