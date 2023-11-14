const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Types.ObjectId,
    ref: "Conversation",
    required: [true, "Please add a conversation"],
  },
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please add a sender"],
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please add a sender"],
  },
  message: {
    type: String,
    required: [true, "Please add a message"],
  }, 
  timestamps: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Messages", MessageSchema);