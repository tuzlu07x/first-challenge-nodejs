import knex from "knex";
import Bot from "../linkedin/Bot.js";

const bot = new Bot(
  "tuzlufettullah@gmail.com",
  "90252a00mQ",
  "https://www.linkedin.com/login"
);

export default class BotController {
  async login(req, res) {
    let data = await knex("users").select("*").where("id", 1);
    res.send(data);
  }
}
