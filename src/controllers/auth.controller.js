require("dotenv").config();
const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "email already registered" });
    }

    user = await User.create(req.body);
    const token = newToken(user);

    return res.status(201).send({ user, token });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res
        .status(400)
        .send({ message: "please try another username or password" });
    }

    const match = user.checkPassword(req.body.password);
    if (!match) {
      return res
        .status(400)
        .send({ message: "please try another username or password" });
    }
    const token = newToken(user);
    // console.log(user, token);
    return res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };
