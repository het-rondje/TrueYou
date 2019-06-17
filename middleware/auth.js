/* This module is used as a middleware function in express routes,
    it validates the users authenticity
    Requests need to have:
    - Headers
      - UserId
      - Signature (contains UserId)
*/

const requestCheck = require('../auth/requestCheck');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  // Get headers
  const { userid } = req.header;
  const { signature } = req.header;

  // Headers required
  if (!userid) return res.status(400).send('Provide user id');
  if (!signature) return res.status(400).send('Provide signature');

  // Check user
  const user = await User.findById(userid);
  if (!user) res.status(401).send('Unauthorized');

  // Verify signature
  const validUser = await requestCheck(userid, signature, user.publicKey);

  if (!validUser) res.status(401).send('Unauthorized');
  req.userId = userid; // User id accessible in routes
  return next();
};
