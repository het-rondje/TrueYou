const Mongoose = require('mongoose');
const Joi = require('joi');
const shortid = require('shortid');
const Message = require('./message').MessageSchema;

const { Schema } = Mongoose;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate(),
    },
    firstName: {
      type: String,
      validate: {
        validator: firstname => firstname.length > 2,
        message: 'firstname must be valid.',
      },
      required: [true, 'firstname is required.'],
    },
    lastName: {
      type: String,
      validate: {
        validator: lastname => lastname.length > 2,
        message: 'lastname must be valid.',
      },
      required: [true, 'lastname is required.'],
    },
    publicKey: {
      type: String,
      // required: true
    },
    notPrivateKey: {
      type: String,
      // require: true
    },
    streamKey: { type: String },
    online: {
      type: Boolean,
      default: false,
    },
    satoshi: {
      type: Number,
      default: 0,
    },
    multiplier: {
      type: Number,
    },
    messages: [Message],
  },
  {
    timestamps: true,
    minimize: false,
  },
);

const User = Mongoose.model('user', userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    publicKey: Joi.string().required(),
    notPrivateKey: Joi.string().required(),
  };
  return Joi.validate(user, schema);
}

module.exports = User;
module.exports.validate = validateUser;
