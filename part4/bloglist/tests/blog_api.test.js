const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const testHelper = require("./test_helper");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});

  const userData = {
    username: "nonononono",
    name: "nonononono",
    password: "yesssss",
  };

  const passwordHash = await bcrypt.hash(userData.password, 10);

  const user = new User({ username: userData.username, passwordHash });
  await user.save();

  const loginResponse = await api.post("/api/login").send({
    username: userData.username,
    password: userData.password,
  });

  token = loginResponse.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
});

test("requesting all blogs returns correct amount of records", async () => {
  await api.get("/api/blogs").expect(200);
}, 100000);

test("unique identifier of a blog post is a property named id", async () => {
  const blogs = await api.get("/api/blogs");
  const contents = blogs.body.map((r) => r);
  expect(contents[0].id).toBeDefined();
});

test("making a POST request correctly adds a blog entry", async () => {
  const initialNumbderOfBlogs = testHelper.initialBlogs.length;
  const testEntry = {
    title: "OH NO, NOT A POST TEST",
    author: "AUTHOR TWO",
    url: "https://www.no2.com",
    likes: 696969,
  };

  await api
    .post("/api/blogs")
    .auth(token, { type: "bearer" })
    .send(testEntry)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");

  expect(blogs.body.length === initialNumbderOfBlogs + 1);
});

test("if the likes property is not supplied, value will be defaulted to 0", async () => {
  const testEntry = {
    title: "Rabble Rabble",
    author: "Test Author",
    url: "https://www.no4567.com",
  };

  await api
    .post("/api/blogs")
    .auth(token, { type: "bearer" })
    .send(testEntry)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await api.get("/api/blogs");
  const postedTestEntry = blogs.body.slice(-1).pop();
  expect(postedTestEntry.likes).toEqual(0);
});

test("If a blog does not contain a title or url, it will not be saved and server will respond with 400", async () => {
  const titleMissingTestEntry = {
    author: "Test for TITLE missing",
    url: "https://www.notitle.com",
  };

  await api
    .post("/api/blogs")
    .auth(token, { type: "bearer" })
    .send(titleMissingTestEntry)
    .expect(400);
});

describe("blog entry deletion", () => {
  test("a blog with a valid id will be deleted", async () => {
    const testBlogEntry = {
      author: "Testytest",
      url: "https://www.notitle.com",
      title: "WELL HELLO",
    };

    const blogToDeleteResponse = await api
      .post("/api/blogs")
      .auth(token, { type: "bearer" })
      .send(testBlogEntry)
      .expect(201);

    const blogToDeleteId = blogToDeleteResponse.body.id;

    const blogsAtStart = await testHelper.blogsInDb();

    await api
      .delete(`/api/blogs/${blogToDeleteId}`)
      .auth(token, { type: "bearer" })
      .expect(204);

    const blogsAtEnd = await testHelper.blogsInDb();

    expect(blogsAtEnd.length).toEqual(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((blog) => {
      return blog.title;
    });

    expect(titles).not.toContain(testBlogEntry.title);
  });
});

describe("blog entry updates", () => {
  test("a PUT request with a valid id will update its corresponding blog", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const likesTestValue = 420;
    blogToUpdate.likes = likesTestValue;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const updatedBlog = (await api.get(`/api/blogs/${blogToUpdate.id}`)).body;

    expect(updatedBlog.likes).toEqual(likesTestValue);
  });
});

afterAll(async () => {
  console.log("goodbye, space cowboy");
  await mongoose.connection.close();
});
