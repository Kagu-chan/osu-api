import ComposedMessage from '../ComposedMessage';
import Logger from '../Logger';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class LogoutCommand extends Command {
  public command: string = 'logout';
  protected scope: CommandScope = CommandScope.ONLY_DM | CommandScope.ONLY_OWNERS | CommandScope.SECRET_ON_ERROR;

  public async handle(message: Message): Promise<ComposedMessage[]> {
    const author = message.author;
    const { tag, id } = author;

    Logger.info(`**LOGGING OUT** (triggered by ${tag} (${id}))`);

    await (new ComposedMessage(this.bot.client, [message.channel], 'Logging out...')).send();

    try {
      await this.bot.client.logout();
      Logger.info('**LOGGED OUT**');

      process.exit();
    } catch (error) {
      await (new ComposedMessage(this.bot.client, [message.channel], 'Logout failed')).send();

      throw error;
    }

    return [];
  }
}
