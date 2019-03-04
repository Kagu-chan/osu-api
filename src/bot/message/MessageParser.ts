import { Message as DiscordMessage } from "discord.js";
import Message from "./Message";

export default class MessageParser {
  public parse(discordMessage: DiscordMessage): Message {
    return new Message();
  }
}