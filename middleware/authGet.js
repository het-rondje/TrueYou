/*
    This module validates an incomming get requests
    It needs:
    - Headers
        - userId
        - signature (contains checkData)
        - checkData
*/

const requestCheck = require('../auth/requestCheck')

module.exports = async (req, res, next) => {
    // Get data
    const userId = req.headers.userId
    const signature = req.headers.signature
    const checkData = req.headers.checkData
    if (!userId || !signature || !checkData) return res.status(400).send('Provide userId, signature & checkData')
    // Verify
    const result = requestCheck(userId, signature, checkData)
    if (!result) return res.status(401).send('Unauthorized')
    next()
}