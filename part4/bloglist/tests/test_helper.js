const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "MEOW MEOW",
    author: "AUTHOR ONE",
    url: "https://www.no.com",
    likes: 999,
  },
  {
    title: "OH NO AGAIN",
    author: "AUTHOR TWO",
    url: "https://www.no2.com",
    likes: 1000,
  },
  {
    title: "OH NO YET AGAIN",
    author: "AUTHOR THREE",
    url: "https://www.no2.com",
    likes: 10001,
  },
];

const blogsInDb = async () => {
  const allBlogs = await Blog.find({});
  const jsonBlogs = [];

  for (const blog of allBlogs) {
    jsonBlogs.push(blog.toJSON());
  }

  return jsonBlogs;
};

const usersInDb = async () => {
  const allUsers = await User.find({});
  const jsonUsers = [];

  for (const user of allUsers) {
    jsonUsers.push(user.toJSON());
  }

  return jsonUsers;
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
