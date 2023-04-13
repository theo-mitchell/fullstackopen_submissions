const usersRouter = require("express").Router();
const { request, response } = require("express");
const middleware = require("../utils/middleware");

usersRouter.all("/", (request, response, next) => {
  middleware.requestLogger(request);
  next();
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
});
