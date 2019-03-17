import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class HelpCommand extends Command {
  public command: string = 'help';
  public readonly scope: CommandScope = CommandScope.STANDARD;

  public async handle(message: Message, [command]): Promise<ComposedMessage[]> {
    let slug = 'usage.help';
    let commandObject: Command;

    if (command) {
      slug = 'commandNotFound';

      commandObject = this.bot.commandEventHandler.commands.get(command);

      if (commandObject) {
        if (await commandObject.beforeCommand(message)) {
          slug = `usage.${command}`;
        } else {
          return [];
        }
      }
    }

    return [new ComposedMessage(this.bot.client, [message.channel], slug, command)];
  }
}
