const knex = require("knex");
const knexConfig = require("../knexfile.js");
const knexConnection = knex(knexConfig.development);
const Bot = require("../Linkedin/Bot.js");
const botData = new Bot(
  "tuzlufettullah@gmail.com",
  "90252a00mQ",
  "https://www.linkedin.com/login"
);
class BotController {
  async login(req, res) {
    let data = await knexConnection("users").select("*");
    res.send(data);
    return data;
  }

  // async bot(req, res) {
  //   return botData.login(req, res);
  // }
}
module.exports = BotController;
