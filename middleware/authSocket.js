/* {
    sender,
    text,
    signature
} */

const User = require('../models/user')
const signature = require('../auth/signature')

module.exports = (data) => {
    console.log(data);
    const pubKey = User.findById(data.sender)
}