import { Message as DiscordMessage, TextChannel, User, MessageMentions } from 'discord.js';
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

    instance.channel = channel as TextChannel;
    instance.author = author;
    instance.content = content;
    instance.isFromBot = botUser.id === author.id;
    instance.isFromAnyBot = author.bot;
    instance.isDm = channel.type === 'dm';
    instance.mentions = mentions;
    instance.isRelevantChannel = client.hasChannel(channel.id);

    /**
     * A message is directed to the bot under the following conditions:
     *  - The message does not come from any bot
     *  - The message is a direct message to the bot
     *  - The message is posted in a relevant channel and begins with the prefix
     */
    instance.isForBot = !instance.isFromAnyBot && (
      instance.isDm || (
        instance.isRelevantChannel
        && (
          discordMessage.content.startsWith(commandPrefix)
          || mentions.members.has(botUser.id)
        )
    ));

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
   * @constructor
   * @private
   */
  private constructor() {}
}
