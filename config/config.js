//
// Application configuration
//
// Set the logging level.
const Logger = require('tracer');

const loglevel = process.env.LOGLEVEL || 'trace';

module.exports = {

  webPort: process.env.PORT || 400,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '',
  dbUser: process.env.DB_USER || 'dev',
  dbPassword: process.env.DB_PASSWORD || 'studitpassword',
  dbDatabase: process.env.DB_DATABASE || 'rondje',
  dbTestDatabase: process.env.DB_TESTDATABASE || 'rondje_test',

  logger: Logger
    .console({
      format: [
        '{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}',
      ],
      preprocess(data) {
        // eslint-disable-next-line no-param-reassign
        data.title = data.title.toUpperCase();
      },
      dateformat: 'isoUtcDateTime',
      level: loglevel,
    }),
};
