const testHelper = require("./test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of testHelper.initialBlogs) {
    blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("requesting all blogs returns correct amount of records", async () => {
  await api.get("/api/blogs").expect(200);
}, 100000);

test("unique identifier of a blog post is a property named id", async () => {
  const blogs = await api.get("/api/blogs");
  const contents = blogs.body.map((r) => r);
  expect(contents[0].id).toBeDefined();
});
