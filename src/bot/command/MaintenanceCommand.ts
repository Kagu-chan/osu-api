import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class MaintenanceCommand extends Command {
  public command: string = 'maintenance';
  public readonly scope: CommandScope = CommandScope.ONLY_DM | CommandScope.ONLY_OWNERS | CommandScope.SECRET_ON_ERROR;

  public handle(message: Message): ComposedMessage[] {
    return [new ComposedMessage(
      this.bot.client,
      this.bot.client.getRelevantDiscordChannels().array(),
      'maintenance'
    )];
  }
}
