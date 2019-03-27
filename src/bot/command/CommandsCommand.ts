import ComposedMessage from '../ComposedMessage';
import Message from '../Message';
import { CommandScope } from '../Types';
import Command from './Command';

export default class CommandsCommand extends Command {
  public command: string = 'commands';
  public readonly scope: CommandScope = CommandScope.STANDARD;

  public async handle(message: Message): Promise<ComposedMessage[]> {
    const self = this;
    const isAdministrator = this.bot.client.isAdministrator(message.author);
    const checkScope = message.isDm ? CommandScope.ONLY_DM : CommandScope.ONLY_CHANNEL;

    const commands = this.bot.commandEventHandler.commands;
    const commandsMessage = [
      this.translationInterface.__('commands.commands.header'),
    ];
    const availableCommands = [];
    let commandLength = 0;

    const pushCommand = (command: string) => {
      availableCommands.push(command);

      if (commandLength < command.length) {
        commandLength = command.length;
      }
    };

    commands.forEach((command: Command, commandName: string) => {
      // Check if the command is a standard command
      if (command.scope === CommandScope.STANDARD) {
        return pushCommand(commandName);
      }

      // Check if the command is internal
      if (command.scope & CommandScope.ONLY_INTERNAL) {
        return;
      }

      // Check if the command is a command for owners or not
      if (command.scope & CommandScope.ONLY_OWNERS && !isAdministrator) {
        return;
      }

      if (command.scope & checkScope) {
        return pushCommand(commandName);
      }
    });

    availableCommands.forEach((cmd: string) => {
      const missingCharacters = commandLength - cmd.length;
      const translation = self.translationInterface.__(`commands.description.${cmd}`);

      commandsMessage.push(`${cmd}${' '.repeat(missingCharacters)} => ${translation}\n`);
    });

    commandsMessage.push(this.translationInterface.__('commands.commands.footer'));

    return [new ComposedMessage(this.bot.client, [message.channel], 'empty', commandsMessage.join(''))];
  }
}
