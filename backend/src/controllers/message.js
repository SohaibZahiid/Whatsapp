const Message = require("../models/Message");
const Conversation = require("../models/Conversation")

const createMessage = async (req, res) => {
    const {conversationId, sender, receiver, message} = req.body;
    try {

        const conversation = await Conversation.findOne({members: {$all: [sender, receiver]}});
        if (!conversation) {
            const newConversation = await Conversation.create({
                members: [sender, receiver]
            })
            const newMessage = await Message.create({conversationId: newConversation._id, sender, receiver, message});
            return res.status(200).json(newMessage);
        }

        const newMessage = await Message.create({conversationId, sender, receiver, message});
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getConversationMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error.message);
    }
};


module.exports = {createMessage, getConversationMessages};
