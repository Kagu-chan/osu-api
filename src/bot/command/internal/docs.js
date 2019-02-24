// https://github.com/ppy/osu-api/wiki

module.exports = {
  command: 'docs',
  restricted: false,
  usage: 'Type `$$docs` to see the lin to osu!api documentation',
  action() {
    return 'https://github.com/ppy/osu-api/wiki';
  },
};
