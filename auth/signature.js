/* eslint-disable new-cap */
// const crypto = require('crypto');
const NodeRSA = require('node-rsa');

module.exports = {

  // verifySignature(message, signature, key) {
  //   // Verify message
  //   const verifier = crypto.createVerify('RSA-SHA256');
  //   verifier.update(message, 'ascii');
  //   const publicKeyBuf = new Buffer.from(key, 'ascii');
  //   const signatureBuf = new Buffer.from(signature, 'hex');
  //   const result = verifier.verify(publicKeyBuf, signatureBuf);
  //   console.log(`Signature correct: ${result}`);
  //   return result;
  // },

  verifySignature(message, signature, key) {
    // Verifying signature
    const publicKey = new NodeRSA();
    publicKey.importKey(key);
    const result = publicKey.verify(Buffer.from(message), signature, 'hex', 'hex');
    console.log('Signature is: ', result);
  },

  // signSignature(message, key) {
  //   // Sign message
  //   const sign = crypto.createSign('RSA-SHA256');
  //   sign.update(message);
  //   const signature = sign.sign(key, 'hex');
  //   return signature;
  // },

  signSignature(message, key) {
    // Signing signature
    const privateKey = new NodeRSA();
    privateKey.importKey(key);
    const signature = privateKey.sign(Buffer.from(message), 'hex', 'hex');
    return signature;
  },

};
