import EventHandler from "./EventHandler";
import ChannelCreateEvent from "./discordEvent/ChannelCreateEvent";

export default class DiscordEventHandler extends EventHandler {
  public registerEvents() {
    this.bot.client.attachEvent(ChannelCreateEvent);
  }
}