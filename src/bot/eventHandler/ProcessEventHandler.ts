import * as _ from 'lodash';
import EventHandler from './EventHandler';
import Logger from '../Logger';
import INodeError from '../interfaces/INodeError';

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
   * @param {Error | INodeError} error The thrown error
   * @see <@link https://nodejs.org/api/process.html#process_event_uncaughtexception>
   */
  private async onUncaughtException(error: Error | INodeError) {
    const { client } = this.bot;
    const {
      name,
      message,
      stack
    } = _.get(error, 'context.error', error);

    let user;
    let userMessage;

    Logger.error(
      `Caught unhandled exception: ${name}\n`,
      ` ${message}\n  ${stack}`
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
      } catch {
        // NOP - the error is already logged
      }
    }
  }
}