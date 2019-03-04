import { Guild, GuildChannel, Snowflake, TextChannel } from 'discord.js';
import Logger from '../../Logger';
import DiscordEvent from './DiscordEvent';

/**
 * Represents a guild delete event
 *
 * @inheritdoc
 * @event discord.js/Client/guildDelete
 */
export default class GuildDeleteEvent extends DiscordEvent {
  /**
   * @inheritdoc
   */
  public eventName: string = 'guildDelete';

  /**
   * Remove all channels from a removed guild
   *
   * @inheritdoc
   * @param {Guild} guild The deleted guild
   */
  public handler: (guild: Guild) => void = (guild: Guild) => {
    const guildChannels = guild.channels;
    const removedChannels: GuildChannel[] = [];

    guildChannels.forEach((channel: GuildChannel, channelId: Snowflake) => {
      if (this.client.hasChannel(channelId)) {
        this.client.detachChannel(channel as TextChannel);

        removedChannels.push(channel);
      }
    }, this);

    Logger.info(`Removed guild [${guild.name} (${guild.id})]`);
    removedChannels.forEach((channel: GuildChannel) => {
      // tslint:disable-next-line max-line-length
      Logger.info(`Detached channel from removed guild [${channel.name} (${channel.id})] - guild was [${guild.name} (${guild.id})]`);
    });
  }
}
