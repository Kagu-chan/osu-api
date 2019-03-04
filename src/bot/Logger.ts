/**
 * @class Logger
 */
export default class Logger {
  /**
   * Log a message to the console and prefix with `INFO`
   *
   * @param {message: any[]} message The log message
   */
  public static info(...message: any) {
    Logger.log('INFO', ...message);
  }

  /**
   * Log a message to the console and prefix with `INFO`
   *
   * @param {message: any[]} message The log message
   */
  public static error(...message: any) {
    Logger.log('ERROR', ...message);
  }

  /**
   * Log a message to the console and prefix with given @see severity
   *
   * @param {string} severity The message severity
   * @param {message: any[]} message The log message
   */
  public static log(severity: string, ...message: any) {
    console.log(`[${severity}]`, ...message); // tslint:disable-line no-console
  }
}
