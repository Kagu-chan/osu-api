import Bot from "../Bot";

/**
 * Event Handler class
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

  /**
   * Register specific events directed to the type of this event handler
   */
  public abstract registerEvents(): void;
}