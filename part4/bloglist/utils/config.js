require("dotenv-flow").config();

const PORT = process.env.PORT;

const login = encodeURIComponent(process.env.MONGODB_LOGIN);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const MONGODB_URI = `mongodb+srv://${login}:${password}@cluster0.wvoz7g2.mongodb.net/blogListApp?retryWrites=true&w=majority`;

module.exports = { MONGODB_URI, PORT };
