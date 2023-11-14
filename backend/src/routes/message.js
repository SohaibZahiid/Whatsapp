const express = require("express")
const router = express.Router()

const {createMessage, getConversationMessages} = require("../controllers/message")

router.post("/", createMessage)
router.get("/:conversationId", getConversationMessages)


module.exports = router