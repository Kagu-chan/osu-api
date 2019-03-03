import { Bot } from "../classes";

/**
 * Event Handler base class
 *
 * @class EventHandler
 * @abstract
 */
export default abstract class EventHandler {
  /**
   * @var {Bot} bot The bot instance
   * @protected
   */
  protected bot: Bot;

  public constructor(bot: Bot) {
    this.bot = bot;
  }

  public abstract registerEvents(): void;
}