const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require('./message').MessageSchema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        validate: {
            validator: (firstname) => firstname.length > 2,
            message: 'firstname must be valid.'
        },
        required: [true, 'firstname is required.']
    },
    lastname: {
        type: String,
        validate: {
            validator: (lastname) => lastname.length > 2,
            message: 'lastname must be valid.'
        },
        required: [true, 'lastname is required.']
    },
    streamUrl: { type: String 
    },

    messages: [Message],
    },
    {
        timestamps: true,
        minimize: false
    });

module.exports = mongoose.model('user', UserSchema);