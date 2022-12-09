const { MONTHLY } = require('./days');

const events = [
  {
    message: 'Pagar universidad.',
    repeats: {
      when: MONTHLY,
      options: {
        lastBusinessDay: false,
      },
    },
    at: {
      hours: 5,
      minutes: 0,
      seconds: 0,
    },
  },
];

module.exports = events;
