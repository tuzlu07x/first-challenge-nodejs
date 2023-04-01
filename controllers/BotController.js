const knex = require("knex");
const knexConfig = require("../knexfile.js");
const knexConnection = knex(knexConfig.development);

class BotController {
  async login(req, res) {
    let data = await knexConnection("users").select("*");
    res.send(data);
    return data;
  }
}
module.exports = BotController;
