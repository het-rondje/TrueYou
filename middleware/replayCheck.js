/* Middleware function to catch replay attacks
   Checks timestamp and verifies it using the signature provided
   The request needs:
   - UserId
   - Timestamp
   - TimeSignature
*/

const verifySignature = require('../auth/requestCheck');

module.exports = (req, res, next) => {
  // Get data
  const { UserId } = req.headers;
  const { Timestamp } = req.headers;
  const { TimeSignature } = req.headers;
  if (!UserId || !TimeSignature || !Timestamp) return res.status(400).send('Provide headers: UserId, TimeSignature, Timestamp');
  // Verify signature
  const validRequest = verifySignature(UserId, TimeSignature, Timestamp);
  if (!validRequest) return res.status(400).send('Unauthorized');
  return next();
};
