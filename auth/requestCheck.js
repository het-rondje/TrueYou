const signature = require('./signature');
const User = require('../models/user');

/*
    This is a helper module to validate data & users, given the signature
*/
module.exports = async (userId, sig, data) => {
  // Get user
  const user = await User.findById(userId);
  if (!user) return false;
  // Validate signature
  const result = await signature.verifySignature(JSON.stringify(data), sig, user.publicKey);
  return result;
};
