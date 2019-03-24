import * as https from 'https';
import * as _ from 'lodash';
import IAPIConfiguration from './interfaces/IAPIConfiguration';
import Logger from './Logger';

export default class API {
  private readonly configuation: IAPIConfiguration;

  constructor(configuration: IAPIConfiguration) {
    this.configuation = configuration;
  }

  public request(endpoint: string, args: object): Promise<string> {
    return new Promise((resolve, reject) => {
      const urlBuilder = [
        `${this.configuation.apiUrl}${endpoint}?k=${this.configuation.apiKey}`,
      ];

      _.forEach(args, (value, key) => {
        if (value !== undefined) {
          urlBuilder.push(`${key}=${value}`);
        }
      });

      const finalUrl = urlBuilder.join('&');

      https.get(finalUrl, (resp) => {
        let responseData = '';

        resp.on('data', (chunk) => {
          responseData += chunk;
        });
        resp.on('end', () => {
          resolve(responseData);
        });
      }).on('error', (data) => Logger.error('API failure', data));
    });
  }

  public responseToTextMessage(data: string): string[] {
    const msg = JSON.stringify(JSON.parse(data), undefined, 2);
    const chunks = this.generateChunks(msg);

    if (chunks.length > 20) {
      return ['Response is too big - try filtering the data'];
    }
    return chunks;
  }

  private generateChunks(msg): string[] {
    const lines = msg.split('\n');
    const chunks = [];

    let currentChunk = '';

    _.each(lines, (line) => {
      if (currentChunk.length + line.length < 1980) {
        currentChunk = `${currentChunk}${currentChunk.length ? '\n' : ''}${line}`;
      } else {
        chunks.push(currentChunk);
        currentChunk = line;
      }
    });
    chunks.push(currentChunk);

    return _.map(chunks, (chunk) => `\`\`\`json\n${chunk}\`\`\``);
  }
}
