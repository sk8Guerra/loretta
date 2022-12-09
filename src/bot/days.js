const SUNDAY = 0;
const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;
const SATURDAY = 6;

const WEEK_DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY];
const WEEKEND_DAYS = [SUNDAY, SATURDAY];
const ALL_DAYS = [SUNDAY, ...WEEK_DAYS, SATURDAY];

const MONTHLY = 'monthly';

module.exports = {
  MONTHLY,
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  WEEK_DAYS,
  WEEKEND_DAYS,
  ALL_DAYS,
};
