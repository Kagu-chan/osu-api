import { TextChannel, GuildChannel } from "discord.js";
import DiscordEvent from "./DiscordEvent";
import Logger from "../../Logger";

/**
 * Represents a channel create event
 *
 * @inheritdoc
 * @event discord.js/Client/channelCreate
 */
export default class ChannelCreateEvent extends DiscordEvent {
  /**
   * @inheritdoc
   */
  public eventName: string = 'channelCreate';

  /**
   * Validates a newly created channels against the configuration and adds it to the internal channel map
   *
   * @inheritdoc
   * @param {GuildChannel} channel The newly created channel
   */
  public handler: Function = (channel: GuildChannel) => {
    const {
      name: channelName,
      id: channelId,
      guild
    } = channel;
    const {
      name: guildName,
      id: guildId
    } = guild;

    if (this.client.isChannelRelevant(channel)) {
      this.client.attachChannel(channel as TextChannel);

      Logger.info(`Attached to new discord channel [${channelName} (${channelId})] on guild [${guildName} (${guildId})]`);
    }
  }
}