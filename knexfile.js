const dotenv = require("dotenv");
const path = require("path");
const knex = require("knex");

const result = dotenv.config();
module.exports = {
  development: {
    client: result.parsed.DB_CONNECTION,
    connection: {
      host: result.parsed.DB_HOST,
      user: result.parsed.DB_USERNAME,
      password: result.parsed.DB_PASSWORD,
      database: result.parsed.DB_DATABASE,
      port: result.parsed.DB_PORT,
    },
    migrations: {},
    seeds: {
      directory: null,
      //directory: __dirname + "/db/seeds/development",
    },
  },
};
