import { Message as DiscordMessage, User } from "discord.js";
import Message from "./Message";
import Bot from "../Bot";
import IMessageConfiguration from "../interfaces/IMessageConfiguration";

/**
 * Parser for discord messages
 *
 * @class MessageParser
 */
export default class MessageParser {
  /**
   * @var {Bot} bot The bot
   */
  private readonly bot: Bot;

  /**
   * @var {IMessageConfiguration} configuration The configuration
   */
  private readonly configuration: IMessageConfiguration;

  /**
   * @param {Bot} bot The bot
   * @param {IMessageConfiguration} configuration The configuration
   * @constructor
   */
  constructor(bot: Bot, configuration: IMessageConfiguration) {
    this.bot = bot;
    this.configuration = configuration;
  }

  /**
   * Parse a given discord message
   *
   * @param {DiscordMessage} discordMessage The discord message
   * @returns {Message}
   */
  public parse(discordMessage: DiscordMessage): Message {
    const parsedMessage = new Message();

    parsedMessage.isFromBot = this.isFromBot(discordMessage.author);
    return parsedMessage;
  }

  /**
   * Check whether a message comes from the bot or a user
   *
   * @param {User} user The message author
   * @returns {boolean}
   */
  private isFromBot(user: User): boolean {
    const botUser = this.bot.client.getBotUser();

    return botUser.id === user.id;
  }
}