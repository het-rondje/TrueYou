const winston = require('winston');

const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `${info.timestamp} ${info.message}`,
    )
);

winston.loggers.add('customLogger', {
    format: logFormat,
    transports: [
        new winston.transports.File({
            filename: 'test.log'
        }),
        new winston.transports.Console({
            level: 'info',
        })
    ]
});

const logger = winston.loggers.get('customLogger');

logger.info('Testing');

module.exports = logger;