import { CommandScope } from '../Types';
import Command from './Command';

export default class PingCommand extends Command {
  public command: 'ping';
  public scope: CommandScope.STANDARD;
}
