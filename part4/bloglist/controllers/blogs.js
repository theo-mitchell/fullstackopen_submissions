const blogRouter = require("express").Router();
const { request, response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.all("/", (request, response, next) => {
  middleware.requestLogger(request);
  next();
});

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("createdBy", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", async (request, response) => {
  const allUsers = await User.find({});
  const arbitraryUser = allUsers[0];

  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    createdBy: arbitraryUser._id,
  });

  if (blog.url == null || blog.title == null) {
    response.sendStatus(400);
  } else {
    const savedBlog = await blog.save();
    arbitraryUser.blogs = arbitraryUser.blogs.concat(savedBlog._id);
    await arbitraryUser.save();
    response.status(201).json(savedBlog);
  }
});

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updateData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updateData,
    { new: true }
  );

  response.json(updatedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
