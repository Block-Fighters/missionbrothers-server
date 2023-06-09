require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: "mission",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "1234",
    database: "mission_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: "mission",
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
