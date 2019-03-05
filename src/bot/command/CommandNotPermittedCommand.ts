import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandNotPermittedCommand extends Command {
  public command: string = 'commandNotPermitted';
  protected scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message, args: string[]): ComposedMessage[] {
    return [new ComposedMessage(
      this.bot.client,
      [message.channel],
      `You are not allowed to use the command \`${args[0]}\``
    )];
  }
}
