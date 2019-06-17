const mongoose = require('mongoose');
const {
  logger, dbHost, dbPort, dbUser, dbDatabase, dbPassword,
} = require('./config');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);

const dbUrl = process.env.NODE_ENV === 'production'
  ? `mongodb://dbadmin:U1dI3QD34qRMXs@ds237337.mlab.com:37337/${dbDatabase}`
  : `mongodb://dbadmin:U1dI3QD34qRMXs@ds237337.mlab.com:37337/${dbDatabase}`;

mongoose.connect(dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection
  .once('open', () => logger.info(`Connected to Mongo on mongodb://dbadmin:U1dI3QD34qRMXs@ds237337.mlab.com:37337/${dbDatabase}`))
  .on('error', error => logger.error(error.toString()));

module.exports = connection;
