import { Guild, TextChannel } from 'discord.js';
import Logger from '../../Logger';
import DiscordEvent from './DiscordEvent';

/**
 * Represents a guild create event
 *
 * @inheritdoc
 * @event discord.js/Client/guildCreate
 */
export default class GuildCreateEvent extends DiscordEvent {
  /**
   * @inheritdoc
   */
  public eventName: string = 'guildCreate';

  /**
   * Fetch all channels from a newly joined guild
   *
   * @inheritdoc
   * @param {Guild} guild The newly created guild
   */
  public handler: (guild: Guild) => void = (guild: Guild) => {
    const channels = this.client.getRelevantGuildChannels(guild);

    this.client.attachChannels(channels);

    Logger.info(`Joined guild [${guild.name} (${guild.id})]`);
    channels.forEach((channel: TextChannel) => {
      // tslint:disable-next-line max-line-length
      Logger.info(`Attached channel from new guild [${channel.name} (${channel.id})] - guild is [${guild.name} (${guild.id})]`);
    });
  }
}
