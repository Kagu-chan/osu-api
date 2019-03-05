import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandWronglyPostedCommand extends Command {
  public command: string = 'commandWronglyPosted';
  protected scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message, args: string[]): ComposedMessage[] {
    return [new ComposedMessage(
      this.bot.client,
      [message.channel],
      // tslint:disable-next-line max-line-length
      `The \`${args[0]}\` command is not ment to be excecuted here - use a ${message.isDm ? 'channel' : 'direct'} message instead`
    )];
  }
}
