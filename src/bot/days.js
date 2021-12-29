const SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6;

const WEEK_DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY];
const WEEKEND_DAYS = [SUNDAY, SATURDAY];
const ALL_DAYS = [SUNDAY, ...WEEK_DAYS, SATURDAY];

module.exports = {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    WEEK_DAYS,
    WEEKEND_DAYS,
    ALL_DAYS
};