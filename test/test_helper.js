const mongoDb = require('../config/mongo.db');

beforeEach((done) => {
  const { users, messages } = mongoDb.collections;

  Promise.all([users.drop(), messages.drop()])
    .then(() => done())
    .catch(() => {
      process.exit(1);
    });
});
