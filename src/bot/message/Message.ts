import { TextChannel } from "discord.js";

/**
 * @class Message
 */
export default class Message {
  /**
   * @var {boolean} isFromBot Is the message from the bot?
   */
  public isFromBot: boolean;

  /**
   * @var {boolean} isForBot Is the message directored to the bot?
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
}