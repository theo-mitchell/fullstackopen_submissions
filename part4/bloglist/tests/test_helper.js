const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "OH NO",
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

const getAllblogsInDB = () => {
  const blogs = Blog.find({}).then((res) => {
    return res.map((blog) => blog.toJSON());
  });
};

module.exports = { initialBlogs, getAllblogsInDB };
