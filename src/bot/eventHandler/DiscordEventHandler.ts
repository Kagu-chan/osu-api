import EventHandler from "./EventHandler";
import ChannelCreateEvent from "./discordEvent/ChannelCreateEvent";

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
  }
}