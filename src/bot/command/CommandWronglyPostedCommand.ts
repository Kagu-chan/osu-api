import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandWronglyPostedCommand extends Command {
  public command: string = 'commandWronglyPosted';
  protected scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message) {
     // tslint:disable-next-line no-console max-line-length
    console.log('command in wrong channel, use ' + (message.isDm ? 'channel' : 'dm') + ' instead');
  }
}
