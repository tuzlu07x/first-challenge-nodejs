const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("knex");
const knexPaginate = require("knex-paginate");
const knexConfig = require("../knexfile.js");

const knexConnection = knex(knexConfig.development);
knexPaginate.attachPaginate();

const dotEnv = dotenv.config();
class AuthController {
  async index(req, res) {
    let data = await knexConnection("users")
      .select("*")
      .paginate({ perPage: 10, currentPage: 1, isLengthAware: true });
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
    res.setHeader("Authorization", "Bearer " + token);

    return res.send({ user, token });
  }
}
module.exports = AuthController;
