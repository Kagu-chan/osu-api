import { Message as DiscordMessage } from 'discord.js';
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
   * @param {Guild} guild The deleted guild
   */
  public handler: (discordMessage: DiscordMessage) => void = (discordMessage: DiscordMessage) => {
    const message: Message = Message.fromDiscordMessage(
      this.client,
      this.bot.getConfigurationValue('commandPrefix'),
      discordMessage
    );

    if (!message.isForBot) {
      return;
    }

    message.channel.send(message.content);
  }
}
