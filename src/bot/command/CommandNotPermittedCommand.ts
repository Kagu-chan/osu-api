import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandNotPermittedCommand extends Command {
  public command: string = 'commandNotPermitted';
  protected scope: CommandScope = CommandScope.ONLY_INTERNAL;

  public handle(message: Message) {
    console.log('command not permitted'); // tslint:disable-line no-console
  }
}
