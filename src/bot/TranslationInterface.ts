import { __, configure, TranslateOptions } from 'i18n';
import * as en from '../../locales/en.json'; // tslint:disable-line useless import, but it will copy our translations

export default class TranslationInterface {
  constructor() {
    configure({
      locales: ['en'],
      directory: 'dist/locales',
      objectNotation: true,
    });
  }

  public __(passphraseOptions: string | TranslateOptions, ...replace: string[]): string {
    let translated;

    if (passphraseOptions) {
      translated = __(passphraseOptions, ...replace);
    } else {
      [translated] = replace;
    }
    return translated
      .replace(/(?<=(@@))([a-z]+)/gi, `${process.env.COMMAND_PREFIX}$&`)
      .replace(/@@/g, '');
  }
}
