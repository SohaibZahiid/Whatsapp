const express = require("express")
const { createConversation, getUserConversations, getUserConversation } = require("../controllers/conversation")
const router = express.Router()

const authMiddleware = require("../middlewares/authMiddleware")

router.post("/", authMiddleware, createConversation)
router.get("/:userId", authMiddleware, getUserConversations)
router.get("/:firstUserId/:secondUserId", getUserConversation)

module.exports = router