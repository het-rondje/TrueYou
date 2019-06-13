/* eslint-disable new-cap */
module.exports = {
  verifySignature(message, signature, key) {
    // Verify message
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(message, 'ascii');
    const publicKeyBuf = new Buffer.from(key, 'ascii');
    const signatureBuf = new Buffer.from(signature, 'hex');
    const result = verifier.verify(publicKeyBuf, signatureBuf);
    // console.log('Signature correct: ' + result)
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
