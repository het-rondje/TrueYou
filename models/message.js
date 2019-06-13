const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    sender: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
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
  Message: mongoose.model('message', MessageSchema),
  MessageSchema,
};
