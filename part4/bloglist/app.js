const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");

app.use(cors());
app.use(express.json());

const blogsRouter = require("./controllers/blogs");
app.use("/api/blogs", blogsRouter);

const usersRouter = require("./controllers/users");
app.use("/api/users", usersRouter);

mongoose.connect(config.MONGODB_URI);

module.exports = app;
