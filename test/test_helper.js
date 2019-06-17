const config = require('config');
const mongoose = require('mongoose');

before((done) => {
  const dbUrl = config.get('dbUrl');

  mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
      console.log(`Connected to ${dbUrl}`);
      return done();
    })
    .catch(() => {
      console.log(`Can't connect to ${dbUrl}`);
      process.exit(1);
    });
});

beforeEach((done) => {
  const { users, streams } = mongoose.connection.collections;

  Promise.all([users.drop(), streams.drop()])
    .then(() => done())
    .catch(() => {
      process.exit(1);
    });
});
