const winston = require('winston');
require('winston-mongodb');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    info => `${info.timestamp} ${info.message}`,
  ),
);

const dbOptions = {
  db: 'mongodb://dbadmin:U1dI3QD34qRMXs@ds237337.mlab.com:37337/rondje',
};

winston.loggers.add('customLogger', {
  format: logFormat,
  transports: [
    new winston.transports.MongoDB(dbOptions),
    new winston.transports.Console({
      level: 'info',
    }),
  ],
});

const logger = winston.loggers.get('customLogger');

module.exports = logger;
