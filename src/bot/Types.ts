/**
 * @type {CommandScope} The scope of a command
 */
export enum CommandScope {
  /**
   * @constant STANDARD standard scope - anyone can use this command
   */
  STANDARD = 0,

  /**
   * @constant ONLY_OWNERS owner scope - only owners can use this command
   */
  ONLY_OWNERS = 1,

  /**
   * @constant ONLY_DM direct message scope - this command works only in direct messages
   */
  ONLY_DM = 2,

  /**
   * @constant ONLY_CHANNEL channel scope - this command works only in channels
   */
  ONLY_CHANNEL = 4,

  /**
   * @constant ONLY_INTERNAL internal scope - this command cant be used directly
   */
  ONLY_INTERNAL = 8,

  /**
   * @constant SECRET_ON_ERROR secret command - when used in wrong context,
   *                           the bot behaves like the command would not exist
   */
  SECRET_ON_ERROR = 16,
}
