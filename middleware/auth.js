// TODO: get user model
const signature = require('../auth/signature')

module.exports = async (req, res, next) => {

    const userId = req.header.userId
    const signature = req.header.signature

    if (!userId) return res.status(400).send('Provide user id')
    if (!signature) return res.status(400).send('Provide signature')

    // Get pub key from user & check if user exists

    // Verify signature

}