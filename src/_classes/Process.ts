import Bot from './Bot';

export default class Process {
  /**
   * Register specific events to the node process
   *
   * @param {Bot} bot The bot instance
   * @event process/beforeExit
   * @event process/uncaughtException
   */
  public registerEvents(bot: Bot) {
    process.on('beforeExit', this.onBeforeExit.bind(this, bot));
  }

  /**
   * 
   * @param bot 
   * @param statusCode 
   */
  private async onBeforeExit(bot: Bot, statusCode: number) {
    if (statusCode === 0) {
      bot.logInfo('Logout...');
      await bot.client.logout();
    }
  }
}