import { Message as DiscordMessage, MessageMentions, TextChannel, User } from 'discord.js';
import Client from './Client';

/**
 * @class Message
 */
export default class Message {
  /**
   * Factory for message object
   *
   * @param {Client} client The client
   * @param {DiscordMessage} discordMessage The discord message
   * @constructs Message
   */
  public static fromDiscordMessage(client: Client, commandPrefix: string, discordMessage: DiscordMessage): Message {
    const instance = new Message();
    const botUser: User = client.getBotUser();
    const {
      author, channel, content, mentions,
    } = discordMessage;

    const isPrefixed = discordMessage.content.startsWith(commandPrefix);
    const isMentioned = mentions.users.has(botUser.id);

    const mentionString = `<@${botUser.id}>`;

    instance.channel = channel as TextChannel;
    instance.author = author;
    instance.originalMessage = discordMessage;
    instance.isFromBot = botUser.id === author.id;
    instance.isFromAnyBot = author.bot;
    instance.isDm = channel.type === 'dm';
    instance.mentions = mentions;
    instance.isRelevantChannel = client.hasChannel(channel.id);

    /**
     * A message is directed to the bot under the following conditions:
     *  - The message does not come from any bot
     *  - The message is a direct message to the bot
     *  - The message is posted in a relevant channel and begins with the prefix or the bot is mentioned
     */
    instance.isForBot = !instance.isFromAnyBot && (
      instance.isDm || (
        instance.isRelevantChannel
        && (
          isPrefixed
          || isMentioned
        )
    ));

    // Calculate the string used for mentioning the bot in any way. Can be empty string
    instance.prefix = isPrefixed
      ? commandPrefix
      : (
        isMentioned
        ? mentionString
        : ''
      );

    instance.content = content.replace(instance.prefix, '').trim();

    return instance;
  }

  /**
   * @var {boolean} isFromBot Is the message from the bot?
   */
  public isFromBot: boolean;

  /**
   * @var {boolean} isFromAnyBot Is the message sent from any bot?
   */
  public isFromAnyBot: boolean;

  /**
   * @var {boolean} isForBot Is the message directed to the bot?
   */
  public isForBot: boolean;

  /**
   * @var {boolean} isDm Is the message a discord direct message?
   */
  public isDm: boolean;

  /**
   * @var {boolean} isRelevantChannel Is the message posted in a relevant channel?
   */
  public isRelevantChannel: boolean;

  /**
   * @var {boolean} prefix The prefix used in this message
   */
  public prefix: string;

  /**
   * @var {TextChannel} channel The channel the message was posted in
   */
  public channel: TextChannel;

  /**
   * @var {User} author The message author
   */
  public author: User;

  /**
   * @var {string} content The message content
   */
  public content: string;

  /**
   * @var {MessageMentions} mentions The message mentions
   */
  public mentions: MessageMentions;

  /**
   * @var {DiscordMessage} originalMessage The original message
   */
  public originalMessage: DiscordMessage;

  /**
   * @var {boolean} isInitiatedInternal Whether the message is initiated from the bot or not
   */
  public isInitiatedInternal: boolean = false;

  /**
   * @constructor
   * @private
   */
  private constructor() {}
}
