/*
    This module validates an incomming post requests
    It needs:
    - Headers
        - userId
        - signature (contains entire body)
    - Body
        - Can be anything
*/

const requestCheck = require('../auth/requestCheck');

module.exports = async (req, res, next) => {
  // Get data
  const { userId } = req.headers;
  const { signature } = req.headers;
  const { body } = req;
  if (!userId || !signature || !body) return res.status(400).send('Provide userId, signature & body data');

  // Validate
  const result = requestCheck(userId, signature, body);
  if (!result) return res.send(401).status('Unauthorized');
  return next();
};
