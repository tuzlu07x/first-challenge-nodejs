import module from "module";
import path from "path";
const __dirname = path.resolve();

export default module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: "Fatih1234",
      database: "linkedin",
    },
    migrations: {
      directory: __dirname + "./db/migration",
    },
    seeds: {
      directory: null,
      //directory: __dirname + "/db/seeds/development",
    },
  },
};
