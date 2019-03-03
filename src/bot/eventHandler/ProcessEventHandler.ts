import EventHandler from './EventHandler';
import Logger from '../Logger';

/**
 * @inheritdoc
 * @class ProcessEventHandler
 */
export default class ProcessEventHandler extends EventHandler {
  /**
   * @inheritdoc
   * @event process/uncaughtException
   */
  public registerEvents() {
    process.on('uncaughtException', this.onUncaughtException.bind(this));
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

    Logger.error(
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
        Logger.error(err);
      }
    }
  }
}