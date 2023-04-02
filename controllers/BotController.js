const knex = require("knex");
const bcrypt = require("bcrypt");
const knexConfig = require("../knexfile.js");
const knexConnection = knex(knexConfig.development);
const Bot = require("../Linkedin/Bot.js");
const botData = new Bot(
  "tuzlufettullah@gmail.com",
  "90252a00mQ",
  "https://www.linkedin.com/login"
);
class BotController {
  async index(req, res) {
    let data = await knexConnection("users").select("*");
    res.send(data);
    return data;
  }

  async register(req, res) {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    try {
      await knexConnection("users").insert(newUser);
      return res.send(newUser);
    } catch (err) {
      return res.send("User not created");
    }
  }

  // async bot(req, res) {
  //   return botData.login(req, res);
  // }
}
module.exports = BotController;
