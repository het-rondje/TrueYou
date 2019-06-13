const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    timestamp: { 
        type: String 
    },
    message: {
        type: String
    }
});

const Log = mongoose.model('log', LogSchema)

module.exports = Log;