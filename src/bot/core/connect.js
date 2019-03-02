function connect(bot, token, callback, retryCount = 0) {
  const { client, logging } = bot;

  logging.logInfo(`Login ...${retryCount > 0 ? ` (retry: ${retryCount})` : ''}`);
  return client.login(token)
    .then(() => callback(client))
    .catch((err) => {
      logging.logError('Connection issue: ', err);

      return new Promise((resolve, reject) => {
        if (retryCount >= 3) {
          reject(err);
        }
        logging.logInfo('Retry attempted in 30 seconds');
        setTimeout(() => {
          resolve(connect(bot, token, callback, retryCount + 1));
        }, 30000);
      });
    });
}

module.exports = connect;
