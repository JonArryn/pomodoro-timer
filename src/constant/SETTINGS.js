const SETTINGS = {
  FOCUS: 'focus',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
  LONG_BREAK_INTERVAL: 'longBreakInterval',
};

const DEFAULT_VALUES = {
  [SETTINGS.FOCUS]: 25,
  [SETTINGS.SHORT_BREAK]: 5,
  [SETTINGS.LONG_BREAK]: 15,
  [SETTINGS.LONG_BREAK_INTERVAL]: 4,
};
export { SETTINGS as default, DEFAULT_VALUES };
