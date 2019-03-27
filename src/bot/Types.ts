/**
 * @type {CommandScope} The scope of a command
 */
export enum CommandScope {
  /**
   * @constant STANDARD standard scope - anyone can use this command
   * @yields {0000 0000}
   */
  STANDARD = 0,

  /**
   * @constant ONLY_OWNERS owner scope - only owners can use this command
   * @yields {0000 0001}
   */
  ONLY_OWNERS = 1 << 0,

  /**
   * @constant ONLY_DM direct message scope - this command works only in direct messages
   * @yields {0000 0010}
   */
  ONLY_DM = 1 << 1,

  /**
   * @constant ONLY_CHANNEL channel scope - this command works only in channels
   * @yields {0000 0100}
   */
  ONLY_CHANNEL = 1 << 2,

  /**
   * @constant ONLY_INTERNAL internal scope - this command cant be used directly
   * @yields {0000 1000}
   */
  ONLY_INTERNAL = 1 << 3,

  /**
   * @constant SECRET_ON_ERROR secret command - when used in wrong context,
   *                           the bot behaves like the command would not exist
   * @yields {0001 0000}
   */
  SECRET_ON_ERROR = 1 << 4,
}
