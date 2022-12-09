const {
  isSameDay,
  isNegative,
  isTimeUp,
  getRemainingMilliseconds,
  buildDate,
  buildNewSettings,
  generateUniqueId,
  isValidIndex,
} = require('./utils');

/**
 * Represents a discord bot.
 * @class
*/
class Bot {
  /**
   * First called when creating a new bot instance.
   * @constructor
   * @param {Object} client - New client instance of discord.
  */
  constructor(client = null) {
    this.client = client;
    this.intervals = [];
  }

  /**
   * Create events based on each element that is in  the events list.
   * @public
   * @param {Array<Object<event>>} events - Events to send at a specified time.
   * @param {string} event.message - Message that will be sent by the bot.
   * @param {Array<number>} event.days - Days on which the message will be sent.
   * @param {number} event.hours - Hour at which the message will be sent.
   * @param {number} event.minutes - Minute at which the message will be sent.
   * @param {number} event.seconds - Second at which the message will be sent.
   * @returns {Void}
  */
  createEvents(events) {
    events.forEach((config) => {
      config.days.forEach((day) => {
        const newConfig = buildNewSettings(config, generateUniqueId(), day);
        this.analizeAndSetTimer(newConfig, day);
      });
    });
  }

  /**
   * Process each event's config and based on the result, sends it to different function.
   * @private
   * @param {Object<config>} config - Each object of the events array.
   * @param {number} day - Days on which the message will be sent.
   * @returns {Void}
   */
  analizeAndSetTimer(config, day) {
    const currentDate = new Date();
    if (isSameDay(currentDate, day)) {
      if (isTimeUp(currentDate, config)) {
        this.setTimerPlusSevenDays(currentDate, config);
      } else {
        this.setTimerForToday(currentDate, config);
      }
    } else {
      this.setTimerForNextDay(currentDate, config, day);
    }
  }

  /**
   * Calculate the date to send and event today.
   * @private
   * @param {Date} currentDate - Today's date.
   * @param {Object<config>} config - Information about the event.
   * @returns {Void}
   */
  setTimerForToday(currentDate, config) {
    const futureDate = buildDate({
      day: currentDate.getDate(),
      ...config,
      currentDate,
    });
    this.setTimer({ config, futureDate, currentDate });
  }

  /**
   * Calculate the date to send and event tomorrow.
   * @private
   * @param {Date} currentDate - Today's date.
   * @param {Object<config>} config - Information about the event.
   * @param {number} day - Day on which the events are being set.
   * @returns {undefined}
   */
  setTimerForNextDay(currentDate, config, day) {
    const nextDay = day - currentDate.getDay();
    if (isNegative(nextDay)) {
      const futureDate = buildDate({
        day: currentDate.getDate() + (nextDay + 7),
        ...config,
        currentDate,
      });
      this.setTimer({ config, futureDate, currentDate });
      return;
    }

    const futureDate = buildDate({
      day: currentDate.getDate() + nextDay,
      ...config,
      currentDate,
    });
    this.setTimer({ config, futureDate, currentDate });
  }

  /**
   * Calculate the date to send and event next week.
   * @private
   * @param {Date} currentDate - Today's date.
   * @param {Object<config>} config - Information about the event.
   * @returns {Void}
   */
  setTimerPlusSevenDays(currentDate, config) {
    const futureDate = buildDate({
      day: currentDate.getDate() + 7,
      ...config,
      currentDate,
    });
    this.setTimer({ config, futureDate, currentDate });
  }

  /**
   * Set timer that will fire the send message func at a specified time.
   * @private
   * @param {Object} Object.config - Information about the event.
   * @param {Date} Object.futureDate - Date on which the event will be sent.
   * @param {Date} Object.currentDate - Day on which the events are being set.
   * @returns {Void}
   */
  setTimer({ config, futureDate, currentDate }) {
    const interval = setInterval(
      () => this.sendMessage(config),
      getRemainingMilliseconds(futureDate, currentDate),
    );
    this.intervals.push({ interval, config });
  }

  /**
   * Sends a message to a specific channel
   * @private
   * @param {Object} config - Information about the event.
   * @param {string} config.message - Actual message that will be sent.
   * @param {string} Object.id - Unique ID of the sent event.
   * @returns {Void}
   */
  sendMessage(config) {
    this.getChannel().send(config.message);
    this.afterSendMessage(config.id);
  }

  /**
   * Get the channel by ID and from the current discord client instance.
   * @private
   * @returns {Object<Channel>}
   */
  getChannel() {
    return this.client.channels.get(process.env.CHANNEL_ID);
  }

  /**
   * Executed after a event has been sent.
   * @param {string} intervalId - Used to remove the expired timer.
   * @private
   * @returns {Void}
   */
  afterSendMessage(intervalId) {
    const config = this.cleanExecutedInternal(intervalId);
    this.setTimerAgain(config);
  }

  /**
   * Create a new timer, after ir has expired.
   * @param {Boject} config - Information about the event.
   * @returns {Void}
   */
  setTimerAgain(config) {
    this.createEvents([config]);
  }

  /**
   * Clean expired timer and reset it again.
   * @param {string} intervalId - Used to remove the expired timer.
   * @returns {Object<config>} config object that represents and event.
   */
  cleanExecutedInternal(intervalId) {
    const index = this.intervals.findIndex((interval) => interval.config.id === intervalId);
    if (isValidIndex(index)) {
      const { interval, config } = this.intervals[index];
      clearInterval(interval);
      this.removeElement(index);
      return config;
    }

    return null;
  }

  /**
   * Removes an event.
   * @param {string} index - Index of an array
   * @returns {Void}
   */
  removeElement(index) {
    this.intervals.splice(1, index);
  }
}

module.exports = Bot;
