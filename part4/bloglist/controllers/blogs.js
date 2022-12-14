const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.all("/", (request, response, next) => {
  middleware.requestLogger(request);
  next();
});

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => {
      middleware.errorHandler(error);
    });
});

module.exports = blogRouter;
