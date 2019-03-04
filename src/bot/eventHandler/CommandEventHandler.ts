import { Collection } from 'discord.js';
import Bot from '../Bot';
import Command from '../command/Command';
import PingCommand from '../command/PingCommand';
import Message from '../Message';
import EventHandler from './EventHandler';

export default class CommandEventHandler extends EventHandler {
  protected commands: Collection<string, Command>;

  constructor(bot: Bot) {
    super(bot);

    this.commands = new Collection<string, Command>();

    this.addCommand(PingCommand);
  }

  public registerEvents() {
    this.commands.forEach((command: Command, commandName: string) => {
      const capitalCommand = commandName.replace(/^(\w)/, (m) => m.toUpperCase());

      this.bot.commandDispatcher.on(`command${capitalCommand}`, (message: Message, commandArguments: string[]) => {
        if (command.beforeCommand(message)) {
          command.handle(message, commandArguments);
        }
      });
    }, this);
  }

  private addCommand<T extends Command>(type: { new (b: Bot): T; }) { // tslint:disable-line callable-types
    const command = new type(this.bot);

    this.commands.set(command.command, command);
  }
}
