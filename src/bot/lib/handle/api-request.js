const _ = require('lodash');

const generateChunks = (msg) => {
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

  return _.map(chunks, chunk => `\`\`\`json\n${chunk}\`\`\``);
};

module.exports = (bot, channel, endPoint, data, ...args) => {
  bot.doSend(channel, 'Talking to API...')
    .then(() => bot.getApiResponse(endPoint, data, ...args))
    .then((response) => {
      const msg = JSON.stringify(JSON.parse(response), undefined, 2);
      const chunks = generateChunks(msg);

      if (chunks.length > 20) {
        return bot.doSend(channel, 'Response is too big - try filtering the data');
      }
      return bot.doSend(channel, chunks)
        .catch(() => { channel.send('Something went wrong processing the answer'); });
    })
    .catch(bot.logging.logError);

  return false;
};
