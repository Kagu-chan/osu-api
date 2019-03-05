import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class PingCommand extends Command {
  public command: string = 'ping';
  protected scope: CommandScope = CommandScope.ONLY_DM | CommandScope.SECRET_ON_ERROR;

  public handle(message: Message) {
    console.log('pong'); // tslint:disable-line no-console
  }
}
