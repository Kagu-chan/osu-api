module.exports = {
  command: 'get-user',
  restricted: false,
  usage: '',
  action(bot, message, user, mode, type, event_days) {
    const endPoint = 'get_user';
    const args = {
      u: user,
      m: mode || undefined,
      type: type || undefined,
      event_days: event_days || undefined
    };

    if (!user) {
      return 'At least an user name or user id is required'
    }

    return bot.handleApiRequest(message.channel, endPoint, args);
  }
}