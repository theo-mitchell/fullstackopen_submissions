const Blog = require("../models/blog");

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

module.exports = { initialBlogs, blogsInDb };
