/**
 * NodeJS has so called internal types, where one of them is @type {NodeError}
 * This types are unfortunally not accessible to the outside, hence not accessible to type script
 *
 * @interface INodeError
 */
export default interface INodeError {
  /**
   * @var {string} code The error code string, e.g. `ER_UNHANDLED_EXCEPTION`
   */
  code: string;

  /**
   * @var {string} message The message
   */
  message: string;

  /**
   * @var {string} name The name
   */
  name: string;

  /**
   * @var {string} stack The call stack
   */
  stack: string;

  /**
   * @var {ErrorEvent} context The error context containing the actual error
   */
  context: ErrorEvent;
}
