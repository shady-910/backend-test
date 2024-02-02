const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, printf, errors,
} = format;

const logMessage = printf(({
  stack, timestamp: logTimestamp, level, message,
}) => {
  // for error log, print out the full stack
  if (stack) {
    return `${logTimestamp} ${stack}`;
  }
  // any other log
  return `${logTimestamp} ${level}: ${message}`;
});

const customFormat = combine(
  errors({ stack: true }),
  timestamp({
    format: 'MM-DD-YYYY HH:mm:ss',
  }),
  logMessage,
  format.splat(),
);

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `info.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'info.log' }),
  ],
  silent: process.env.NODE_ENV === 'test',
});

// If we're not in production then log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: customFormat,
  }));
}

module.exports = logger;
