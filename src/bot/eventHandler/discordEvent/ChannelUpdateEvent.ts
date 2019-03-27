import { GuildChannel, TextChannel } from 'discord.js';
import Logger from '../../Logger';
import DiscordEvent from './DiscordEvent';

/**
 * Represents a channel delete event
 *
 * @inheritdoc
 * @event discord.js/Client/channelUpdate
 */
export default class ChannelUpdateEvent extends DiscordEvent {
  /**
   * @inheritdoc
   */
  public eventName: string = 'channelUpdate';

  /**
   * Handle a channel update
   *
   * @inheritdoc
   * @param {GuildChannel} oldChannel The old channel
   * @param {GuildChannel} newChannel The new channel
   */
  public handler: (oldChannel: GuildChannel, newChannel: GuildChannel) => void
    = (oldChannel: GuildChannel, newChannel: GuildChannel) => {
    const oldChannelName = oldChannel.name;
    const {
      name: newChannelName,
      id: channelId,
      guild,
    } = newChannel;
    const {
      name: guildName,
      id: guildId,
    } = guild;

    const isAlreadyRelevant = this.client.hasChannel(oldChannel.id);
    const isRelevant = this.client.isChannelRelevant(newChannel);

    if (isAlreadyRelevant && isRelevant) {
      // channel stays relevant
      this.client.attachChannel(newChannel as TextChannel);

      if (oldChannelName === newChannelName) {
        // tslint:disable-next-line max-line-length
        Logger.info(`Replaced updated discord channel [${newChannelName} (${channelId})] on guild [${guildName} (${guildId})]`);
      } else {
        // tslint:disable-next-line max-line-length
        Logger.info(`Replaced renamed discord channel [${oldChannelName} => ${newChannelName} (${channelId})] on guild [${guildName} (${guildId})]`);
      }
    } else if (isAlreadyRelevant) {
      // channel is no longer relevant
      this.client.detachChannel(oldChannel as TextChannel);

      // tslint:disable-next-line max-line-length
      Logger.info(`Detached updated discord channel [${oldChannelName} => ${newChannelName} (${channelId})] on guild [${guildName} (${guildId})]`);
    } else {
      // channel becomes relevant
      this.client.attachChannel(newChannel as TextChannel);

      // tslint:disable-next-line max-line-length
      Logger.info(`Attached to updated discord channel [${oldChannelName} => ${newChannelName} (${channelId})] on guild [${guildName} (${guildId})]`);
    }
  }
}
