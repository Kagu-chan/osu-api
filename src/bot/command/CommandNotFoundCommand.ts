import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandNotFoundCommand extends Command {
  public command: string = 'commandNotFound';
  public readonly scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message, args: string[]): ComposedMessage[] {
    return [new ComposedMessage(
      this.bot.client,
      [message.channel],
      `Command \`${args[0]}\` does not exist! Try out \`help\` or \`commands\``
    )];
  }
}
