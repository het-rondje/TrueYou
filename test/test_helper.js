const mongoose = require('mongoose');
const User = require('../models/user');

before((done) => {
  const dbUrl = 'mongodb://dbadmin:Yh6hXYRjqE8XU6@ds139167.mlab.com:39167/rondje_test';

  mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
      console.log(`Connected to ${dbUrl}`);
      // done();
      const filler = new User({ firstName: 'asdf', lastName: 'asdlfj' });

      filler.save()
        .then(() => {
          done();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(`Unable to conncect to ${dbUrl}`);
      console.log(err);
      process.exit(1);
    });
});

beforeEach((done) => {
  const { users } = mongoose.connection.collections;

  users.drop()
    .then(() => done())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
});
