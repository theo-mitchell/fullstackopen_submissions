const blogRouter = require("express").Router();
const { request, response } = require("express");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

// blogRouter.all("/", (request, response, next) => {
//   middleware.requestLogger(request);
//   next();
// });

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  if (blog.url == null || blog.title == null) {
    response.sendStatus(400);
  } else {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  }
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
