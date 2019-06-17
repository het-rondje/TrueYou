/*
    This module validates an incomming get requests
    It needs:
    - Headers
        - UserId
        - Signature (contains checkData)
        - CheckData
*/

const requestCheck = require('../auth/requestCheck');

module.exports = async (req, res, next) => {
  // Get data
  const { UserId } = req.headers;
  const { Signature } = req.headers;
  const { CheckData } = req.headers;
  if (!UserId || !Signature || !CheckData) return res.status(400).send('Provide userId, signature & checkData');
  // Verify
  const result = requestCheck(UserId, Signature, CheckData);
  if (!result) return res.status(401).send('Unauthorized');
  return next();
};
