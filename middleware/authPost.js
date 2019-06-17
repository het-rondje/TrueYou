/*
    This module validates an incomming post requests
    It needs:
    - Headers
        - UserId
        - Signature (contains entire body)
    - Body
        - Can be anything
*/

const requestCheck = require('../auth/requestCheck');

module.exports = (req, res, next) => {
  // Get data
  const { Signature, Userid } = req.headers;
  const { body } = req;

  if (!Userid || !Signature || !body) return res.status(400).send('Provide userId, signature & body data');

  // Validate
  requestCheck(Userid, Signature, body)
    .then((result) => {
      if (!result) return res.send(401).status('Unauthorized');
      return next();
    })
    .catch(() => res.send(500).status('Error'));
  return next();
};
