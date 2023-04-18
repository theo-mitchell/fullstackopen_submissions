const usersRouter = require("express").Router();
const { request, response } = require("express");
const middleware = require("../utils/middleware");
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.all("/", (request, response, next) => {
  middleware.requestLogger(request);
  next();
});

usersRouter.get("/", async (request, response) => {
  const allUsers = await User.find({}).populate("blogs");

  response.json(allUsers);
});

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  if (password.length < 3) {
    return response.status(400).json({
      error: "Password must be 3 characters or more",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

module.exports = usersRouter;
