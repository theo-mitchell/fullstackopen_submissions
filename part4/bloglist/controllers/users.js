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
  const allUsers = await User.find({});

  response.json(allUsers);
});

usersRouter.post("/", async (request, response) => {
  const { name, username, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await newUser.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
