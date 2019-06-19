const request = require('supertest');
const assert = require('assert');
const NodeRSA = require('node-rsa');

const app = require('../server');
const User = require('../models/user');
const signature = require('../auth/signature');

describe('/api/users', () => {
  describe('GET', () => {
    it('Should respond with 200 for a valid request', (done) => {
      // Create user to use for authentication
      const key = new NodeRSA({ b: 512 });
      key.generateKeyPair();
      const publicKey = key.exportKey('pkcs8-public');
      const privateKey = key.exportKey('pkcs8-private');

      const randomString = 'randomstring';
      const encrypted = signature.signSignature(randomString, privateKey);

      const newUser = new User({
        firstName: 'test',
        lastName: 'name',
        publicKey,
        notPrivateKey: privateKey,
      });

      newUser.save()
        .then((response) => {
          // Send request with created user
          request(app)
            .get('/api/users')
            .set('userid', response._id)
            .set('signature', encrypted)
            .set('checkdata', randomString)
            .end((err, res) => {
              console.log(err);
              if (err) throw err;
              console.log(res.body);

              assert(res.body.size > 0);
              assert.equal(res.status, 200);
              done();
            });
        })
        .catch((err) => {
          console.log(err);
          process.exit(1);
        });
    });
  });
});
