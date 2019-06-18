/* eslint-disable new-cap */
const crypto = require('crypto');

module.exports = {
  verifySignature(message, signature, key) {
    console.log('verify func called...')
    console.log('trying to validate user: ' + message + " with signature: " + signature + " with public key: " + key)

    // Verify message
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(message);
    const publicKeyBuf = new Buffer.from(key, 'ascii');
    const signatureBuf = new Buffer.from(signature, 'hex');
    console.log('trying to verify publickeybuf: ' + publicKeyBuf + ' with signaturebuf: ' + signatureBuf);
    const result = verifier.verify(publicKeyBuf, signatureBuf);
    //console.log(`Signature correct: ${result}`);

    //const result = verifier.verify(key, signature,'base64');
    console.log(`Signature correct: ${result}`);

    return result;
  },

  signSignature(message, key) {
    // Sign message
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(message);
    const signature = sign.sign(key, 'hex');
    return signature;
  },
};
