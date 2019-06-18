/* eslint-disable new-cap */
const crypto = require('crypto');

module.exports = {
  verifySignature(message, signature, key) {
    // Verify message
    console.log("Message to decrypt: " + message)
    console.log("Signature: " + signature)
    console.log("Key: " + key)
    console.log("Expected signature: " + this.signSignature(message, '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWOG1b6Izjmfb/\nJqzJVYEBNl+hR++nfkU+rbfvk0R6+4FWAC0GEfq4eucUK0hTJkwn6jtJ26XLn43l\nrDEfNGntoWL6Z5JUKlN4vvWSRI9oHVBZ8ZICfCudXtMwJc9mPKUqQYHSN7IjJrku\nQU9czwjhNEIewlGzZkEzAHGy0tyqsUDvpzPiZSNkkDnNxVhJIexvjBmD3vdZesvo\nY/Pyv5sVkr4ua+0iOLlPaVuAMLw9rr2mQPQg5l2tA+6XswanCWBNW9caI6oXLIAN\nxt019KKx1RaUDfDUdztmcmu840MzlG2QM9JF24sOn90yaVDXHc32bJvx91sczGas\nFcb1DUhdAgMBAAECggEAUWfUw5i7OOAHvO99dUGzvi90FVeBZNgFuFi1s8uvsaG3\nzh4cSAzYPL7FmOV3tS+s13iUlorERxt47vyoRgvGV7M8iwwzfQ7O20FInPIwcLBq\nCcPiZxxZGlf3xEDJKtM0gjirnHr4OxpSAeH8mwPLAReruTV+xuRj8rqL4udoE8tQ\nqte9WXI5HPWrBKsk9slZMnY9LQv0UkeEJcScvMaJlXagL5SKR6lKCuakY/Z7emZq\nFX2yvBGz8kjAUvN+GpSaFVMCwM5rF/s5BXXtbJ0KoxmDUHsda1B6cBRwZfnvg0CI\n1rATydl1dZPvxQUEDfqATZNkhkKr+Bi3KwQV4HnRlQKBgQDq79ibQtDPvEKH24p5\n/9pCcl12BvCDm3pYvUBfstoeI5TxvjVjZoJqQ3Ez8XKoIKAqANiuHiGXTxOv7axf\nszgmtRStFUaRQXa/YGYha02j8Px8BYZbKjYSgkY/aulBw+zx3EYlTleZb4ZDwre9\ndk5NkPm0duHhE7EhTKZRKchljwKBgQCjsDX9UiUBlVNpUFFU7x/cPv9P4o8p+pEA\nH4zFsfjGUVjy9vy1HGJ8iy6s58PT2mG0pzuJogCYhdLfxSMukT85kQh1kddAeiYb\ncDHhhdMqUZuVSZ+GG0trN6MvQ/CUuGu/fpwcdtNCySoRUQnj6mlYN5PyLE+fr4+h\no9UW8bZ1UwKBgH/zwsfEmw8YnC973S5WrxtTSB2Y5/L1gavE3sOAGBUkEeGbU15g\nnRScyJGepXB13GUj8t7ZoDfVJIbDbgbtB97k7m7Z0IYZ3j+ak+UNmMp53Dj7lVIf\najWoZ/PwGTvtJiYPbtCwmzsAp2JOMV3pifnqxGSJ/rljzSuyoD5CAFd3AoGBAJs0\n0OyCwB4RNgbspkGvfvk6LqHTg8XdFTIVuEgX6Xg51+qA8LrV0DihTD+cfp1ZOz2t\nOBHXr1LvyTRuW16jUFzIPUolYAF+ELYBmvppBwHgYXKbXYwuQ0PFfJCrjemmOFxZ\ns7J1pPl1ftLukT8vnHWONVTyWQlj0QAGNV3NESGLAoGAfGZm5sriuYS1bX4Vod3B\nyciOIp2vF4G04bWhp+4uBJyf8YSXEBT3p4+BYOR4T70Z9wvK49N0L+SbQPpVNPXZ\nwhyG2+GOliKtrKa5CZk9eGl0zG6RhsAjjRZ5hoRk+1b2C6LgXSTTeGEkBAkKUKpy\nlE9+tT4/0tr7u9ywEZi1KdA=\n-----END PRIVATE KEY-----'))
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.update(message, 'ascii');
    const publicKeyBuf = new Buffer.from(key, 'ascii');
    const signatureBuf = new Buffer.from(signature, 'hex');
    const result = verifier.verify(publicKeyBuf, signatureBuf);
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
