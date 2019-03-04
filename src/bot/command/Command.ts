import { CommandScope } from '../Types';

export default abstract class Command {
  public abstract command: string;
  public abstract scope: CommandScope;
}
