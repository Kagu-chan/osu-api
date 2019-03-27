import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class MaintenanceCommand extends Command {
  public command: string = 'maintenance';
  public readonly scope: CommandScope = CommandScope.ONLY_DM | CommandScope.ONLY_OWNERS | CommandScope.SECRET_ON_ERROR;

  public handle(message: Message): ComposedMessage[] {
    const { bot } = this;

    bot.client.setPresence(this.translationInterface.__('presence.maintenance'));
    setTimeout(() => {
      bot.client.setPresence();
    }, 1000 * 60 * 10); // ten minutes, then revert

    return [new ComposedMessage(
      bot.client,
      bot.client.getRelevantDiscordChannels().array(),
      'maintenance'
    )];
  }
}
