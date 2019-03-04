import { Message as DiscordMessage, TextChannel, User } from 'discord.js';
import Bot from '../Bot';
import IMessageConfiguration from '../interfaces/IMessageConfiguration';
import Message from './Message';

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

    this.setIsFromBot(parsedMessage, discordMessage.author);
    this.setIsFromAnyBot(parsedMessage, discordMessage.author);

    return parsedMessage;
  }

  /**
   * Check whether a message comes from the bot or a user
   *
   * @param {Message} message The message
   * @param {User} user The message author
   */
  private setIsFromBot(message: Message, user: User) {
    const botUser = this.bot.client.getBotUser();

    message.isFromBot = botUser.id === user.id;
  }

  /**
   * Check whether a message comes from any bot or not
   *
   * @param {Message} message The message
   * @param {User} user The message author
   */
  private setIsFromAnyBot(message: Message, user: User) {
    message.isFromAnyBot = user.bot;
  }
}
