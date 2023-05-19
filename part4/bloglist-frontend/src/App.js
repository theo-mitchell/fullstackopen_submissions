import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");

  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username:{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          ></input>
        </div>
        <button type="submit">submit</button>
      </form>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
    } catch (exception) {
      setMessage("Incorrect credentials");
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
    };

    try {
      const response = await blogService.create(newBlog);

      const newBlogs = blogs.concat(response);
      setBlogs(newBlogs);
      setBlogTitle("");
      setBlogAuthor("");
      setBlogUrl("");
      setMessage(`blog created: "${newBlog.title}" by ${newBlog.author}`);
      setTimeout(() => setMessage(null), 5000);
    } catch (exception) {
      setMessage(exception.message);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <div>
      <Notification message={message} />

      {!user && loginForm()}
      {user && (
        <>
          <button onClick={handleLogout}>log out</button>
          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <div>{blogForm()}</div>
        </>
      )}
    </div>
  );
};

export default App;
