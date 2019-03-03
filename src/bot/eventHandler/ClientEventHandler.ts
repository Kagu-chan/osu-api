import EventHandler from './EventHandler';
import Client from '../Client';
import Logger from '../Logger';

/**
 * @inheritdoc
 * @class ClientEventHandler
 */
export default class ClientEventHandler extends EventHandler {
  /**
   * @inheritdoc
   * @event DiscordJs/Client/login
   */
  public registerEvents() {
    const client = this.bot.client;

    client.on('beforeLogin', this.onBeforeLogin);
    client.on('login', this.onLogin);
    client.on('logout', this.onLogout);
    client.on('loginFailed', this.onLoginFailed.bind(this));
    client.on('loginLimitsExceed', this.onLoginLimitsExceed);
    client.on('ready', this.onReady);
  }

  /**
   * Log information about current login attempt
   *
   * @param {Client} sender event sender
   * @param {number} retryAttempt number of current login attempt
   */
  private onBeforeLogin(sender: Client, retryAttempt: number) {
    if (!retryAttempt) {
      Logger.info('Logging in...');
    } else {
      Logger.info(`Logging in... (retry: ${retryAttempt})`);
    }
  }

  /**
   * Log information about the login
   *
   * @param {Client} sender event sender
   */
  private onLogin(sender: Client) {
    const botUser = sender.getBotUser();
    Logger.info(`Logged in as ${botUser.tag}`);

    sender.notify('ready');
  }

  /**
   * Log ingormation about the logout
   */
  private onLogout() {
    Logger.info('Logged out');
  }

  /**
   * Handle failed login attempt
   *
   * @param {Client} sender event sender
   * @param {Error} error raised error
   * @param {number} retryAttempt current attempt
   * @param {number} attemptsToMade max attempts
   * @param {number} attemptTimeout timeout before next attempt
   */
  private async onLoginFailed(sender: Client, error: Error, retryAttempt: number, attemptsToMade: number, attemptTimeout: number) {
    Logger.error('Failed to login:', error);

    if (retryAttempt < attemptsToMade) {
      Logger.info(`Next login attempt will be made in ${attemptTimeout} seconds...`);

      await this.bot.wait(attemptTimeout * 1000);
      await sender.login(retryAttempt + 1);
    } else {
      sender.notify('loginLimitsExceed', error);
    }
  }

  /**
   * Handle too many login attempts
   *
   * @param {Client} sender event sender
   * @param {error} error raised error
   */
  private onLoginLimitsExceed(sender: Client, error: Error) {
    Logger.error('Login attempts limit exceed: ', error);
    process.exit(1);
  }

  /**
   * Handle ready state
   *
   * @param {Client} sender event sender
   */
  private onReady(sender: Client) {
    // Call `getRelevantDiscordChannels` once to cache its result
    sender.getRelevantDiscordChannels();

    Logger.info('Ready to handle events...');
  }
}