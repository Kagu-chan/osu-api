import { TextChannel, GuildChannel } from "discord.js";
import DiscordEvent from "./DiscordEvent";
import Logger from "../../Logger";

/**
 * Represents a channel delete event
 *
 * @inheritdoc
 * @event discord.js/Client/channelDelete
 */
export default class ChannelDeleteEvent extends DiscordEvent {
  /**
   * @inheritdoc
   */
  public eventName: string = 'channelDelete';

  /**
   * Remove a channel if its registered
   *
   * @inheritdoc
   * @param {GuildChannel} channel The removed channel
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

    if (this.client.hasChannel(channel.id)) {
      this.client.detachChannel(channel as TextChannel);

      Logger.info(`Detached removed discord channel [${channelName} (${channelId})] on guild [${guildName} (${guildId})]`);
    }
  }
}