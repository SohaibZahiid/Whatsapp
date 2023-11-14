const Conversation = require("../models/Conversation");

const createConversation = async (req, res) => {
  const { sender, receiver } = req.body;
  try {
    const conversation = await Conversation.create({
      members: [sender, receiver]
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error.message)
  }
};

const getUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: {$in: [req.params.userId]}
    }).sort({timestamps: -1})
    res.status(200).json(conversations)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getUserConversation = async(req, res) => {
  try {
    const conversations = await Conversation.findOne({
      members: {$all: [req.params.firstUserId, req.params.secondUserId]}
    })
    res.status(200).json(conversations)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = { createConversation, getUserConversations, getUserConversation };
