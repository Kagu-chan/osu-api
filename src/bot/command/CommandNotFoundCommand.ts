import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandNotFoundCommand extends Command {
  public command: string = 'commandNotFound';
  protected scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message) {
    console.log('command not found'); // tslint:disable-line no-console
  }
}
