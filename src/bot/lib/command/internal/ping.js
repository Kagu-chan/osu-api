module.exports = {
  command: 'ping',
  restricted: false,
  usage: 'Type `$$ping` to get a pong',
  action() {
    return 'pong';
  },
};
