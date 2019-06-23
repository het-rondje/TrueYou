/*
    This module validates an incomming get requests
    It needs:
    - Headers
        - userid
        - signature
        - checkdata
*/

const requestCheck = require('../auth/requestCheck');

module.exports = async (req, res, next) => {
  // Get data
  const { userid } = req.headers;
  const { signature } = req.headers;
  const { checkdata } = req.headers;
  if (!userid || !signature || !checkdata) return res.status(400).send('Provide userid, signature & checkdata');
  // Verify
  const result = await requestCheck(userid, signature, checkdata);
  if (!result) return res.status(401).send('Unauthorized');
  return next();
};
