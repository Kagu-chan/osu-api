import { version } from '../../../package.json';
import * as release from '../../../RELEASE.json';
import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class ReleaseCommand extends Command {
  public command: string = 'release';
  public readonly scope: CommandScope = CommandScope.ONLY_DM | CommandScope.ONLY_OWNERS | CommandScope.SECRET_ON_ERROR;

  public handle(message: Message): ComposedMessage[] {
    const currentVersionText = release[version];
    return [new ComposedMessage(
      this.bot.client,
      this.bot.client.getRelevantDiscordChannels().array(),
      'release',
      version,
      currentVersionText.join('\n')
    )];
  }
}
