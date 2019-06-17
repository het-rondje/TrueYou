/* Middleware function to catch replay attacks
   Checks timestamp and verifies it using the signature provided
   The request needs:
   - UserId
   - Timestamp
   - TimeSignature
*/

const verifySignature = require('../auth/requestCheck');

const userTimestamps = new Map();

module.exports = (req, res, next) => {
  console.log('Start');
  // Get data
  const { userid, timestamp, timesignature } = req.headers;
  if (!userid || !timesignature || !timestamp) return res.status(400).send('Provide headers: UserId, TimeSignature, Timestamp');
  // Verify signature
  const validRequest = verifySignature(userid, timesignature, timestamp);
  if (!validRequest) return res.status(400).send('Unauthorized');
  // Check if request is relplayed & store new last timestamp with user
  const requestTimestamp = new Date(parseInt(timestamp, 10) * 1000.0);
  const lastTimestamp = userTimestamps.get(userid);
  if (!lastTimestamp) {
    userTimestamps.set(userid, requestTimestamp);
  } else if (requestTimestamp <= +lastTimestamp) {
    return res.status(401).send('Unauthorized');
  } else {
    userTimestamps.set(userid, requestTimestamp);
  }
  // Request valid -> proceed
  return next();
};
