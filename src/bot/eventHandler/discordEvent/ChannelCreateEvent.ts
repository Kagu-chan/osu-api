import { TextChannel, GuildChannel } from "discord.js";
import DiscordEvent from "./DiscordEvent";
import Logger from "../../Logger";

export default class ChannelCreateEvent extends DiscordEvent {
  public eventName: string = 'channelCreate';

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