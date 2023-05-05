const blogRouter = require("express").Router();
const { request, response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");
const blog = require("../models/blog");

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

blogRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const requesterId = request.user;
    const body = request.body;

    if (!requesterId) {
      return response
        .status(401)
        .json({ error: "authenticaton failed: invalid token" });
    }

    const user = await User.findById(requesterId);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      createdBy: user._id,
    });

    if (blog.url == null || blog.title == null) {
      response.status(400).end();
    } else {
      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      response.status(201).json(savedBlog);
    }
  }
);

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

blogRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const requesterId = request.user;

    const blogToDelete = await Blog.findById(request.params.id);

    if (blogToDelete.createdBy.toString() === requesterId) {
      await Blog.deleteOne({ _id: blogToDelete.id });
      return response.status(204).end();
    }

    response
      .status(401)
      .json({ error: "you are not authorized to delete this blog post" });
  }
);

module.exports = blogRouter;
