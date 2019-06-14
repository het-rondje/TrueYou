const User = require('../models/user');
const signatureUtil = require('../auth/signature');

module.exports = async (req, res, next) => {
  // Get headers
  const { userId } = req.header;
  const { signature } = req.header;

  // Headers required
  if (!userId) return res.status(400).send('Provide user id');
  if (!signatureUtil) return res.status(400).send('Provide signature');

  // Check juser
  const user = await User.findById(userId);
  if (!user) res.status(401).send('Unauthorized');

  // Verify signature
  const validUser = signatureUtil.verifySignature(user, signature, user.publicKey);

  if (!validUser) res.status(401).send('Unauthorized');
  req.userId = userId; // User id accessible in routes
  return next();
};
