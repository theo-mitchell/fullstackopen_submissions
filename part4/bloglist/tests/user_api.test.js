const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const testHelper = require("./test_helper");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);

  const user = new User({ username: "root", passwordHash });

  await user.save();
});

describe("a user will not be created if provided user data is not valid", () => {
  test("a user with a username length < 3 will not be created", async () => {
    const usersAtStart = await testHelper.usersInDb();
    const testEntry = {
      username: "no",
      name: "Larry",
      password: "somepassword",
    };

    await api.post("/api/users").send(testEntry).expect(400);
    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtStart.length).toEqual(usersAtEnd.length);

    const usernamesAtEnd = usersAtEnd.map((user) => user.username);
    expect(usernamesAtEnd).not.toContain(testEntry.username);
  });

  test("a user with a password length < 3 will not be created", async () => {
    const usersAtStart = await testHelper.usersInDb();
    const testEntry = {
      username: "normalname",
      name: "Larry",
      password: "se",
    };

    await api.post("/api/users").send(testEntry).expect(400);
    const usersAtEnd = await testHelper.usersInDb();

    expect(usersAtStart.length).toEqual(usersAtEnd.length);

    const usernamesAtEnd = usersAtEnd.map((user) => user.username);
    expect(usernamesAtEnd).not.toContain(testEntry.username);
  });
});
