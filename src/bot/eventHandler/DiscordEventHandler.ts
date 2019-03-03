import EventHandler from "./EventHandler";
import ChannelCreateEvent from "./discordEvent/ChannelCreateEvent";
import ChannelDeleteEvent from "./discordEvent/ChannelDeleteEvent";

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
  }
}