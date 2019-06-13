const Mongoose = require('mongoose');
const Joi = require('joi');
const Schema = Mongoose.Schema;
const Message = require('./message').MessageSchema;

const userSchema = new Schema({
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
        //required: true
    },

    notPrivateKey: {
        type: String,
        //require: true
    },

    streamUrl: { type: String },

    messages: [Message],
    },
    {
        timestamps: true,
        minimize: false
    });

const User = Mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        publicKey: Joi.string().required(),
        notPrivateKey: Joi.string().required()
    }
    return Joi.validate(user, schema);    
};

module.exports = User;
module.exports.validate = validateUser;