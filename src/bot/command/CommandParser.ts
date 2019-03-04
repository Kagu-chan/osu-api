import Message from '../Message';
import Command from './Command';
import PingCommand from './PingCommand';

export default class CommandParser {
  public static parseCommand(message: Message): Command {
    const { content } = message;
    const [commandName, argumentsString] = this.headTail(content);
    const commandArguments = argumentsString
      ? this.parseArguments(argumentsString)
      : [];

    message.channel.send(commandArguments);
    return new PingCommand();
  }

  private static headTail(str: string): string[] {
    const pos = str.indexOf(' ');

    if (pos < 0) {
      return [str];
    }

    const head = str.substr(0, pos);
    const tail = str.substr(pos + 1);

    return [head, tail];
  }

  private static parseArguments(str: string): string[] {
    const args = [];

    // This regular expression finds quoted arguments, but skips \\" inside this strings
    const quotedArguments = str.match(/(?<!\\)"(((\\"|[^ "])+\s?)+)"/g);

    // auxiliary string where we perform transformations
    let argStr = str;

    // Reove and pre parse quoted arguments
    if (quotedArguments) {
      quotedArguments.forEach((arg) => {
        argStr = argStr.replace(arg, '');
        args.push(arg.replace(/(^")|("$)/g, ''));
      });
    }

    // Move left arguments splitted into arguments list
    argStr
      .trim()
      .split(/(?<!\\) +/g)
      .forEach((arg) => args.push(arg));

    // Sort the arguments to the original order and replace escaped characters
    // As well sort out empty strings
    return args
      .sort((argLeft, argRight) => {
        const leftPos = str.indexOf(argLeft);
        const rightPos = str.indexOf(argRight);

        return leftPos > rightPos ? 1 : -1;
      })
      .map((arg) => arg
        .replace(/\\(.)/g, '$1'))
      .filter((t) => t.length);
  }
}
