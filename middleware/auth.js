/*
  This module is used as a middleware function in express routes, it validates the users authenticity
  Requests need to have:
  - Headers
    - userId
    - signature (contains userId)
*/

const requestCheck = require('../auth/requestCheck')

module.exports = async (req, res, next) => {
  // Get headers
  const { userId } = req.header;
  const { signature } = req.header;

  // Headers required
  if (!userId) return res.status(400).send('Provide user id');
  if (!signature) return res.status(400).send('Provide signature');

  // Check user
  const user = await User.findById(userId);
  if (!user) res.status(401).send('Unauthorized');

  // Verify signature
  const validUser = requestCheck(userId, signature, user.publicKey);

  if (!validUser) res.status(401).send('Unauthorized');
  req.userId = userId; // User id accessible in routes
  return next();
};
