const Mongoose = require('mongoose');
const Joi = require('joi');
const Schema = Mongoose.Schema;
const Message = require('./message').MessageSchema;

const UserSchema = new Schema({
    // uuid: {
    //     type: String,
    //     required: true
    // },

    firstName: {
        type: String,
        validate: {
            validator: (firstname) => firstname.length > 2,
            message: 'firstname must be valid.'
        },
        required: [true, 'firstname is required.']
    },

    lastName: {
        type: String,
        validate: {
            validator: (lastname) => lastname.length > 2,
            message: 'lastname must be valid.'
        },
        required: [true, 'lastname is required.']
    },

    publicKey: {
        type: String,
        required: true
    },

    streamKey: { type: String },

    online: {
        type: Boolean,
        default: false
    },

    messages: [Message],
    },
    {
        timestamps: true,
        minimize: false
    });

const user = Mongoose.model('user', UserSchema);

const schema = {
    uuid: Joi.string().guid().required(),
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    publicKey: Joi.string().required()
}

module.exports = user, schema;