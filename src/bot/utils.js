const uniqid = require('uniqid');

const monthDay = (date) => date.getDate();

const buildDate = ({ day, hours, minutes, currentDate }) =>
  new Date(currentDate.getFullYear(), currentDate.getMonth(), day, hours, minutes, 0);

const buildNewSettings = (config, index, day) => ({ ...config, days: [day], id: index });

const generateUniqueId = () => uniqid();

const isNegative = (number) => Math.sign(number) === -1;

const getRemainingMilliseconds = (next, today) => next - today;

const isMinuteUp = (date, config) => date.getMinutes() > config.minutes;
const isSameMinute = (date, config) => date.getMinutes() === config.minutes;

const isHourUp = (date, config) => date.getHours() > config.hours;
const isSameHour = (date, config) => date.getHours() === config.hours;

const isTimeUp = (date, config) => {
  if (isHourUp(date, config)) return true;
  if (isSameHour(date, config)) {
    if (isMinuteUp(date, config)) return true
    if (isSameMinute(date, config)) return true;
    return false;
  }
  return false;
};

const isSameDay = (date, day) => date.getDay() === day;

const isValidIndex = (index) => index !== -1;

module.exports = {
  isSameDay,
  isTimeUp,
  getRemainingMilliseconds,
  isNegative,
  buildDate,
  buildNewSettings,
  generateUniqueId,
  isValidIndex
};
