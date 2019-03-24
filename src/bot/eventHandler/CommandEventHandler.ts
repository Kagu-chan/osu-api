import { Collection } from 'discord.js';
import Bot from '../Bot';
import ChannelsCommand from '../command/ChannelsCommand';
import Command from '../command/Command';
import CommandNotFoundCommand from '../command/CommandNotFoundCommand';
import CommandNotPermittedCommand from '../command/CommandNotPermittedCommand';
import CommandsCommand from '../command/CommandsCommand';
import CommandWronglyPostedCommand from '../command/CommandWronglyPostedCommand';
import DocsCommand from '../command/DocsCommand';
import GetUserCommand from '../command/GetUserCommand';
import HelpCommand from '../command/HelpCommand';
import LogoutCommand from '../command/LogoutCommand';
import MaintenanceCommand from '../command/MaintenanceCommand';
import ModsCommand from '../command/ModsCommand';
import PingCommand from '../command/PingCommand';
import ReleaseCommand from '../command/ReleaseCommand';
import Logger from '../Logger';
import Message from '../Message';
import EventHandler from './EventHandler';

export default class CommandEventHandler extends EventHandler {
  public commands: Collection<string, Command>;

  constructor(bot: Bot) {
    super(bot);

    this.commands = new Collection<string, Command>();

    this.addCommand(ChannelsCommand);
    this.addCommand(CommandNotFoundCommand);
    this.addCommand(CommandNotPermittedCommand);
    this.addCommand(CommandsCommand);
    this.addCommand(CommandWronglyPostedCommand);
    this.addCommand(DocsCommand);
    this.addCommand(GetUserCommand);
    this.addCommand(HelpCommand);
    this.addCommand(LogoutCommand);
    this.addCommand(MaintenanceCommand);
    this.addCommand(ModsCommand);
    this.addCommand(PingCommand);
    this.addCommand(ReleaseCommand);
  }

  public registerEvents() {
    this.commands.forEach((command: Command, commandName: string) => {
      const capitalCommand = commandName.replace(/^(\w)/, (m) => m.toUpperCase());

      Logger.info(`Attached to command event [${commandName}] as [command${capitalCommand}]`);
      this.bot.commandDispatcher.on(
        `command${capitalCommand}`,
          async (message: Message, commandArguments: string[]) => {
          if (await command.beforeCommand(message)) {
            const answers = await command.handle(message, commandArguments);

            await Promise.all(answers.map((a) => a.send()));
          }
        });
    }, this);
  }

  private addCommand<T extends Command>(type: { new (b: Bot): T; }) { // tslint:disable-line callable-types
    const command = new type(this.bot);

    this.commands.set(command.command, command);
  }
}
