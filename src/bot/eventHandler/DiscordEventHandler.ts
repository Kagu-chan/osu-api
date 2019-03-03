import EventHandler from "./EventHandler";
import ChannelCreateEvent from "./discordEvent/ChannelCreateEvent";
import ChannelDeleteEvent from "./discordEvent/ChannelDeleteEvent";
import ChannelUpdateEvent from "./discordEvent/ChannelUpdateEvent";

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
  }
}