import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandWronglyPostedCommand extends Command {
  public command: string = 'commandWronglyPosted';
  public readonly scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message, args: string[]): ComposedMessage[] {
    return [new ComposedMessage(
      this.bot.client,
      [message.channel],
      'commandWronglyPosted',
      args[0],
      message.isDm ? 'channel' : 'direct'
    )];
  }
}
