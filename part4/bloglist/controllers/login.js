const loginRouter = require("express").Router();
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response
      .status(401)
      .json({ error: "provided credentials are invalid" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // token expires in half hour
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 30,
  });

  response
    .status(200)
    .send({ token, username: user.usermane, name: user.name });
});

module.exports = loginRouter;
