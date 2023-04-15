const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs", blogsRouter);

const usersRouter = require("./controllers/users");
app.use("/api/users", usersRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
app.use(middleware.requestLogger);

mongoose.connect(config.MONGODB_URI);

module.exports = app;
