import { Message as DiscordMessage } from 'discord.js';
import CommandParser from '../../command/CommandParser';
import Message from '../../Message';
import DiscordEvent from './DiscordEvent';

/**
 * Represents a guild create event
 *
 * @inheritdoc
 * @event discord.js/Client/guildCreate
 */
export default class MessageEvent extends DiscordEvent {
  /**
   * @inheritdoc
   */
  public eventName: string = 'message';

  /**
   * Handle any discord message
   *
   * @inheritdoc
   * @param {DiscordMessage} discordMessage The message sent from discord
   */
  public handler: (discordMessage: DiscordMessage) => void = (discordMessage: DiscordMessage) => {
    const message: Message = Message.fromDiscordMessage(
      this.client,
      this.bot.getConfigurationValue('commandPrefix'),
      discordMessage
    );
    const dispatcher = this.bot.commandDispatcher;

    if (!message.isForBot || message.content.length === 0) {
      return;
    }

    const commandArray = CommandParser.parseCommand(message);
    const command = commandArray.shift();

    const capitalCommand = command.replace(/^(\w)/, (c) => c.toUpperCase());
    let event = `command${capitalCommand}`;

    if (!dispatcher.eventNames().includes(event)) {
      event = 'commandCommandNotFound';
      commandArray.unshift(command);
      message.isInitiatedInternal = true;
    }

    dispatcher.emit(event, message, commandArray);
  }
}
