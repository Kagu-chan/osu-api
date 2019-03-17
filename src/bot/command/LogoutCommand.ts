import ComposedMessage from '../ComposedMessage';
import Logger from '../Logger';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class LogoutCommand extends Command {
  public command: string = 'logout';
  public readonly scope: CommandScope = CommandScope.ONLY_DM | CommandScope.ONLY_OWNERS | CommandScope.SECRET_ON_ERROR;

  public async handle(message: Message): Promise<ComposedMessage[]> {
    const author = message.author;
    const { tag, id } = author;

    Logger.info(this.translationInterface.__('commands.logout.log', tag, id));

    await (new ComposedMessage(
      this.bot.client,
      [message.channel],
      'logout.user'
    )).send();

    try {
      await this.bot.client.logout();
      Logger.info(this.translationInterface.__('commands.logout.done', tag, id));

      process.exit();
    } catch (error) {
      await (new ComposedMessage(
        this.bot.client,
        [message.channel],
        'logout.fail'
      )).send();

      throw error;
    }

    return [];
  }
}
