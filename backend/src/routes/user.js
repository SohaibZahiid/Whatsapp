const express = require("express");
const router = express.Router();

const { register, login, getUser, getUsers, getUsersByUsername } = require("../controllers/user");

router.get('/', getUsers)
router.get("/users", getUsersByUsername)
router.get("/:userId", getUser)
router.post("/register", register);
router.post("/login", login);

module.exports = router