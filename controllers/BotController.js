const knex = require("knex");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knexConfig = require("../knexfile.js");
const knexConnection = knex(knexConfig.development);
const Bot = require("../Linkedin/Bot.js");
const botData = new Bot(
  "tuzlufettullah@gmail.com",
  "90252a00mQ",
  "https://www.linkedin.com/login"
);
const dotEnv = dotenv.config();
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

  async login(req, res) {
    const user = await knexConnection("users")
      .where("email", req.body.email)
      .select("*")
      .first();
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, dotEnv.parsed.JWT_SECRET, {
      expiresIn: 86400,
    });
    return res.send({ token });
  }
}
module.exports = BotController;
