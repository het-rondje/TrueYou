/*
    This module is used to validate authentication and integrity of socket messages
    It needs at least the following contents in the JSON
    {
        sender,
        text,
        signature
    }
*/

const requestCheck = require('../auth/requestCheck');

module.exports = async (data) => {
  console.log(data);
  // Get data
  const userId = data.sender;
  const { text } = data;
  const { signature } = data.signature;
  // Verify
  const validMessage = await requestCheck(userId, signature, text);
  return validMessage;
};
