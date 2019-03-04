import EventHandler from "./EventHandler";
import ChannelCreateEvent from "./discordEvent/ChannelCreateEvent";
import ChannelDeleteEvent from "./discordEvent/ChannelDeleteEvent";
import ChannelUpdateEvent from "./discordEvent/ChannelUpdateEvent";
import GuildCreateEvent from "./discordEvent/GuildCreateEvent";
import GuildDeleteEvent from "./discordEvent/GuildDeleteEvent";

/**
 * @inheritdoc
 * @class DiscordEventHandler
 */
export default class DiscordEventHandler extends EventHandler {
  /**
   * @inheritdoc
   * @event discord.js/Client/channelCreate
   */
  public registerEvents() {
    this.bot.client.attachEvent(ChannelCreateEvent);
    this.bot.client.attachEvent(ChannelDeleteEvent);
    this.bot.client.attachEvent(ChannelUpdateEvent);

    this.bot.client.attachEvent(GuildCreateEvent);
    this.bot.client.attachEvent(GuildDeleteEvent);
  }
}