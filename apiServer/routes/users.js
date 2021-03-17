const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ login });
    if (user && user.password === password) {
      res.send({ login: user.login, id: user._id });
    } else {
      throw new Error("Wrong credentials");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const loginExists = await User.findOne({ login: req.body.login });
    console.log(loginExists);
    if (loginExists) {
      throw new Error("Chosen username already exists");
    } else {
      const user = new User(req.body);
      await user.save();
      res.send({ login: user.login, id: user._id });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

module.exports = router;
