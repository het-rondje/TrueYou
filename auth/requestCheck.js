const signatureUtil = require('./signature');
const User = require('../models/user');

/*
    This is a helper module to validate data & users, given the signature
*/
module.exports = async (userId, signature, data) => {
  // Get user
  const user = await User.findById(userId);
  if (!user) return false;

  console.log('Message:\n', data);
  console.log('Signature: \n', signature);
  console.log(user.publicKey);

  // Validate signature
  let result = false;
  result = await signatureUtil.verifySignature(data, signature, user.publicKey);

  console.log();

  // Generate self for test
  console.log('Message:\n', data);
  console.log('Signature from server\n', signature);
  let selfSignature = await signatureUtil.signSignature(data, user.notPrivateKey);
  console.log('Signature self generated:\n', selfSignature);
  console.log(user.notPrivateKey);

  console.log();

  // Second self test (different than 1st?)
  console.log('Message:\n', data);
  console.log('Signature from server\n', signature);
  selfSignature = await signatureUtil.signSignature(data, user.notPrivateKey);
  console.log('Signature self generated:\n', selfSignature);
  console.log(user.notPrivateKey);

  return result;
};
