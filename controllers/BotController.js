import Bot from "../linkedin/Bot.js";

const bot = new Bot(
  "tuzlufettullah@gmail.com",
  "90252a00mQ",
  "https://www.linkedin.com/login"
);

export default class BotController {
  login(req, res) {
    bot.login(req, res);
  }
}
