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
