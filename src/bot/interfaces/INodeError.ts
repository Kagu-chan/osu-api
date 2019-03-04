/**
 * NodeJS has so called internal types, where one of them is @type {NodeError}
 * This types are unfortunally not accessible to the outside, hence not accessible to type script
 *
 * @interface INodeError
 */
export default interface INodeError {
  code: string,
  message: string,
  name: string,
  stack: string,
  context: ErrorEvent,
}