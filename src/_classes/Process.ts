import Bot from './Bot';

/**
 * Class to wrap the nodejs process
 *
 * This class is meant to handle with process wide events
 *
 * @class Process
 */
export default class Process {
  /**
   * @var {Bot} bot The bot instance
   */
  private bot: Bot;

  /**
   * @constructor
   * @param {Bot} bot The bot instance
   */
  constructor(bot: Bot) {
    this.bot = bot;
  }

  /**
   * Register specific events to the node process
   *
   * @event process/beforeExit
   * @event process/uncaughtException
   */
  public registerEvents() {
    process.on('beforeExit', this.onBeforeExit);
    process.on('uncaughtException', this.onUncaughtException);
  }

  /**
   * Logout before doing a graceful exit
   *
   * @param {number} statusCode The status code - if `0`, then it is a default sigterm or process queue empty
   * @see <@link https://nodejs.org/api/process.html#process_event_beforeexit>
   */
  private async onBeforeExit(statusCode: number) {
    if (statusCode === 0) {
      this.bot.logInfo('Logout...');
      await this.bot.client.logout();
    }
  }

  /**
   * Handle uncaught exceptions
   * @param {Error} error The thrown error
   * @ee <@link https://nodejs.org/api/process.html#process_event_uncaughtexception>
   */
  private async onUncaughtException(error: Error) {
    const { client } = this.bot;
    const {
      name,
      message,
      stack
    } = error;

    let user;
    let userMessage;

    this.bot.logError(
      'Caught unhandled exception:\n',
      `${name}\n${message}\n${stack}`
    );

    // If the client is already online, we want to inform the owner user
    if (client && client.isOnline()) {
      user = await this.bot.client.getOwner();

      // If the user is not found, cancel
      if (!user) {
        return;
      }

      // Compose user message with proper formatting
      userMessage = [
        'Caught unhandled exception:',
        '```',
        `Name:    ${name}`,
        `Message: ${message}`,
        `Stack:   ${stack}`,
        '```'
      ].join('\n');

      try {
        await this.bot.client.sendMessage([user], userMessage);
      } catch (err) {
        // Unable to send message to the owner user
        this.bot.logError(err);
      }
    }
  }
}