const request = require('supertest');
const assert = require('assert');

const app = require('../server');

describe('/api/users', () => {
  describe('GET', () => {
    it('Should respond with 200 for a valid request', (done) => {
      request(app)
        .get('/api/users')
        .set('userid', 'vMMvWeMtf')
        .set('signature', 'aasdlfjasdfljaldskfjalsdfjlkjad')
        .set('checkData', 'asdlfkjasdflkjf')
        .end((err, res) => {
          console.log(err);
          if (err) throw err;

          assert(res.status, 200);
          done();
        });
    });
  });
});
