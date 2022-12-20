const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, currentValue) => total + currentValue.likes, 0);
};

const favoriteBlog = (blogs) => {
  let favorite;

  if (blogs.length) {
    favorite = blogs.reduce((prev, current) => {
      return prev.likes > current.likes ? prev : current;
    });
  }

  return favorite
    ? {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
      }
    : {};
};

const mostBlogs = (blogs) => {
  let blogsHashMap = _.reduce(
    blogs,
    (accumulator, value) => {
      const key = value["author"];

      if (accumulator[key]) {
        accumulator[key] = accumulator[key] + 1;
      } else {
        accumulator[key] = 1;
      }

      return accumulator;
    },
    {}
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
