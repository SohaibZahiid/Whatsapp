const User = require("../models/User");
const jwt = require("jsonwebtoken")

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const userExists = await User.findById(req.params.userId);

    if (!userExists) {
      return res.status(404).json("User not found");
    }

    const { password, ...user } = userExists.toObject();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUsersByUsername = async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.query.username, $options: "i" },
    }).select("-password");

    if (!users) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (userExists) {
      return res.status(409).json("User already exists");
    }

    const userObj = { username, email, password };

    const user = await User.create(userObj);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const userExists = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!userExists) {
      return res.status(401).json("Invalid credentials");
    }

    const { password, ...user } = userExists.toObject();

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { getUsers, getUser, getUsersByUsername, register, login };
