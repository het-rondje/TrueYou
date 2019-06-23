const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    sender: { type: String, ref: 'user' },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

module.exports = {
  // Message: mongoose.model('message', MessageSchema),
  MessageSchema,
};
