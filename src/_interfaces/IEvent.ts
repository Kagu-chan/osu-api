export default interface IEvent {
  name: string;
  handler(): boolean;
};
