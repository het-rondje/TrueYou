/*
    This module validates an incomming get requests
    It needs:
    - Headers
        - userId
        - signature
        - checkData
*/

const requestCheck = require('../auth/requestCheck');

module.exports = async (req, res, next) => {
  // Get data
  const { userId } = req.headers;
  const { signature } = req.headers;
  const { checkData } = req.headers;
  if (!userId || !signature || !checkData) return res.status(400).send('Provide userId, signature & checkData');
  // Verify
  const result = requestCheck(userId, signature, checkData);
  if (!result) return res.status(401).send('Unauthorized');
  return next();
};
