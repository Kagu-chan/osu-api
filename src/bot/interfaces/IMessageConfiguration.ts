/**
 * @interface IMessageConfiguration
 */
export default interface IMessageConfiguration {
  /**
   * Prefix for bot commands - only required for non-dm-messages
   *
   * @var {string} commandPrefix The command prefix
   */
  commandPrefix: string;
}
