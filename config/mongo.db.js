const mongoose = require('mongoose');
const { logger, dbDatabase, dbTestDatabase } = require('./config');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.set('useFindAndModify', false);
let dbUrl;

// Check environment to choose a database
if (process.env.NODE_ENV === 'production') {
  dbUrl = `mongodb://dbadmin:U1dI3QD34qRMXs@ds237337.mlab.com:37337/${dbDatabase}`;
} else {
  // For all other cases use test database
  dbUrl = `mongodb://dbadmin:Yh6hXYRjqE8XU6@ds139167.mlab.com:39167/${dbTestDatabase}`;
}

mongoose.connect(dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection
  .once('open', () => logger.info(`Connected to Mongo on ${dbUrl}`))
  .on('error', error => logger.error(error.toString()));

module.exports = connection;
